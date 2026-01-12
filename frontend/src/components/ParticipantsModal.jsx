import { useEffect, useMemo, useState } from "react";
import API from "../api/api";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const ITEMS_PER_PAGE = 20;

const ParticipantsModal = ({ event, onClose }) => {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch participants
  useEffect(() => {
    if (!event) return;
    setLoading(true);
    API.get(`/registrations/event/${event._id}`)
      .then(res => setParticipants(res.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [event]);

  // Search filter
  const filteredParticipants = useMemo(() => {
    return participants.filter(
      p =>
        p.studentName?.toLowerCase().includes(search.toLowerCase()) ||
        p.phone?.includes(search) ||
        p.transactionId?.toLowerCase().includes(search.toLowerCase())
    );
  }, [participants, search]);

  // Reset page when search changes
  useEffect(() => setCurrentPage(1), [search]);

  const totalPages = Math.ceil(filteredParticipants.length / ITEMS_PER_PAGE);
  const paginatedParticipants = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredParticipants.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredParticipants, currentPage]);

  const pageAmount = paginatedParticipants.reduce(
    (sum, p) => sum + (Number(p.amountPaid) || 0),
    0
  );

  // CSV export
  const exportCSV = () => {
    const headers = ["Name", "Phone", "Transaction", "Amount"];
    const rows = filteredParticipants.map(p => [
      p.studentName,
      p.phone,
      p.transactionId,
      p.amountPaid,
    ]);
    const csv =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map(r => r.join(",")).join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = `${event.title}_participants.csv`;
    link.click();
  };

  // PDF export
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text(`Participants – ${event.title}`, 14, 15);
    autoTable(doc, {
      startY: 20,
      head: [["Name", "Phone", "Transaction", "Amount"]],
      body: filteredParticipants.map(p => [
        p.studentName,
        p.phone,
        p.transactionId,
        `₹${p.amountPaid}`,
      ]),
    });
    doc.save(`${event.title}_participants.pdf`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="w-[95%] md:w-[90%] max-h-[90vh] bg-gradient-to-br from-indigo-100/70 via-purple-100/60 to-pink-100/60 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden scale-95 animate-scaleIn">
        
        {/* HEADER */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6 flex justify-between items-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            {event?.title} Participants
          </h2>
          <button
            onClick={onClose}
            className="text-white text-2xl hover:rotate-90 transition-transform"
          >
            ✕
          </button>
        </div>

        {/* SEARCH & EXPORT */}
        <div className="p-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="🔍 Search by name, phone, transaction..."
            className="w-full md:w-1/3 px-4 py-2 rounded-full border border-gray-300 shadow focus:ring-2 focus:ring-indigo-400 transition"
          />
          <div className="flex gap-3">
            <button
              onClick={exportCSV}
              className="px-4 py-2 rounded-full bg-green-600 text-white shadow hover:scale-105 transition transform"
            >
              Export CSV
            </button>
            <button
              onClick={exportPDF}
              className="px-4 py-2 rounded-full bg-red-600 text-white shadow hover:scale-105 transition transform"
            >
              Export PDF
            </button>
          </div>
        </div>

        {/* PARTICIPANTS TABLE */}
        <div className="overflow-x-auto max-h-[55vh] px-4 pb-4">
          {loading ? (
            <p className="text-center py-10 text-indigo-700 font-semibold">
              Loading participants...
            </p>
          ) : filteredParticipants.length === 0 ? (
            <p className="text-center py-10 text-gray-500 font-medium">
              No registrations found
            </p>
          ) : (
            <table className="w-full border-collapse rounded-xl overflow-hidden shadow-lg">
              <thead className="sticky top-0 bg-indigo-200 text-indigo-900 shadow-md">
                <tr>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Transaction</th>
                  <th className="p-3">Amount</th>
                </tr>
              </thead>
              <tbody>
                {paginatedParticipants.map(p => (
                  <tr key={p._id} className="hover:bg-indigo-50 transition">
                    <td className="p-3 font-medium">{p.studentName}</td>
                    <td className="p-3">{p.phone}</td>
                    <td className="p-3 text-sm text-gray-600">
                      {p.transactionId}
                    </td>
                    <td className="p-3 font-semibold text-green-700">
                      ₹{p.amountPaid}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* FOOTER */}
        <div className="p-6 flex flex-col md:flex-row justify-between items-center bg-indigo-50 border-t border-indigo-200">
          <div className="font-bold text-lg text-indigo-700">
            Page Total: ₹{pageAmount}
          </div>
          <div className="flex items-center gap-4 mt-3 md:mt-0">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
              className="px-4 py-2 rounded-full bg-indigo-100 hover:bg-indigo-200 disabled:opacity-40 transition"
            >
              ◀ Prev
            </button>
            <span className="font-semibold">
              {currentPage} / {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => p + 1)}
              className="px-4 py-2 rounded-full bg-indigo-100 hover:bg-indigo-200 disabled:opacity-40 transition"
            >
              Next ▶
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParticipantsModal;
