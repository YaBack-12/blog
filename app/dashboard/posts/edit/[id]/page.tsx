import EditForm from "@/components/posts/EditForm";
import { prisma } from "@/lib/db";
const categorie = ["Next.js", "React", "Tailwind CSS", "JavaScript", "Performance"]


export default async function EditPostPage(props: { params: Promise<{ id: string }> }) {
    const paramsa = await props.params;

    const postId = Number(paramsa.id);

    const posts = await prisma.post.findUnique({
        where: { id: postId },
        include: { category: true , author: true}
    });
    const categories = await prisma.category.findMany();
    return (
        <div className="w-full h-screen bg-bg text-primary flex">
            <section className="flex-1 p-8 bg-gradient-to-br from-bg via-white/60 to-accent/10 text-primary min-h-screen">
                <h1 className="text-3xl font-extrabold mb-8">Edit Post</h1>
                <div className="w-full flex justify-center">
                    <EditForm posts={posts} categories={categories}/>
                </div>
            </section>
        </div>
    )
}
