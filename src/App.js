import { useContext } from "react";
import { Card } from "./components/Card";
import { Header } from "./components/Header";
import AppContext from "./store/AppContext";

function App() {
  const { isLoading, productList } = useContext(AppContext);

  return (
    <>
      <Header />

      <main className="min-h-main">
        {isLoading ? (
          <h2 className=" p-4 animate-pulse text-3xl">Loading...</h2>
        ) : (
          <div className="container mx-auto flex flex-wrap gap-4 px-4 py-8">
            {productList.length > 0 &&
              productList.map((item) => <Card key={item.id} item={item} />)}
          </div>
        )}
      </main>
    </>
  );
}

export default App;
