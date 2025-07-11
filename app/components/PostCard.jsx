import Link from 'next/link'
import Image from 'next/image'

const PostCard = ({ title, description, slug, img }) => {
    const buttonStyle =
        "hover:bg-orange-300 bg-orange-400 transition-transform duration-200 hover:scale-105 text-white  py-1 px-3 rounded-md font-sans cursor-pointer";

    return (
        <div className="border-2 border-gray-200 rounded-md h-96 w-80 overflow-hidden">
            <div className="w-full h-40 mb-3 overflow-hidden">
                <Image
                    src={img}
                    alt=""
                    width={400}
                    height={400}
                    className="object-cover"
                />
            </div>
            <div className="flex flex-col h-52 justify-between pt-2 px-2 ">
                <div className="h-48">
                    <h3 className="leading-tight h-16 text-lg font-bold py-2">{title}</h3>
                    <p className="text-gray-700 h-20 leading-tight">{description}</p>
                </div>
                <Link prefetch={false} href={`/posts/${slug}`} className=' w-fit mb-3'>
                    <button className={buttonStyle} aria-label={`Read post: ${title}`}>
                        <div className="flex flex-row justify-center">
                            <span>Read </span>
                            <div className="w-6 ml-2 transform translate-y-[2px]">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path
                                        d="m18.707 12.707-3 3a1 1 0 0 1-1.414-1.414L15.586 13H6a1 1 0 0 1 0-2h9.586l-1.293-1.293a1 1 0 0 1 1.414-1.414l3 3a1 1 0 0 1 0 1.414z"
                                        className="fill-white"
                                        data-name="Right"
                                    />
                                </svg>
                            </div>
                        </div>
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default PostCard