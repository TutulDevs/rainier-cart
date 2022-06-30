import React, { useCallback, useEffect, useState } from "react";

// context
export const AppContext = React.createContext({
  isLoading: false,
  productList: [],
  cartList: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
});

// provider
export const AppProvider = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [productList, setProductList] = useState([]);
  const [cartList, setCartList] = useState([]);

  const getProducts = useCallback(async () => {
    try {
      setIsLoading(true);

      const productListRes = await fetch(
        "https://fec-inventory-api.herokuapp.com/product-info"
      );
      const inventoryListRes = await fetch(
        "https://fec-inventory-api.herokuapp.com/inventory-info"
      );

      const productListData = await productListRes.json();
      const inventoryListData = await inventoryListRes.json();

      const newInventoryListData = inventoryListData.map((el) => {
        let invIdx = el.id;

        delete el.id;

        return { inventory_id: invIdx, ...el };
      });

      const mergedProducts = productListData.map((el_product) => ({
        ...el_product,
        ...newInventoryListData.find((t2) => t2.product_id === el_product.id),
      }));

      // this is for test purpose, remove after testing
      mergedProducts.length = 10;

      setProductList(mergedProducts);

      setIsLoading(false);
    } catch (err) {
      alert("Error fetching data!");
      setIsLoading(false);
    }
  }, []);

  // fetch data
  useEffect(() => {
    getProducts();
  }, [getProducts]);

  // console.log(productList);
  // console.log(cartList);

  // add to cart
  const addToCart = (id) => {
    // get the object from the products
    // add it to cart array w/ quantity
    // remove from product array

    const obj = productList.find((el) => el.id === id);

    setCartList((prev) => [...prev, { ...obj, quantity: 1 }]);

    const newProductList = productList.filter((el) => el.id !== id);

    setProductList(newProductList);
  };

  // remove from cart
  const removeFromCart = (id) => {
    // get the item obj from cart
    // add to productList
    // remove it from cartList

    const obj = cartList.find((el) => el.id === id);

    setProductList((prev) => [...prev, { ...obj, quantity: 0 }]);

    const newCartList = cartList.filter((el) => el.id !== id);

    setCartList(newCartList);
  };

  // clear all cart
  const clearCart = () => {
    // make all cart data with quantity 0
    // merge cart array to product list
    // empty cart array

    if (cartList.length === 0) {
      alert("You do not have any item in the cart!");
    } else {
      const newCartList = cartList.map((el) => ({ ...el, quantity: 0 }));

      setProductList((prev) => [...prev, ...newCartList]);

      cartList.length = 0;
    }
  };

  // increase quantity
  const increaseQuantity = (id, step = 1) => {
    // check if the quantity is exceeding than the quantity in the inventory
    // update the obj, push it to the cart array

    const newCartList = cartList.map((el) => {
      if (el.id === id) {
        const nextQuantity = el.quantity + step;

        if (el.qty < nextQuantity) {
          alert("Inventory does not have enough products to delivery.");
          return el;
        } else return { ...el, quantity: el.quantity + step };
      } else return el;
    });

    setCartList(newCartList);
  };

  // decrease quantity
  const decreaseQuantity = (id, step = 1) => {
    // check if the present quantity is 1, remove item from cart
    // else the obj, push it to the cart array

    const obj = cartList.find((el) => el.id === id);
    const nextQuantity = obj.quantity - step;

    if (nextQuantity < 1) {
      removeFromCart(id);
    } else {
      const newCartList = cartList.map((el) =>
        el.id === id ? { ...el, quantity: el.quantity - step } : el
      );

      setCartList(newCartList);
    }
  };

  return (
    <AppContext.Provider
      value={{
        isLoading,
        productList,
        cartList,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
