"use client";

import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="py-12 text-center bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-transparent border-t border-gray-700">
      <div className="max-w-5xl mx-auto px-6">
        <h3 className="text-3xl font-bold mb-4">
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent flex items-center justify-center">
            <Link href="/">
              <Image
                src="/logo-text.png"
                alt="Pixxel logo"
                className="min-w-24 object-cover"
                width={96}
                height={24}
              />
            </Link>
          </span>
        </h3>

        <p className="text-gray-300 mb-8">
          Transform your images into stunning visuals — powered by AI.
        </p>

        <div className="flex justify-center space-x-6 mb-8 text-gray-400">
          <Link href="/features" className="hover:text-cyan-400  transition">
            Features
          </Link>
          <Link href="/pricing" className="hover:text-cyan-400  transition">
            Pricing
          </Link>
        </div>

        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Pixxel. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
