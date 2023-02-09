import React from "react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
    return (
        <header className="flex w-full items-center p-4 justify-between">

            <div className={"relative w-[60%] h-10"}>
                <Link href={"/"}>
                    <Image src={"/Header_New.svg"} alt="" fill={true}/>
                </Link>
            </div>

            <nav className="space-x-4">
                <a href="/">Work</a>
                <a href="/">Contact</a>
            </nav>
        </header>
    );
};

export default Header;
