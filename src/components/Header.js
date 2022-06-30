import { useContext, useState } from "react";
import AppContext from "../store/AppContext";
import { CartSidebar } from "./CartSidebar";

export const Header = () => {
  const { cartList } = useContext(AppContext);

  const [showSidebar, setShowSidebar] = useState(false);
  const toggleSidebar = () => setShowSidebar(!showSidebar);

  return (
    <>
      <header className="h-header flex items-center justify-center bg-emerald-200">
        <div className="container px-4 flex items-center justify-between">
          <h2 className="text-3xl">
            <a href="/">Rainier Dashboard</a>
          </h2>

          <button
            type="button"
            className="text-3xl relative"
            aria-label="open cart"
            onClick={toggleSidebar}
          >
            🛒
            <span className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 px-2 rounded-xl text-sm text-white font-semibold bg-rose-500">
              {cartList.length}
            </span>
          </button>
        </div>
      </header>

      <CartSidebar show={showSidebar} toggleSidebar={toggleSidebar} />
    </>
  );
};
