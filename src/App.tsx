import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import { CartProvider } from "./context/CartContext";
import About from "./pages/About";
import Home from "./pages/Home";
import Store from "./pages/Store";

function App() {
  return (
    <CartProvider value={{}}>
      <Navbar />
      <Container className="mb-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Container>
    </CartProvider>
  );
}

export default App;
