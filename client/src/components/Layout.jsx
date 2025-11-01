import {Outlet} from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout({cartItemCount}) {
  return (
    <>
      <header>
        <Navbar cartItemCount={cartItemCount} />
      </header>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
export default Layout;