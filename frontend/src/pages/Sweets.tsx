import { useEffect, useState } from "react";
import api from "../api";
import Toast from "../components/Toast";
import { getSweetImage } from "../utils/sweetimages";

interface Sweet {
  _id: string;
  name: string;
  price: number;
  quantity: number;
}

const Sweets = () => {
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [search, setSearch] = useState("");
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    msg: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    fetchSweets();
  }, []);

  const fetchSweets = async () => {
    try {
      const res = await api.get("/sweets");
      setSweets(res.data);
    } catch {
      setToast({ msg: "Failed to load sweets", type: "error" });
    }
  };

  const purchase = async (id: string) => {
    try {
      setLoadingId(id);
      await api.post(`/sweets/${id}/purchase`);

      setToast({
        msg: "🎉 Sweet purchased successfully!",
        type: "success",
      });

      fetchSweets();
    } catch {
      setToast({
        msg: "❌ Purchase failed",
        type: "error",
      });
    } finally {
      setLoadingId(null);
      setTimeout(() => setToast(null), 2000);
    }
  };

  const filtered = sweets.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h2 className="title">🍬 Available Sweets</h2>

      <input
        className="search"
        placeholder="Search sweets..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid">
        {filtered.map((s) => (
          <div className="card" key={s._id}>
            {/* IMAGE */}
            <img
              src={getSweetImage(s.name)}
              alt={s.name}
              className="sweet-img"
            />

            <h3>{s.name}</h3>
            <p className="price">₹{s.price}</p>
            <p className="qty">Qty: {s.quantity}</p>

            <button
              className={`btn ${
                s.quantity === 0 ? "btn-disabled" : "btn-primary"
              }`}
              disabled={s.quantity === 0 || loadingId === s._id}
              onClick={() => purchase(s._id)}
            >
              {s.quantity === 0
                ? "Out of Stock"
                : loadingId === s._id
                ? "Processing..."
                : "Purchase"}
            </button>
          </div>
        ))}
      </div>

      {/* TOAST */}
      {toast && <Toast message={toast.msg} type={toast.type} />}
    </div>
  );
};

export default Sweets;
