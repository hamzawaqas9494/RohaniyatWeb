import React from "react";
import Link from "next/link";

const Footer = () => {
  const curYear = new Date().getFullYear();

  return (
    <footer className="min-h-[10vh] flex items-center justify-center w-full fixed bottom-0 bg-[#6C472D]">
      <p className="text-white text-lg">
        © {curYear}{" "}
        <Link href="/" className="hover:underline font-bold">
          Rohaniyat
        </Link>
        . All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
