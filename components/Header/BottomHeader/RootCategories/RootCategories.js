import Link from "next/link";

import classes from "./rootCategories.module.scss";

export default function RootCategories({ categories, categoryHover }) {
  return (
    <div className={classes.root}>
      {categories.map((category, index) => (
        <Link
          href={`/category/${category.id}/${category.name}?sort=1&stock=0`}
          key={category.id}
          className={classes.category}
          onMouseEnter={() => categoryHover(category.id)}
          style={{
            borderRadius:
              index === categories.length - 1 ? "0 0 5px 0" : "0 0 0 0",
          }}
        >
          {category.persian_name}
        </Link>
      ))}
    </div>
  );
}
