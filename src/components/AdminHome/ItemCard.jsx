import React, { useState } from "react";
import EditItem from "../EditItem";
import noImage from "../assets/no-image.jpg";
import { BiRupee } from "react-icons/bi";

const ItemCard = ({ item, data, setData, dataFetched }) => {
  const [update, setUpdate] = useState(false);

  const handleDelete = async (id) => {
    await fetch(`http://localhost:3000/E_data/${item.id}`, {
      method: "DELETE",
    });
    setData(data.filter((item) => item.id !== id));
    dataFetched();
  };

  return (
    <div className="item_main">
      {update ? (
        <EditItem
          item={item}
          data={data}
          setData={setData}
          dataFetched={dataFetched}
          update={update}
          setUpdate={setUpdate}
        />
      ) : (
        <>
          <div className="item_card">
            <div className="item_data">
              <img
                style={{ width: "170px", height: "150px" }}
                src={item.imageUrl ? item.imageUrl : noImage}
                alt={item.imageUrl ? "Wrong Image URL" : null}
              />
              <div>
                <h2> {item.title} </h2>
                <h4>
                  Brand: <span className="brand">{item.brand}</span>{" "}
                </h4>
                <h4>
                  Quantity: <span className="quantity">{item.quantity}</span>{" "}
                </h4>
                <h4>
                  {" "}
                  price:{" "}
                  <span className="price">
                    <BiRupee className="rupee" /> {item.price}
                  </span>{" "}
                </h4>
              </div>
            </div>
            <footer>
              <button className="dlt_btn" onClick={handleDelete}>
                Delete
              </button>
              <button
                className="edt_btn"
                onClick={() => {
                  setUpdate(true);
                }}
              >
                Edit
              </button>
            </footer>
          </div>
        </>
      )}
    </div>
  );
};

export default ItemCard;
