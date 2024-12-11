import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    image:String,
    price: {
      type: Number,
    },
    stock: {
      type: Number,
    },
        
  },
  {
    timestamps: true, 
  }
);


const Product = mongoose.model("Product", productSchema);

export default Product;
