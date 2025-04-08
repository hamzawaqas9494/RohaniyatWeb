import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function ProfileDropdown() {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="rounded-full flex">
        <img
          className="h-12 w-12 rounded-full"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
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
