import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="w-80 bg-[#192747] rounded-xl overflow-hidden shadow-lg m-2  border-2 border-slate-700 hover:opacity-80 transition-opacity">
      <div className="w-80 relative">
        <img className="w-80 max-h-64" src={product.imageUrl} />
        <div className="flex absolute top-4 right-4 p-2 rounded-full bg-black/20 backdrop-blur-sm justify-center items-center hover:opacity-50 transition-opacity">
          <i className="fa-solid fa-cart-shopping"></i>
        </div>
        <div className="flex absolute top-4 left-4 p-2 rounded-full bg-green-600 text-white justify-center items-center">
          -{product.discount}%
        </div>
      </div>
      <div className="rounded-xl">
        <div className="h-40 p-3 rounded-xl overflow-hidden">
          <p className="text-2xl">{product.id}</p>
          {product.key_features &&
            product.key_features.map((feature, idx) => (
              <span
                key={idx}
                className="text-xs border border-gray-400 px-1 text-white rounded mr-1"
              >
                {feature}
              </span>
            ))}
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
          <span className="text-lg text-slate-300 ">
            &#8377;
            {new Intl.NumberFormat("en-IN").format(Number(product.price))}
          </span>
          <i className="fa-solid fa-tag ml-4 text-green-600"></i>
          <span className="ml-4 text-green-600">{product.discount}%</span>
        </div>
        <div className="flex justify-center items-center gap-8">
          <div className="flex rounded-full bg-blue-100 w-16 h-12 justify-center items-center hover:opacity-80 transition-opacity">
            <i className="fa-solid fa-minus text-blue-600 text-sm"></i>
          </div>
          <span className="">1</span>
          <div className="flex rounded-full bg-blue-100 w-16 h-12 justify-center items-center hover:opacity-80 transition-opacity">
            <i className="fa-solid fa-plus text-blue-600 text-sm"></i>
          </div>
        </div>
        <button className="w-[90%] p-4 m-4 bg-blue-900 text-white hover:opacity-80 transition-opacity rounded-full text-base">
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
