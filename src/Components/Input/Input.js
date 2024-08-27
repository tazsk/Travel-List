import { useState } from "react";
import "./Input.css";
import { v4 as uuidv4 } from "uuid";
import PackagingList from "../PackagingList/PackagingList";

const Input = () => {
  const [quantity, setQuantity] = useState(1);
  const [object, setObject] = useState("");
  const [items, setItems] = useState([]);

  const handleDelete = (id) => {
    setItems((items) => items.filter((item) => item.id !== id));
  };

  const handleToggle = (id) => {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!object) return;

    const newItem = { object, quantity, packed: false, id: uuidv4() };
    setItems((items) => [...items, newItem]);
    setQuantity(1);
    setObject("");
  };

  const handleClear = () => {
    setItems([]);
  };

  return (
    <>
      <form className="input" onSubmit={handleSubmit}>
        <h3>Choose your packing items:</h3>
        <select
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        >
          {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
            <option>{num}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Enter packing item..."
          value={object}
          onChange={(e) => setObject(e.target.value)}
        />
        <button>Add</button>
      </form>
      <PackagingList
        items={items}
        onDelete={handleDelete}
        onToggleItem={handleToggle}
        onHandleClear={handleClear}
      />
    </>
  );
};

export default Input;
