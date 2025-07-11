"use client"
import { useState, useEffect } from "react"
import { collection, getDocs, query, addDoc } from "firebase/firestore"
import { db } from "@/app/firebase/config"
import { useForm } from "react-hook-form"

async function getComments(postSlug) {
    const q = query(collection(db, "posts", postSlug, "comments"))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }))
}

async function addComment(comment, slug) {
    try {
        await addDoc(collection(db, "posts", slug, "comments"), {
            ...comment
        })
        alert("Comment was successfully added!")
    } catch (error) {
        alert("Error adding comment:", error)
    }
}

export default function CommentSection({ slug }) {
    const [showAll, setShowAll] = useState(false)
    const [comments, setComments] = useState([])
    const [showForm, setShowForm] = useState(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm()

    const onSubmit = (data) => {
        const handleAddComment = async () => {
            await addComment(data, slug)
            const updatedComments = await getComments(slug)
            setComments(updatedComments)
            reset()
            setShowForm(false)
        }
        handleAddComment()
    }

    useEffect(() => {
        async function fetchComments() {
            const data = await getComments(slug)
            setComments(data)
        }
        fetchComments()
    }, [slug])

    return (
        <section className="p-4 lg:rounded-lg mt-6 lg:w-[850px] mx-auto bg-gray-100">
            <h4 className="text-lg mb-4 ml-4">{(comments.length > 0) ? "comments" : "no comments have been added yet"}</h4>
            <div className="space-y-3">
                {(showAll ? comments : comments.slice(0, 1)).map((comment) => (
                    <div key={comment.id} className="bg-white p-4 rounded shadow-sm">
                        <p className="font-medium">{comment.userName}</p>
                        <p className="text-gray-700">{comment.comment}</p>
                    </div>
                ))}

                {comments.length > 1 && (
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="text-sm text-blue-600 hover:underline"
                    >
                        {showAll ? "Hide comments" : "See more comments"}
                    </button>
                )}
            </div>

            {!showForm ? (
                <button
                    onClick={() => setShowForm(true)}
                    className="mt-6 px-4 py-2 bg-orange-400 text-white rounded hover:bg-orange-300 transition"
                >
                    Add a comment
                </button>
            ) : (
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="mt-6 bg-white p-4 rounded shadow space-y-4"
                >
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            {...register("userName", { required: "Zadej své jméno" })}
                            className="w-full mt-1 border border-gray-300 p-2 rounded"
                        />
                        {errors.userName && (
                            <p className="text-red-600 text-sm mt-1">
                                {errors.userName.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Comment
                        </label>
                        <textarea
                            {...register("comment", { required: "Komentář nesmí být prázdný" })}
                            className="w-full mt-1 border border-gray-300 p-2 rounded"
                            rows={4}
                        />
                        {errors.comment && (
                            <p className="text-red-600 text-sm mt-1">{errors.comment.message}</p>
                        )}
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-orange-400 text-white rounded hover:bg-orange-300"
                        >
                            Send comment
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowForm(false)}
                            className="text-gray-600 hover:underline text-sm"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}
        </section>
    )
}
