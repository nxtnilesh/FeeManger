import { useEffect, useState } from "react";
import API from "../api/api";

export default function AllStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/students")
      .then((res) => setStudents(res.data))
      .catch(() => setStudents([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <h2 className="text-3xl font-semibold text-center mb-6 text-cyan-400">All Students</h2>

      {loading ? (
        <div className="text-center text-gray-400">Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-700 rounded-lg overflow-hidden">
            <thead className="bg-gray-800">
              <tr>
                <th className="py-2 px-4 border-b border-gray-700">Name</th>
                <th className="py-2 px-4 border-b border-gray-700">Email</th>
                <th className="py-2 px-4 border-b border-gray-700">Fees Paid</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s._id} className="hover:bg-gray-700 transition">
                  <td className="py-2 px-4 border-b border-gray-700">{s.name}</td>
                  <td className="py-2 px-4 border-b border-gray-700">{s.email}</td>
                  <td className="py-2 px-4 border-b border-gray-700">
                    {s.feesPaid ? (
                      <span className="text-green-400 font-semibold">Yes</span>
                    ) : (
                      <span className="text-red-400 font-semibold">No</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
