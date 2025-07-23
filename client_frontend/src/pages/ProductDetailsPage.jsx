import React, { useState, useEffect } from "react";
import { Button } from "../components/Ui/Button";
import TechSpecifications from "../components/TechSpecifications";
import KeyFeatures from "../components/KeyFeatures";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "inventory"));
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      setProducts(items);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const item = products.filter((product) => product.id == id);
    setProduct(item[0]);
  }, [products]);

  if (!product) {
    return null;
  }

  const product_link = `https://www.thekayee.com/products/${encodeURIComponent(
    product.id
  )}`;
  const text = `Hi, I’d like to get your consent for the product "${product.id}". Here’s the product link: ${product_link}`;
  const encodedMessage = encodeURIComponent(text);

  return (
    <div
      style={{
        padding: "2rem",
        display: "flex",
        flexWrap: "wrap",
        gap: "4rem",
        color: "#fff",
        justifyContent: "center",
        backgroundColor: "#0f172a",
      }}
    >
      {/* Image */}
      <div>
        <img
          src={product.imageUrl}
          alt="Product"
          className="w-full h-96 object-cover"
          style={{ height: "32rem", width: "32rem", borderRadius: "8px" }}
        />
      </div>
      {/* Product Details */}
      <div style={{ maxWidth: "40rem", color: "#f8fafc" }}>
        <div>
          <span style={{ color: "#4285f4" }}>{product.brand}</span>
          &nbsp;&nbsp;
          <span style={{ color: "#94a3b8", fontSize: "24px" }}>·</span>
          &nbsp;&nbsp;
          <span style={{ color: "#94a3b8" }}>{product.category}</span>
        </div>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#f8fafc" }}>
          {product.id}
        </h1>
        <div style={{ margin: "1rem 0" }}>
          {/* <span style={{ color: "#f8fafc" }}>⭐️ 4.9 </span>
          <span style={{ color: "#94a3b8" }}>(1247 reviews)</span>
          &nbsp;&nbsp;&nbsp;&nbsp; */}
          {product.stock > 0 ? (
            <span style={{ color: "#10b981", fontWeight: "bold" }}>
              In Stock
            </span>
          ) : (
            <span style={{ color: "red", fontWeight: "bold" }}>
              Out Of Stock
            </span>
          )}
        </div>
        {/* Whatsapp consent */}
        <a
          href={`https://wa.me/917982152940?text=${encodedMessage}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="flex z-50 p-2 rounded-full bg-black backdrop-blur-sm justify-center items-center">
            <i className="fa-brands fa-whatsapp text-green-500 text-2xl"></i>
            <p>&nbsp;&nbsp;Take consent from the Seller</p>
          </div>
        </a>

        <div
          style={{ margin: "1rem 0", display: "flex", alignItems: "center" }}
        >
          <span
            style={{ fontSize: "2rem", color: "#f8fafc", fontWeight: "bold" }}
          >
            &#8377;
            {new Intl.NumberFormat("en-IN").format(
              Number(product.price * (1 - product.discount / 100))
            )}
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span
            style={{
              color: "#64748b",
              textDecoration: "line-through",
              fontSize: "1.4rem",
            }}
          >
            &#8377;
            {new Intl.NumberFormat("en-IN").format(Number(product.price))}
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;
          {product.discount ? (
            <div
              style={{
                backgroundColor: "#10b981",
                color: "#f8fafc",
                fontSize: "12px",
                padding: "0.5rem",
                borderRadius: "4px",
              }}
            >
              Save {product.discount}%
            </div>
          ) : null}
        </div>
        <div>
          {" "}
          <p style={{ color: "#94a3b8" }}>{product.description}</p>
        </div>
        <TechSpecifications product={product} />
        <KeyFeatures product={product} />
        <div
          style={{
            display: "flex",
            marginTop: "1.5rem",
            alignItems: "center",
          }}
        >
          <span style={{ display: "#94a3b8" }}>Qty:&nbsp;&nbsp;</span>
          <div
            style={{
              display: "flex",
              backgroundColor: "#374151",
              width: "6rem",
              color: "#f8fafc",
              borderRadius: "4px",
            }}
          >
            <div
              style={{
                width: "2rem",
                height: "2rem",
                backgroundColor: "#0f172a",
                margin: "1px",
                textAlign: "center",
                justifyItems: "center",
                alignContent: "center",
                borderRadius: "4px",
                color: "#f8fafc",
              }}
            >
              -
            </div>
            <div
              style={{
                width: "2rem",
                height: "2rem",
                margin: "1px",
                textAlign: "center",
                justifyItems: "center",
                alignContent: "center",
                color: "#f8fafc",
              }}
            >
              1
            </div>
            <div
              style={{
                width: "2rem",
                height: "2rem",
                backgroundColor: "#0f172a",
                margin: "1px",
                textAlign: "center",
                justifyItems: "center",
                alignContent: "center",
                borderRadius: "4px",
                color: "#f8fafc",
              }}
            >
              +
            </div>
          </div>
        </div>
        <Button
          type="submit"
          className="w-full bg-[#2563eb] hover:bg-[#1e40af] text-white py-3 flex items-center justify-center space-x-2 mt-8"
        >
          <span>
            <i className="fa-solid fa-cart-shopping"></i>
            &nbsp;&nbsp;&nbsp;
            <span>Add To Cart</span>
          </span>
        </Button>
        <div
          style={{
            display: "flex",
            marginTop: "2rem",
            color: "#94a3b8",
            gap: "2rem",
          }}
        >
          <span>
            <i className="fa-solid fa-truck"></i>&nbsp;
            <span>Free Shipping</span>
          </span>
          <span>
            <i className="fa-solid fa-shield"></i>&nbsp;
            <span>{product.warranty_years}</span>
          </span>
          {/* <span>
            <i className="fa-solid fa-rotate-left"></i>&nbsp;
            <span>30 Day Return</span>
          </span> */}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
