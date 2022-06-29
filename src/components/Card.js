import { useContext } from "react";
import AppContext from "../store/AppContext";

export const Card = ({ item }) => {
  const { addToCart } = useContext(AppContext);

  return (
    <div className="bg-emerald-100 w-[400px] rounded-lg p-4 flex gap-4">
      <div className="w-24 h-24 bg-indigo-300 rounded" />

      <div className="flex-1">
        <h3 className="text-xl font-semibold text-ellipsis overflow-hidden mb-1">
          {item.name}
        </h3>

        <p>{item.description}</p>

        <div className="mt-4 flex gap-2">
          <a
            href={`/${item.id}`}
            className="px-4 py-1 rounded-xl text-white font-semibold bg-indigo-500"
          >
            Details
          </a>

          <button
            type="button"
            className="px-4 py-1 rounded-xl text-white font-medium bg-emerald-600"
            onClick={() => addToCart(item.id)}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};
