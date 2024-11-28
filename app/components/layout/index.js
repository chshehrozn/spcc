"use client";
import { useState, useRef, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";
import LoadingBar from "react-top-loading-bar";

function Layout({ loading, title, children }) {
  const loadingBarRef = useRef(null);
  const [openSidebar, setOpenSidebar] = useState(false);
  useEffect(() => {
    if (loading) {
      loadingBarRef.current?.continuousStart();
    } else {
      loadingBarRef.current?.complete();
    }
  }, [loading]);

  return (
    <main className="w-full h-full">
      <div>
        <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
        <div className="lg:pl-72-">
          <Header
            openSidebar={openSidebar}
            setOpenSidebar={setOpenSidebar}
            title={title}
          />
          <LoadingBar color="#1cbdf9" ref={loadingBarRef} />
          <main style={{ minHeight: "calc(100vh - 135px)" }}>{children}</main>
          <Footer />
        </div>
      </div>
    </main>
  );
}

export default Layout;
