import React from "react";

function BannerItem({
  background,
  topSuggest,
  title,
  bottomSuggest,
  btnContent,
}) {
  const styleBackground = {
    background: `url(${background})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "50%",
    backgroundSize: "cover",
  };
  return (
    <div className="h-[100vh] relative items-center " style={styleBackground}>
      <div className="absolute top-[50%] translate-y-[-50%] left-0 right-0  mx-auto text-white">
        <span className="sm:text-[28px] md:text-3xl text-light ">
          {topSuggest}
        </span>
        <h1 className="text-white sm:text-7xl md:text-8xl mb-5"> {title}</h1>
        <span className="text-3xl text-light block">{bottomSuggest}</span>
        <button
          className=" border-[1px] px-4 py-2 rounded-[100px] mt-8 hover:text-blue-800 hover:bg-white transition ease-in-out duration-500"
          rouded
          outline
        >
          {btnContent}
        </button>
      </div>
    </div>
  );
}

export default BannerItem;
