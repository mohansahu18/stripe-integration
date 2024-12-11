import React, { useEffect, useState } from "react";

import axios from "axios";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    axios.get(`${BASE_URL}carts/getPCartItems`).then((res) => {
      setProducts(res.data.data);
      let price = 0;
      res.data.data.map((item) => {
        console.log(item.productID.price, item.count);
        price += item.productID.price * item.count;
      });
      setTotal(price);
    });
  }, []);
  return (
    <div>
      <span
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {" "}
        <h1 style={{ marginRight: "10px" }}>Cart</h1>{" "}
        <p>Total items:{products.length}</p>
      </span>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        {products &&
          products.map((product) => (
            <CartItem key={product.id} product={product} setTotal={setTotal} />
          ))}
      </div>

      <h4>Total Price: $ {total}</h4>

      <button>
        {" "}
        <Link to={"/checkout"}>Checkout</Link>{" "}
      </button>
    </div>
  );
};

export default Cart;
