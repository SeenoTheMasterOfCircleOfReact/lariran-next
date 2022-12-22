import { createContext, useState, useContext } from "react";
import axios from "axios";

export const CategoriesContext = createContext();

export default function CategoriesContextProvider(props) {
  const [categories, setCategories] = useState([]);

  const setCategoriesHandler = (categoriesData) => {
    setCategories(categoriesData);
  };

  const getCategories = () => {
    axios
      .get("https://api.lariran.com/api/v1/category", {})
      .then((response) => {
        setCategories(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const context = {
    categories: categories,
    setCategories: setCategoriesHandler,
    getCategories: getCategories,
  };

  return (
    <CategoriesContext.Provider value={context}>
      {props.children}
    </CategoriesContext.Provider>
  );
}
