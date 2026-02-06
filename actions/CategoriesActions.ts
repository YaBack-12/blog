"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function CreateCategory(fromData: FormData) {
    await prisma.category.create({
        data: {
            title: fromData.get("title") as string,
            slug: (fromData.get("title") as string).toLowerCase().replace(/\s+/g, '-'),
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    });
    revalidatePath("/dashboard/categories");
    redirect("/dashboard/categories");
}

export async function EditCategory(id: number , fromData: FormData) {
    await prisma.category.update({
        where: { id },
        data: {
            title: fromData.get("title") as string,
            slug: (fromData.get("title") as string).toLowerCase().replace(/\s+/g, '-'),
            updatedAt: new Date(),
        },
    });
    revalidatePath("/dashboard/categories");
    redirect("/dashboard/categories");
}

export async function DeleteCategory(id: number) {
    await prisma.category.delete({
        where: { id },
    });
    revalidatePath("/dashboard/categories");
}
