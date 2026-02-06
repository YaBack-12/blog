import { CreateCategory } from "@/actions/CategoriesActions";

export default function AddCategoryPage() {
  return (
    <div className="w-full h-screen bg-bg text-primary flex">
        <section className="flex-1 p-8 bg-gradient-to-br from-bg via-white/60 to-accent/10 text-primary min-h-screen">
            <h1 className="text-3xl font-extrabold mb-8">Add New Category</h1>
            <div className="w-full flex justify-center">
                <form action={CreateCategory} className="w-full bg-white border border-muted rounded-2xl p-8 max-w-2xl space-y-6">
                    
                    {/* Category Name */}
                    <div>
                    <label htmlFor="name" className="block text-sm font-semibold mb-2">
                        Category Name
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Enter category name"
                        className="w-full border border-muted rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    </div>

                    {/* Submit */}
                    <button
                    type="submit"
                    className="bg-accent text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition"
                    >
                    Create Category
                    </button>
                </form>
            </div>
        </section>
    </div>
  )
}
