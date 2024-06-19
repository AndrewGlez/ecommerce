import { BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import ProductProvider from "./Context/ProductContext";
import { UserProvider } from "./Context/UserContext";
import "./index.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <ProductProvider>
            <Home />
          </ProductProvider>
        </UserProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
