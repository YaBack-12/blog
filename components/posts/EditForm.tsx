'use client'

import { EditPost } from '@/actions/PostsActions'
import { Category } from '@/app/generated/prisma/browser'
import  { useState } from 'react'

const EditForm = ( { posts , categories } : { posts : any , categories: Category[] }) => {
    const [imagePreview, setImagePreview] = useState<string | null>(posts?.image ?? null)
    return (
        <form action={EditPost.bind(null, posts.id)}  className="w-full bg-white border border-muted rounded-2xl p-8 max-w-3xl space-y-6">
        
            {/* Title */}
            <div>
                <label className="block text-sm font-semibold mb-2" htmlFor="title">
                Post Title
                </label>
                <input
                type="text"
                id="title"
                name="title"
                defaultValue={posts?.title}
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
                defaultValue={posts?.category?.id}
                className="w-full border border-muted rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
                >
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                    {category.title}
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
                defaultValue={posts.description}
                rows={10}
                placeholder="Write your post content here..."
                className="w-full border border-muted rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                />
            </div>

            {/* Publish / Draft */}
            <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                {posts.status == 1 ? (
                    <input type="radio" name="status" defaultChecked value="1" className="accent-accent" />
                ) : (
                    <input type="radio" name="status" value="1" className="accent-accent" />
                )}
                Publish
                </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                {posts.status == 0 ? (
                <input type="radio" name="status" defaultChecked value="0" className="accent-accent" />
                ) : (
                    <input type="radio" name="status" value="0" className="accent-accent" />
                )}
                Draft
                </label>
            </div>

            {/* Submit */}
            <button
                type="submit"
                className="bg-accent text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition"
            >
                Update Post
            </button>
        </form>
    )
}

export default EditForm