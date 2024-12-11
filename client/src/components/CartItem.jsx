import axios from "axios";
import React, { useState } from "react";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const CartItem = ({ product, setTotal }) => {
  const [count, setCount] = useState(product?.count);

  const addinCart = () => {
    axios
      .post(`${BASE_URL}products/addtocart/${product?.productID._id}`)
      .then((res) => {
        setCount(res.data.data.count);
        setTotal((total) => total + product?.productID?.price);
      });
  };

  const subtractCart = () => {
    if (count > 1) {
      axios
        .put(`${BASE_URL}products/removeOneFromCart/${product?.productID._id}`)
        .then((res) => {
          setCount(res.data.data.count);
          setTotal((total) => total - product?.productID?.price);
        });
    }
  };

  return (
    <div
      style={{
        border: "1px solid grey",
        marginBottom: "20px",
        borderRadius: "10px",
        overflow: "hidden",
        padding: "10px",
      }}
    >
      <img
        style={{ width: "200px", height: "200px", objectFit: "cover" }}
        src={product?.productID?.image}
        alt=""
      />

      <div>
        <h3>{product?.productID?.name}</h3>
        <p>Price: $ {product?.productID?.price * count}</p>
        <span>
          <button onClick={subtractCart}> -</button>
          <h5 style={{ margin: "0 10px", display: "inline-block" }}>{count}</h5>
          <button onClick={addinCart}> +</button>
        </span>
      </div>
    </div>
  );
};

export default CartItem;
