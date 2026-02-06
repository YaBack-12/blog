'use client'

import { CreatePosts } from '@/actions/PostsActions'
import { Category } from '@/app/generated/prisma/browser'
import  { useState } from 'react'

const CreateForm = ( { categories } : { categories: Category[] }) => {
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    return (
        <form action={CreatePosts} className="w-full bg-white border border-muted rounded-2xl p-8 max-w-3xl space-y-6">
        
            {/* Title */}
            <div>
                <label className="block text-sm font-semibold mb-2" htmlFor="title">
                Post Title
                </label>
                <input
                type="text"
                id="title"
                name="title"
                placeholder="Enter your post title"
                className="w-full border border-muted rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
                />
            </div>

            {/* Featured Image */}
            <div>
                <label className="block text-sm font-semibold mb-2">
                Featured Image
                </label>

                <div className="border-2 border-dashed border-muted rounded-2xl p-6 text-center cursor-pointer hover:border-accent transition">
                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="image"
                    name="image"
                    onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                        setImagePreview(URL.createObjectURL(file))
                    }
                    }}
                />

                <label htmlFor="image" className="cursor-pointer">
                    {!imagePreview ? (
                    <p className="text-sm text-primary/60">
                        Click to upload an image (PNG, JPG)
                    </p>
                    ) : (
                    <img
                        src={imagePreview}
                        alt="Preview"
                        className="mx-auto rounded-xl max-h-64 object-cover"
                    />
                    )}
                </label>
                </div>
            </div>

            {/* Category */}
            <div>
                <label className="block text-sm font-semibold mb-2" htmlFor="category">
                Category
                </label>
                <select
                id="category"
                name="categoryId"
                className="w-full border border-muted rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
                >
                {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                    {cat.title}
                    </option>
                ))}
                </select>
            </div>

            {/* Content */}
            <div>
                <label className="block text-sm font-semibold mb-2" htmlFor="content">
                Content
                </label>
                <textarea
                id="description"
                name="description"
                rows={10}
                placeholder="Write your post content here..."
                className="w-full border border-muted rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                />
            </div>

            {/* Publish / Draft */}
            <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="status" value="1" className="accent-accent" />
                Publish
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="status" value="0" className="accent-accent" />
                Draft
                </label>
            </div>

            {/* Submit */}
            <button
                type="submit"
                className="bg-accent text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition"
            >
                Create Post
            </button>
        </form>
    )
}

export default CreateForm