import { useState } from "react";
import "./PackagingList.css";
import "./Footer.css";

const PackagingList = ({ items, onDelete, onToggleItem, onHandleClear }) => {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") sortedItems = items;

  if (sortBy === "packed") {
    sortedItems = items
      .slice()
      .sort((a, b) => Number(b.packed) - Number(a.packed));
  }

  return (
    <>
      <ul className="packaging_list">
        {sortedItems.map((item) => (
          <li key={item.id}>
            <input
              type="checkbox"
              value={item.packed}
              onChange={() => onToggleItem(item.id)}
            />
            <span style={item.packed ? { textDecoration: "line-through" } : {}}>
              {item.quantity} {item.object}
            </span>
            <button className="cross_btn" onClick={() => onDelete(item.id)}>
              ❌
            </button>
          </li>
        ))}
      </ul>
      <div className="footer">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort items by input order</option>
          <option value="packed">Sort items by packed status</option>
        </select>
        <button onClick={onHandleClear}>Clear List</button>
      </div>
    </>
  );
};

export default PackagingList;
