"use client"
import { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../firebase/config"
import { useRouter } from "next/navigation"
import { signOut } from "firebase/auth"
import NewPostForm from "../components/NewPostForm";

const AdminPage = () => {

    const [user] = useAuthState(auth)
    const router = useRouter()

    useEffect(() => {
        if (!user) {
            router.push("/sign-in")
        }
    }, [user, router])

    if (!user) {
        return null
    }

    return (
        <div className="min-h-screen mx-10 shadow-xl mt-6 w-auto pb-6 rounded-xl">
            <div className="flex flex-row">
                <div className="text-sm sm:text-base h-1/2 w-fit px-3 cursor-pointer whitespace-nowrap transition-all duration-200 shadow-top-sm font-medium text-black">
                    add new post
                </div>
            </div>
            <NewPostForm />
            <div>
                <button className="text-red-600 ml-8 cursor-pointer" onClick={() => signOut(auth)}>Log out</button>
            </div>
        </div>
    )
}

export default AdminPage
