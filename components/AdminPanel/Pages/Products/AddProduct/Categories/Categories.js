import { useContext, useState, useEffect } from "react";
import { CategoriesContext } from "../../../../../../store/categories-context";
import { useChildCategories } from "../../../../../../hooks/useCategories";

import CategoriesFeature from "../../../CategoriesFeature/CategoriesFeature";

import Title from "../../../../Title/Title";

export default function Categories({
  selectCategory,
  selectedCategory,
  errors,
}) {
  const categoriesCtx = useContext(CategoriesContext);
  const [categoryId, setCategoryId] = useState(0);
  const [category, setCategory] = useState(null);
  const categories = useChildCategories(categoryId);

  useEffect(() => {
    const newCategory = categoriesCtx.categories.find(
      (c) => c.id === categoryId
    );
    setCategory(newCategory);
  }, [categoryId, categoriesCtx.categories]);

  function handleSetCategory(category) {
    setCategoryId(category.id);
  }
  function backToCategory(category) {
    setCategoryId(category.parent_id);
  }

  return (
    <div style={{ marginBottom: "20px" }}>
      <Title title="انتخاب دسته بندی" />
      {Boolean(errors?.category_id) && (
        <sub style={{ color: "red" }}>{errors?.category_id?.[0]}</sub>
      )}
      <div style={{ marginBottom: "20px" }}>
        افزودن محصول در دسته بندی {selectedCategory?.persian_name}
      </div>
      <CategoriesFeature
        type="select"
        backToCategory={backToCategory}
        handleSetCategory={handleSetCategory}
        categoryId={categoryId}
        category={category}
        categories={categories}
        selectCategory={selectCategory}
      />
    </div>
  );
}
