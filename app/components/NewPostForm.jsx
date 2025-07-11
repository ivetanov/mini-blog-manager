"use client"
import { useForm } from "react-hook-form"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc } from "firebase/firestore";
import { db, storage } from "@/app/firebase/config";
import { useState } from "react";
import { setDoc } from "firebase/firestore";

export default function NewPostForm() {

    const { handleSubmit, register, reset } = useForm();

    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleImageUpload = async () => {
        if (!image) return;
        const imageRef = await ref(storage, `posts/${image.name}`);
        try {
            await uploadBytes(imageRef, image); //uloží obrázek do storage
            const url = await getDownloadURL(imageRef); // získá na něj odkaz
            return url;
        } catch (error) {
            console.error("error while uploading image", error);
            alert("something went wrong while image uploading");
            return null;
        }
    };

    const PublishPost = async (data) => {
        setLoading(true);
        const imgUrl = await handleImageUpload();
        try {
            await setDoc(doc(db, "posts", data.slug), {
                ...data,
                imgURL: imgUrl,
                id: data.slug,
            });
            alert("The post was successfully added!");
        } catch (error) {
            console.error("error while adding post:", error);
            alert("Something went wrong while adding the post.");
        }
        setLoading(false);
        reset();
    };

    return (
        <div>
            <form onSubmit={handleSubmit(PublishPost)} className="m-8 flex flex-col items-center gap-6">
                <div className="flex flex-col lg:flex-row w-full gap-6">
                    <div className="w-full lg:w-1/2 flex flex-col gap-3">
                        <input className="bg-gray-200 text-gray-500 rounded-sm pl-2" {...register("title")} placeholder="title" />
                        <input className="bg-gray-200 text-gray-500 rounded-sm pl-2" {...register("description")} placeholder="description" />
                        <input className="bg-gray-200 text-gray-500 rounded-sm pl-2" {...register("author")} placeholder="author" />
                        <input className="bg-gray-200 text-gray-500 rounded-sm pl-2" {...register("date")} placeholder="2.7.2025" />
                        <input className="bg-gray-200 text-gray-500 rounded-sm pl-2" {...register("slug")} placeholder="slug" />
                        <input className="bg-gray-200 text-gray-500 rounded-sm pl-2 w-fit" type="file" onChange={handleFileChange} />
                    </div>
                    <div className="w-full lg:w-1/2 flex flex-col gap-3">
                        <textarea className="bg-gray-200 text-gray-500 rounded-sm pl-2 h-64" {...register("content")} placeholder="content" />
                    </div>
                </div>
                <button
                    className="bg-red-400 hover:bg-red-300 cursor-pointer w-fit rounded-sm p-2 text-white"
                    disabled={loading}
                    type="submit"
                >
                    {loading ? "Publishing..." : "Publish Post"}
                </button>
            </form>
        </div>
    )
}