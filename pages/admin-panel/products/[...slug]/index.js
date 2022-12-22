import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../../store/auth-context";
import { useRouter } from "next/router";

import Brands from "../../../../components/AdminPanel/Pages/Products/AddProduct/Brands/Brands";
import Categories from "../../../../components/AdminPanel/Pages/Products/AddProduct/Categories/Categories";
import Inputs from "../../../../components/AdminPanel/Pages/Products/AddProduct/Inputs/Inputs";
import Options from "../../../../components/AdminPanel/Pages/Products/AddProduct/Options/Options";
import Description from "../../../../components/AdminPanel/Pages/Products/AddProduct/Description/Description";

import classes from "../../../../styles/AdminPanel/Products/Products.module.scss";
import { LoadingButton } from "@mui/lab";

export default function EditProduct() {
  const authCtx = useContext(AuthContext);
  const { query } = useRouter();

  const [product, setProduct] = useState(null);

  const [title, setTitle] = useState("");
  const [persianTitle, setPersianTitle] = useState("");
  const [weight, setWeight] = useState("");
  const [showWeight, setShowWeight] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState(null);
  const [category, setCategory] = useState(null);
  const [brandId, setBrandId] = useState(null);
  const [brand, setBrand] = useState(null);
  const [optionId, setOptionId] = useState(null);
  const [option, setOption] = useState(null);

  const [postLoading, setPostLoading] = useState(false);
  const [postError, setPostError] = useState(null);

  useEffect(() => {
    onGetProduct();
  }, []);

  useEffect(() => {
    if (product) {
      setCategoryId(product?.category_id?.id);
      setCategory(product?.category_id);

      setBrandId(product?.brand_id?.id);
      setBrand(product?.brand_id);

      setOptionId(product?.option_id?.id);
      setOption(product?.option_id);

      setTitle(product?.title);
      setPersianTitle(product?.persian_title);

      setWeight(product?.weight);
      setShowWeight(product?.show_weight);

      setSlug(product?.slug);

      setDescription(product?.description);
    }
  }, [product]);

  function onGetProduct() {
    axios
      .get(`https://api.lariran.com/api/v1/product/${query?.slug?.[0]}`)
      .then((response) => {
        setProduct(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }
  function handlePersianTitleChange(e) {
    setPersianTitle(e.target.value);
  }
  function handleWeightChange(e) {
    setWeight(e.target.value);
  }
  function handleShowWeightChange(e) {
    setShowWeight(e.target.value);
  }
  function handleSlugChange(e) {
    setSlug(e.target.value);
  }

  function handleSelectCategory(c) {
    setCategoryId(c.id);
    setCategory(c);
  }

  function handleSelectBrand(b) {
    setBrandId(b.id);
    setBrand(b);
  }

  function handleSelectOption(o) {
    setOptionId(o.id);
    setOption(o);
  }

  function handleDescriptionChange(data) {
    setDescription(data);
  }

  function handleUpdateProduct() {
    const fd = new FormData();
    fd.append("title", title);
    fd.append("persian_title", persianTitle);
    fd.append("weight", weight);
    fd.append("show_weight", showWeight);
    fd.append("slug", slug);
    fd.append("description", description);
    fd.append("category_id", categoryId);
    fd.append("brand_id", brandId);
    fd.append("option_id", optionId);
    setPostLoading(true);
    setPostError(null);
    axios
      .post(
        `https://api.lariran.com/api/v1/product/update/${query?.slug?.[0]}`,
        fd,
        {
          headers: {
            Authorization: `Bearer ${authCtx.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        if (response.data.status === "error") {
          setPostError(response.data.data);
        } else {
        }
      })
      .catch((error) => {
        setPostError({ server: [error.message] });
      })
      .finally(() => {
        setPostLoading(false);
      });
  }

  return (
    <div className={classes.holder}>
      <Inputs
        title={title}
        titleChange={handleTitleChange}
        persianTitle={persianTitle}
        persianTitleChange={handlePersianTitleChange}
        weight={weight}
        weightChange={handleWeightChange}
        showWeight={showWeight}
        showWeightChange={handleShowWeightChange}
        slug={slug}
        slugChange={handleSlugChange}
        errors={postError}
      />
      <Categories
        selectCategory={handleSelectCategory}
        selectedCategory={category}
        errors={postError}
      />
      <Brands
        selectBrand={handleSelectBrand}
        selectedBrand={brand}
        errors={postError}
      />
      <Options
        selectOption={handleSelectOption}
        selectedOption={option}
        token={authCtx.token}
        errors={postError}
      />
      <Description
        description={description}
        descriptionChange={handleDescriptionChange}
        errors={postError}
      />
      <LoadingButton
        loading={postLoading}
        size="large"
        onClick={handleUpdateProduct}
        variant="contained"
        sx={{
          width: "100%",
          mt: 1,
        }}
      >
        ثبت
      </LoadingButton>
    </div>
  );
}
