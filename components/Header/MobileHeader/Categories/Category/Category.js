import { useRouter } from "next/router";
import { useChildCategories } from "../../../../../hooks/useCategories";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
//
import Button from "@mui/material/Button";

export default function Category({ category }) {
  const childCategories = useChildCategories(category.id);
  const router = useRouter();

  const categoryNavigateHandler = (c) => {
    const href = `/category/${c.id}/${c.name}`;
    router.push({
      pathname: href,
      query: {
        sort: 1,
        stock: 0,
      },
    });
  };

  return (
    <Accordion
      sx={{
        boxShadow: "none",
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={category.id}
        id={category.id}
      >
        <Typography style={{ fontWeight: "600" }}>
          {category.persian_name}
        </Typography>
      </AccordionSummary>
      <AccordionDetails
        style={{
          backgroundColor: "rgb(248, 248, 248",
        }}
      >
        <Button
          variant="text"
          style={{
            display: "block",
            width: "100%",
            textAlign: "right",
          }}
          onClick={() => categoryNavigateHandler(category)}
        >
          مشاهده این دسته بندی
        </Button>
        {childCategories.map((c) => (
          <Button
            key={c.id}
            variant="text"
            style={{
              display: "block",
              width: "100%",
              textAlign: "right",
              fontSize: "1rem",
              fontWeight: "600",
            }}
            onClick={() => categoryNavigateHandler(c)}
          >
            {c.persian_name}
          </Button>
        ))}
      </AccordionDetails>
    </Accordion>
  );
}
