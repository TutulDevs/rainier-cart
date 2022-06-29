import { useContext } from "react";
import { Card } from "./components/Card";
import { Header } from "./components/Header";
import AppContext from "./store/AppContext";
import { CartSidebar } from "./components/CartSidebar";

function App() {
  const { isLoading, productList } = useContext(AppContext);

  return (
    <>
      <Header />

      <main className="min-h-main ">
        {isLoading ? (
          <h2 className=" p-4 animate-pulse text-3xl">Loading...</h2>
        ) : (
          <>
            {/* items display */}
            <div className="rounded-tr-lg w-cardContainer flex flex-wrap gap-3 p-4">
              {productList.length > 0 &&
                productList.map((item) => <Card key={item.id} item={item} />)}
            </div>

            {/* cart display */}
            <CartSidebar />
          </>
        )}
      </main>
    </>
  );
}

export default App;
