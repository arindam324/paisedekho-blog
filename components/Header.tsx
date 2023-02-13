import React from "react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex w-full items-center p-4 pb-6 justify-between">
      <div className={"relative md:w-full w-[80%] h-16"}>
        <Link href={"/"}>
          <Image src={"/Header_New.svg"} alt="" fill={true} />
        </Link>
      </div>
    </header>
  );
};

export default Header;
