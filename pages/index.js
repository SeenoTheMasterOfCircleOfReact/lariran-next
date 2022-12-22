import { useEffect, useState } from "react";
import useWindowDimensions from "../hooks/useWindowDimensions";

import Hero from "../components/Home/Hero/Hero";
import Brands from "../components/Home/Brands/Brands";

import classes from "../styles/Home/Home.module.scss";
import Products from "../components/Home/Products/Products";
import Categories from "../components/Home/Categories/Categories";

export default function Home(props) {
  const { height, width } = useWindowDimensions();
  const { slides, brands, newProducts, categories } = { ...props };
  const [mainSlides, setMainSlides] = useState(
    slides.filter((slide) => slide.type === "main")
  );
  const [parentCat, setParentCat] = useState([]);

  useEffect(() => {
    if (width <= 1000) {
      const newSlides = slides.filter((slide) => slide.type === "bottom");
      setMainSlides(newSlides);
    } else {
      const newSlides = slides.filter((slide) => slide.type === "main");
      setMainSlides(newSlides);
    }
  }, [width, slides]);

  useEffect(() => {
    setParentCat(categories.filter((category) => category.parent_id === 0));
  }, [categories]);

  return (
    <main className={classes.main}>
      <Hero slides={mainSlides} />
      <div className={classes.wrapper}>
        <div className={classes.holder}>
          <Brands brands={brands} />
          <Products type="NEW" products={newProducts} />
        </div>
        <Categories categories={parentCat} />
        <div className={classes.holder}>
          <Products type="HOT" products={newProducts} />
          {/* <div
              style={{
                width: "400px",
                height: "300px",
                marginTop: "40px",
                marginBottom: "20px",
                borderRadius: "5px",
                backgroundColor: "red",
              }}
            ></div> */}
        </div>
      </div>
    </main>
  );
}

export async function getStaticProps() {
  const response = await fetch("https://api.lariran.com/api/v1/slider");
  const data = await response?.json();

  const brandsRes = await fetch("https://api.lariran.com/api/v1/brandLanding");
  const brandsData = await brandsRes?.json();

  const newRes = await fetch("https://api.lariran.com/api/v1/newest");
  const newData = await newRes?.json();

  const catRes = await fetch("https://api.lariran.com/api/v1/category");
  const catData = await catRes?.json();

  return {
    props: {
      slides: data.data,
      brands: brandsData.data,
      newProducts: newData.data,
      categories: catData.data,
    },
    revalidate: 600,
  };
}
