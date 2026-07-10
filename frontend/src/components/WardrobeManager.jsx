import { useEffect, useState } from "react";
import {
  getWardrobe,
  addWardrobeItem,
  deleteWardrobeItem,
} from "../services/wardrobeService";
import { toast } from "react-toastify";
import { GiShirt, GiRunningShoe, GiBilledCap } from "react-icons/gi";

import { FiTrash2 } from "react-icons/fi";
import { PiPants } from "react-icons/pi";

export default function WardrobeManager({ weatherType }) {
  const [items, setItems] = useState([]);
  const weatherItems = items.filter((item) =>
    item.seasons.includes(weatherType),
  );

  const groupedItems = {
    Top: weatherItems.filter((i) => i.category === "Top"),
    Bottom: weatherItems.filter((i) => i.category === "Bottom"),
    Footwear: weatherItems.filter((i) => i.category === "Footwear"),
    Accessory: weatherItems.filter((i) => i.category === "Accessory"),
  };
  const [form, setForm] = useState({
    category: "Top",
    name: "",
    color: "",
    seasons: [],
  });

  const loadWardrobe = async () => {
    const data = await getWardrobe();
    setItems(data);
  };

  const toggleSeason = (season) => {
    if (form.seasons.includes(season)) {
      setForm({
        ...form,
        seasons: form.seasons.filter((s) => s !== season),
      });
    } else {
      setForm({
        ...form,
        seasons: [...form.seasons, season],
      });
    }
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) return;

    await addWardrobeItem(form);
    toast.success("Item added to wardrobe.");
    setForm({
      category: "Top",
      name: "",
      color: "",
      seasons: [],
    });

    loadWardrobe();
  };

  const remove = async (id) => {
    await deleteWardrobeItem(id);

    loadWardrobe();
  };

  const seasons = ["Hot", "Warm", "Cold", "Rainy", "Snowy"];

  const categories = [
    {
      name: "Top",
      icon: <GiShirt />,
    },
    {
      name: "Bottom",
      icon: <PiPants />,
    },
    {
      name: "Footwear",
      icon: <GiRunningShoe />,
    },
    {
      name: "Accessory",
      icon: <GiBilledCap />,
    },
  ];

  useEffect(() => {
    loadWardrobe();
  }, []);
  
  return (
    <section className="glass-card wardrobe-section">
      <h2>My Wardrobe</h2>

      <form onSubmit={submit} className="wardrobe-form">
        <input
          placeholder="Clothing Name"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
        />

        <input
          placeholder="Color"
          value={form.color}
          onChange={(e) =>
            setForm({
              ...form,
              color: e.target.value,
            })
          }
        />

        <select
          value={form.category}
          onChange={(e) =>
            setForm({
              ...form,
              category: e.target.value,
            })
          }
        >
          <option>Top</option>
          <option>Bottom</option>
          <option>Footwear</option>
          <option>Accessory</option>
        </select>

        <div className="season-grid">
          {["Hot", "Warm", "Cold", "Rainy", "Snowy"].map((season) => (
            <button
              type="button"
              key={season}
              className={
                form.seasons.includes(season)
                  ? "season-btn active"
                  : "season-btn"
              }
              onClick={() => toggleSeason(season)}
            >
              {season}
            </button>
          ))}
        </div>

        <button className="save-btn">Add To My Wardrobe</button>
      </form>
      <h3
        style={{
          marginTop: "50px",
          marginBottom: "22px",
        }}
      >
        My Wardrobe
      </h3>

      <div className="wardrobe-category-grid">
        {categories.map((category) => (
          <div
            key={category.name}
            className="wardrobe-category-card glass-card"
          >
            <div className="wardrobe-category-header">
              <span className="category-icon">{category.icon}</span>

              <h3>{category.name}</h3>
            </div>

            <div className="wardrobe-scroll">
              {seasons.map((season) => {
                const seasonItems = items.filter(
                  (item) =>
                    item.category === category.name &&
                    item.seasons.includes(season),
                );

                return (
                  <div key={season} className="season-block">
                    <h4>{season}</h4>

                    {seasonItems.length === 0 ? (
                      <p className="empty-season">No items</p>
                    ) : (
                      seasonItems.map((item) => (
                        <div key={item._id} className="wardrobe-list-item">
                          <div>
                            <strong>{item.name}</strong>

                            <small>{item.color}</small>
                          </div>

                          <FiTrash2
                            className="delete-icon"
                            onClick={() => remove(item._id)}
                          />
                        </div>
                      ))
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <h3
        style={{
          marginTop: "35px",
          marginBottom: "25px",
        }}
      >
        Choose Any Combo For Today's Weather
      </h3>

      <div className="wardrobe-grid">
        {Object.entries(groupedItems).map(([category, list]) => (
          <div className="wardrobe-item" key={category}>
            <h4>{category}</h4>

            {list.length ? (
              <ul className="wardrobe-list">
                {list.map((item) => (
                  <li key={item._id}>
                    <strong>{item.name}</strong>

                    <span>{item.color}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No suitable {category.toLowerCase()} available.</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
