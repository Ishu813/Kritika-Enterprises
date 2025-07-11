import React, { useState, useEffect } from "react";
import PriceRangeBox from "../components/PriceRangeBox";
import ChoicesBox from "../components/ChoicesBox";
import SelectionBox from "../components/SelectionBox";
import ProductCard from "../components/ProductsCard";
import { db } from "../../firebase";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { useSearchParams } from "react-router-dom";

const ProductsPage = () => {
  const [showFilters, setShowFilters] = useState(false);
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
  const title = searchParams.get("category")
    ? searchParams.get("category").charAt(0).toUpperCase() +
      searchParams.get("category").slice(1)
    : null;

  return (
    <div className="flex flex-col h-screen text-white ">
      {/* Header */}
      <div className="p-4 bg-[#0f172a] text-white ">
        <p className="text-2xl font-bold">{title ? title : "All Products"}</p>
        <hr />
      </div>

      <div className="md:hidden p-4 bg-[#0f172a]">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden bg-[#0f172a] flex-col md:flex-row">
        {/* Filter Section */}
        <div
          className={`md:w-1/4 w-full p-4 border-r border-gray-300 overflow-y-auto ${
            showFilters ? "block" : "hidden"
          } md:block`}
        >
          <p style={{ fontSize: "1.5rem" }} className="bg-[#0f172a]">
            Filters
          </p>
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
        <div className="md:w-3/4 w-full overflow-y-auto p-4 bg-[#0f172a]">
          <div className="flex flex-wrap gap-4 bg-[#0f172a]">
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
