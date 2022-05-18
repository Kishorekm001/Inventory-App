import axios from "axios";
import React, { useEffect, useState } from "react";
import AddItem from "../AddItem";
import ItemCard from "./ItemCard";

export default function Home() {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleOpenModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

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
  }, [showModal]);

  // const handle_AddItem = () => {
  //     e.preventDefault()
  // }

  return (
    <div>
      <h1> Inventory Application </h1>
      <div className="home_header">
        <AddItem
          open={handleOpenModal}
          close={handleCloseModal}
          showModal={showModal}
          setShowModal={setShowModal}
        />
        <input
          className="search"
          placeholder="Search...."
          onChange={searchInput}
        />
      </div>

      <div>
        {data.length ? (
          searchResult.length > 0 ? (
            searchResult.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                data={data}
                setData={setData}
                dataFetched={dataFetched}
              />
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
