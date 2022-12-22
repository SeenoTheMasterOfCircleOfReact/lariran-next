import Link from "next/link";

import { useChildCategories } from "../../../../../hooks/useCategories";

export default function Child({ category }) {
  const childCategories = useChildCategories(category.id);

  const style = {
    height: "20px",
    lineHeight: "10px",
    margin: "10px 0",
    width: "200px",
    borderRight: "3px solid #d52901",
    padding: "5px",
    color: "#333",
    fontWeight: "600",
    fontSize: ".9rem",
    display: "block",
  };

  return (
    <>
      <Link
        href={`/category/${category.id}/${category.name}?sort=1&stock=0`}
        style={style}
      >
        {category.persian_name}
      </Link>
      {childCategories.map((c) => (
        <div key={c.id}>{c.persian_name}</div>
      ))}
    </>
  );
}
