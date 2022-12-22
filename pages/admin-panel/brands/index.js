import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../store/auth-context";

import Title from "../../../components/AdminPanel/Title/Title";

import classes from "../../../styles/AdminPanel/Products/Products.module.scss";
import { useRouter } from "next/router";
import Brands from "../../../components/AdminPanel/Pages/Brands/Brands";
// import Waranties from "../../../components/AdminPanel/Pages/Waranties/Waranties";
// import PaginationHolder from "../../../components/AdminPanel/Pagination/Pagination";

export default function BrandsPage() {
  const authCtx = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [brands, setBrands] = useState([]);
  const [activeBrands, setActiveBrands] = useState([]);
  const [brandsModel, setBrandsModel] = useState([]);
  const [elements, setElements] = useState([]);

  useEffect(() => {
    const newBrands = brands.map((brand) => {
      let active = false;

      return {
        id: brand.id,
        name: brand.name,
        persian_name: brand.persian_name,
        image: brand.image,
        active: active,
        activeId: null,
      };
    });
    setBrandsModel(newBrands);
  }, [brands]);

  useEffect(() => {
    const newBrands = brandsModel.map((brand) => {
      var active = false;
      var activeId = null;
      activeBrands.forEach((activeBrand) => {
        if (activeBrand.brand.id === brand.id) {
          active = true;
          activeId = activeBrand.id;
        }
      });
      return {
        id: brand.id,
        name: brand.name,
        persian_name: brand.persian_name,
        image: brand.image,
        active: active,
        activeId: activeId,
      };
    });
    setElements(newBrands);
  }, [brandsModel, activeBrands]);

  useEffect(() => {
    handleGetBrands();
  }, []);

  function handleGetBrands() {
    onGetBrands();
    onGetActiveBrands();
  }

  function onGetBrands() {
    setLoading(true);
    setError(false);
    const url = "https://api.lariran.com/api/v1/brand/all";
    axios
      .get(url, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${authCtx.token}`,
        },
      })
      .then((response) => {
        if (response.data.status === "error") {
          setError(true);
        } else {
          setBrands(response.data.data);
        }
      })
      .catch((error) => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function onGetActiveBrands() {
    setLoading(true);
    setError(false);
    const url = `https://api.lariran.com/api/v1/brandLanding`;
    axios
      .get(url, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${authCtx.token}`,
        },
      })
      .then((response) => {
        if (response.data.status === "error") {
          setError(true);
        } else {
          setActiveBrands(response.data.data);
        }
      })
      .catch((error) => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className={classes.holder}>
      <Title title="برند ها" />
      {/* {!loading && <PaginationHolder count={pageCount} />} */}
      <Brands
        brands={elements}
        loading={loading}
        error={error}
        getBrands={handleGetBrands}
        token={authCtx.token}
      />
      {/* {!loading && <PaginationHolder count={pageCount} />} */}
    </div>
  );
}
