"use client"
import { useState } from "react"
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth"
import { auth } from "../firebase/config"
import { useRouter } from "next/navigation"

const SignInPage = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()

    const [signInWithEmailAndPass] = useSignInWithEmailAndPassword(auth)

    const handleSignUp = async (e) => {
        e.preventDefault()
        try {
            const res = await signInWithEmailAndPass(email, password);

            if (!res) {
                console.error("Přihlášení se nezdařilo");
                return;
            }

            setEmail("");
            setPassword("");
            sessionStorage.setItem("user", true)
            router.push("/admin");

        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                <h1 className="text-2xl font-bold text-center mb-4 text-gray-400">Sign-in</h1>
                <form onSubmit={handleSignUp} className="flex flex-col space-y-3">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                        className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 text-gray-400"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                        className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 text-gray-400"
                    />
                    <button
                        type="submit"
                        className="bg-red-400 text-white py-2 rounded-md hover:bg-red-300 transition cursor-pointer"
                    >
                        Sign-in
                    </button>
                </form>
            </div>
        </div>
    )
}

export default SignInPage
