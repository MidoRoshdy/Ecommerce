import Image from "next/image";
import Search from "./components/search";
import Carousel from "./components/carousel";
import Category from "./components/category";
import Subcategories from "./components/subcategories";
import SpecificCategory from "./components/specificCategory";
import CategorySubcategories from "./components/categorySubcategories";
import Brands from "./components/brands";
import Products from "./components/products";

export default function Home({}) {
  return (
    //search bar
    <>
      <Search />
      <Carousel />
      <Category />
      <Subcategories />
      <Brands />
      <Products />
    </>
  );
}
