import { useState, useEffect, useContext } from "react";

import { CategoriesContext } from "../store/categories-context";

export function useBreadcrumbs(category) {
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const { categories, setCategories } = useContext(CategoriesContext);

  useEffect(() => {
    let condition = true;
    let currentCategory = category;
    const newBreadcrumbs = [];

    do {
      currentCategory && newBreadcrumbs.unshift(currentCategory);

      if (
        !currentCategory ||
        !currentCategory.parent_id ||
        currentCategory?.parent_id === 0
      ) {
        condition = false;
      } else {
        currentCategory = categories.find(
          (c) => c.id === currentCategory?.parent_id
        );
      }
    } while (condition);

    setBreadcrumbs(newBreadcrumbs);
  }, [categories, category]);

  return breadcrumbs;
}

export function useRootCategories() {
  const [rootCategories, setRootCategories] = useState([]);
  const { categories, setCategories } = useContext(CategoriesContext);

  useEffect(() => {
    setRootCategories(categories.filter((c) => c.parent_id === 0));
  }, [categories]);

  return rootCategories;
}

export function useChildCategories(id) {
  const [childCategories, setChildCategories] = useState([]);
  const { categories, setCategories } = useContext(CategoriesContext);

  useEffect(() => {
    if (id || id === 0)
      setChildCategories(categories.filter((c) => c.parent_id === id));
  }, [categories, id]);

  return childCategories;
}

export function useChildrenCount(id) {
  const [count, setCount] = useState(0);
  const { categories, setCategories } = useContext(CategoriesContext);

  useEffect(() => {
    setCount(0);
    let newCount = 0;
    if (id) {
      for (const category of categories) {
        if (category.parent_id === id) {
          newCount++;
          for (const child of categories) {
            if (child.parent_id === category.id) {
              newCount++;
            }
          }
        }
      }
    }
    setCount(newCount);
  }, [categories, id]);

  return count;
}

export function useGetCategory(id) {
  const [category, setCategory] = useState(null);
  const { categories, setCategories } = useContext(CategoriesContext);

  useEffect(() => {
    if (id) {
      const c = categories.find((c) => Number(c.id) === Number(id));
      setCategory(c);
    }
  }, [categories, id]);

  return category;
}
