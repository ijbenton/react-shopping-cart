import React from "react";
import { Button, Stack } from "react-bootstrap";

import { useCart } from "../context/CartContext";
import storeItems from "../data/items.json";
import { formatCurrency } from "../utils/currency";

type CartItemProps = {
  id: number;
  quantity: number;
};

const CartItem = ({ id, quantity }: CartItemProps) => {
  const { removeFromCart } = useCart();
  const item = storeItems.find((i) => i.id === id);
  if (item == null) return null;

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={item.imgUrl}
        height="75"
        width="125"
        style={{ objectFit: "cover" }}
      />
      <div className="me-auto">
        <div>
          {item.name}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: ".65rem" }}>
              {" "}
              x{quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: ".75rem" }}>
          {formatCurrency(item.price)}
        </div>
      </div>
      <div className="ms-auto">
        <div>{formatCurrency(item.price * quantity)}</div>
      </div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeFromCart(id)}
      >
        &times;
      </Button>
    </Stack>
  );
};

export default CartItem;
