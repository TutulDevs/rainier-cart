import { useContext, useState } from "react";
import AppContext from "../store/AppContext";
import { Modal } from "./Modal";

export const Card = ({ item }) => {
  const { addToCart } = useContext(AppContext);

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="bg-emerald-100 w-full max-w-auto md:max-w-[400px] rounded-lg p-4 flex flex-col sm:flex-row gap-4">
        <div className="w-24 h-24 bg-indigo-300 rounded" />

        <div className="flex-1">
          <h3 className="text-xl font-semibold text-ellipsis overflow-hidden mb-1">
            {item.name}
          </h3>

          <p>{item.description}</p>

          <div className="mt-4 flex gap-2">
            <button
              type="button"
              className="px-4 py-1 rounded-xl text-white font-semibold bg-indigo-500"
              onClick={() => setShowModal(true)}
            >
              Details
            </button>

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

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <h2 className="text-xl font-semibold">{item.name}</h2>
        <p className="mt-1">
          <span className="font-semibold">Category:</span> {item.category}
        </p>
        <p className="mt-1">
          <span className="font-semibold">Price:</span> $
          {item.unit_price.toFixed(2)}
        </p>
        <p className="mt-1">
          <span className="font-semibold">Manufacturer:</span>{" "}
          {item.manufacturer}
        </p>
        <p className="mt-1">
          <span className="font-semibold">Supplier:</span>{" "}
          <a
            href={`mailto:${item.supplier_contact}`}
            className="text-indigo-600"
          >
            {item.supplier_name}
          </a>{" "}
        </p>

        <p className="mt-1 font-semibold">
          Note: <small className="font-normal">{item.note}</small>
        </p>

        <div className="text-center mt-4">
          <button
            type="button"
            className="px-4 py-2 rounded-lg text-white font-medium bg-emerald-600"
            onClick={() => addToCart(item.id)}
          >
            Add To Cart
          </button>
        </div>
      </Modal>
    </>
  );
};
