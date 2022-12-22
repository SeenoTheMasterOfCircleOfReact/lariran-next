import React from "react";

import { useRootCategories } from "../../../../hooks/useCategories";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Category from "./Category/Category";

export default function Categories() {
  const rootCategories = useRootCategories();
  return (
    <div>
      {rootCategories.map((category) => (
        <Category key={category.id} category={category} />
      ))}
    </div>
  );
}
