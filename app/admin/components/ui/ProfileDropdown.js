import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Image from "next/image";
export default function ProfileDropdown() {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="rounded-full flex">
        {/* <Image
         width={8}
         height={8}
          className="h-12 w-12 rounded-full"
          src="/public/uploads/1744112153010-activitylog.JPG"
          alt="User"
        /> */}
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
        <Menu.Items className="absolute right-0 z-10  w-40 sm:w-48 bg-white  focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <a
                href="#"
                className={`block p-1 md:p-2 text-sm ${
                  active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                }`}
              >
                Account settings
              </a>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                type="submit"
                className={`block p-1 md:p-2 text-sm w-full text-left ${
                  active ? "bg-gray-100 text-gray-900" : "text-gray-700"
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
