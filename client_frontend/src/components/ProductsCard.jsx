import React, { useState } from "react";

const ProductCard = ({ product }) => {
  const [showText, setShowText] = useState(false);
  const key_features = product.key_features.filter(
    (feature, idx) => feature !== "" && idx <= 2
  );

  const product_link = `https://www.thekayee.com/products/${encodeURIComponent(
    product.id
  )}`;
  const text = `Hi, I’d like to get your consent for the product "${product.name}". Here’s the product link: ${product_link}`;
  const encodedMessage = encodeURIComponent(text);

  return (
    <div
      className="w-72 bg-[#192747] rounded-xl overflow-hidden shadow-lg m-2  border-2 border-slate-700 hover:opacity-80 transition-opacity cursor-pointer"
      onClick={() => {
        window.location.href = `/products/${product.id}`;
      }}
    >
      <div className="w-72 relative">
        <img className="w-72 max-h-52" src={product.imageUrl} />
        <a
          href={`https://wa.me/918081714797?text=${encodedMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            onMouseOver={() => setShowText(true)}
            onMouseOut={() => setShowText(false)}
            className="flex z-50 absolute top-4 left-4 p-2 rounded-full bg-black backdrop-blur-sm justify-center items-center"
          >
            <i className="fa-brands fa-whatsapp text-green-500 text-2xl"></i>

            {showText && <p>&nbsp;&nbsp;Take consent from the Seller</p>}
          </div>
        </a>
        <div className="flex absolute top-4 right-4 p-2 rounded-full bg-black/20 backdrop-blur-sm justify-center items-center hover:opacity-50 transition-opacity">
          <i className="fa-solid fa-cart-shopping"></i>
        </div>
        {product.discount ? (
          <div className="flex absolute top-4 left-4 p-2 rounded-full bg-green-600 text-white justify-center items-center">
            -{product.discount}%
          </div>
        ) : null}
      </div>
      <div className="rounded-xl">
        <div className="h-40 p-3 rounded-xl overflow-hidden">
          <p className="text-2xl">{product.id}</p>
          {key_features &&
            key_features.map((feature, idx) => (
              <div
                style={{ display: "inline-block" }}
                key={idx}
                className="text-xs border border-gray-400 px-1 text-white rounded mr-1"
              >
                {feature}
              </div>
            ))}
          <span>...more</span>
          <p className="text-sm text-white mt-2">{product.description}</p>
        </div>

        <div className="mx-4 my-2">
          <p className="text-xs text-white font-bold">PRICE</p>
          <p className="text-2xl">
            &#8377;
            {new Intl.NumberFormat("en-IN").format(
              Number(product.price * (1 - product.discount / 100))
            )}
          </p>
          <span
            className="text-lg text-slate-300"
            style={{ textDecoration: "line-through" }}
          >
            &#8377;
            {new Intl.NumberFormat("en-IN").format(Number(product.price))}
          </span>
          <i className="fa-solid fa-tag ml-4 text-green-600"></i>
          {product.discount ? (
            <span className="ml-2 text-green-600">{product.discount}%</span>
          ) : null}
        </div>
        <div className="flex justify-center items-center gap-8">
          <div className="flex rounded-full bg-blue-100 w-12 h-8 justify-center items-center hover:opacity-80 transition-opacity">
            <i className="fa-solid fa-minus text-blue-600 text-sm"></i>
          </div>
          <span className="">1</span>
          <div className="flex rounded-full bg-blue-100 w-12 h-8 justify-center items-center hover:opacity-80 transition-opacity">
            <i className="fa-solid fa-plus text-blue-600 text-sm"></i>
          </div>
        </div>
        <button className="w-[90%] p-3 m-4 bg-blue-900 text-white hover:opacity-80 transition-opacity rounded-full text-base">
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
