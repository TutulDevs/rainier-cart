import React, { useCallback, useEffect, useState } from "react";

// context
export const AppContext = React.createContext({
  isLoading: false,
  productList: [],
  cartList: [],
  addToCart: () => {},
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

  // add to cart
  const addToCart = (id) => {
    // get the object from the products
    // add it to cart array w/ quantity
    // remove from product array

    let obj = productList.find((el) => el.id === id);

    setCartList((prev) => [...prev, { ...obj, quantity: 1 }]);

    const newProductList = productList.filter((el) => el.id !== id);

    setProductList(newProductList);
  };

  // remove from cart

  return (
    <AppContext.Provider
      value={{
        isLoading,
        productList,
        cartList,
        addToCart,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
