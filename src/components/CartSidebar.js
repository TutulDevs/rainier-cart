import { useContext, useState } from "react";
import AppContext from "../store/AppContext";
import { CardCart } from "./CardCart";
import { Modal } from "./Modal";

export const CartSidebar = ({ show, toggleSidebar }) => {
  const { cartList, clearCart } = useContext(AppContext);

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(0);

  return (
    <>
      <div
        className={`bg-emerald-200 w-full max-w-[400px] h-[100vh] fixed top-0 right-0 p-4 pt-0 flex-col ${
          show ? "flex" : "hidden"
        }`}
      >
        <div className="h-header flex items-center justify-between">
          <h2 className="text-2xl">Cart</h2>

          <button
            type="button"
            className="w-8 h-8 border border-rose-500 text-rose-800 rounded-full hover:shadow"
            aria-label="close sidebar"
            onClick={toggleSidebar}
          >
            X
          </button>
        </div>

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
                <CardCart key={item.id} item={item} idx={idx} />
              ))}
            </ul>

            <div className="text-end text-indigo-800 text-lg font-bold mt-6 border-t border-t-indigo-300">
              Total: $
              {cartList
                .reduce((a, c) => a + c.quantity * c.unit_price, 0)
                .toFixed(2)}
            </div>
          </div>
        )}

        <div className="text-center mt-auto mb-8">
          <button
            type="button"
            className="bg-indigo-500 hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed text-white text-lg w-full px-6 py-4 font-semibold rounded-xl duration-300"
            disabled={!cartList.length}
            onClick={() => setShowModal(true)}
          >
            Checkout
          </button>
        </div>
      </div>

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        {modalContent === 0 ? (
          <>
            <h3 className="text-2xl text-center">Are you sure?</h3>
            <p className="mt-2 mb-3 text-center text-slate-700">
              Items below will be confirmed
            </p>

            <ul>
              <li className="flex items-center justify-between">
                <span className="text-lg font-semibold">Items</span>
                <span className="text-lg font-semibold">Quantity</span>
              </li>

              {cartList.map((el) => (
                <li
                  key={el.id}
                  className="py-1 flex items-center justify-between"
                >
                  <span>{el.name}</span>
                  <span>{el.quantity}</span>
                </li>
              ))}
            </ul>

            <p className="text-lg text-center font-semibold border-t my-4 pt-1">
              Total Price: $
              {cartList
                .reduce((a, c) => a + c.quantity * c.unit_price, 0)
                .toFixed(2)}
            </p>

            <div className="flex items-center justify-center mt-4">
              <button
                className="bg-emerald-600 text-white text-lg py-2 px-4 rounded-xl border border-transparent"
                onClick={() => {
                  clearCart();
                  setModalContent(1);
                }}
              >
                Confirm
              </button>
            </div>
          </>
        ) : modalContent === 1 ? (
          <div className="text-center">
            <h3 className="text-6xl mb-6" aria-label="party icon">
              🎉
            </h3>

            <p className="text-lg">Supply request confirmed!</p>
          </div>
        ) : (
          <p className="text-center">Nothing found!</p>
        )}
      </Modal>
    </>
  );
};
