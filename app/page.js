"use client";
import MainLayout from "./admin/components/ui/MainLayout";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
const allowedTables = [
  "Taweez",
  "Wazaif",
  "Qutb",
  "Rohani_Ilaaj",
  "Tawizat_Usmaniya",
  "Rohani_Dokan",
];

// Mapping English table names to Urdu
const tableNameMap = {
  "Taweez": "تعویذ",
  "Wazaif": "وظائف",
  "Qutb": "قطب",
  "Rohani_Ilaaj": "روحانی علاج",
  "Tawizat_Usmaniya": "تعویذات عثمانیہ",
  "Rohani_Dokan": "روحانی دکان",
};
export default function Dashboard() {
  const [activeTable, setActiveTable] = useState("Taweez"); // Default
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    /////////////////////////////////////////////////////////get table data on base of selected table//////////////////////////////////////////////
    fetch(`/api/card-data/get-table-data?tableName=${activeTable}`)
      .then((res) => res.json())
      .then((result) => {
        console.log("Result:", result);
        setData(result.rows); // Set all data at once
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, [activeTable]);

  /////////////////////////////////////////////////////////////////////////Handle table switch///////////////////////////////////////////////////////////
  const handleTableChange = (table) => {
    setActiveTable(table);
  };

  /////////////////////////////////////////////////////////////////////////Handle Delete Request///////////////////////////////////////////////////////////
  const handleDelete = async (id) => {
    console.log(id, activeTable);
    if (confirm("Are you sure you want to delete this item?")) {
      try {
        const response = await fetch(
          `/api/card-data/delete-data?tableName=${activeTable}&id=${id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          alert("Item deleted successfully");
          fetchData();
        } else {
          const result = await response.json();
          alert(`Failed to delete item: ${result.message || "Unknown error"}`);
        }
      } catch (error) {
        console.error("Delete error:", error);
        alert("Error deleting item");
      }
    }
  };

  /////////////////////////////////////////////////////// Fetch data after table change////////////////////////////////////////////////
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/card-data/get-table-data?tableName=${activeTable}`
      );
      const result = await res.json();
      setData(result.rows);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  console.log(data, "data get form database");
  return (
    <MainLayout>
      <div>
        {/* Cards for table selection */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4 font-urdu">
        {allowedTables.map((table) => (
            <div
              key={table}
              onClick={() => handleTableChange(table)}
              className={`cursor-pointer h-24 flex items-center justify-center rounded-md transition-all duration-300 font-semibold  ${
                activeTable === table
                  ? "bg-[#6C472D] text-white"
                  : "bg-white text-[#6C472D] border-2 border-[#D4AF37]"
              }`}
            >
              {/* Display Urdu table name */}
              {tableNameMap[table] || table} {/* Fallback to English if Urdu name doesn't exist */}
            </div>
          ))}
        </div>
       {/* /////////////////////////////////////////////////////Table displaying data//////////////////////////////////////////////// */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 border-2 border-[#D4AF37] rounded-md" style={{ direction: 'rtl' }}>
            <thead className="bg-[#6C472D]">
              <tr>
                <th className="w-1/5 py-3 font-semibold text-white font-urdu">نمبر شمار</th>
                <th className="w-1/5 py-3 font-semibold text-white font-urdu">عنوان</th>
                <th className="w-1/5 py-3 font-semibold text-white font-urdu">مواد</th>
                <th className="w-1/5 py-3 font-semibold text-white font-urdu">تصویر</th>
                <th className="w-1/5 py-3 font-semibold text-white font-urdu">ختم/تبدیل</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center py-6 font-urdu text-[#6C472D]">
                  براہِ کرم انتظار کریں
                  </td>
                </tr>
              ) : data.length > 0 ? (
                data.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 py-2 text-center">{item.id}</td>
                    <td className="px-4 py-2 text-center font-urdu">
                      {item.title}
                    </td>
                    <td
                      className="px-4 py-2 text-center font-urdu"
                      style={{
                        direction: "rtl",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "150px", 
                      }}
                    >
                      {item.content
                        ? item.content
                            .replace(/<[^>]+>/g, "") 
                            .slice(0, 25) + "" 
                        : "no data found"}
                    </td>
                    <td className="px-4 py-2 flex items-center justify-center">
                      {item.image ? (
                        <img
                          height={8}
                          width={8}
                          src={item.image}
                          className="w-10 h-10 object-cover"
                          alt=""
                        />
                      ) : (
                        "No Image"
                      )}
                    </td>
                    <td className="px-4 py-2 text-center">
                      <Link
                        href={{
                          pathname: "./enter_blog",
                          query: { id: item.id, tableName: activeTable },
                        }}
                      >
                        <button className="bg-blue-600 text-white p-2 rounded-md ml-2">
                          Update
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="bg-red-500 text-white p-2 rounded-md ml-2"
                      >
                        Delete
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
      </div>
    </MainLayout>
  );
}
