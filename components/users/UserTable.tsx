"use client"
import { useState } from "react"

export default function EditTable({ users }: { users: any[] } ) {
  // Modal state
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [selectedRole, setSelectedRole] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [userList, setUserList] = useState(users)

  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [deleteUserTarget, setDeleteUserTarget] = useState<any>(null)
  const [deleteLoading, setDeleteLoading] = useState(false)

  // Open edit modal
  const openModal = (user: any) => {
    setSelectedUser(user)
    setSelectedRole(user.role)
    setModalOpen(true)
  }

  // Close edit modal
  const closeModal = () => {
    setModalOpen(false)
    setSelectedUser(null)
    setLoading(false)
  }

  // Open delete modal
  const openDeleteModal = (user: any) => {
    setDeleteUserTarget(user)
    setDeleteModalOpen(true)
  }

  // Close delete modal
  const closeDeleteModal = () => {
    setDeleteModalOpen(false)
    setDeleteUserTarget(null)
    setDeleteLoading(false)
  }

  // Save handler
  const handleSave = async () => {
    if (!selectedUser) return
    setLoading(true)
    try {
      const { updateUser } = await import("@/actions/AuthActions")
      await updateUser(selectedUser.id, { role: selectedRole })
      // Optimistically update UI
      setUserList(prev =>
        prev.map(u =>
          u.id === selectedUser.id ? { ...u, role: selectedRole, updatedAt: new Date() } : u
        )
      )
      closeModal()
    } catch (e) {
      // Optionally show error
      setLoading(false)
    }
  }

  // Delete handler
  const handleDelete = async () => {
    if (!deleteUserTarget) return
    setDeleteLoading(true)
    try {
      const { deleteUser } = await import("@/actions/AuthActions")
      await deleteUser(deleteUserTarget.id)
      // Optimistically remove user from list
      setUserList(prev => prev.filter(u => u.id !== deleteUserTarget.id))
      closeDeleteModal()
    } catch (e) {
      setDeleteLoading(false)
    }
  }

  return (
    <div className="bg-white border border-muted rounded-2xl overflow-hidden">
      {/* Fancy Edit Modal */}
      {modalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-all">
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto animate-fade-in p-0 overflow-hidden border border-accent/20">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-accent transition-colors text-2xl font-bold rounded-full bg-gray-100 hover:bg-accent/10 w-9 h-9 flex items-center justify-center shadow"
              aria-label="Close"
              disabled={loading}
            >
              &times;
            </button>
            {/* Modal Header */}
            <div className="px-8 pt-8 pb-3 border-b border-muted/40 bg-gradient-to-r from-accent/10 to-white">
              <h2 className="text-xl font-extrabold text-accent drop-shadow">Edit User</h2>
            </div>
            {/* Modal Body */}
            <div className="px-8 py-6 space-y-4">
              <div>
                <span className="font-semibold text-primary/80">Name:</span>
                <span className="ml-2 text-primary">{selectedUser.name}</span>
              </div>
              <div>
                <span className="font-semibold text-primary/80">Email:</span>
                <span className="ml-2 text-primary">{selectedUser.email}</span>
              </div>
              <div>
                <label className="font-semibold text-primary/80 mr-2" htmlFor="role-select">Role:</label>
                <select
                  id="role-select"
                  value={selectedRole}
                  onChange={e => setSelectedRole(e.target.value)}
                  className="border-2 border-accent/40 focus:border-accent focus:ring-2 focus:ring-accent/30 rounded-lg px-3 py-2 bg-muted/10 text-primary font-semibold shadow-sm transition-all outline-none"
                  disabled={loading}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  {/* Add more roles as needed */}
                </select>
              </div>
            </div>
            {/* Modal Footer */}
            <div className="px-8 pb-8 pt-3 flex justify-end gap-3 border-t border-muted/40 bg-gradient-to-l from-accent/10 to-white">
              <button
                onClick={closeModal}
                className="px-5 py-2 rounded-lg bg-muted text-primary font-semibold hover:bg-muted/70 transition-all shadow"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-5 py-2 rounded-lg bg-gradient-to-r from-accent to-accent/80 text-white font-bold shadow hover:from-accent/80 hover:to-accent/60 transition-all disabled:opacity-60"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Fancy Delete Modal */}
      {deleteModalOpen && deleteUserTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-all">
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto animate-fade-in p-0 overflow-hidden border border-red-400/30">
            {/* Close button */}
            <button
              onClick={closeDeleteModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors text-2xl font-bold rounded-full bg-gray-100 hover:bg-red-100 w-9 h-9 flex items-center justify-center shadow"
              aria-label="Close"
              disabled={deleteLoading}
            >
              &times;
            </button>
            {/* Modal Header */}
            <div className="px-8 pt-8 pb-3 border-b border-muted/40 bg-gradient-to-r from-red-100 to-white">
              <h2 className="text-xl font-extrabold text-red-500 drop-shadow">Delete User</h2>
            </div>
            {/* Modal Body */}
            <div className="px-8 py-6 space-y-4">
              <div className="text-primary/90">
                Are you sure you want to delete user <span className="font-bold">{deleteUserTarget.name}</span>?
              </div>
              <div className="text-sm text-primary/60">
                This action cannot be undone.
              </div>
            </div>
            {/* Modal Footer */}
            <div className="px-8 pb-8 pt-3 flex justify-end gap-3 border-t border-muted/40 bg-gradient-to-l from-red-100 to-white">
              <button
                onClick={closeDeleteModal}
                className="px-5 py-2 rounded-lg bg-muted text-primary font-semibold hover:bg-muted/70 transition-all shadow"
                disabled={deleteLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-5 py-2 rounded-lg bg-gradient-to-r from-red-500 to-red-400 text-white font-bold shadow hover:from-red-600 hover:to-red-500 transition-all disabled:opacity-60"
                disabled={deleteLoading}
              >
                {deleteLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
      <table className="w-full text-sm">
            <thead className="bg-muted/40 text-primary/70">
              <tr>
                <th className="text-left px-6 py-4 font-semibold">Name</th>
                <th className="text-left px-6 py-4 font-semibold">Email</th>
                <th className="text-left px-6 py-4 font-semibold">Role</th>
                <th className="text-left px-6 py-4 font-semibold">Created At</th>
                <th className="text-left px-6 py-4 font-semibold">Updated At</th>
                <th className="text-right px-6 py-4 font-semibold">Actions</th>
              </tr> 
            </thead>

            <tbody>
              {userList.map((post) => (
                <tr
                    key={post.id}
                    className="border-t border-muted hover:bg-muted/30 transition"
                >
                    <td className="px-6 py-4 font-medium">{post.name}</td>
                    <td className="px-6 py-4 text-primary/70">{post?.email}</td>
                    <td className="px-6 py-4 text-primary/70">{post.role}</td>
                    <td className="px-6 py-4 text-primary/70">{post.createdAt?.toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-primary/70">{post.updatedAt?.toLocaleDateString()}</td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-4">
                    <button
                      onClick={() => openModal(post)}
                      className="text-sm font-semibold text-accent hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => openDeleteModal(post)}
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

      
    </div>
  )
}
