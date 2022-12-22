import { useState } from "react";
import { useRouter } from "next/router";
import { useGetCategory } from "../../../hooks/useCategories";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Drawer from "@mui/material/Drawer";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import SortRoundedIcon from "@mui/icons-material/SortRounded";
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";

import Products from "../../../components/Products/Products/Products";

import classes from "../../../styles/Products/Products.module.scss";
import BreadcrumbsHolder from "../../../components/Product/Right/BreadcrumbsHolder/BreadcrumbsHolder";
import Filters from "../../../components/Products/Right/Filters/Filters";

export default function ProductsHolder({ products }) {
  const [sort, setSort] = useState(false);
  const [filter, setFilter] = useState(false);
  const router = useRouter();

  const category = useGetCategory(router?.query?.slug[0]);

  function handleChange(e, value) {
    const query = {
      sort: value,
      min: router?.query?.min,
      max: router?.query?.max,
      stock: router?.query?.stock,
    };
    const href = `/category/${router?.query?.slug[0]}/${router?.query?.slug[1]}`;
    router.replace({
      pathname: href,
      query: query,
    });
  }

  function rangeChangeHandler(min, max) {
    const query = {
      sort: router?.query?.sort,
      min: min,
      max: max,
      stock: router?.query?.stock,
    };
    const href = `/category/${router?.query?.slug[0]}/${router?.query?.slug[1]}`;
    router.replace({
      pathname: href,
      query: query,
    });
  }

  function stockChangeHandler(stock) {
    console.log(stock);
    const query = {
      sort: router?.query?.sort,
      min: router?.query?.min,
      max: router?.query?.max,
      stock: stock ? 1 : 0,
    };
    const href = `/category/${router?.query?.slug[0]}/${router?.query?.slug[1]}`;
    router.replace({
      pathname: href,
      query: query,
    });
  }

  function closeSortHandler() {
    setSort(false);
  }
  function openSortHandler() {
    setSort(true);
  }

  function closeFilterHandler() {
    setFilter(false);
  }
  function openFilterHandler() {
    setFilter(true);
  }

  return (
    <div className={classes.holder}>
      <div className={classes.top}>
        <BreadcrumbsHolder category={category} />
      </div>
      <div className={classes.bottom}>
        <div className={classes.right}>
          <Filters
            rangeChange={rangeChangeHandler}
            stockChange={stockChangeHandler}
          />
        </div>
        <div className={classes.left}>
          <div className={classes.drawerToggle}>
            <div className={classes.sortToggle} onClick={openSortHandler}>
              <SortRoundedIcon />
              <span>مرتب سازی</span>
            </div>
            <div className={classes.filterToggle} onClick={openFilterHandler}>
              <FilterAltRoundedIcon />
              <span>فیلتر ها</span>
            </div>
          </div>
          <div className={classes.sort}>
            <Tabs
              value={router?.query?.sort}
              onChange={handleChange}
              aria-label="wrapped label tabs example"
            >
              <Tab value="3" label="جدیدترین" />
              <Tab value="4" label="پربازدید ترین" />
              <Tab value="2" label="ارزان ترین" />
              <Tab value="1" label="گران ترین" />
            </Tabs>
            <div className={classes.drawers}>
              <Drawer anchor="bottom" open={sort} onClose={closeSortHandler}>
                <ToggleButtonGroup
                  value={router?.query?.sort}
                  orientation="vertical"
                  exclusive
                  onChange={handleChange}
                  aria-label="product sort"
                >
                  <ToggleButton value="3" aria-label="new">
                    جدیدترین
                  </ToggleButton>
                  <ToggleButton value="4" aria-label="most visited">
                    پربازدید ترین
                  </ToggleButton>
                  <ToggleButton value="2" aria-label="cheap">
                    ارزان ترین
                  </ToggleButton>
                  <ToggleButton value="1" aria-label="expensive">
                    گران ترین
                  </ToggleButton>
                </ToggleButtonGroup>
              </Drawer>
              <Drawer
                anchor="bottom"
                open={filter}
                onClose={closeFilterHandler}
              >
                <Filters
                  rangeChange={rangeChangeHandler}
                  stockChange={stockChangeHandler}
                />
              </Drawer>
            </div>
          </div>
          <div className={classes.products}>
            <Products products={products} />
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;

  const min = Number(query.min);
  const max = Number(query.max);
  const sort = Number(query.sort);
  const stock = Number(query.stock);

  const baseUrl = "https://api.lariran.com/api/v1/";

  const url = `${baseUrl}category/${query.slug[0]}/products?${
    !isNaN(sort) ? "sort=" + sort : ""
  }${!isNaN(stock) ? "&stock=" + stock : ""}${
    !isNaN(min) ? "&min=" + min : ""
  }${!isNaN(max) ? "&max=" + max : ""}`;

  const productsResponse = await fetch(url);
  const productsData = await productsResponse?.json();

  return {
    props: {
      products: productsData.data,
    },
  };
}
