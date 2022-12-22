import { useBreadcrumbs } from "../../../../hooks/useCategories";
import Breadcrumbs from "@mui/material/Breadcrumbs";

import classes from "./breadcrumbsHolder.module.scss";
import Breadcrumb from "./Breadcrumb/Breadcrumb";
import Link from "next/link";

export default function BreadcrumbsHolder({ category }) {
  const breadcrumbs = useBreadcrumbs(category);

  return (
    <div className={classes.breadcrumbs}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link href="/">
          <div
            style={{
              fontWeight: "400",
              fontSize: "0.85rem",
              color: "#333",
              border: "1px solid #333",
              borderRadius: "40px",
              padding: "2px 10px",
              backgroundColor: "#ddd",
            }}
          >
            لاریران
          </div>
        </Link>
        {breadcrumbs?.map((breadcrumb, index) => {
          const current = index === breadcrumbs.length - 1;
          return (
            <Breadcrumb
              key={breadcrumb.id}
              category={breadcrumb}
              current={current}
            />
          );
        })}
      </Breadcrumbs>
    </div>
  );
}
