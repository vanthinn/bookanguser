import React, { useState } from "react";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { ClearAll } from "../../app/CartSlice";

function NavMobile(props) {
  const { onClosenav, ismoble } = props;
  const islogin = useSelector((state) => state.auth.isLogin);
  const username = useSelector((state) => state.auth.username);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [valuesSearch, setValuesSearch] = useState("");

  function handleLogout() {}

  return (
    <div className="relative w-full">
      {ismoble && (
        <div
          className={`fixed top-0 right-0 left-0 bottom-0 bg-[#333]/50 z-[300] transition-all duration-500 ease-linear`}
          onClick={() => onClosenav()}
        ></div>
      )}

      <div
        className={`fixed top-0 left-0 bottom-0 min-h-[100vh] z-[400] sm:w-full sm:overflow-y-hidden md:w-[50%] flex flex-col bg-[#333] text-white px-6 transition-all duration-500 ease-linear 
          ${ismoble ? "translate-x-0" : "translate-x-[-100%]"}`}
      >
        <button
          className="text-right mt-3 font-thin hover:text-red-500 text-2xl"
          onClick={() => onClosenav()}
        >
          X
        </button>
        <div className="relative my-4  overflow-hidden">
          <input
            type="text"
            className=" w-full bg-transparent outline-none border-[1px]
             border-slate-600 px-2 py-2 placeholder:text-white rounded 
             overflow-hidden"
            placeholder="Search product..."
            value={valuesSearch}
            onChange={(e) => setValuesSearch(e.target.value)}
          />
          <FaSearch
            className="absolute top-0 right-0 z-20 bg-blue-700 
          h-[100%] rounded-r w-[46px] p-3 hover:cursor-pointer hover:bg-blue-700/80
          "
            onClick={() => {
              navigate(`/products/search${valuesSearch}`);
              window.scrollTo(0, 0);
              onClosenav();
            }}
          />
        </div>
        <nav
          className="text-xl text-left mt-4 pb-1 hover:text-blue-600 cursor-pointer transitions-theme border-b-[1px] border-slate-600"
          onClick={() => {
            navigate("/home");
            window.scrollTo(0, 0);
            onClosenav();
          }}
        >
          Home
        </nav>
        <nav
          className="text-xl text-left mt-4 pb-1 hover:text-blue-600 cursor-pointer transitions-theme border-b-[1px] border-slate-600"
          onClick={() => {
            navigate("/products");
            window.scrollTo(0, 0);
            onClosenav();
          }}
        >
          Product
        </nav>
        <nav
          className="text-xl text-left mt-4 pb-1 hover:text-blue-600 cursor-pointer transitions-theme border-b-[1px] border-slate-600"
          onClick={() => {
            navigate("/contact");
            window.scrollTo(0, 0);
            onClosenav();
          }}
        >
          Contact
        </nav>

        {!islogin && (
          <button
            type="button"
            className="mt-12 bg-blue-600 py-2 text-lg rounded-lg"
            onClick={() => {
              navigate("/login");
              window.scrollTo(0, 0);
              onClosenav();
            }}
          >
            Login
          </button>
        )}
        {islogin && (
          <div className="mt-10">
            <div className="flex gap-2 items-center justify-center">
              <FaUserCircle className="text-xl" />
              <span className="text-lg">{username}</span>
            </div>
            <button
              type="button"
              className=" mt-4 w-full bg-red-500 py-2 text-lg rounded-lg hover:opacity-90"
              onClick={() => handleLogout()}
            >
              Log out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

NavMobile.propTypes = {};

export default NavMobile;
