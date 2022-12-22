import { useState, useEffect, useContext } from "react";
import { CategoriesContext } from "../../../../store/categories-context";
import { useBreadcrumbs } from "../../../../hooks/useCategories";

import classes from "./CategoriesFeature.module.scss";
import Category from "./Category/Category";

export default function CategoriesFeature({
  type,
  categoryId,
  category,
  categories,
  backToCategory,
  handleSetCategory,
  token,
  selectCategory,
}) {
  const categoriesCtx = useContext(CategoriesContext);
  const breadcrumbs = useBreadcrumbs(category);

  return (
    <div className={classes.holder}>
      <div className={classes.breadcrumbs}>
        {breadcrumbs.map((b) => {
          return (
            <div key={b.id} onClick={() => backToCategory(b)}>
              {b.persian_name}
            </div>
          );
        })}
      </div>
      <div className={classes.categories}>
        {categories.map((category) => (
          <Category
            key={category.id}
            category={category}
            setCategory={handleSetCategory}
            type={type}
            categoryId={categoryId}
            token={token}
            selectCategory={selectCategory}
          />
        ))}
      </div>
    </div>
  );
}
