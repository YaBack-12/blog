"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import fs from "fs";
import path from "path";
import { getAuthUser } from "./AuthActions";

async function saveImageToPublic(imageFile: File | null): Promise<string> {
    if (!imageFile) return "";
    // Read file buffer
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    // Generate unique filename
    const ext = imageFile.name.split('.').pop();
    const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;
    const publicPath = path.join(process.cwd(), "public", filename);
    // Save file
    fs.writeFileSync(publicPath, buffer);
    return filename;
}

export async function CreatePosts(fromData: FormData) {
    const imageFile = fromData.get("image") as File | null;
    let image = "";
    if (imageFile && typeof imageFile === "object" && "name" in imageFile) {
        image = await saveImageToPublic(imageFile);
    }

    const user = await getAuthUser();

    await prisma.post.create({
        data: {
            title: fromData.get("title") as string,
            slug: (fromData.get("title") as string).toLowerCase().replace(/\s+/g, '-'),
            image,
            categoryId: Number(fromData.get("categoryId")),
            description: fromData.get("description") as string,
            status: Number(fromData.get("status")),
            createdAt: new Date(),
            updatedAt: new Date(),
            authorId: user?.id || 1,
        },
    });
    revalidatePath("/dashboard/posts");
    redirect("/dashboard/posts");
}

export async function EditPost(id: number, fromData: FormData) {
    const imageFile = fromData.get("image") as File | null;
    let image = "";
    if (imageFile && typeof imageFile === "object" && "name" in imageFile) {
        image = await saveImageToPublic(imageFile);
    }

    const user = await getAuthUser();

    await prisma.post.update({
        where: { id },
        data: {
            title: fromData.get("title") as string,
            slug: (fromData.get("title") as string).toLowerCase().replace(/\s+/g, '-'),
            image,
            categoryId: Number(fromData.get("categoryId")),
            description: fromData.get("description") as string,
            status: Number(fromData.get("status")),
            updatedAt: new Date(),
            authorId: user?.id || 1,
        },
    });

    revalidatePath("/dashboard/posts");
    redirect("/dashboard/posts");
}

export async function CreateComment( id: number , fromData: FormData ) {
    const postId = id;
    const user = await getAuthUser();

    await prisma.comment.create({
        data: {
            postId,
            authorId: user?.id || 1,
            Comment: fromData.get("comment") as string,
            createdAt: new Date(),
        },
    });
}

export async function DeletePost(id: number) {
    await prisma.post.delete({
        where: { id },
    });
    revalidatePath("/dashboard/posts");
}


export async function ContactUs(fromData: FormData) {
    await prisma.contact.create({
        data: {
            name: fromData.get("name") as string,
            email: fromData.get("email") as string,
            message: fromData.get("message") as string,
            createdAt: new Date(),
        },
    });
}


export async function incrementPostViews(postId: number) {
  await prisma.post.update({
    where: { id: postId },
    data: {
      views: {
        increment: 1,
      },
    },
  });
}