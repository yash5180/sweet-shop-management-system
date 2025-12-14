import { useEffect, useState } from "react";
import api from "../api";

interface Sweet {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
}

const Admin = () => {
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    price: "",
    quantity: "",
    category: "",
  });

  useEffect(() => {
    loadSweets();
  }, []);

  const loadSweets = async () => {
    const res = await api.get("/sweets");
    setSweets(res.data);
  };

  /* ================= ADD ================= */
  const addSweet = async () => {
    try {
      await api.post("/sweets", {
        name: form.name,
        price: Number(form.price),
        quantity: Number(form.quantity),
        category: form.category,
      });

      resetForm();
      loadSweets();
      alert("Sweet added");
    } catch (err: any) {
      alert(err.response?.data?.message || "Add failed");
    }
  };

  /* ================= EDIT ================= */
  const startEdit = (sweet: Sweet) => {
    setEditingId(sweet._id);
    setForm({
      name: sweet.name,
      price: sweet.price.toString(),
      quantity: sweet.quantity.toString(),
      category: sweet.category,
    });
  };

  const updateSweet = async () => {
    if (!editingId) return;

    try {
      await api.put(`/sweets/${editingId}`, {
        name: form.name,
        price: Number(form.price),
        quantity: Number(form.quantity),
        category: form.category,
      });

      resetForm();
      setEditingId(null);
      loadSweets();
      alert("Sweet updated");
    } catch (err: any) {
      alert(err.response?.data?.message || "Update failed");
    }
  };

  /* ================= RESTOCK ================= */
  const restockSweet = async (id: string) => {
    try {
      await api.put(`/sweets/${id}/restock`, { amount: 10 });
      loadSweets();
    } catch {
      alert("Restock failed");
    }
  };

  /* ================= DELETE ================= */
  const deleteSweet = async (id: string) => {
    if (!window.confirm("Delete this sweet?")) return;
    await api.delete(`/sweets/${id}`);
    loadSweets();
  };

  const resetForm = () => {
    setForm({ name: "", price: "", quantity: "", category: "" });
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Admin Dashboard</h2>

      {/* ADD / EDIT FORM */}
      <div style={{ marginBottom: 30 }}>
        <h3>{editingId ? "Edit Sweet" : "Add Sweet"}</h3>

        <input placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <br />

        <input placeholder="Price"
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <br />

        <input placeholder="Quantity"
          type="number"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
        />
        <br />

        <input placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />
        <br /><br />

        {editingId ? (
          <>
            <button onClick={updateSweet}>Update</button>{" "}
            <button onClick={() => { resetForm(); setEditingId(null); }}>
              Cancel
            </button>
          </>
        ) : (
          <button onClick={addSweet}>Add Sweet</button>
        )}
      </div>

      {/* SWEET LIST */}
      {sweets.map((s) => (
        <div
          key={s._id}
          style={{
            border: "1px solid #ccc",
            padding: 10,
            marginBottom: 10,
            width: 300,
          }}
        >
          <b>{s.name}</b>
          <br />
          ₹{s.price} | Qty: {s.quantity}
          <br />
          Category: {s.category}
          <br /><br />

          <button onClick={() => startEdit(s)}>Edit</button>{" "}
          <button onClick={() => restockSweet(s._id)}>Restock</button>{" "}
          <button onClick={() => deleteSweet(s._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Admin;
