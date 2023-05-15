import React from "react";

import Categories from "./component/Categories";
import HomeBanner from "./component/HomeBanner";
import Social from "./component/Social";
import TrendingProduct from "./component/TrendingProduct";

function Home(props) {
  return (
    <div>
      <HomeBanner />
      <Categories />
      <TrendingProduct />
      <Social />
    </div>
  );
}

Home.propTypes = {};

export default Home;
