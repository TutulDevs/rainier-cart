import { useContext } from "react";
import AppContext from "../store/AppContext";

export const CartSidebar = () => {
  const { cartList } = useContext(AppContext);

  return (
    <div className="bg-emerald-200 w-[384px] h-[100vh] fixed top-0 right-0 p-4 flex flex-col ">
      <h2 className="h-header text-2xl">Cart</h2>

      {cartList.length === 0 ? (
        <p className="text-center mt-16 text-lg">
          You've not added any item in the cart yet!
        </p>
      ) : (
        <div className="">
          <p className="mb-4">List of items you've selected:</p>

          <ul className="">
            <li className="flex items-center justify-between gap-4 text-lg font-semibold text-center">
              <p className="sl text-center">#SL</p>

              <p>Name</p>

              <div className="flex items-center">Quantity</div>

              <p>Price</p>

              <p className="invisible">close</p>
            </li>

            {cartList.map((item, idx) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-4 my-2 text-center text-sm"
              >
                <p className="sl text-center">{idx + 1}</p>

                <p className="flex-1">{item.name}</p>

                <div className="flex items-center w-[86px]">
                  <button
                    type="button"
                    className="w-6 h-6 pb-1 grid place-items-center leading-none bg-white"
                  >
                    {"-"}
                  </button>
                  <p className="px-2">{item.quantity}</p>
                  <button
                    type="button"
                    className="w-6 h-6 pb-1 grid place-items-center leading-none bg-white"
                  >
                    {"+"}
                  </button>
                </div>

                <p>${item.unit_price.toFixed(2)}</p>

                <div className="flex items-center justify-end">
                  <button className="bg-rose-500 text-white px-2 rounded-lg">
                    X
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="text-end text-indigo-800 text-lg font-bold mt-6 border-t border-t-indigo-300">
            Total: ${cartList.reduce((a, c) => a + c.unit_price, 0).toFixed(2)}
          </div>
        </div>
      )}

      <div className="text-center mt-auto mb-8">
        <button
          type="button"
          className="bg-indigo-500 text-white text-lg w-full px-6 py-4 font-semibold rounded-xl"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};
