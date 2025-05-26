"use client";

import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ProfileDropdown() {
  const router = useRouter();

  const handleSignOut = () => {
    localStorage.removeItem("loggedIn");
    router.push("/"); // Redirect to login
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="rounded-full flex">
        <Image
          width={48}
          height={48}
          className="h-12 w-12 rounded-full object-cover"
          src="/assets/images/logo.jpg"
          alt="User"
        />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 w-40 sm:w-48 bg-white border border-[#6C472D] focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <a
                href="#"
                className={`block p-1 md:p-2 text-sm text-[#6C472D] ${
                  active ? "bg-[#6C472D] text-white" : "text-[#6C472D]"
                }`}
              >
                Account settings
              </a>
            )}
          </Menu.Item>

          <Menu.Item>
            {({ active }) => (
              <button
                onClick={handleSignOut}
                className={`block p-1 md:p-2 text-sm w-full text-left text-[#6C472D] ${
                  active ? "bg-[#6C472D] text-white" : "text-[#6C472D]"
                }`}
              >
                Sign out
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
