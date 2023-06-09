import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Search() {
  const navigate = useNavigate();
  const location = useLocation();    //to find current URL path we use the hook useLocation
  const [keyword, setKeyword] = useState("");

  const searchHandler = (e) => {
    e.preventDefault();
    navigate(`/search/${keyword}`);
  };

//  clear the keyword after change route
const clearKeyword = ()=>{
  setKeyword('');
}

useEffect(()=>{
  if(location.pathname === '/'){
    clearKeyword();
  }
},[location])  //whenever the location will change we call clearKeyword function,so we pass location as dependency in useEffect Hook 

  return (
    <form onSubmit={searchHandler}>
      <div className="input-group">
        <input
          type="text"
          id="search_field"
          className="form-control"
          placeholder="Enter Product Name ..."
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
        />
        <div className="input-group-append">
          <button id="search_btn" className="btn">
            <i className="fa fa-search" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </form>
  );
}

export default Search;
