import React, { useState, useEffect } from "react";

import "./Add-Product.scss";

import Toast from "react-bootstrap/Toast";
import Button from "react-bootstrap/Button";

const AddProduct = ({ addNewProduct }) => {
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [productData, setProductData] = useState([]);

  const [newProduct, setNewProduct] = useState({
    img: "",
    info: "",
    expire: false,
    price: "",
    processor: "",
    ram: "",
    storage: "",
    display: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleFormSubmit = () => {
    if (isFormEmpty(newProduct)) return;

    const newProductData = {
      id: Math.random(),
      image: newProduct.img,
      info: newProduct.info,
      expire: newProduct.expire,
      price: newProduct.price,
      more: {
        processor: newProduct.processor,
        ram: newProduct.ram,
        storage: newProduct.storage,
        display: newProduct.display,
      },
    };

    setProductData([...productData, newProductData]);
    addNewProduct(newProductData);

    setNewProduct({
      img: "",
      info: "",
      expire: false,
      price: "",
      processor: "",
      ram: "",
      storage: "",
      display: "",
    });
  };

  const isFormEmpty = () => {
    const inputs = {
      info: newProduct.info,
      price: newProduct.price,
      processor: newProduct.processor,
      ram: newProduct.ram,
      storage: newProduct.storage,
      display: newProduct.display,
    };

    const inputsIndexes = Object.keys(inputs).forEach((input, index) => {
      if (input === "") {
        return index;
      }
    });

    if (inputsIndexes) {
      return true;
    }

    return !matchFileType(newProduct.img);
  };

  const matchFileType = (file) => {
    const extension = getExtension(file).toLowerCase();
    return /^(jpg|jpeg|png|gif|webp|tiff|bmp)$/.test(extension);
  };

  const getExtension = (file) => {
    return file.split(".").pop();
  };

  useEffect(() => {
    localStorage.setItem("dataKey", JSON.stringify(productData));
  }, [productData]);

  return (
    <>
      {!isFormVisible && (
        <Button onClick={() => setIsFormVisible(true)}>Add product</Button>
      )}
      <Toast
        className="add-product-popup"
        show={isFormVisible}
        onClose={() => setIsFormVisible(false)}
      >
        <Toast.Header>
          <strong className="mr-auto">Add a new product to the list</strong>
        </Toast.Header>

        <Toast.Body>
          <form>
            <div className="product-view">
              {/* Product Image */}
              <label htmlFor="img">
                Upload image: <br />
                <input
                  type="file"
                  accept="image/*"
                  id="product-img"
                  name="img"
                  value={newProduct.img}
                  onChange={handleInputChange}
                />
              </label>
              <hr />

              {/* Product Info */}
              <label htmlFor="info">
                Enter info about product:
                <input
                  type="text"
                  name="info"
                  value={newProduct.info}
                  onChange={handleInputChange}
                  id="product-info"
                />
              </label>
              <hr />

              {/* Product Expiration */}
              <div className="product-expiration">
                <label>Expires:</label>

                <input
                  type="radio"
                  name="expires"
                  value={!newProduct.expire}
                  onChange={handleInputChange}
                  id="product-expires-true"
                />
                <label htmlFor="expires">Yes</label>

                <input
                  type="radio"
                  name="expires"
                  value={!newProduct.expire}
                  onChange={handleInputChange}
                  id="product-expires-false"
                  checked
                />
                <label htmlFor="expires">No</label>
              </div>
              <hr />

              {/* Product Price */}

              <label htmlFor="price">
                Price:
                <input
                  type="text"
                  name="price"
                  value={newProduct.price}
                  onChange={handleInputChange}
                  id="product-price"
                />
              </label>
              <hr />
            </div>

            {/* Product More */}
            {/* Product Description */}

            <div className="description">
              {/* Processor */}
              <label
                htmlFor="processor"
                className="description__item description__processor"
              >
                Processor:
                <input
                  type="text"
                  name="processor"
                  value={newProduct.processor}
                  onChange={handleInputChange}
                  id="product-processor"
                />
              </label>

              {/* RAM */}
              <label
                htmlFor="ram"
                className="description__item description__ram"
              >
                RAM:
                <input
                  type="text"
                  name="ram"
                  value={newProduct.ram}
                  onChange={handleInputChange}
                  id="product-ram"
                />
              </label>

              {/* Storage */}
              <label
                htmlFor="storage"
                className="description__item description__store"
              >
                Storage:
                <input
                  type="text"
                  name="storage"
                  value={newProduct.storage}
                  onChange={handleInputChange}
                  id="product-storage"
                />
              </label>

              {/* Display */}
              <label
                htmlFor="display"
                className="description__item description__display"
              >
                Display:
                <input
                  type="text"
                  name="display"
                  value={newProduct.display}
                  onChange={handleInputChange}
                  id="product-display"
                />
              </label>
            </div>
            <hr />

            <Button
              onClick={handleFormSubmit}
              variant="primary"
              size="sm"
              style={{ width: "100%" }}
            >
              Add
            </Button>
          </form>
        </Toast.Body>
      </Toast>
    </>
  );
};

export default AddProduct;

