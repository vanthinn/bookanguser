import React from "react";
import CategoryItem from "../CategoryItem";
const categories = [
  {
    title: "This Week's Most Wanted",
    img: require("../../../../assets/images/cat4.jpg"),
  },
  {
    title: "Trainers & Sportwear  Sale Up to 70% off",
    img: require("../../../../assets/images/cat5.jpg"),
  },
  {
    title: "This Week'sMost Wanted",
    img: require("../../../../assets/images/cat2.jpg"),
  },
];

function Categories(props) {
  return (
    <div className="sm:app-container relative grid md:grid-cols-2 gap-5 min-h-[650px] overflow-hidden ">
      <CategoryItem
        vertical
        img={categories[0].img}
        title={categories[0].title}
        subTitle={"Trending now"}
        btnContent="DISCOVER NOW"
      />
      <div className="relative grid grid-row-2 gap-5">
        <CategoryItem
          img={categories[1].img}
          title={categories[1].title}
          subTitle={"Limited only"}
          btnContent="SHOP NOW"
        />
        <CategoryItem
          img={categories[2].img}
          title={categories[2].title}
          subTitle={"This Week we love..."}
          btnContent="DISCOVER NOW"
        />
      </div>
    </div>
  );
}

Categories.propTypes = {};

export default Categories;
