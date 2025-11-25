import {Outlet} from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useCart } from '../context/CartContext';

function Layout() {
  const { getItemCount } = useCart();
  
  return (
    <>
      <header>
        <Navbar cartItemCount={getItemCount()} />
      </header>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
export default Layout;