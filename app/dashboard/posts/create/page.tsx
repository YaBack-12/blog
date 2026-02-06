import CreateForm from "@/components/posts/CreateForm";
import { prisma } from "@/lib/db";


export default async function AddPostPage() {
    const posts = await prisma.post.findMany();
    const categories = await prisma.category.findMany();
    return (
        <div className="w-full h-screen bg-bg text-primary flex">
            <section className="flex-1 p-8 bg-gradient-to-br from-bg via-white/60 to-accent/10 text-primary min-h-screen">
                <h1 className="text-3xl font-extrabold mb-8">Add New Post</h1>
                <div className="w-full flex justify-center">
                    <CreateForm categories={categories} />
                </div>
            </section>
        </div>
    )
}
