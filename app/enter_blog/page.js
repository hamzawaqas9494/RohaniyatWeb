// // // // // // // "use client";

// // // // // // // import { useEffect, useState } from "react";

// // // // // // // const allowedTables = ["wazaif", "news", "articles"];

// // // // // // // export default function Dashboard() {
// // // // // // //   const [activeTable, setActiveTable] = useState("wazaif"); // Default
// // // // // // //   const [data, setData] = useState([]);
// // // // // // //   const [currentPage, setCurrentPage] = useState(1);
// // // // // // //   const itemsPerPage = 15; // Load 15 items per page

// // // // // // //   useEffect(() => {
// // // // // // //     // Fetch data on page load or when page changes
// // // // // // //     setLoading(true);
// // // // // // //     fetch(
// // // // // // //       `/api/card-data/get-table-data?tableName=${activeTable}&page=${currentPage}&limit=${itemsPerPage}`
// // // // // // //     )
// // // // // // //       .then((res) => res.json())
// // // // // // //       .then((result) => {
// // // // // // //         setData(result.rows); // Set current page data
// // // // // // //         setTotalPages(result.totalPages); // Set total pages for pagination
// // // // // // //         setLoading(false);
// // // // // // //       })
// // // // // // //       .catch((err) => {
// // // // // // //         console.error("Fetch error:", err);
// // // // // // //         setLoading(false);
// // // // // // //       });
// // // // // // //   }, [activeTable, currentPage]);

// // // // // // //   const [totalPages, setTotalPages] = useState(1);
// // // // // // //   const [loading, setLoading] = useState(false);

// // // // // // //   return (
// // // // // // //     <div className="p-6">
// // // // // // //       <h1 className="text-2xl font-bold mb-4">Data Dashboard</h1>

// // // // // // //       {/* Cards */}
// // // // // // //       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
// // // // // // //         {allowedTables.map((table) => (
// // // // // // //           <div
// // // // // // //             key={table}
// // // // // // //             onClick={() => {
// // // // // // //               setActiveTable(table);
// // // // // // //               setCurrentPage(1); // Reset page to 1 when switching tables
// // // // // // //             }}
// // // // // // //             className={`cursor-pointer p-4 rounded-xl  text-center transition-all duration-300 font-semibold capitalize ${
// // // // // // //               activeTable === table
// // // // // // //                 ? "bg-blue-600 text-white"
// // // // // // //                 : "bg-white text-black border"
// // // // // // //             }`}
// // // // // // //           >
// // // // // // //             {table}
// // // // // // //           </div>
// // // // // // //         ))}
// // // // // // //       </div>

// // // // // // //       {/* Table */}
// // // // // // //       <div className="overflow-x-auto">
// // // // // // //         <table className="min-w-full divide-y divide-gray-200 border rounded-lg">
// // // // // // //           <thead className="bg-gray-100">
// // // // // // //             <tr>
// // // // // // //               <th className="px-4 py-2 text-left text-xs font-medium text-gray-700">
// // // // // // //                 ID
// // // // // // //               </th>
// // // // // // //               <th className="px-4 py-2 text-left text-xs font-medium text-gray-700">
// // // // // // //                 Title
// // // // // // //               </th>
// // // // // // //               <th className="px-4 py-2 text-left text-xs font-medium text-gray-700">
// // // // // // //                 Content
// // // // // // //               </th>
// // // // // // //               <th className="px-4 py-2 text-left text-xs font-medium text-gray-700">
// // // // // // //                 Image
// // // // // // //               </th>
// // // // // // //             </tr>
// // // // // // //           </thead>
// // // // // // //           <tbody className="divide-y divide-gray-200 bg-white">
// // // // // // //             {loading ? (
// // // // // // //               <tr>
// // // // // // //                 <td colSpan={4} className="text-center py-6">
// // // // // // //                   Loading...
// // // // // // //                 </td>
// // // // // // //               </tr>
// // // // // // //             ) : data.length > 0 ? (
// // // // // // //               data.map((item) => (
// // // // // // //                 <tr key={item.id}>
// // // // // // //                   <td className="px-4 py-2">{item.id}</td>
// // // // // // //                   <td className="px-4 py-2">{item.title}</td>
// // // // // // //                   <td className="px-4 py-2 line-clamp-2">{item.content}</td>
// // // // // // //                   <td className="px-4 py-2">
// // // // // // //                     {item.image ? (
// // // // // // //                       <img
// // // // // // //                         src={item.image}
// // // // // // //                         className="w-16 h-16 object-cover rounded"
// // // // // // //                       />
// // // // // // //                     ) : (
// // // // // // //                       "No Image"
// // // // // // //                     )}
// // // // // // //                   </td>
// // // // // // //                 </tr>
// // // // // // //               ))
// // // // // // //             ) : (
// // // // // // //               <tr>
// // // // // // //                 <td colSpan={4} className="text-center py-6 text-gray-500">
// // // // // // //                   No data found
// // // // // // //                 </td>
// // // // // // //               </tr>
// // // // // // //             )}
// // // // // // //           </tbody>
// // // // // // //         </table>
// // // // // // //       </div>

// // // // // // //       {/* Pagination */}
// // // // // // //       {totalPages > 1 && (
// // // // // // //         <div className="flex justify-center mt-6 space-x-2">
// // // // // // //           {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
// // // // // // //             <button
// // // // // // //               key={number}
// // // // // // //               onClick={() => setCurrentPage(number)}
// // // // // // //               className={`px-3 py-1 rounded ${
// // // // // // //                 currentPage === number
// // // // // // //                   ? "bg-blue-500 text-white"
// // // // // // //                   : "bg-gray-200 text-black"
// // // // // // //               }`}
// // // // // // //             >
// // // // // // //               {number}
// // // // // // //             </button>
// // // // // // //           ))}
// // // // // // //         </div>
// // // // // // //       )}
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }
// // // // // // "use client";

// // // // // // import { useEffect, useState } from "react";

// // // // // // // Updated list of tables
// // // // // // const allowedTables = ["wazaif", "jado_tona_alaj", "mujrab_nakosh", "qutab"];

// // // // // // export default function Dashboard() {
// // // // // //   const [activeTable, setActiveTable] = useState("wazaif"); // Default
// // // // // //   const [data, setData] = useState([]);
// // // // // //   const [currentPage, setCurrentPage] = useState(1);
// // // // // //   const itemsPerPage = 15; // Load 15 items per page

// // // // // //   useEffect(() => {
// // // // // //     // Fetch data on page load or when page changes
// // // // // //     setLoading(true);
// // // // // //     fetch(
// // // // // //       `/api/card-data/get-table-data?tableName=${activeTable}&page=${currentPage}&limit=${itemsPerPage}`
// // // // // //     )
// // // // // //       .then((res) => res.json())
// // // // // //       .then((result) => {
// // // // // //         setData(result.rows); // Set current page data
// // // // // //         setTotalPages(result.totalPages); // Set total pages for pagination
// // // // // //         setLoading(false);
// // // // // //       })
// // // // // //       .catch((err) => {
// // // // // //         console.error("Fetch error:", err);
// // // // // //         setLoading(false);
// // // // // //       });
// // // // // //   }, [activeTable, currentPage]);

// // // // // //   const [totalPages, setTotalPages] = useState(1);
// // // // // //   const [loading, setLoading] = useState(false);

// // // // // //   return (
// // // // // //     <div className="p-6">
// // // // // //       <h1 className="text-2xl font-bold mb-4">Data Dashboard</h1>

// // // // // //       {/* Cards */}
// // // // // //       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
// // // // // //         {allowedTables.map((table) => (
// // // // // //           <div
// // // // // //             key={table}
// // // // // //             onClick={() => {
// // // // // //               setActiveTable(table);
// // // // // //               setCurrentPage(1); // Reset page to 1 when switching tables
// // // // // //             }}
// // // // // //             className={`cursor-pointer p-4 rounded-xl  text-center transition-all duration-300 font-semibold capitalize ${
// // // // // //               activeTable === table
// // // // // //                 ? "bg-blue-600 text-white"
// // // // // //                 : "bg-white text-black border"
// // // // // //             }`}
// // // // // //           >
// // // // // //             {table}
// // // // // //           </div>
// // // // // //         ))}
// // // // // //       </div>

// // // // // //       {/* Table */}
// // // // // //       <div className="overflow-x-auto">
// // // // // //         <table className="min-w-full divide-y divide-gray-200 border rounded-lg">
// // // // // //           <thead className="bg-gray-100">
// // // // // //             <tr>
// // // // // //               <th className="px-4 py-2 text-left text-xs font-medium text-gray-700">
// // // // // //                 ID
// // // // // //               </th>
// // // // // //               <th className="px-4 py-2 text-left text-xs font-medium text-gray-700">
// // // // // //                 Title
// // // // // //               </th>
// // // // // //               <th className="px-4 py-2 text-left text-xs font-medium text-gray-700">
// // // // // //                 Content
// // // // // //               </th>
// // // // // //               <th className="px-4 py-2 text-left text-xs font-medium text-gray-700">
// // // // // //                 Image
// // // // // //               </th>
// // // // // //             </tr>
// // // // // //           </thead>
// // // // // //           <tbody className="divide-y divide-gray-200 bg-white">
// // // // // //             {loading ? (
// // // // // //               <tr>
// // // // // //                 <td colSpan={4} className="text-center py-6">
// // // // // //                   Loading...
// // // // // //                 </td>
// // // // // //               </tr>
// // // // // //             ) : data.length > 0 ? (
// // // // // //               data.map((item) => (
// // // // // //                 <tr key={item.id}>
// // // // // //                   <td className="px-4 py-2">{item.id}</td>
// // // // // //                   <td className="px-4 py-2">{item.title}</td>
// // // // // //                   <td className="px-4 py-2 line-clamp-2">{item.content}</td>
// // // // // //                   <td className="px-4 py-2">
// // // // // //                     {item.image ? (
// // // // // //                       <img
// // // // // //                         src={item.image}
// // // // // //                         className="w-16 h-16 object-cover rounded"
// // // // // //                       />
// // // // // //                     ) : (
// // // // // //                       "No Image"
// // // // // //                     )}
// // // // // //                   </td>
// // // // // //                 </tr>
// // // // // //               ))
// // // // // //             ) : (
// // // // // //               <tr>
// // // // // //                 <td colSpan={4} className="text-center py-6 text-gray-500">
// // // // // //                   No data found
// // // // // //                 </td>
// // // // // //               </tr>
// // // // // //             )}
// // // // // //           </tbody>
// // // // // //         </table>
// // // // // //       </div>

// // // // // //       {/* Pagination */}
// // // // // //       {totalPages > 1 && (
// // // // // //         <div className="flex justify-center mt-6 space-x-2">
// // // // // //           {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
// // // // // //             <button
// // // // // //               key={number}
// // // // // //               onClick={() => setCurrentPage(number)}
// // // // // //               className={`px-3 py-1 rounded ${
// // // // // //                 currentPage === number
// // // // // //                   ? "bg-blue-500 text-white"
// // // // // //                   : "bg-gray-200 text-black"
// // // // // //               }`}
// // // // // //             >
// // // // // //               {number}
// // // // // //             </button>
// // // // // //           ))}
// // // // // //         </div>
// // // // // //       )}
// // // // // //     </div>
// // // // // //   );
// // // // // // }

// // // // // "use client";

// // // // // import { useEffect, useState } from "react";
// // // // // import { useRouter } from "next/router";

// // // // // // Updated list of tables
// // // // // const allowedTables = ["wazaif", "jado_tona_alaj", "mujrab_nakosh", "qutab"];

// // // // // export default function Dashboard() {
// // // // //   const [activeTable, setActiveTable] = useState("wazaif"); // Default
// // // // //   const [data, setData] = useState([]);
// // // // //   const [currentPage, setCurrentPage] = useState(1);
// // // // //   const itemsPerPage = 15; // Load 15 items per page
// // // // //   const [totalPages, setTotalPages] = useState(1);
// // // // //   const [loading, setLoading] = useState(false);
// // // // //   const [isClient, setIsClient] = useState(false); // State to track if it's client-side
// // // // //   const router = useRouter();

// // // // //   useEffect(() => {
// // // // //     setIsClient(true); // Mark that the component is now client-side

// // // // //     setLoading(true);
// // // // //     fetch(
// // // // //       `/api/card-data/get-table-data?tableName=${activeTable}&page=${currentPage}&limit=${itemsPerPage}`
// // // // //     )
// // // // //       .then((res) => res.json())
// // // // //       .then((result) => {
// // // // //         setData(result.rows); // Set current page data
// // // // //         setTotalPages(result.totalPages); // Set total pages for pagination
// // // // //         setLoading(false);
// // // // //       })
// // // // //       .catch((err) => {
// // // // //         console.error("Fetch error:", err);
// // // // //         setLoading(false);
// // // // //       });
// // // // //   }, [activeTable, currentPage]);

// // // // //   const handleDelete = (id) => {
// // // // //     if (window.confirm("Are you sure you want to delete this record?")) {
// // // // //       fetch(`/api/card-data/delete-record?id=${id}`, {
// // // // //         method: "DELETE",
// // // // //       })
// // // // //         .then((res) => res.json())
// // // // //         .then((result) => {
// // // // //           if (result.success) {
// // // // //             setData(data.filter((item) => item.id !== id)); // Remove deleted row from the state
// // // // //           } else {
// // // // //             alert("Error deleting record");
// // // // //           }
// // // // //         })
// // // // //         .catch((err) => {
// // // // //           console.error("Error:", err);
// // // // //           alert("Error deleting record");
// // // // //         });
// // // // //     }
// // // // //   };

// // // // //   const handleUpdate = (item) => {
// // // // //     // Ensure that useRouter only runs client-side
// // // // //     if (isClient) {
// // // // //       router.push({
// // // // //         pathname: "/edit",
// // // // //         query: {
// // // // //           id: item.id,
// // // // //           title: item.title,
// // // // //           content: item.content,
// // // // //           image: item.image,
// // // // //         },
// // // // //       });
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div className="p-6">
// // // // //       <h1 className="text-2xl font-bold mb-4">Data Dashboard</h1>

// // // // //       {/* Cards for table selection */}
// // // // //       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
// // // // //         {allowedTables.map((table) => (
// // // // //           <div
// // // // //             key={table}
// // // // //             onClick={() => {
// // // // //               setActiveTable(table);
// // // // //               setCurrentPage(1); // Reset page to 1 when switching tables
// // // // //             }}
// // // // //             className={`cursor-pointer p-4 rounded-xl  text-center transition-all duration-300 font-semibold capitalize ${
// // // // //               activeTable === table
// // // // //                 ? "bg-blue-600 text-white"
// // // // //                 : "bg-white text-black border"
// // // // //             }`}
// // // // //           >
// // // // //             {table}
// // // // //           </div>
// // // // //         ))}
// // // // //       </div>

// // // // //       {/* Table displaying data */}
// // // // //       <div className="overflow-x-auto">
// // // // //         <table className="min-w-full divide-y divide-gray-200 border rounded-lg">
// // // // //           <thead className="bg-gray-100">
// // // // //             <tr>
// // // // //               <th className="px-4 py-2 text-left text-xs font-medium text-gray-700">
// // // // //                 ID
// // // // //               </th>
// // // // //               <th className="px-4 py-2 text-left text-xs font-medium text-gray-700">
// // // // //                 Title
// // // // //               </th>
// // // // //               <th className="px-4 py-2 text-left text-xs font-medium text-gray-700">
// // // // //                 Content
// // // // //               </th>
// // // // //               <th className="px-4 py-2 text-left text-xs font-medium text-gray-700">
// // // // //                 Image
// // // // //               </th>
// // // // //               <th className="px-4 py-2 text-left text-xs font-medium text-gray-700">
// // // // //                 Actions
// // // // //               </th>
// // // // //             </tr>
// // // // //           </thead>
// // // // //           <tbody className="divide-y divide-gray-200 bg-white">
// // // // //             {loading ? (
// // // // //               <tr>
// // // // //                 <td colSpan={5} className="text-center py-6">
// // // // //                   Loading...
// // // // //                 </td>
// // // // //               </tr>
// // // // //             ) : data.length > 0 ? (
// // // // //               data.map((item) => (
// // // // //                 <tr key={item.id}>
// // // // //                   <td className="px-4 py-2">{item.id}</td>
// // // // //                   <td className="px-4 py-2">{item.title}</td>
// // // // //                   <td className="px-4 py-2 line-clamp-2">{item.content}</td>
// // // // //                   <td className="px-4 py-2">
// // // // //                     {item.image ? (
// // // // //                       <img
// // // // //                         src={item.image}
// // // // //                         className="w-16 h-16 object-cover rounded"
// // // // //                       />
// // // // //                     ) : (
// // // // //                       "No Image"
// // // // //                     )}
// // // // //                   </td>
// // // // //                   <td className="px-4 py-2 text-center">
// // // // //                     {/* Update Button */}
// // // // //                     <button
// // // // //                       onClick={() => handleUpdate(item)}
// // // // //                       className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
// // // // //                     >
// // // // //                       Update
// // // // //                     </button>
// // // // //                     {/* Delete Button */}
// // // // //                     <button
// // // // //                       onClick={() => handleDelete(item.id)}
// // // // //                       className="bg-red-500 text-white px-4 py-2 rounded"
// // // // //                     >
// // // // //                       Delete
// // // // //                     </button>
// // // // //                   </td>
// // // // //                 </tr>
// // // // //               ))
// // // // //             ) : (
// // // // //               <tr>
// // // // //                 <td colSpan={5} className="text-center py-6 text-gray-500">
// // // // //                   No data found
// // // // //                 </td>
// // // // //               </tr>
// // // // //             )}
// // // // //           </tbody>
// // // // //         </table>
// // // // //       </div>

// // // // //       {/* Pagination */}
// // // // //       {totalPages > 1 && (
// // // // //         <div className="flex justify-center mt-6 space-x-2">
// // // // //           {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
// // // // //             <button
// // // // //               key={number}
// // // // //               onClick={() => setCurrentPage(number)}
// // // // //               className={`px-3 py-1 rounded ${
// // // // //                 currentPage === number
// // // // //                   ? "bg-blue-500 text-white"
// // // // //                   : "bg-gray-200 text-black"
// // // // //               }`}
// // // // //             >
// // // // //               {number}
// // // // //             </button>
// // // // //           ))}
// // // // //         </div>
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // "use client"; // Ensures this component is client-side

// // // // import { useEffect, useState } from "react";
// // // // import { useRouter } from "next/router";

// // // // // Your component logic
// // // // export default function Dashboard() {
// // // //   const [activeTable, setActiveTable] = useState("wazaif");
// // // //   const [data, setData] = useState([]);
// // // //   const [currentPage, setCurrentPage] = useState(1);
// // // //   const itemsPerPage = 15;
// // // //   const [totalPages, setTotalPages] = useState(1);
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [isClient, setIsClient] = useState(false);
// // // //   const router = useRouter();

// // // //   useEffect(() => {
// // // //     setIsClient(true);

// // // //     setLoading(true);
// // // //     fetch(
// // // //       `/api/card-data/get-table-data?tableName=${activeTable}&page=${currentPage}&limit=${itemsPerPage}`
// // // //     )
// // // //       .then((res) => res.json())
// // // //       .then((result) => {
// // // //         setData(result.rows);
// // // //         setTotalPages(result.totalPages);
// // // //         setLoading(false);
// // // //       })
// // // //       .catch((err) => {
// // // //         console.error("Fetch error:", err);
// // // //         setLoading(false);
// // // //       });
// // // //   }, [activeTable, currentPage]);

// // // //   const handleDelete = (id) => {
// // // //     if (window.confirm("Are you sure you want to delete this record?")) {
// // // //       fetch(`/api/card-data/delete-record?id=${id}`, { method: "DELETE" })
// // // //         .then((res) => res.json())
// // // //         .then((result) => {
// // // //           if (result.success) {
// // // //             setData(data.filter((item) => item.id !== id));
// // // //           } else {
// // // //             alert("Error deleting record");
// // // //           }
// // // //         })
// // // //         .catch((err) => {
// // // //           console.error("Error:", err);
// // // //           alert("Error deleting record");
// // // //         });
// // // //     }
// // // //   };

// // // //   const handleUpdate = (item) => {
// // // //     if (isClient) {
// // // //       router.push({
// // // //         pathname: "/edit",
// // // //         query: {
// // // //           id: item.id,
// // // //           title: item.title,
// // // //           content: item.content,
// // // //           image: item.image,
// // // //         },
// // // //       });
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="p-6">
// // // //       <h1 className="text-2xl font-bold mb-4">Data Dashboard</h1>
// // // //       {/* Cards for table selection */}
// // // //       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
// // // //         {allowedTables.map((table) => (
// // // //           <div
// // // //             key={table}
// // // //             onClick={() => {
// // // //               setActiveTable(table);
// // // //               setCurrentPage(1);
// // // //             }}
// // // //             className={`cursor-pointer p-4 rounded-xl  text-center transition-all duration-300 font-semibold capitalize ${
// // // //               activeTable === table
// // // //                 ? "bg-blue-600 text-white"
// // // //                 : "bg-white text-black border"
// // // //             }`}
// // // //           >
// // // //             {table}
// // // //           </div>
// // // //         ))}
// // // //       </div>

// // // //       {/* Table displaying data */}
// // // //       <div className="overflow-x-auto">
// // // //         <table className="min-w-full divide-y divide-gray-200 border rounded-lg">
// // // //           <thead className="bg-gray-100">
// // // //             <tr>
// // // //               <th className="px-4 py-2 text-left text-xs font-medium text-gray-700">
// // // //                 ID
// // // //               </th>
// // // //               <th className="px-4 py-2 text-left text-xs font-medium text-gray-700">
// // // //                 Title
// // // //               </th>
// // // //               <th className="px-4 py-2 text-left text-xs font-medium text-gray-700">
// // // //                 Content
// // // //               </th>
// // // //               <th className="px-4 py-2 text-left text-xs font-medium text-gray-700">
// // // //                 Image
// // // //               </th>
// // // //               <th className="px-4 py-2 text-left text-xs font-medium text-gray-700">
// // // //                 Actions
// // // //               </th>
// // // //             </tr>
// // // //           </thead>
// // // //           <tbody className="divide-y divide-gray-200 bg-white">
// // // //             {loading ? (
// // // //               <tr>
// // // //                 <td colSpan={5} className="text-center py-6">
// // // //                   Loading...
// // // //                 </td>
// // // //               </tr>
// // // //             ) : data.length > 0 ? (
// // // //               data.map((item) => (
// // // //                 <tr key={item.id}>
// // // //                   <td className="px-4 py-2">{item.id}</td>
// // // //                   <td className="px-4 py-2">{item.title}</td>
// // // //                   <td className="px-4 py-2 line-clamp-2">{item.content}</td>
// // // //                   <td className="px-4 py-2">
// // // //                     {item.image ? (
// // // //                       <img
// // // //                         src={item.image}
// // // //                         className="w-16 h-16 object-cover rounded"
// // // //                       />
// // // //                     ) : (
// // // //                       "No Image"
// // // //                     )}
// // // //                   </td>
// // // //                   <td className="px-4 py-2 text-center">
// // // //                     {/* Update Button */}
// // // //                     <button
// // // //                       onClick={() => handleUpdate(item)}
// // // //                       className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
// // // //                     >
// // // //                       Update
// // // //                     </button>
// // // //                     {/* Delete Button */}
// // // //                     <button
// // // //                       onClick={() => handleDelete(item.id)}
// // // //                       className="bg-red-500 text-white px-4 py-2 rounded"
// // // //                     >
// // // //                       Delete
// // // //                     </button>
// // // //                   </td>
// // // //                 </tr>
// // // //               ))
// // // //             ) : (
// // // //               <tr>
// // // //                 <td colSpan={5} className="text-center py-6 text-gray-500">
// // // //                   No data found
// // // //                 </td>
// // // //               </tr>
// // // //             )}
// // // //           </tbody>
// // // //         </table>
// // // //       </div>

// // // //       {/* Pagination */}
// // // //       {totalPages > 1 && (
// // // //         <div className="flex justify-center mt-6 space-x-2">
// // // //           {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
// // // //             <button
// // // //               key={number}
// // // //               onClick={() => setCurrentPage(number)}
// // // //               className={`px-3 py-1 rounded ${
// // // //                 currentPage === number
// // // //                   ? "bg-blue-500 text-white"
// // // //                   : "bg-gray-200 text-black"
// // // //               }`}
// // // //             >
// // // //               {number}
// // // //             </button>
// // // //           ))}
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // }
// // // "use client";

// // // import { useEffect, useState } from "react";
// // // // import { useRouter } from "next/router";

// // // // Updated list of tables
// // // const allowedTables = ["wazaif", "jado_tona_alaj", "mujrab_nakosh", "qutab"];

// // // export default function Dashboard() {
// // //   const [activeTable, setActiveTable] = useState("wazaif"); // Default
// // //   const [data, setData] = useState([]);
// // //   const [currentPage, setCurrentPage] = useState(1);
// // //   const itemsPerPage = 15; // Load 15 items per page
// // //   const [totalPages, setTotalPages] = useState(1);
// // //   const [loading, setLoading] = useState(false);
// // //   // const router = useRouter(); // Ensure it's client-side

// // //   useEffect(() => {
// // //     setLoading(true);
// // //     fetch(
// // //       `/api/card-data/get-table-data?tableName=${activeTable}&page=${currentPage}&limit=${itemsPerPage}`
// // //     )
// // //       .then((res) => res.json())
// // //       .then((result) => {
// // //         setData(result.rows); // Set current page data
// // //         setTotalPages(result.totalPages); // Set total pages for pagination
// // //         setLoading(false);
// // //       })
// // //       .catch((err) => {
// // //         console.error("Fetch error:", err);
// // //         setLoading(false);
// // //       });
// // //   }, [activeTable, currentPage]);

// // //   const handleDelete = (id) => {
// // //     if (window.confirm("Are you sure you want to delete this record?")) {
// // //       fetch(`/api/card-data/delete-record?id=${id}`, {
// // //         method: "DELETE",
// // //       })
// // //         .then((res) => res.json())
// // //         .then((result) => {
// // //           if (result.success) {
// // //             setData(data.filter((item) => item.id !== id)); // Remove deleted row from the state
// // //           } else {
// // //             alert("Error deleting record");
// // //           }
// // //         })
// // //         .catch((err) => {
// // //           console.error("Error:", err);
// // //           alert("Error deleting record");
// // //         });
// // //     }
// // //   };

// // //   const handleUpdate = (item) => {
// // //     router.push({
// // //       pathname: "./page.js",
// // //       query: {
// // //         id: item.id,
// // //         title: item.title,
// // //         content: item.content,
// // //         image: item.image,
// // //       },
// // //     });
// // //   };

// // //   return (
// // //     <div className="p-6">
// // //       <h1 className="text-2xl font-bold mb-4">Data Dashboard</h1>

// // //       {/* Cards for table selection */}
// // //       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
// // //         {allowedTables.map((table) => (
// // //           <div
// // //             key={table}
// // //             onClick={() => {
// // //               setActiveTable(table);
// // //               setCurrentPage(1); // Reset page to 1 when switching tables
// // //             }}
// // //             className={`cursor-pointer p-4 rounded-xl  text-center transition-all duration-300 font-semibold capitalize ${
// // //               activeTable === table
// // //                 ? "bg-blue-600 text-white"
// // //                 : "bg-white text-black border"
// // //             }`}
// // //           >
// // //             {table}
// // //           </div>
// // //         ))}
// // //       </div>

// // //       {/* Table displaying data */}
// // //       <div className="overflow-x-auto">
// // //         <table className="min-w-full divide-y divide-gray-200 border rounded-lg">
// // //           <thead className="bg-gray-100">
// // //             <tr>
// // //               <th className="px-4 py-2 text-left text-xs font-medium text-gray-700">
// // //                 ID
// // //               </th>
// // //               <th className="px-4 py-2 text-left text-xs font-medium text-gray-700">
// // //                 Title
// // //               </th>
// // //               <th className="px-4 py-2 text-left text-xs font-medium text-gray-700">
// // //                 Content
// // //               </th>
// // //               <th className="px-4 py-2 text-left text-xs font-medium text-gray-700">
// // //                 Image
// // //               </th>
// // //               <th className="px-4 py-2 text-left text-xs font-medium text-gray-700">
// // //                 Actions
// // //               </th>
// // //             </tr>
// // //           </thead>
// // //           <tbody className="divide-y divide-gray-200 bg-white">
// // //             {loading ? (
// // //               <tr>
// // //                 <td colSpan={5} className="text-center py-6">
// // //                   Loading...
// // //                 </td>
// // //               </tr>
// // //             ) : data.length > 0 ? (
// // //               data.map((item) => (
// // //                 <tr key={item.id}>
// // //                   <td className="px-4 py-2">{item.id}</td>
// // //                   <td className="px-4 py-2">{item.title}</td>
// // //                   <td className="px-4 py-2 line-clamp-2">{item.content}</td>
// // //                   <td className="px-4 py-2">
// // //                     {item.image ? (
// // //                       <img
// // //                         src={item.image}
// // //                         className="w-16 h-16 object-cover rounded"
// // //                       />
// // //                     ) : (
// // //                       "No Image"
// // //                     )}
// // //                   </td>
// // //                   <td className="px-4 py-2 text-center">
// // //                     {/* Update Button */}
// // //                     <button
// // //                       onClick={() => handleUpdate(item)}
// // //                       className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
// // //                     >
// // //                       Update
// // //                     </button>
// // //                     {/* Delete Button */}
// // //                     <button
// // //                       onClick={() => handleDelete(item.id)}
// // //                       className="bg-red-500 text-white px-4 py-2 rounded"
// // //                     >
// // //                       Delete
// // //                     </button>
// // //                   </td>
// // //                 </tr>
// // //               ))
// // //             ) : (
// // //               <tr>
// // //                 <td colSpan={5} className="text-center py-6 text-gray-500">
// // //                   No data found
// // //                 </td>
// // //               </tr>
// // //             )}
// // //           </tbody>
// // //         </table>
// // //       </div>

// // //       {/* Pagination */}
// // //       {totalPages > 1 && (
// // //         <div className="flex justify-center mt-6 space-x-2">
// // //           {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
// // //             <button
// // //               key={number}
// // //               onClick={() => setCurrentPage(number)}
// // //               className={`px-3 py-1 rounded ${
// // //                 currentPage === number
// // //                   ? "bg-blue-500 text-white"
// // //                   : "bg-gray-200 text-black"
// // //               }`}
// // //             >
// // //               {number}
// // //             </button>
// // //           ))}
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }

// // // Import necessary hooks and components
// // "use client"; // Ensure this component is client-side

// // import { useEffect, useState } from "react";
// // import { usePathname } from "next/navigation";
// // import Link from "next/link";

// // // Updated list of tables
// // const allowedTables = ["wazaif", "jado_tona_alaj", "mujrab_nakosh", "qutab"];

// // export default function Dashboard() {
// //   const [activeTable, setActiveTable] = useState("wazaif"); // Default
// //   const [data, setData] = useState([]);
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const itemsPerPage = 15; // Load 15 items per page
// //   const [totalPages, setTotalPages] = useState(1);
// //   const [loading, setLoading] = useState(false);

// //   // Access the current pathname using usePathname
// //   const pathname = usePathname();

// //   useEffect(() => {
// //     setLoading(true);
// //     fetch(
// //       `/api/card-data/get-table-data?tableName=${activeTable}&page=${currentPage}&limit=${itemsPerPage}`
// //     )
// //       .then((res) => res.json())
// //       .then((result) => {
// //         setData(result.rows); // Set current page data
// //         setTotalPages(result.totalPages); // Set total pages for pagination
// //         setLoading(false);
// //       })
// //       .catch((err) => {
// //         console.error("Fetch error:", err);
// //         setLoading(false);
// //       });
// //   }, [activeTable, currentPage]);

// //   // Handle table switch
// //   const handleTableChange = (table) => {
// //     setActiveTable(table);
// //     setCurrentPage(1); // Reset to the first page
// //   };

// //   // Display the current pathname
// //   console.log("Current Pathname:", pathname);

// //   return (
// //     <div className="p-6">
// //       <h1 className="text-2xl font-bold mb-4">Data Dashboard</h1>

// //       {/* Cards for table selection */}
// //       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
// //         {allowedTables.map((table) => (
// //           <div
// //             key={table}
// //             onClick={() => handleTableChange(table)}
// //             className={`cursor-pointer p-4 rounded-xl  text-center transition-all duration-300 font-semibold capitalize ${
// //               activeTable === table
// //                 ? "bg-blue-600 text-white"
// //                 : "bg-white text-black border"
// //             }`}
// //           >
// //             {table}
// //           </div>
// //         ))}
// //       </div>

// //       {/* Table displaying data */}
// //       <div className="overflow-x-auto">
// //         <table className="min-w-full divide-y divide-gray-200 border rounded-lg">
// //           <thead className="bg-gray-100">
// //             <tr>
// //               <th className="px-4 py-2 text-left text-xs font-medium text-gray-700">
// //                 ID
// //               </th>
// //               <th className="px-4 py-2 text-left text-xs font-medium text-gray-700">
// //                 Title
// //               </th>
// //               <th className="px-4 py-2 text-left text-xs font-medium text-gray-700">
// //                 Content
// //               </th>
// //               <th className="px-4 py-2 text-left text-xs font-medium text-gray-700">
// //                 Image
// //               </th>
// //               <th className="px-4 py-2 text-left text-xs font-medium text-gray-700">
// //                 Actions
// //               </th>
// //             </tr>
// //           </thead>
// //           <tbody className="divide-y divide-gray-200 bg-white">
// //             {loading ? (
// //               <tr>
// //                 <td colSpan={5} className="text-center py-6">
// //                   Loading...
// //                 </td>
// //               </tr>
// //             ) : data.length > 0 ? (
// //               data.map((item) => (
// //                 <tr key={item.id}>
// //                   <td className="px-4 py-2">{item.id}</td>
// //                   <td className="px-4 py-2">{item.title}</td>
// //                   <td className="px-4 py-2 line-clamp-2">{item.content}</td>
// //                   <td className="px-4 py-2">
// //                     {item.image ? (
// //                       <img
// //                         src={item.image}
// //                         className="w-16 h-16 object-cover rounded"
// //                       />
// //                     ) : (
// //                       "No Image"
// //                     )}
// //                   </td>
// //                   <td className="px-4 py-2 text-center">
// //                     {/* Update Button */}
// //                     <Link
// //                       href={{
// //                         pathname: "/edit",
// //                         query: { id: item.id },
// //                       }}
// //                     >
// //                       <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
// //                         Update
// //                       </button>
// //                     </Link>
// //                     {/* Delete Button */}
// //                     <button
// //                       onClick={() => handleDelete(item.id)}
// //                       className="bg-red-500 text-white px-4 py-2 rounded"
// //                     >
// //                       Delete
// //                     </button>
// //                   </td>
// //                 </tr>
// //               ))
// //             ) : (
// //               <tr>
// //                 <td colSpan={5} className="text-center py-6 text-gray-500">
// //                   No data found
// //                 </td>
// //               </tr>
// //             )}
// //           </tbody>
// //         </table>
// //       </div>

// //       {/* Pagination */}
// //       {totalPages > 1 && (
// //         <div className="flex justify-center mt-6 space-x-2">
// //           {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
// //             <button
// //               key={number}
// //               onClick={() => setCurrentPage(number)}
// //               className={`px-3 py-1 rounded ${
// //                 currentPage === number
// //                   ? "bg-blue-500 text-white"
// //                   : "bg-gray-200 text-black"
// //               }`}
// //             >
// //               {number}
// //             </button>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// "use client"; // Ensure this component is client-side

// import { useEffect, useState } from "react";
// import { usePathname } from "next/navigation";
// import Link from "next/link";

// // Updated list of tables
// const allowedTables = ["wazaif", "jado_tona_alaj", "mujrab_nakosh", "qutab"];

// export default function Dashboard() {
//   const [activeTable, setActiveTable] = useState("wazaif"); // Default
//   const [data, setData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 15; // Load 15 items per page
//   const [totalPages, setTotalPages] = useState(1);
//   const [loading, setLoading] = useState(false);

//   // Access the current pathname using usePathname
//   const pathname = usePathname();

//   useEffect(() => {
//     setLoading(true);
//     fetch(
//       `/api/card-data/get-table-data?tableName=${activeTable}&page=${currentPage}&limit=${itemsPerPage}`
//     )
//       .then((res) => res.json())
//       .then((result) => {
//         setData(result.rows); // Set current page data
//         setTotalPages(result.totalPages); // Set total pages for pagination
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Fetch error:", err);
//         setLoading(false);
//       });
//   }, [activeTable, currentPage]);

//   // Handle table switch
//   const handleTableChange = (table) => {
//     setActiveTable(table);
//     setCurrentPage(1); // Reset to the first page
//   };

//   // Display the current pathname
//   console.log("Current Pathname:", pathname);

//   // Handle Delete
//   const handleDelete = async (id) => {
//     if (confirm("Are you sure you want to delete this item?")) {
//       try {
//         const response = await fetch(`/api/card-data/delete-item?id=${id}`, {
//           method: "DELETE",
//         });
//         if (response.ok) {
//           alert("Item deleted successfully");
//           // After deletion, refresh the data to reflect changes
//           setCurrentPage(1); // Reset to first page
//           fetchData();
//         } else {
//           alert("Failed to delete item");
//         }
//       } catch (error) {
//         console.error("Delete error:", error);
//         alert("Error deleting item");
//       }
//     }
//   };

//   // Fetch data after table change or page change
//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch(
//         `/api/card-data/get-table-data?tableName=${activeTable}&page=${currentPage}&limit=${itemsPerPage}`
//       );
//       const result = await res.json();
//       setData(result.rows);
//       setTotalPages(result.totalPages);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Data Dashboard</h1>

//       {/* Cards for table selection */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//         {allowedTables.map((table) => (
//           <div
//             key={table}
//             onClick={() => handleTableChange(table)}
//             className={`cursor-pointer p-4 rounded-xl  text-center transition-all duration-300 font-semibold capitalize ${
//               activeTable === table
//                 ? "bg-blue-600 text-white"
//                 : "bg-white text-black border"
//             }`}
//           >
//             {table}
//           </div>
//         ))}
//       </div>

//       {/* Table displaying data */}
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200 border rounded-lg">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-4 py-2 text-left text-xs font-medium text-gray-700">
//                 ID
//               </th>
//               <th className="px-4 py-2 text-left text-xs font-medium text-gray-700">
//                 Title
//               </th>
//               <th className="px-4 py-2 text-left text-xs font-medium text-gray-700">
//                 Content
//               </th>
//               <th className="px-4 py-2 text-left text-xs font-medium text-gray-700">
//                 Image
//               </th>
//               <th className="px-4 py-2 text-left text-xs font-medium text-gray-700">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200 bg-white">
//             {loading ? (
//               <tr>
//                 <td colSpan={5} className="text-center py-6">
//                   Loading...
//                 </td>
//               </tr>
//             ) : data.length > 0 ? (
//               data.map((item) => (
//                 <tr key={item.id}>
//                   <td className="px-4 py-2">{item.id}</td>
//                   <td className="px-4 py-2">{item.title}</td>
//                   <td className="px-4 py-2 line-clamp-2">{item.content}</td>
//                   <td className="px-4 py-2">
//                     {item.image ? (
//                       <img
//                         src={item.image}
//                         className="w-16 h-16 object-cover rounded"
//                       />
//                     ) : (
//                       "No Image"
//                     )}
//                   </td>
//                   <td className="px-4 py-2 text-center">
//                     {/* Update Button */}
//                     <Link
//                       href={{
//                         pathname: "/edit",
//                         query: { id: item.id },
//                       }}
//                     >
//                       <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
//                         Update
//                       </button>
//                     </Link>
//                     {/* Delete Button */}
//                     <button
//                       onClick={() => handleDelete(item.id)}
//                       className="bg-red-500 text-white px-4 py-2 rounded"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={5} className="text-center py-6 text-gray-500">
//                   No data found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div className="flex justify-center mt-6 space-x-2">
//           {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
//             <button
//               key={number}
//               onClick={() => setCurrentPage(number)}
//               className={`px-3 py-1 rounded ${
//                 currentPage === number
//                   ? "bg-blue-500 text-white"
//                   : "bg-gray-200 text-black"
//               }`}
//             >
//               {number}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// "use client"; // Ensure this component is client-side

// import { useEffect, useState } from "react";
// import { usePathname } from "next/navigation";
// import Link from "next/link";

// // Updated list of tables
// const allowedTables = ["wazaif", "jado_tona_alaj", "mujrab_nakosh", "qutab"];

// export default function Dashboard() {
//   const [activeTable, setActiveTable] = useState("wazaif"); // Default
//   const [data, setData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 15; // Load 15 items per page
//   const [totalPages, setTotalPages] = useState(1);
//   const [loading, setLoading] = useState(false);

//   // Access the current pathname using usePathname
//   const pathname = usePathname();

//   useEffect(() => {
//     setLoading(true);
//     fetch(
//       `/api/card-data/get-table-data?tableName=${activeTable}&page=${currentPage}&limit=${itemsPerPage}`
//     )
//       .then((res) => res.json())
//       .then((result) => {
//         setData(result.rows); // Set current page data
//         setTotalPages(result.totalPages); // Set total pages for pagination
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Fetch error:", err);
//         setLoading(false);
//       });
//   }, [activeTable, currentPage]);

//   // Handle table switch
//   const handleTableChange = (table) => {
//     setActiveTable(table);
//     setCurrentPage(1); // Reset to the first page
//   };

//   // Handle Delete
//   const handleDelete = async (id) => {
//     console.log(id, activeTable);
//     if (confirm("Are you sure you want to delete this item?")) {
//       try {
//         const response = await fetch(
//           `/api/card-data/delete-data?tableName=${activeTable}&id=${id}`,
//           {
//             method: "DELETE",
//           }
//         );

//         if (response.ok) {
//           alert("Item deleted successfully");
//           // After deletion, refresh the data to reflect changes
//           setCurrentPage(1); // Reset to the first page
//           fetchData(); // Refetch the data from the server
//         } else {
//           const result = await response.json();
//           alert(`Failed to delete item: ${result.message || "Unknown error"}`);
//         }
//       } catch (error) {
//         console.error("Delete error:", error);
//         alert("Error deleting item");
//       }
//     }
//   };

//   // Fetch data after table change or page change
//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch(
//         `/api/card-data/get-table-data?tableName=${activeTable}&page=${currentPage}&limit=${itemsPerPage}`
//       );
//       const result = await res.json();
//       setData(result.rows);
//       setTotalPages(result.totalPages);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Data Dashboard</h1>

//       {/* Cards for table selection */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//         {allowedTables.map((table) => (
//           <div
//             key={table}
//             onClick={() => handleTableChange(table)}
//             className={`cursor-pointer p-4 rounded-xl  text-center transition-all duration-300 font-semibold capitalize ${
//               activeTable === table
//                 ? "bg-blue-600 text-white"
//                 : "bg-white text-black border"
//             }`}
//           >
//             {table}
//           </div>
//         ))}
//       </div>

//       {/* Table displaying data */}
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200 border rounded-lg">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-4 py-2 text-left text-xs font-medium text-gray-700">
//                 ID
//               </th>
//               <th className="px-4 py-2 text-left text-xs font-medium text-gray-700">
//                 Title
//               </th>
//               <th className="px-4 py-2 text-left text-xs font-medium text-gray-700">
//                 Content
//               </th>
//               <th className="px-4 py-2 text-left text-xs font-medium text-gray-700">
//                 Image
//               </th>
//               <th className="px-4 py-2 text-left text-xs font-medium text-gray-700">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200 bg-white">
//             {loading ? (
//               <tr>
//                 <td colSpan={5} className="text-center py-6">
//                   Loading...
//                 </td>
//               </tr>
//             ) : data.length > 0 ? (
//               data.map((item) => (
//                 <tr key={item.id}>
//                   <td className="px-4 py-2">{item.id}</td>
//                   <td className="px-4 py-2">{item.title}</td>
//                   <td className="px-4 py-2 line-clamp-2">{item.content}</td>
//                   <td className="px-4 py-2">
//                     {item.image ? (
//                       <img
//                         src={item.image}
//                         className="w-16 h-16 object-cover rounded"
//                       />
//                     ) : (
//                       "No Image"
//                     )}
//                   </td>
//                   <td className="px-4 py-2 text-center">
//                     {/* Update Button */}
//                     <Link
//                       href={{
//                         pathname: "/",
//                         query: { id: item.id, tableName: activeTable },
//                       }}
//                     >
//                       <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
//                         Update
//                       </button>
//                     </Link>
//                     {/* Delete Button */}
//                     <button
//                       onClick={() => handleDelete(item.id)}
//                       className="bg-red-500 text-white px-4 py-2 rounded"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={5} className="text-center py-6 text-gray-500">
//                   No data found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div className="flex justify-center mt-6 space-x-2">
//           {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
//             <button
//               key={number}
//               onClick={() => setCurrentPage(number)}
//               className={`px-3 py-1 rounded ${
//                 currentPage === number
//                   ? "bg-blue-500 text-white"
//                   : "bg-gray-200 text-black"
//               }`}
//             >
//               {number}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import TextAlign from "@tiptap/extension-text-align";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Highlight from "@tiptap/extension-highlight";
import Blockquote from "@tiptap/extension-blockquote";
import CodeBlock from "@tiptap/extension-code-block";
import Placeholder from "@tiptap/extension-placeholder";
import { motion } from "framer-motion";
import MainLayout from "../admin/components/ui/MainLayout";

import "../globals.css";

export default function BlogForm() {
  // const searchParams = useSearchParams();
  // const id = searchParams.get("id");
  // const queryTable = searchParams.get("tableName") || "";

  ////////////////////////////////////////////////////////////////////////

  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");
  const [tableName, setTableName] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Italic,
      Underline,
      Strike,
      BulletList,
      OrderedList,
      ListItem,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Highlight,
      Blockquote,
      CodeBlock,
      Placeholder.configure({ placeholder: "Content" }),
    ],
    content: "",
    onUpdate: ({ editor }) => setContent(editor.getHTML()),
  });

  const handleAction = (editor, action) => {
    // If the action is to clear content, do so
    if (action === "clearContent") {
      editor.commands.clearContent();
    } else {
      // Focus and apply the action
      editor.chain().focus();
      if (action === "toggleBulletList" || action === "toggleOrderedList") {
        // Apply the list formatting to the current selection or block
        editor.chain().focus()[action]().run();
      } else {
        editor.chain()[action]().run();
      }
    }
  };

  const formatButtons = [
    { action: "toggleBold", label: "B", style: "font-bold" },
    { action: "toggleItalic", label: "I", style: "italic" },
    { action: "toggleUnderline", label: "U", style: "underline" },
    { action: "toggleStrike", label: "S", style: "line-through" },
    { action: "toggleBulletList", label: "• List", style: "font-bold" },
    { action: "toggleOrderedList", label: "1. List", style: "font-bold" },
    { action: "toggleHighlight", label: "✦ Highlight", style: "bg-yellow-300" },
    { action: "undo", label: "↩ Undo", style: "text-blue-500" },
    { action: "redo", label: "↪ Redo", style: "text-green-500" },
    { action: "clearContent", label: "🗑 Clear", style: "text-red-500" },
  ];

  ////////////////////////////////////////////eiditor end ////////////////////////////////////////////
  const showMessage = (message) => {
    setModalMessage(message);
    setShowModal(true);
    setTimeout(() => setShowModal(false), 5000);
  };

  const clearForm = () => {
    setTitle("");
    setImage(null);
    setContent("");
    setTableName("");
    if (editor) editor.commands.clearContent();
  };

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const searchParams = new URLSearchParams(window.location.search);
  //     const idFromUrl = searchParams.get("id");
  //     const tableFromUrl = searchParams.get("tableName");

  //     setId(idFromUrl);
  //     setTableName(tableFromUrl);
  //   }
  // }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const id = searchParams.get("id");
      const queryTable = searchParams.get("tableName");
      setId(id);
      setTableName(queryTable);
    }
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      if (!id || !tableName) return;

      try {
        const res = await fetch(
          `/api/card-data/update-data?id=${id}&tableName=${tableName}`
        );
        const data = await res.json();
        console.log(data, "update data");

        setTitle(data.title || "");
        setContent(data.content || "");
        setImage(data.image || null);
        setTableName(tableName);

        if (editor && data.content) {
          editor.commands.setContent(data.content);
        }
      } catch (err) {
        showMessage("❌ Failed to load blog data.");
      }
    };

    fetchData();
  }, [id, tableName, editor]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || !tableName) {
      const missingFields = [];
      if (!title) missingFields.push("Title");
      if (!content) missingFields.push("Content");
      if (!tableName) missingFields.push("Table Name");
      showMessage(`⚠ Missing field(s): ${missingFields.join(", ")}`);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    if (image) formData.append("image", image);
    formData.append("content", content);
    formData.append("tableName", tableName);
    if (id) formData.append("id", id);
    console.log(formData, "formData");
    try {
      const response = await fetch("/api/card-data/send-data", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        showMessage(`✅ Blog ${id ? "updated" : "submitted"} successfully!`);
        clearForm();
      } else {
        showMessage("❌ Blog submission failed!");
      }
    } catch (err) {
      showMessage("❌ Something went wrong!");
    }
  };

  const renderToolbar = (editor) => (
    <div className="flex gap-2 flex-wrap">
      {formatButtons.map(({ action, label, style }) => (
        <button
          key={action}
          type="button"
          onClick={() => handleAction(editor, action)}
          className={`p-2 rounded-md text-sm ${style} bg-gray-300 hover:bg-gray-400 transition`}
        >
          {label}
        </button>
      ))}
    </div>
  );

  return (
    <MainLayout>
      <form onSubmit={handleSubmit} className="w-full grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-3">
          <select
            value={tableName}
            onChange={(e) => setTableName(e.target.value)}
            className="px-1 py-2.5 w-full text-[#6C472D] font-semibold border-2 border-[#6C472D] rounded-md bg-white outline-none"
          >
            <option value="">Select Table</option>
            <option value="wazaif">wazaif</option>
            <option value="jado_tona_alaj">jado_tona_alaj</option>
            <option value="mujrab_nakosh">mujrab_nakosh</option>
            <option value="qutab">qutab</option>
          </select>
        </div>

        <div className="col-span-12 md:col-span-6">
          <input
            type="text"
            dir="auto"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-[0.45rem] w-full text-[#6C472D] font-semibold border-2 border-[#6C472D] rounded-md bg-white outline-none placeholder-[#6C472D]"
          />
        </div>

        <div className="col-span-12 md:col-span-3">
          <label
            htmlFor="image-upload"
            className="block p-[0.45rem] w-full text-[#6C472D] font-semibold border-2 border-[#6C472D] rounded-md bg-white cursor-pointer truncate"
            title={image ? image.name || image : "Upload an image"}
          >
            {image ? image.name || image : "Upload an image"}
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="hidden"
          />
        </div>

        <div className="col-span-12">
          <div className="px-2 py-3 border-2 border-[#D4AF37] w-full rounded-md bg-white ">
            {editor && renderToolbar(editor)}
            <div className="mt-3 border-2 border-[#D4AF37] rounded-md">
              <EditorContent editor={editor} />
            </div>
          </div>
        </div>

        <div className="col-span-12">
          <div className="flex justify-end">
            <button
              type="submit"
              className="py-3 px-10 text-white text-lg font-semibold bg-[#6C472D] rounded-md"
            >
              {id ? "Update" : "Post"}
            </button>
          </div>
        </div>
      </form>

      {showModal && (
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 50, opacity: 0 }}
          transition={{ type: "spring", stiffness: 120 }}
          className="fixed bottom-5 right-5 flex items-center gap-4 bg-gray-900 text-white p-4 rounded-lg shadow-xl z-50"
        >
          <p className="text-sm font-semibold">{modalMessage}</p>
        </motion.div>
      )}
    </MainLayout>
  );
}
