import React, { useState } from "react";
import axios from "axios";
import "./AddProducts.css";

// Category → Type → Attributes mapping


const REACT_URL = process.env.REACT_APP_API_URL;
const categoryTypeAttributes = {
  electronics: {
    smartphone: ["brand", "RAM", "storage", "battery", "color"],
    laptop: ["brand", "processor", "RAM", "storage", "screenSize"],
    tablet: ["brand", "screenSize", "RAM", "storage", "battery"],
    television: ["brand", "screenSize", "resolution", "type"],
    camera: ["brand", "type", "megapixels", "lens"],
    headphones: ["brand", "type", "connectivity", "color"],
  },
  clothing: {
    shirt: ["size", "color", "material", "fit"],
    jeans: ["size", "color", "material", "style"],
    tshirt: ["size", "color", "material", "fit"],
    shoes: ["size", "material", "color", "style"],
    jacket: ["size", "material", "color", "season"],
    saree: ["fabric", "color", "occasion", "length"],
  },
  books: {
    novel: ["author", "pages", "publisher", "language"],
    textbook: ["author", "edition", "subject", "pages"],
    comics: ["author", "illustrator", "publisher", "pages"],
    magazine: ["title", "issue", "publisher", "language"],
  },
  grocery: {
    fruits: ["weight", "origin", "organic"],
    vegetables: ["weight", "origin", "organic"],
    dairy: ["brand", "fatContent", "expiryDate"],
    snacks: ["brand", "flavor", "weight"],
    beverages: ["brand", "flavor", "size"],
  },
  sports: {
    cricketBat: ["brand", "material", "weight"],
    football: ["brand", "size", "material"],
    tennisRacket: ["brand", "weight", "gripSize"],
    badminton: ["brand", "weight", "material"],
    bicycle: ["brand", "type", "frameSize"],
  },
  medical: {
    medicine: ["brand", "dosage", "expiryDate"],
    equipment: ["name", "material", "usage"],
    supplements: ["brand", "quantity", "expiryDate"],
  },
  "home-appliances": {
    washingMachine: ["brand", "capacity", "type"],
    refrigerator: ["brand", "capacity", "energyRating"],
    microwave: ["brand", "capacity", "type"],
    airConditioner: ["brand", "capacity", "energyRating"],
    vacuumCleaner: ["brand", "type", "power"],
  },
  toys: {
    car: ["material", "dimensions", "ageGroup"],
    doll: ["material", "height", "ageGroup"],
    puzzle: ["pieces", "ageGroup", "material"],
    boardGame: ["players", "ageGroup", "duration"],
  },
  furniture: {
    bed: ["material", "size", "color"],
    sofa: ["material", "seatingCapacity", "color"],
    table: ["material", "dimensions", "type"],
    chair: ["material", "color", "type"],
  },
  beauty: {
    skincare: ["brand", "type", "skinType", "expiryDate"],
    makeup: ["brand", "shade", "type"],
    haircare: ["brand", "type", "quantity"],
    perfume: ["brand", "fragrance", "size"],
  },
};

const Addproduct = () => {
  const [product, setProduct] = useState({
    name: "",
    category: "",
    type: "",
    price: "",
    stock: "",
    description: "",
    images: [], // multiple images
    attributes: {},
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "category" ? { type: "", attributes: {} } : {}),
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setProduct((prev) => ({ ...prev, images: files }));
  };

  const handleAttributeChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      attributes: { ...prev.attributes, [name]: value },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const [key, value] of Object.entries(product)) {
      if (key === "attributes") {
        formData.append("attributes", JSON.stringify(value));
      } else if (key === "images") {
        value.forEach((file) => formData.append("images", file));
      } else {
        formData.append(key, value);
      }
    }

    try {
      const response = await axios.post(
        `${REACT_URL}/api/admin/add-product`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert(" Product added successfully!");
      console.log(response.data);

      setProduct({
        name: "",
        category: "",
        type: "",
        price: "",
        stock: "",
        description: "",
        images: [],
        attributes: {},
      });
      e.target.reset();
    } catch (err) {
      console.error(" Upload failed:", err);
      alert(err.response?.data?.msg || "Failed to add product");
    }
  };

  const renderAttributesFields = () => {
    if (!product.category || !product.type) return null;
    const attrs = categoryTypeAttributes[product.category]?.[product.type] || [];
    return attrs.map((attr) => (
      <input
        key={attr}
        name={attr}
        placeholder={attr.charAt(0).toUpperCase() + attr.slice(1)}
        onChange={handleAttributeChange}
      />
    ));
  };

  return (
    <div className="add-product-container">
      <div className="add-product">
        <h2>Add New Product</h2>
        <form onSubmit={handleSubmit} className="add-product-form">
          <select name="category" value={product.category} onChange={handleChange} required>
            <option value="">Select Category</option>
            {Object.keys(categoryTypeAttributes).map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>

          {product.category && (
            <select name="type" value={product.type} onChange={handleChange} required>
              <option value="">Select Type</option>
              {Object.keys(categoryTypeAttributes[product.category]).map((type) => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          )}

          <input type="text" name="name" placeholder="Product Name" value={product.name} onChange={handleChange} required />
          <input type="number" name="price" placeholder="Price" value={product.price} onChange={handleChange} required />
          <input type="number" name="stock" placeholder="Stock Quantity" value={product.stock} onChange={handleChange} required />
          <textarea name="description" placeholder="Description" value={product.description} onChange={handleChange} required />

          {/* Dynamic attributes */}
          {renderAttributesFields()}

          <input type="file" accept="image/*" name="images" onChange={handleImageChange} multiple required />

          <button type="submit">Add Product</button>
        </form>
      </div>
    </div>
  );
};

export default Addproduct;