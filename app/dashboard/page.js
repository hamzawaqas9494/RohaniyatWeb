"use client";
import MainLayout from "../admin/components/ui/MainLayout";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const allowedTables = [
  "taweez",
  "wazaif",
  "qutb",
  "rohaniilaaj",
  "tawizatusmaniya",
  "rohanidokan",
  "nooriaamal",
  "noorialviaamal",
  "ooliaallahkaamal",
  "bamokalamal",
  "khasulkhasammal",
  "alviamal",
  "saflitavezat",
];

const tableNameMap = {
  taweez: "تعویذ",
  wazaif: "وظائف",
  qutb: "کتب",
  rohaniilaaj: "روحانی علاج",
  tawizatusmaniya: "تعویذات عثمانیہ",
  rohanidokan: "روحانی دکان",
  nooriaamal: "نوری اعمال",
  noorialviaamal: "نوری علوی اعمال",
  ooliaallahkaamal: "اولیاء اللہ کے اعمال",
  bamokalamal: "با موکل اعمال",
  khasulkhasammal: "خاص الخاص اعمال",
  alviamal: "علوی اعمال",
  saflitavezat: "سفلی تعویذات",
};

export default function Dashboard() {
  const [activeTable, setActiveTable] = useState("taweez");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [deleteStatus, setDeleteStatus] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const limit = 5;

  const router = useRouter();

  // Check user login
  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");
    if (!loggedIn) {
      router.push("/");
    }
  }, [router]);

  // Fetch data whenever active table or page changes
  useEffect(() => {
    fetchData();
  }, [activeTable, page]);

  // Fetch table data
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/blog-data/paginated-data?tableName=${activeTable}&limit=${limit}&page=${page}`
      );
      const result = await res.json();
      setData(result.rows);
      setTotalPages(Math.ceil(result.total / limit));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle delete confirmation
  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    try {
      const response = await fetch(
        `/api/blog-data/delete-data?tableName=${activeTable}&id=${deleteId}`,
        { method: "DELETE" }
      );

      if (response.ok) {
        setDeleteStatus("Record Deleted Successfully.");
        fetchData();
      } else {
        const result = await response.json();
        setDeleteStatus(
          `Failed to delete: ${result.message || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Delete error:", error);
      setDeleteStatus("An error occurred while deleting.");
    }

    // Reset modal state
    setShowModal(false);
    setDeleteId(null);
    setTimeout(() => setDeleteStatus(null), 3000);
  };

  // Handle cancel button in modal
  const handleCancelDelete = () => {
    setShowModal(false);
    setDeleteId(null);
  };

  // Change selected table
  const handleTableChange = (table) => {
    setActiveTable(table);
    setPage(1);
  };

  // Navigate to specific page
  const goToPage = (num) => {
    if (num >= 1 && num <= totalPages) {
      setPage(num);
    }
  };

  return (
    <MainLayout>
      {/* Table selection UI */}
      <div className="grid grid-cols-3 sm:grid-cols-7 gap-1 sm:gap-2 mb-2 md:mb-4 sm:text-lg font-urdu">
        {allowedTables.map((table) => (
          <div
            key={table}
            onClick={() => handleTableChange(table)}
            className={`cursor-pointer h-12 sm:h-14 md:h-16 flex items-center justify-center rounded-md transition-all duration-300 font-semibold ${
              activeTable === table
                ? "bg-[#6C472D] text-white"
                : "bg-white text-[#6C472D] border-2 border-[#D4AF37]"
            }`}
          >
            {tableNameMap[table] || table}
          </div>
        ))}
      </div>
       {/* delete record confirmation modal start  */}
      {deleteStatus && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="p-6 bg-white rounded-lg text-center w-[90%] sm:w-80 shadow-lg">
            <div className="mb-4 w-16 h-16 flex items-center justify-center mx-auto rounded-full border-[#6C472D] bg-[#EFEADF]">
              <svg
                className="w-8 h-8 text-[#6C472D]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p className="text-[#6C472D] font-semibold text-lg font-urdu">
              {deleteStatus}
            </p>
          </div>
        </div>
      )}
     {/* delete record confirmation modal start  */}
      {/* Table data display */}
      <div className="w-full overflow-x-auto sm:overflow-x-visible">
        <table className="w-[600px] sm:w-full m-auto divide-y divide-gray-200 border-2 border-[#D4AF37] rounded-md text-direction-right">
          <thead className="bg-[#6C472D]">
            <tr>
              <th className="py-3 font-semibold text-white font-urdu">
                نمبر شمار
              </th>
              <th className="py-3 font-semibold text-white font-urdu">عنوان</th>
              <th className="py-3 font-semibold text-white font-urdu">مواد</th>
              <th className="py-3 font-semibold text-white font-urdu">تصویر</th>
              <th className="py-3 font-semibold text-white font-urdu">
                ختم/تبدیل
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {loading ? (
              <tr>
                <td
                  colSpan={5}
                  className="py-6 text-center font-urdu text-[#6C472D]"
                >
                  براہِ کرم انتظار کریں
                </td>
              </tr>
            ) : data.length > 0 ? (
              data.map((item) => (
                <tr key={item.id}>
                  <td className="sm:px-4 py-2 text-center text-[#6C472D]">
                    {item.id}
                  </td>
                  <td className="sm:px-4 py-2 text-center font-urdu text-[#6C472D]">
                    {item.title
                      ? item.title.replace(/<[^>]+>/g, "").slice(0, 20) + "...."
                      : "no data found"}
                  </td>
                  <td className="sm:px-4 py-2 text-center text-direction-right font-urdu text-[#6C472D]">
                    {item.content
                      ? item.content.replace(/<[^>]+>/g, "").slice(0, 20) +
                        "...."
                      : "no data found"}
                  </td>
                  <td className="py-2 sm:px-4 flex items-center justify-center text-[#6C472D]">
                    {item.image ? (
                      <img
                        height={8}
                        width={8}
                     src={`/uploads/${item.image}`}
                        className="w-10 h-10 object-cover"
                        alt=""
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td className="px-1 py-2 md:px-2 text-center">
                    <Link
                      href={{
                        pathname: "./enter_blog",
                        query: { id: item.id, tableName: activeTable },
                      }}
                    >
                      <button className="ml-1 px-4 py-2 bg-[#6C472D] text-white rounded-md font-urdu cursor-pointer">
                        تبدیل
                      </button>
                    </Link>
                    <button
                      onClick={() => {
                        // Open modal and store ID to delete
                        setShowModal(true);
                        setDeleteId(item.id);
                      }}
                      className="mr-1 px-4 py-2 bg-[#6C472D] text-white rounded-md font-urdu cursor-pointer"
                    >
                      ختم
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-6 bg-[#6C472D] text-white font-semibold font-urdu"
                >
                  کوئی ریکارڈ دستیاب نہیں ہے
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination buttons */}
      <div className="flex justify-center items-center mt-4 space-x-2 font-urdu">
        <button
          onClick={() => goToPage(page - 1)}
          disabled={page === 1}
          className={`px-4 py-2 rounded-md ${
            page === 1
              ? "bg-[#6C472D] text-white rounded-md font-medium cursor-not-allowed"
              : "bg-[#6C472D] text-white rounded-md font-medium cursor-pointer"
          }`}
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, idx) => {
          const pageNum = idx + 1;
          return (
            <button
              key={pageNum}
              onClick={() => goToPage(pageNum)}
              className={`px-4 py-2 rounded-md ${
                page === pageNum
                  ? "bg-[#6C472D] text-white rounded-md cursor-pointer"
                  : "bg-white border border-[#6C472D] cursor-pointer text-[#6C472D]"
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        <button
          onClick={() => goToPage(page + 1)}
          disabled={page === totalPages}
          className={`px-4 py-2 rounded-md ${
            page === totalPages
              ? "bg-[#6C472D] text-white rounded-md font-medium cursor-not-allowed"
              : "bg-[#6C472D] text-white hover:bg-[#5a3f24] cursor-pointer"
          }`}
        >
          Next
        </button>
      </div>

      {/* Delete confirmation modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50  flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-[90%] sm:w-96">
            <h2 className="text-lg text-[#6C472D] font-semibold mb-4 font-urdu">
              کیا آپ واقعی اس ریکارڈ کو ختم کرنا چاہتے ہیں؟
            </h2>
            <div className="flex justify-center space-x-4 mt-4">
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 bg-[#6C472D] text-white rounded-md cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-[#6C472D] text-white rounded-md cursor-pointer"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
