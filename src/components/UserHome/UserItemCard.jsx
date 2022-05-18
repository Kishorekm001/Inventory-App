import React from "react";
import noImage from "../assets/no-image.jpg";
import "./UseritemCard.css";

const UserItemCard = ({ item, data, setData }) => {
  return (
    <div className="user_main_item">
      <div className="user_item">
        <img
          style={{ width: "170px", height: "150px" }}
          src={item.imageUrl ? item.imageUrl : noImage}
          alt={item.imageUrl ? "Wrong Image URL" : null}
        />
        <div className="items">
          <h2> {item.title} </h2>
          <h4 className="brand_label">
            Brand: <span className="brand">{item.brand}</span>{" "}
          </h4>
          <h4>
            Quantity: <span className="quantity">{item.quantity}</span>{" "}
          </h4>
          <h4>
            {" "}
            price: <span className="price">{item.price}</span>{" "}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default UserItemCard;
