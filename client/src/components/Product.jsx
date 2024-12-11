import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const Product = ({ product, getTotalCardItems }) => {
  const addinCart = () => {
    // debugger;
    axios
      .post(`${BASE_URL}products/addtocart/${product._id}`)
      .then((res) => getTotalCardItems())
      .catch((err) => console.log(err));
    getTotalCardItems();
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
        src={product?.image}
        alt=""
      />

      <div>
        <h3>{product?.name}</h3>
        <p>Price: $ {product?.price}</p>
        <button onClick={addinCart}> + Add to Cart</button>
      </div>
    </div>
  );
};

export default Product;
