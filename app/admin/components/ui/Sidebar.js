import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

let iconClass = "h-5 w-5 flex-shrink-0 transition duration-75";

// ✅ Set proper paths here
const sideNavigation = [
  {
    name: "Dashboard",
    href: "/",
    icon: (
      <Image
      height={8}
      width={8}
        src="/assets/images/bookicon.png"
        className={iconClass}
        alt="Dashboard Icon"
      />
    ),
  },
  {
    name: "Enter_Blog",
    href: "/enter_blog",
    icon: (
      <Image
       height={8}
       width={8}
        src="/assets/images/bookicon.png"
        className={iconClass}
        alt="Dashboard Icon"
      />
    ),
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
      className={`${
        showSideBar ? "-ml-64 lg:ml-0" : "lg:-ml-64"
      } h-[85vh] transition-all fixed left-0 z-20 w-64 flex flex-shrink-0 flex-col duration-300 bg-[#6C472D]`}
    >
      <div className="relative flex min-h-0 flex-1 flex-col pt-0">
        <div className="flex flex-1 flex-col overflow-y-auto">
          <div className="flex items-center justify-center py-2  border-b-2 border-[#EFEADF]">
            <div className="flex items-center justify-center w-35 h-35 bg-[#EFEADF] rounded-full">
              <Link href="/">
                <Image
                  width={100}
                  height={100}
                  alt="Logo"
                  className="w-16 md:w-20 h-auto"
                  src="/assets/images/main-logo.png"
                />
              </Link>
            </div>
          </div>

          <ul className="py-2">
            {sideNavigation.map((item) => (
              <li
                key={item.name}
                onClick={() => {
                  router.push(item.href);
                }}
                className={`flex cursor-pointer items-center pl-6 py-2 text-base font-semibold hover:bg-[#EFEADF] transition-colors duration-200 ${
                  activePage === item.href
                    ? "bg-[#EFEADF] text-[#6C472D]"
                    : "text-[#EFEADF] hover:text-[#6C472D]"
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
    </aside>
  );
};

export default Sidebar;
