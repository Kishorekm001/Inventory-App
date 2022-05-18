import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";

const AddItem = ({ showModal, setShowModal, open, close }) => {
  const [input, setInput] = useState({});

  const checking =
    input["title"] && input["brand"] && input["quantity"] && input["price"]
      ? false
      : true;

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  // console.log("input values--->",input);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('submitted',input);
    const res = await fetch("http://localhost:3000/E_data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });

    console.log(res);

    if (res.ok) {
      close();
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    height: 380,
    bgcolor: "background.paper",
    // border: '2px solid #000',
    outline: "none",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  };

  // Modal.setAppElement('#root');
  return (
    <div id="root">
      <button className="add_btn" type="submit" onClick={open}>
        Add Item
      </button>

      <Modal
        open={showModal}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6" component="h2" sx={{ mt: -2 }}>
            Adding New Item
            {/* <GrClose className="close_btn" onClick={handleCloseModal} />  */}
            <CloseIcon
              className="close_btn"
              onClick={close}
              sx={{ fontSize: 30 }}
            />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form className="add_form" onSubmit={handleSubmit}>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                placeholder="Enter Title"
                onChange={handleChange}
              />

              <label htmlFor="brand">Brand Name</label>
              <input
                type="text"
                name="brand"
                placeholder="Enter Brand"
                onChange={handleChange}
              />

              <label htmlFor="quantity">Quantity</label>
              <input
                type="number"
                className="quantity_add"
                name="quantity"
                placeholder="Enter Quantity"
                onChange={handleChange}
              />

              <label htmlFor="price" className="price_add_label">
                Price
              </label>
              <input
                type="text"
                className="price_add"
                name="price"
                placeholder="Enter Price"
                onChange={handleChange}
              />

              <label htmlFor="imageUrl">Image Url</label>
              <input
                type="url"
                name="imageUrl"
                placeholder="Enter Image Url"
                onChange={handleChange}
              />

              <Button
                variant="contained"
                type="submit"
                color="success"
                sx={{ mt: 2, ml: 1.5, width: 2 }}
                disabled={checking}
              >
                Save
              </Button>
            </form>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default AddItem;
