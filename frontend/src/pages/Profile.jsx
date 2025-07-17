import { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ name: "", email: "" });
  const nav = useNavigate();

  useEffect(() => {
    API.get("/students/me")
      .then((res) => {
        setUser(res.data);
        setEditData({ name: res.data.name, email: res.data.email });
      })
      .catch(() => nav("/login"))
      .finally(() => setLoading(false));
  }, []);

  const handlePay = () => nav("/pay");

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
    setEditData({ name: user.name, email: user.email });
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const res = await API.put("/students/me", editData);
      setUser(res.data);
      setIsEditing(false);
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl text-center text-cyan-400 font-bold mb-6">Student Profile</h2>

        {isEditing ? (
          <>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-300 mb-1">Name</label>
              <input
                name="name"
                value={editData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-300 mb-1">Email</label>
              <input
                name="email"
                value={editData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="w-full bg-green-500 hover:bg-green-600 transition text-white font-semibold py-2 px-4 rounded-xl"
              >
                Save
              </button>
              <button
                onClick={handleEditToggle}
                className="w-full bg-gray-600 hover:bg-gray-700 transition text-white font-semibold py-2 px-4 rounded-xl"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="mb-2">
              <span className="font-semibold text-gray-300">Name:</span> {user.name}
            </p>
            <p className="mb-2">
              <span className="font-semibold text-gray-300">Email:</span> {user.email}
            </p>
            <p className="mb-4">
              <span className="font-semibold text-gray-300">Fees Paid:</span>{" "}
              {user.feesPaid ? (
                <span className="text-green-400 font-semibold">Yes</span>
              ) : (
                <span className="text-red-400 font-semibold">No</span>
              )}
            </p>

            <div className="flex gap-2">
              <button
                onClick={handleEditToggle}
                className="w-full bg-yellow-500 hover:bg-yellow-600 transition text-white font-semibold py-2 px-4 rounded-xl"
              >
                Edit Profile
              </button>
              {!user.feesPaid && (
                <button
                  onClick={handlePay}
                  className="w-full bg-cyan-500 hover:bg-cyan-600 transition text-white font-semibold py-2 px-4 rounded-xl"
                >
                  Pay Fees
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
