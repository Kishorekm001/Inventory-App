import React, { useState } from "react";
import Button from "@mui/material/Button";

const EditItem = ({ item, dataFetched, update, setUpdate }) => {
  // console.log("items-->", item);

  const [input, setInput] = useState(item);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:3000/E_data/${input.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });
    if (res.ok) {
      dataFetched();
      setUpdate(false);
    }
  };

  return (
    <div>
      <form className="edit_form">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          placeholder="Enter Title"
          onChange={handleChange}
          value={input.title}
        />

        <label htmlFor="brand">Brand Name</label>
        <input
          type="text"
          name="brand"
          placeholder="Enter Brand"
          onChange={handleChange}
          value={input.brand}
        />

        <div className="small">
          <div>
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              className="quantity_edit"
              name="quantity"
              placeholder="Enter Quantity"
              onChange={handleChange}
              value={input.quantity}
            />
          </div>

          <div>
            <label htmlFor="price" className="price_edit_label">
              Price
            </label>
            <input
              type="text"
              className="price_edit"
              name="price"
              placeholder="Enter Price"
              value={input.price}
            />
          </div>
        </div>
        <label htmlFor="imageUrl">Image Url</label>
        <input
          type="url"
          name="imageUrl"
          placeholder="Enter Image Url"
          onChange={handleChange}
          value={input.imageUrl}
        />

        <footer>
          <Button
            variant="outlined"
            type="submit"
            color="success"
            sx={{ mt: 2.5, ml: 5, width: 2 }}
            onClick={handleUpdate}
            className="save"
          >
            Save
          </Button>
          <Button
            variant="outlined"
            color="error"
            sx={{ mt: 2.5, ml: 2, width: 2 }}
            onClick={() => {
              setUpdate(false);
            }}
            className="cancel"
          >
            Cancel
          </Button>
        </footer>
      </form>
    </div>
  );
};

export default EditItem;
