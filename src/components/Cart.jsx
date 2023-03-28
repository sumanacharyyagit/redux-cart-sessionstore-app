import React from "react";

import { AiFillDelete } from "react-icons/ai";

import { useDispatch, useSelector } from "react-redux";

const Cart = () => {
  const { cartItems, subTotal, shipping, tax, total } = useSelector(
    (state) => state.cart
  );

  // useEffect(() => {
  //   dispatch({
  //     type: "setCartItem",
  //   });
  // }, []);

  const dispatch = useDispatch();

  const decHandler = (id) => {
    dispatch({
      type: "decFromCart",
      payload: { id, quantity: -1 },
    });
    dispatch({
      type: "calculatePrice",
    });
  };
  const incHandler = (id) => {
    dispatch({
      type: "addToCart",
      payload: { id, quantity: 1 },
    });

    dispatch({
      type: "calculatePrice",
    });
  };
  const delHandler = (id) => {
    dispatch({
      type: "delFromCart",
      payload: { id },
    });
    dispatch({
      type: "calculatePrice",
    });
  };

  return (
    <div className="cart">
      <main>
        {cartItems.length > 0 ? (
          cartItems.map((cartItem) => (
            <CartItem
              key={cartItem.id}
              imgSrc={cartItem.imgSrc}
              name={cartItem.name}
              price={cartItem.price}
              qty={cartItem.quantity}
              id={cartItem.id}
              decHandler={decHandler}
              incHandler={incHandler}
              delHandler={delHandler}
            />
          ))
        ) : (
          <h1>No items here</h1>
        )}
      </main>

      <aside>
        <h2>Subtotal: {subTotal}</h2>
        <h2>Shipping: {shipping}</h2>
        <h2>Tax: {tax}</h2>
        <h2>Total: {total}</h2>
      </aside>
    </div>
  );
};

const CartItem = ({
  imgSrc,
  name,
  price,
  qty,
  decHandler,
  incHandler,
  delHandler,
  id,
}) => (
  <div className="cartItem">
    <img src={imgSrc} alt={name} />
    <article>
      <h3>{name}</h3>
      <p>{price}</p>
    </article>

    <div>
      <button onClick={() => decHandler(id)}>-</button>
      <p>{qty}</p>
      <button onClick={() => incHandler(id)}>+</button>
    </div>
    <AiFillDelete onClick={() => delHandler(id)} />
  </div>
);

export default Cart;
