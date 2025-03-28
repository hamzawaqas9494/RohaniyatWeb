import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

let iconClass =
  "h-5 w-5 flex-shrink-0 text-gray-500 transition duration-75 text-black group-hover:text-white";

const sideNavigation = [
  {
    name: "Dashboard",
    href: "../../../aboutus",
    icon: <img src="/assets/Dashboard.svg" className={iconClass} />,
  },
];

const Sidebar = ({ showSideBar }) => {
  const [activePage, setActivePage] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setActivePage(pathname);
  }, [pathname]);

  return (
    <aside
      id="sidebar"
      className={`${
        !showSideBar && "w-[0px]"
      } transition-width fixed top-0 left-0 z-20 flex h-full w-64 flex-shrink-0 flex-col pt-16 duration-75`}
    >
      <div className="relative flex min-h-0 flex-1 flex-col pt-0">
        <div className="flex flex-1 flex-col overflow-y-auto">
          <div className="flex items-center justify-center bg-gray-750 py-4 divide-y divide-white-200">
            <Link href="/">
              <Image
                width={40}
                height={40}
                alt="Current Gold"
                className="w-16 md:w-20 h-auto"
                src="/assets/logo.png"
              />
            </Link>
          </div>
          <div className="flex-1 bg-gray-750">
            <hr className="w-11/12 mx-auto" />
            <ul className="py-6">
              {sideNavigation.map((item) => (
                <li
                  key={item.name}
                  onClick={() => {
                    router.push(item.href);
                    setActivePage(item.href);
                  }}
                  className={`flex cursor-pointer items-center pl-6 py-4 pr-2 text-base font-normal text-black hover:bg-gray-450 ${
                    activePage === item.href && "bg-gray-450 p-2 text-gray-900"
                  }`}
                >
                  {item.icon}
                  <span className="ml-3 flex-1 whitespace-nowrap">
                    {item.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </aside>
  );
};
export default Sidebar;
