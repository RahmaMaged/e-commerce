"use client";
import Link from "next/link";

import logo from "@/images/freshcart-logo.svg";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useContext, useState } from "react";
import { cartContext } from "@/providers/cartContextProvider";
import { Badge } from "@/components/ui/badge";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const session = useSession();

  let data: any = useContext(cartContext);

  const [menuOpen, setMenuOpen] = useState(false);

  function handleLogout() {
    signOut({ redirect: true, callbackUrl: "/login" });
  }
  return (
    <>
      <nav className="bg-emerald-300 flex justify-between items-center p-5 text-emerald-900">
        <div className="flex gap-2 items-center">
          <Image src={logo} alt="logo" />

          <ul className="hidden md:flex items-center gap-3 font-bold text-lg">
            <li>
              <Link href={"/"}>Home</Link>
            </li>

            <li>
              <Badge className="bg-emerald-400 text-black">
                {data.numOfCartItems}
              </Badge>

              <Link href={"/cart"}>Cart</Link>
            </li>

            <li>
              <Link href={"/brands"}>Brands</Link>
            </li>

            <li>
              <Link href={"/categories"}>Categories</Link>
            </li>

            <li>
              <Link href={"/wishlist"}>Wish List</Link>
            </li>
          </ul>
        </div>

        <ul className="hidden md:flex items-center gap-3 font-bold text-lg justify-end">
          {session.data ? (
            <li>
              <button className="cursor-pointer" onClick={handleLogout}>
                Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link href={"/login"} className="cursor-pointer">
                  Login
                </Link>
              </li>

              <li>
                <Link href={"/signup"} className="cursor-pointer">
                  Signup
                </Link>
              </li>
            </>
          )}
        </ul>

        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-emerald-900 focus:outline-none"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="md:hidden py-3 px-8 bg-emerald-300 text-emerald-900">
          <ul className="flex flex-col gap-3 font-bold text-lg">
            <li>
              <Link href={"/"} onClick={() => setMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li className="flex items-center gap-1">
              <Badge className="bg-emerald-400 text-black">
                {data.numOfCartItems}
              </Badge>
              <Link href={"/cart"} onClick={() => setMenuOpen(false)}>
                Cart
              </Link>
            </li>
            <li>
              <Link href={"/brands"} onClick={() => setMenuOpen(false)}>
                Brands
              </Link>
            </li>
            <li>
              <Link href={"/categories"} onClick={() => setMenuOpen(false)}>
                Categories
              </Link>
            </li>
            <li>
              <Link href={"/wishlist"} onClick={() => setMenuOpen(false)}>
                Wish List
              </Link>
            </li>
            {session.data ? (
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            ) : (
              <>
                <li>
                  <Link href={"/login"} onClick={() => setMenuOpen(false)}>
                    Login
                  </Link>
                </li>
                <li>
                  <Link href={"/signup"} onClick={() => setMenuOpen(false)}>
                    Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </>
  );
}
