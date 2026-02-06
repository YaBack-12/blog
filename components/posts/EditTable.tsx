"use client"

import Link from "next/link"
import { useState } from "react"
import { DeletePost } from "@/actions/PostsActions"

export default function EditTable({ posts }: { posts: any[] } ) {
  const [open, setOpen] = useState(false)
  const [postId, setPostId] = useState<string | null>(null)
  const [postTitle, setPostTitle] = useState<string>("")
  const [loading, setLoading] = useState(false)

  const openModal = (id: string, title: string) => {
    setPostId(id)
    setPostTitle(title)
    setOpen(true)
  }

  const handleDelete = async () => {
    if (!postId) return
    setLoading(true)
    await DeletePost(Number(postId))
    setLoading(false)
    setOpen(false)
  }

  return (
    <>
        <table className="w-full text-sm">
            <thead className="bg-muted/40 text-primary/70">
              <tr>
                <th className="text-left px-6 py-4 font-semibold">Title</th>
                <th className="text-left px-6 py-4 font-semibold">Category</th>
                <th className="text-left px-6 py-4 font-semibold">Author</th>
                <th className="text-left px-6 py-4 font-semibold">Date</th>
                <th className="text-right px-6 py-4 font-semibold">Actions</th>
              </tr> 
            </thead>

            <tbody>
              {posts.map((post) => (
                <tr
                    key={post.id}
                    className="border-t border-muted hover:bg-muted/30 transition"
                >
                    <td className="px-6 py-4 font-medium">{post.title}</td>
                    <td className="px-6 py-4 text-primary/70">{post.category?.title}</td>
                    <td className="px-6 py-4 text-primary/70">{post.author?.name}</td>
                    <td className="px-6 py-4 text-primary/70">{post.createdAt?.toLocaleDateString()}</td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-4">
                    <Link
                      href={`/dashboard/posts/edit/${post.id}`}
                      className="text-sm font-semibold text-accent hover:underline"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => openModal(post.id, post.title)}
                      className="text-sm font-semibold text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      {/* Fancy Delete Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-all">
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto animate-fade-in p-0 overflow-hidden border border-red-400/30">
            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors text-2xl font-bold rounded-full bg-gray-100 hover:bg-red-100 w-9 h-9 flex items-center justify-center shadow"
              aria-label="Close"
              disabled={loading}
            >
              &times;
            </button>
            {/* Modal Header */}
            <div className="px-8 pt-8 pb-3 border-b border-muted/40 bg-gradient-to-r from-red-100 to-white">
              <h2 className="text-xl font-extrabold text-red-500 drop-shadow">Delete Post</h2>
            </div>
            {/* Modal Body */}
            <div className="px-8 py-6 space-y-4">
              <div className="text-primary/90">
                Are you sure you want to delete <span className="font-bold">{postTitle}</span>?
              </div>
              <div className="text-sm text-primary/60">
                This action cannot be undone.
              </div>
            </div>
            {/* Modal Footer */}
            <div className="px-8 pb-8 pt-3 flex justify-end gap-3 border-t border-muted/40 bg-gradient-to-l from-red-100 to-white">
              <button
                onClick={() => setOpen(false)}
                className="px-5 py-2 rounded-lg bg-muted text-primary font-semibold hover:bg-muted/70 transition-all shadow"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-5 py-2 rounded-lg bg-gradient-to-r from-red-500 to-red-400 text-white font-bold shadow hover:from-red-600 hover:to-red-500 transition-all disabled:opacity-60"
                disabled={loading}
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
