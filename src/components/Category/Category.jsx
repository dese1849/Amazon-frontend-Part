import React from "react";
import { categoryInfos } from "./CategoryFullInfo";
import CategoryCard from "./CategoryCard";
import classes from "./Category.module.css";

function Category() {
  return (
    <div className={classes.category_conatiner}>
      {categoryInfos.map((info, id) => (
        <CategoryCard key={id} data={info} />
      ))}
    </div>
  );
}
// Wrapped the CategoryCard component inside parentheses () to ensure it is returned from the arrow function.

export default Category;
