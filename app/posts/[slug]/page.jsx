import { db } from "@/app/firebase/config";
import { getDoc, doc } from "firebase/firestore";
import Image from "next/image";
import CommentSection from "@/app/components/CommentSection";

async function getPostBySlug(slug) {
    const docRef = doc(db, "posts", slug);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        console.log("Document not found");
        return null;
    }
}
//TO DO: metada pro každý článek

// export async function generateMetadata({ params }) {
//     const { slug } = await params;
//     const article = await getPostBySlug(slug);

//     if (!article) {
//         return {
//             title: "Post not found",
//             description: "This post doesn't exists.",
//         };
//     }

//     const description = article.description || article.content.substring(0, 150) + "...";

//     return {
//         title: article.title,
//         description,
//         openGraph: {
//             type: "article",
//             url: `https://www.miss-loba.cz/clanky/${slug}`,
//             title: article.title,
//             description,
//             images: [
//                 {
//                     url: article.imgURL,
//                     alt: article.title
//                 }
//             ]
//         },
//         twitter: {
//             card: "summary_large_image",
//             title: article.title,
//             description,
//             images: [article.imgURL]
//         }
//     }
// }

export default async function PostPage({ params }) {
    const { slug } = await params;
    const article = await getPostBySlug(slug);
    if (!article) {
        return <div>Article not found</div>;
    }

    return <>
        <article className="p-4 lg:rounded-lg lg:mt-6 lg:w-[850px] mx-auto bg-gray-100">
            <h2 className="text-3xl font-bold text-gray-900">{article.title}</h2>
            <p className="text-md text-gray-400 mb-5">{article.date} {article.author}</p>
            <div className="h-[300px] relative overflow-hidden mx-auto rounded-lg">
                <Image  
                    src={article.imgURL} 
                    fill
                    className="object-cover object-center" alt="" priority />
            </div>
            <div className="blog-content max-w-prose mx-auto" dangerouslySetInnerHTML={{ __html: article.content }}></div>
        </article>
        <CommentSection slug={slug} />
    </>
}
