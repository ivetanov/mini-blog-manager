import Link from "next/link";

const Header = () => {
    return (
        <div className="bg-black text-white h-14 flex flex-row justify-around md:justify-between items-center px-0 md:px-32">
            <Link href="/">
                <h1 className="text-2xl">AI Meals 🥘</h1>
            </Link>
            <Link href="/admin">
                <p className="text-md">admin</p>
            </Link>

        </div>
    );
};

export default Header;