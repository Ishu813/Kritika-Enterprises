import React, { useState, useEffect } from "react";
import PriceRangeBox from "../Components/PriceRangeBox";
import ChoicesBox from "../Components/ChoicesBox";
import SelectionBox from "../Components/SelectionBox";
import ProductCard from "../Components/ProductsCard";
import { db } from "../../firebase";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { useSearchParams } from "react-router-dom";

const ProductsPage = () => {
  const companyChoices = [
    "Acer",
    "Amd",
    "ASUS",
    "Crucial",
    "Dahua",
    "DELL",
    "HP",
    "Intel",
    "Lenovo",
    "LG",
    "Msi",
    "Samsung",
    "Seagate",
    "Sony",
    "hermaltake",
    "Toshiba",
    "Viewsonic",
    "WD",
  ];
  const processorChoices = [
    "Intel Core i3",
    "Intel Core i5",
    "Intel Core i7",
    "Intel Core i9",
    "Intel Pentium",
    "Intel Celeron",
    "Intel Xeon",
    "AMD Ryzen 3",
    "AMD Ryzen 5",
    "AMD Ryzen 7",
    "AMD Ryzen 9",
    "AMD Athlon",
    "AMD FX-Series",
    "Apple M1",
    "Apple M2",
    "Apple M3",
    "Qualcomm Snapdragon 8 Gen 1",
    "MediaTek Dimensity 9200",
    "Samsung Exynos 2100",
    "ARM Cortex-A78",
  ];
  const graphicCardChoices = [
    "NVIDIA GeForce GTX 1650",
    "NVIDIA GeForce RTX 3060",
    "NVIDIA GeForce RTX 4070",
    "AMD Radeon RX 6600 XT",
    "AMD Radeon RX 7700 XT",
    "Intel Arc A750",
  ];
  const [searchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [brandFilteredProducts, setBrandFilteredProducts] = useState([]);
  const [priceRangeFilteredProducts, setPriceRangeFilteredProducts] = useState(
    []
  );
  const [processorFilteredProducts, setProcessorFilteredProducts] = useState(
    []
  );
  const [graphicCardFilteredProducts, setGraphicCardFilteredProducts] =
    useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "inventory"));
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });

      const category = searchParams.get("category");

      const categoryFiltered = items.filter(
        (item) => item.category === category || category === null
      );

      setProducts(categoryFiltered);
      setFilteredProducts(categoryFiltered);
      setBrandFilteredProducts(categoryFiltered);
      setPriceRangeFilteredProducts(categoryFiltered);
      setProcessorFilteredProducts(categoryFiltered);
      setGraphicCardFilteredProducts(categoryFiltered);
    };

    fetchData();
  }, [searchParams]); // ✅ searchParams is safe to depend on

  useEffect(() => {
    const filterProducts = products.filter((product) => {
      return (
        brandFilteredProducts.includes(product) &&
        priceRangeFilteredProducts.includes(product) &&
        processorFilteredProducts.includes(product) &&
        graphicCardFilteredProducts.includes(product)
      );
    });
    setFilteredProducts(filterProducts);
  }, [
    brandFilteredProducts,
    priceRangeFilteredProducts,
    processorFilteredProducts,
    graphicCardFilteredProducts,
  ]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      {/* Header */}
      <div style={{ padding: "1rem", backgroundColor: "#f2f3ff" }}>
        <p style={{ fontSize: "2rem", fontWeight: "bold" }}>All Products</p>
        <hr />
      </div>

      {/* Body */}
      <div
        style={{
          display: "flex",
          flex: 1,
          overflow: "hidden",
          backgroundColor: "#f2f3ff",
        }}
      >
        {/* Filter Section */}
        <div
          style={{
            width: "24%",
            padding: "0rem 1rem 1rem 1rem",
            borderRight: "1px solid lightgray",
            overflowY: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <p style={{ fontSize: "1.5rem" }}>Filters</p>
          <SelectionBox
            title={"Brands"}
            options={companyChoices}
            products={products}
            setFilteredProducts={setBrandFilteredProducts}
          />
          <PriceRangeBox
            products={products}
            setFilteredProducts={setPriceRangeFilteredProducts}
          />
          <ChoicesBox
            title={"Processors"}
            options={processorChoices}
            products={products}
            setFilteredProducts={setProcessorFilteredProducts}
          />
          <ChoicesBox
            title={"Graphic Cards"}
            options={graphicCardChoices}
            products={products}
            setFilteredProducts={setGraphicCardFilteredProducts}
          />
        </div>

        {/* Products Section */}
        <div style={{ width: "80%", overflowY: "auto", padding: "1rem" }}>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {filteredProducts.map((product, idx) => (
              <ProductCard key={idx} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
