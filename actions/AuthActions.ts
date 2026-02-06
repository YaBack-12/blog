'use server';
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function registerUser(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!name || !email || !password) {
        throw new Error("Missing required fields");
    }

    const exest = await prisma.user.findUnique({
        where: { email },
    });

    if (exest) {
        throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            role: "user",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    });

    const cookieStore = await cookies();

    cookieStore.set({
      name: "session",
      value: user.id.toString(),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });
    redirect("/");
}

export async function loginUser(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        throw new Error("Invalid email or password");
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new Error("Invalid email or password");
    }

    const cookieStore = await cookies();

    cookieStore.set({
      name: "session",
      value: user.id.toString(),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    redirect("/");
}

export async function getSession() {
  const cookieStore = await cookies();
  return cookieStore.get("session")?.value;
}

export async function updateUser(userId: string, data: { name?: string; role?: string }) {
    if (!userId) {
        throw new Error("User ID is required");
    }
    const updateData: any = {};
    if (data.name) updateData.name = data.name;
    if (data.role) updateData.role = data.role;
    updateData.updatedAt = new Date();

    const numericId = Number(userId);
    if (isNaN(numericId)) {
        throw new Error("User ID must be a number");
    }
    return prisma.user.update({
        where: { id: numericId },
        data: updateData,
    });
}

export async function deleteUser(userId: string) {
  if (!userId) throw new Error("User ID is required");
  const numericId = Number(userId);
  if (isNaN(numericId)) throw new Error("User ID must be a number");
  return prisma.user.delete({ where: { id: numericId } });
}

export async function getAuthUser() {
  const cookieStore = await cookies()
  const session = cookieStore.get("session")?.value
  if (!session) return null

  const user = await prisma.user.findUnique({
    where: { id: Number(session) },
    select: {
      id: true,
      name: true,
      role: true, // must exist in schema
    },
  })

  if (!user) return null

  return {
    id: user.id,
    name: user.name ?? "",
    role: user.role ?? "user",
  }
}

export async function logoutUser() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
  redirect("/");
}