import React, { useState } from "react";
import { Select } from "antd";
import ProductItem from "../../../../component/ProductItem";
import ReactPaginate from "react-paginate";
import ProductSkeleton from "../../../../component/ProductSkeleton";

function ListProduct(props) {
  const { listproduct, onSortPrice, isloading } = props;

  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 9;

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = listproduct.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(listproduct.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % listproduct.length;
    setItemOffset(newOffset);
    window.scrollTo(0, 0);
  };

  function handleSortPrice(value) {
    onSortPrice(value);
  }

  const x = window.screen.width;

  // function handleSortMostRate(value) {
  //   onSortMostRate(value);
  // }

  return (
    <div className="flex flex-col">
      <div className="flex justify-between ">
        <h1>
          Showing{" "}
          <span className="text-yellow-700 font-semibold  ">
            of {listproduct.length}
          </span>{" "}
          Products
        </h1>
        <div className="flex items-center gap-3">
          <div className="flex items-center">
            {/* <h1 className="mr-4 text-gray-500">Sort by:</h1> */}
            {/* <Select
              placeholder="Rate"
              className="w-[120px]"
              options={[
                {
                  value: "Most rate",
                  label: "Most rate",
                },
              ]}
              onChange={(value) => handleSortMostRate(value)}
            /> */}
          </div>
          <div className="flex items-center">
            <h1 className="mr-4 text-gray-500">Order by:</h1>
            <Select
              className="w-[170px]"
              placeholder="Price"
              options={[
                {
                  value: "Highest to lowest",
                  label: "Highest to lowest",
                },
                {
                  value: "Lowest to highest",
                  label: "Lowest to highest",
                },
              ]}
              onChange={(value) => handleSortPrice(value)}
            />
          </div>
        </div>
      </div>

      <div className=" mt-5 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isloading && <ProductSkeleton count={736 < x < 1024 ? 8 : 9} />}
        {currentItems.map((product) => (
          <div key={product.slug}>
            <ProductItem product={product} />
          </div>
        ))}
      </div>

      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        containerClassName="mt-5 flex justify-center items-center gap-3  text-base"
        pageLinkClassName=" w-[100%] cursor-pointer  pointer-events-auto; border-[1px] w-[32px] h-[30px] flex justify-center items-center rounded-[2px] "
        activeLinkClassName="text-white bg-blue-500"
        nextClassName="border-[1px] w-[32px] h-[30px] text-xl"
        previousClassName="border-[1px] w-[32px] h-[30px] text-xl"
      />
    </div>
  );
}

ListProduct.propTypes = {};

export default ListProduct;
