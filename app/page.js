"use client";
import MainLayout from "./admin/components/ui/MainLayout";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
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

// Mapping English table names to Urdu
const tableNameMap = {
  "taweez": "تعویذ",
  "wazaif": "وظائف",
  "qutb": "قطب",
  "rohaniilaaj": "روحانی علاج",
  "tawizatusmaniya": "تعویذات عثمانیہ",
  "rohanidokan": "روحانی دکان",
  "nooriaamal":"نوری اعمال",
  "noorialviaamal":"نوری علوی اعمال",
  "ooliaallahkaamal":"اولیاء اللہ کے اعمال",
  "bamokalamal":"با موکل اعمال",
  "khasulkhasammal":"خاص الخالص اعمال",
  "alviamal":"علوی اعمال",
  "saflitavezat":"سفلی تعویذات",
};
export default function Dashboard() {
  const [activeTable, setActiveTable] = useState("taweez"); // Default
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
        <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-12 gap-1 sm:gap-2 mb-2 md:mb-4 sm:text-xl font-urdu">
        {allowedTables.map((table) => (
            <div
              key={table}
              onClick={() => handleTableChange(table)}
              className={`cursor-pointer h-12 sm:h-14 md:h-16 flex items-center justify-center rounded-md transition-all duration-300 font-semibold  ${
                activeTable === table
                  ? "bg-[#6C472D] text-white"
                  : "bg-white text-[#6C472D] border-2 border-[#D4AF37]"
              }`}
            >
              {/* Display Urdu table name */}
              {tableNameMap[table] || table} 
            </div>
          ))}
        </div>
       {/* /////////////////////////////////////////////////////Table displaying data//////////////////////////////////////////////// */}
        <div className="w-full overflow-x-auto sm:overflow-x-visible">
          <table className="w-[600px] sm:w-full m-auto divide-y divide-gray-200 border-2 border-[#D4AF37] rounded-md text-direction-right" >
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
                  <td colSpan={5} className="py-6 text-center font-urdu text-[#6C472D]">
                  براہِ کرم انتظار کریں
                  </td>
                </tr>
              ) : data.length > 0 ? (
                data.map((item) => (
                  <tr key={item.id}>
                    <td className="sm:px-4 py-2 text-center text-black">{item.id}</td>
                    <td className="sm:px-4 py-2 text-center font-urdu">
                    {item.title
                        ? item.title
                            .replace(/<[^>]+>/g, "") 
                            .slice(0, 20) + "...." 
                        : "no data found"}
                    </td>
                    <td
                      className="sm:px-4 py-2 text-center text-direction-right font-urdu"
                    >
                      {item.content
                        ? item.content
                            .replace(/<[^>]+>/g, "") 
                            .slice(0, 20) + "...." 
                        : "no data found"}
                    </td>
                    <td className="py-2 sm:px-4 flex items-center justify-center">
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
                    <td className="px-1 py-2 md:px-2 text-center">
                      <Link
                        href={{
                          pathname: "./enter_blog",
                          query: { id: item.id, tableName: activeTable },
                        }}
                      >
                        <button className="px-4 py-2 ml-2 bg-blue-600 text-white rounded-md font-urdu ">
                        تبدیل
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-md font-urdu"
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
      </div>
    </MainLayout>
  );
}
