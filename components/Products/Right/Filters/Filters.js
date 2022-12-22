import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";
import Switch from "@mui/material/Switch";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";

import { PriceEditor } from "../../../../hooks/usePrice";

import classes from "./Filters.module.scss";

export default function Filters({ stockChange, rangeChange }) {
  const router = useRouter();

  const [checked, setChecked] = useState(false);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(100000000);
  const [value, setValue] = useState([0, 100]);

  const minDistance = 10;

  useEffect(() => {
    const newMinValue = value[0] * 1000000;
    const newMaxValue = value[1] * 1000000;
    setMin(newMinValue);
    setMax(newMaxValue);
  }, [value]);

  useEffect(() => {
    if (router?.query?.min) {
      setValue([router.query.min / 1000000, router.query.max / 1000000]);
    }
    if (+router?.query?.stock === 1) {
      setChecked(true);
    } else if (+router?.query?.stock === 0) {
      setChecked(false);
    }
  }, [router]);

  const convertedMin = PriceEditor(min);
  const convertedMax = PriceEditor(max);

  function handleStockToggleChange() {
    setChecked((prevChecked) => !prevChecked);
  }

  function handleRangeChange(e, newValue, activeThumb) {
    if (!Array.isArray(newValue)) return;
    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
    }
  }

  function rangeSubmit() {
    rangeChange(min, max);
  }

  function stockToggle() {
    stockChange(!checked);
  }

  return (
    <div className={classes.filters}>
      <Title />
      <OnlyStock
        checked={checked}
        handleChange={handleStockToggleChange}
        stockToggle={stockToggle}
      />
      <PriceRange
        min={convertedMin}
        max={convertedMax}
        value={value}
        handleChange={handleRangeChange}
        rangeSubmit={rangeSubmit}
      />
    </div>
  );
}

function Title() {
  return (
    <div className={classes.titleHolder}>
      <div className={classes.title}>
        <FilterAltRoundedIcon />
        <span>فیلتر ها</span>
      </div>
      <div className={classes.deleteFilters}>حذف همه</div>
    </div>
  );
}

function OnlyStock({ checked, handleChange, stockToggle }) {
  return (
    <div className={classes.onlyStock}>
      <div className={classes.title}>فقط کالاهای موجود</div>
      <Switch
        color="lightBlue"
        sx={{
          margin: "0px",
        }}
        checked={checked}
        onChange={stockToggle}
        inputProps={{
          "aria-label": "controlled",
        }}
      />
    </div>
  );
}

function PriceRange({ min, max, value, handleChange, rangeSubmit }) {
  return (
    <div className={classes.priceRange}>
      <div className={classes.prices}>
        <div className={classes.price}>{min + " تومان "}</div>
        <div>تا</div>
        <div className={classes.price}>{max + " تومان "}</div>
      </div>
      <div className={classes.sliderHolder}>
        <Slider
          color="lightBlue"
          sx={{}}
          getAriaLabel={() => "Minimum distance"}
          value={value}
          onChange={handleChange}
          disableSwap
        />
      </div>
      <Button
        variant="outlined"
        sx={{ width: "100%", mt: "10px" }}
        onClick={rangeSubmit}
      >
        اعمال محدودیت قیمت
      </Button>
    </div>
  );
}
