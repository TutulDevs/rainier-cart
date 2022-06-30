import { useContext } from "react";
import AppContext from "../store/AppContext";

export const CardCart = ({ item, idx }) => {
  const { removeFromCart, increaseQuantity, decreaseQuantity } =
    useContext(AppContext);

  return (
    <li
      key={item.id}
      className="flex items-center justify-between gap-2 my-2 text-center text-sm"
    >
      <p className="text-center font-bold">{idx + 1}</p>

      <p className="flex-1">{item.name}</p>

      <div className="flex items-center w-[86px] font-semibold">
        <button
          type="button"
          className="w-6 h-6 pb-1 grid place-items-center leading-none bg-white hover:bg-rose-300 hover:text-white duration-150 text-lg"
          onClick={() => decreaseQuantity(item.id)}
        >
          {"-"}
        </button>
        <p className="px-2">{item.quantity}</p>
        <button
          type="button"
          className="w-6 h-6 pb-1 grid place-items-center leading-none bg-white hover:bg-emerald-600 hover:text-white duration-150 text-lg"
          onClick={() => increaseQuantity(item.id)}
        >
          {"+"}
        </button>
      </div>

      <p>${(item.quantity * item.unit_price).toFixed(2)}</p>

      <div className="flex items-center justify-end">
        <button
          className="bg-rose-500 hover:bg-transparent border border-rose-500 text-white hover:text-rose-500 duration-150 px-2 rounded-lg"
          onClick={() => removeFromCart(item.id)}
        >
          X
        </button>
      </div>
    </li>
  );
};
