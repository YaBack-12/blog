import { getSession } from '@/actions/AuthActions';
import Link from 'next/link'

const inputsNave = async () => {
    const session = await getSession();

    return (
        <div>
            {!session ? (
                <div className="flex gap-4">
                    <Link href="/login">Login</Link>
                    <Link href="/signup">Sign up</Link>
                </div>
            ) : (
                <div className="flex gap-4 items-center">
                    <Link href="/dashboard">Dashboard</Link>

                    <form >
                        <button
                        type="submit"
                        className="text-red-600 hover:underline"
                        >
                            Logout
                        </button>
                    </form>
                </div>
            )}
        </div>
    )
}

export default inputsNave