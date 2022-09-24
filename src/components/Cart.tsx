import { Offcanvas, Stack } from "react-bootstrap";

import { useCart } from "../context/CartContext";
import storeItems from "../data/items.json";
import { formatCurrency } from "../utils/currency";
import CartItem from "./CartItem";

type CartProps = {
  isOpen: boolean;
};

const Cart = ({ isOpen }: CartProps) => {
  const { closeCart, cartItems } = useCart();
  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
          <div className="ms-auto fw-bold fs-5">
            Total{" "}
            {formatCurrency(
              cartItems.reduce((total, item) => {
                const storeItem = storeItems.find((i) => i.id === item.id);

                return item.quantity * (storeItem?.price ?? 0) + total;
              }, 0)
            )}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Cart;
