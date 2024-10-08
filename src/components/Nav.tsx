"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  signIn,
  signOut,
  useSession,
  getProviders,
  LiteralUnion,
  ClientSafeProvider,
} from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers/index";

function Nav() {
  const { data: session } = useSession();
  const [toggleDropDown, setToggleDropDown] = useState(false);
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    fetchProviders();
  }, []);

  return (
    <nav className="flex-between w-full pb-4 pt-3 bg-white">
      <Link href={"/"} className="flex gap-2 flex-center">
        <Image
          src={"/assets/images/logo.svg"}
          alt="Logo"
          width={30}
          height={30}
          className="object-contain ml-4"
        />
        <p className="logo_text">Post It</p>
      </Link>
      <div className="hidden sm:flex">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href={"/create-new"} className="black_btn">
              Create Post
            </Link>

            <button
              type="button"
              onClick={() => signOut()}
              className="outline_btn"
            >
              Sign Out
            </button>

            <Link href={"/profile"}>
              <Image
                src={session?.user.image as string}
                alt="profile"
                width={37}
                height={37}
                className="rounded-full mr-5"
              ></Image>
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn mr-5"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image as string}
              alt="profile"
              width={37}
              height={37}
              className="rounded-full mr-5"
              onClick={() =>
                setToggleDropDown((toggleDropDown) => !toggleDropDown)
              }
            ></Image>
            {toggleDropDown && (
              <div className="dropdown">
                <Link
                  href={"/profile"}
                  className="dropdown_link text-center w-full"
                  onClick={() => setToggleDropDown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href={"/create-new"}
                  className="dropdown_link text-center w-full"
                  onClick={() => setToggleDropDown(false)}
                >
                  Create Post
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    signOut();
                    setToggleDropDown(false);
                  }}
                  className="w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn py-5"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
}

export default Nav;
