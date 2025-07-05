"use client";
import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const MainLayout = ({ children }) => {
  const [showSideBar, setShowSideBar] = useState(true);

  return (
    <>
      <Navbar handleSideBarStatus={() => setShowSideBar(!showSideBar)} />
      <main>
        <div className="flex min-h-[84vh] sm:min-h-[80vh]">
          <Sidebar showSideBar={showSideBar} />
          <div
            className={`relative h-full w-full transition-all duration-300 bg-[#EFEADF] min-h-[84vh] sm:min-h-[80vh] p-2 md:px-4 md:py-8 ${
              showSideBar ? "lg:ml-64" : "lg:ml-0"
            }`}
          >
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
