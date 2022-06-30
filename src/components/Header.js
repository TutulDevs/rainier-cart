import { useContext, useState } from "react";
import AppContext from "../store/AppContext";
import { CartSidebar } from "./CartSidebar";
import GitHubLogo from "../images/github1.png";

export const Header = () => {
  const { cartList } = useContext(AppContext);

  const [showSidebar, setShowSidebar] = useState(false);
  const toggleSidebar = () => setShowSidebar(!showSidebar);

  return (
    <>
      <header className="h-header flex items-center justify-center bg-emerald-200">
        <div className="container px-4 flex gap-3 sm:gap-6 items-center justify-between">
          <h2 className="text-xl sm:text-3xl mr-auto">
            <a href="/">Rainier Dashboard</a>
          </h2>

          <a
            href="https://github.com/TutulDevs/rainier-cart"
            target="_blank"
            rel="noopener noreferrer"
            className="w-7 sm:w-9 h-7 sm:h-9 rounded-full"
            title="GitHub Repository"
          >
            <img src={GitHubLogo} alt="GitHub Repository" />
          </a>

          <button
            type="button"
            className="text-xl sm:text-3xl relative"
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
