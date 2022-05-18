import axios from "axios";
import React, { useEffect, useState } from "react";
import UserItemCard from "./UserItemCard";
import "./UserHome.css";

function UserHome() {
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const searchInput = (e) => {
    setSearchValue(e.target.value);
  };

  const searchResult = data.filter((item) =>
    item.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  const dataFetched = () => {
    axios
      .get("http://localhost:3000/E_data")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    dataFetched();
  }, []);

  // const handle_AddItem = () => {
  //     e.preventDefault()
  // }

  return (
    <div className="User_main">
      <header className="header">
        <h1> Inventory Application </h1>

        <div className="home_header">
          <input
            className="search"
            placeholder="Search...."
            onChange={searchInput}
          />
        </div>
      </header>

      <div>
        {data.length ? (
          searchResult.length > 0 ? (
            searchResult.map((item) => (
              <UserItemCard key={item.id} item={item} />
            ))
          ) : (
            <h1>No Items Found</h1>
          )
        ) : (
          <h1>No Items</h1>
        )}
      </div>
    </div>
  );
}

export default UserHome;
