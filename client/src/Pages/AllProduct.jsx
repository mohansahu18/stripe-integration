import React, { useEffect, useState } from "react";
import Product from "../components/Product";
import axios from "axios";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const AllProduct = () => {
  const [products, setProducts] = useState([]);
  const [totalItem, setTotalItem] = useState(0);

  const getTotalCardItems = () => {
    axios.get(`${BASE_URL}carts/getPCartItems`).then((res) => {
      setTotalItem(res?.data?.data?.length);
    });
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}products/getProducts`)
      .then((res) => setProducts(res.data.data))
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    getTotalCardItems();
  }, [totalItem]);
  return (
    <div>
      <span
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1>Products</h1>
        <button>
          <Link style={{ display: "flex", alignItems: "center" }} to={"/cart"}>
            Cart
            <ShoppingCartIcon style={{ fontSize: "20px", marginLeft: "5px" }} />
            {totalItem}
          </Link>{" "}
        </button>
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
            <Product
              key={product.id}
              product={product}
              getTotalCardItems={getTotalCardItems}
            />
          ))}
      </div>
    </div>
  );
};

export default AllProduct;
