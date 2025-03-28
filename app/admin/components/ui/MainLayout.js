"use client";
import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const MainLayout = ({ children }) => {
  const [showSideBar, setShowSideBar] = useState(true);

  return (
    <main>
      <Navbar handleSideBarStatus={() => setShowSideBar(!showSideBar)} />
      <div className="flex bg-gray-50 pt-16">
        <Sidebar showSideBar={showSideBar} />
        <div
          className={`relative h-full w-full bg-gray-50 transition-all duration-300 ${
            showSideBar ? "lg:ml-64" : "lg:ml-0"
          }`}
        >
          {children}
          <Footer />
        </div>
      </div>
    </main>
  );
};

export default MainLayout;
