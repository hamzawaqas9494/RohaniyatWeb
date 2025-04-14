// // // // // // "use client";

// // // // // // import { useState } from "react";
// // // // // // import { useEditor, EditorContent } from "@tiptap/react";
// // // // // // import StarterKit from "@tiptap/starter-kit";
// // // // // // import Bold from "@tiptap/extension-bold";
// // // // // // import Italic from "@tiptap/extension-italic";
// // // // // // import Underline from "@tiptap/extension-underline";
// // // // // // import Strike from "@tiptap/extension-strike";
// // // // // // import TextAlign from "@tiptap/extension-text-align";
// // // // // // import BulletList from "@tiptap/extension-bullet-list";
// // // // // // import OrderedList from "@tiptap/extension-ordered-list";
// // // // // // import ListItem from "@tiptap/extension-list-item";
// // // // // // import Highlight from "@tiptap/extension-highlight";
// // // // // // import Blockquote from "@tiptap/extension-blockquote";
// // // // // // import CodeBlock from "@tiptap/extension-code-block";
// // // // // // import { motion, AnimatePresence } from "framer-motion";
// // // // // // import MainLayout from "./admin/components/ui/MainLayout";

// // // // // // export default function BlogForm() {
// // // // // //   const [title, setTitle] = useState("");
// // // // // //   const [subtitle, setSubtitle] = useState("");
// // // // // //   const [image, setImage] = useState(null);
// // // // // //   const [content, setContent] = useState("");
// // // // // //   const [tableName, setTableName] = useState("");
// // // // // //   const [modalMessage, setModalMessage] = useState("");
// // // // // //   const [showModal, setShowModal] = useState(false);

// // // // // //   const editor = useEditor({
// // // // // //     extensions: [
// // // // // //       StarterKit,
// // // // // //       Bold,
// // // // // //       Italic,
// // // // // //       Underline,
// // // // // //       Strike,
// // // // // //       BulletList,
// // // // // //       OrderedList,
// // // // // //       ListItem,
// // // // // //       TextAlign.configure({ types: ["heading", "paragraph"] }),
// // // // // //       Highlight,
// // // // // //       Blockquote,
// // // // // //       CodeBlock,
// // // // // //     ],
// // // // // //     content: "",
// // // // // //     onUpdate: ({ editor }) => setContent(editor.getHTML()),
// // // // // //   });

// // // // // //   const subEditor = useEditor({
// // // // // //     extensions: [
// // // // // //       StarterKit,
// // // // // //       Bold,
// // // // // //       Italic,
// // // // // //       Underline,
// // // // // //       Strike,
// // // // // //       BulletList,
// // // // // //       OrderedList,
// // // // // //       ListItem,
// // // // // //       TextAlign.configure({ types: ["heading", "paragraph"] }),
// // // // // //       Highlight,
// // // // // //       Blockquote,
// // // // // //       CodeBlock,
// // // // // //     ],
// // // // // //     content: "",
// // // // // //     onUpdate: ({ editor }) => setSubContent(editor.getHTML()),
// // // // // //   });

// // // // // //   const formatButtons = [
// // // // // //     { action: "toggleBold", label: "B", style: "font-bold" },
// // // // // //     { action: "toggleItalic", label: "I", style: "italic" },
// // // // // //     { action: "toggleUnderline", label: "U", style: "underline" },
// // // // // //     { action: "toggleStrike", label: "S", style: "line-through" },
// // // // // //     { action: "toggleBulletList", label: "• List", style: "font-bold" },
// // // // // //     { action: "toggleOrderedList", label: "1. List", style: "font-bold" },
// // // // // //     { action: "toggleHighlight", label: "✦ Highlight", style: "bg-yellow-300" },
// // // // // //     {
// // // // // //       action: "toggleBlockquote",
// // // // // //       label: "❝ Blockquote",
// // // // // //       style: "italic text-gray-600",
// // // // // //     },
// // // // // //     {
// // // // // //       action: "toggleCodeBlock",
// // // // // //       label: "<> Code",
// // // // // //       style: "font-mono bg-gray-200 p-1",
// // // // // //     },
// // // // // //     { action: "undo", label: "↩ Undo", style: "text-blue-500" },
// // // // // //     { action: "redo", label: "↪ Redo", style: "text-green-500" },
// // // // // //     { action: "clearContent", label: "🗑 Clear", style: "text-red-500" },
// // // // // //   ];

// // // // // //   const handleAction = (editor, action) => {
// // // // // //     if (action === "clearContent") {
// // // // // //       editor.commands.clearContent();
// // // // // //     } else {
// // // // // //       editor.chain().focus()[action]().run();
// // // // // //     }
// // // // // //   };

// // // // // //   const handleSubmit = async (e) => {
// // // // // //     e.preventDefault();
// // // // // //     const formData = new FormData();
// // // // // //     formData.append("title", title);
// // // // // //     formData.append("subtitle", subtitle);
// // // // // //     formData.append("image", image);
// // // // // //     formData.append("content", content);
// // // // // //     formData.append("tableName", tableName);

// // // // // //     console.log(formData, "formData");

// // // // // //     const response = await fetch("../api/card-data/send-card-data", {
// // // // // //       method: "POST",
// // // // // //       body: formData,
// // // // // //     });

// // // // // //     if (response.ok) {
// // // // // //       setModalMessage("✅ Blog submitted successfully!");
// // // // // //     } else {
// // // // // //       setModalMessage("❌ Blog submission failed!");
// // // // // //     }

// // // // // //     setShowModal(true);

// // // // // //     setTimeout(() => {
// // // // // //       setShowModal(false);
// // // // // //     }, 5000);
// // // // // //   };

// // // // // //   const renderToolbar = (editor) => (
// // // // // //     <div className="mb-3 flex gap-2 flex-wrap">
// // // // // //       {formatButtons.map(({ action, label, style }) => (
// // // // // //         <button
// // // // // //           key={action}
// // // // // //           type="button"
// // // // // //           onClick={() => handleAction(editor, action)}
// // // // // //           className={`p-2 rounded-md text-sm ${style} bg-gray-300 hover:bg-gray-400 transition`}
// // // // // //         >
// // // // // //           {label}
// // // // // //         </button>
// // // // // //       ))}
// // // // // //     </div>
// // // // // //   );

// // // // // //   return (
// // // // // //     <MainLayout>
// // // // // //       <div className="container mx-auto">
// // // // // //         <form
// // // // // //           onSubmit={handleSubmit}
// // // // // //           className="w-full grid grid-cols-12 gap-4 p-6 bg-[#F8F1E8]"
// // // // // //         >
// // // // // //           {/* 📌 Table Selection */}
// // // // // //           <div className="col-span-12 md:col-span-6">
// // // // // //             <select
// // // // // //               value={tableName}
// // // // // //               onChange={(e) => setTableName(e.target.value)}
// // // // // //               className="p-2.5 text-base border-2 border-[#D4AF37] w-full rounded-sm bg-white shadow-md outline-none"
// // // // // //             >
// // // // // //               <option value="Select Table">Select Table</option>
// // // // // //               <option value="blogs">blogs</option>
// // // // // //               <option value="Articles">Articles</option>
// // // // // //             </select>
// // // // // //           </div>

// // // // // //           {/* 📌 Table Selection */}
// // // // // //           <div className="col-span-12 md:col-span-6">
// // // // // //             <input
// // // // // //               type="text"
// // // // // //               placeholder="Enter Title"
// // // // // //               value={title}
// // // // // //               onChange={(e) => setTitle(e.target.value)}
// // // // // //               className="p-2 text-base border-2 border-[#D4AF37] w-full rounded-sm bg-white shadow-md outline-none"
// // // // // //             />
// // // // // //           </div>
// // // // // //           <div className="col-span-12 md:col-span-6">
// // // // // //             {/* 📌 Subtitle Input */}

// // // // // //             <input
// // // // // //               type="text"
// // // // // //               placeholder="Enter Subtitle"
// // // // // //               value={subtitle}
// // // // // //               onChange={(e) => setSubtitle(e.target.value)}
// // // // // //               className="p-2 text-base border-2 border-[#D4AF37] w-full rounded-sm bg-white shadow-md outline-none"
// // // // // //             />
// // // // // //           </div>
// // // // // //           <div className="col-span-12 md:col-span-6">
// // // // // //             {/* 📌 Image Upload */}

// // // // // //             <input
// // // // // //               type="file"
// // // // // //               onChange={(e) => setImage(e.target.files[0])}
// // // // // //               className="p-2 text-base border-2 border-[#D4AF37] w-full rounded-sm bg-white shadow-md outline-none"
// // // // // //             />
// // // // // //           </div>

// // // // // //           {/* 📝 Main Content Editor */}
// // // // // //           <div className="col-span-12">
// // // // // //             <div className="p-2 border-2 border-[#D4AF37] w-full rounded-md bg-white shadow-md">
// // // // // //               <h3 className="font-bold text-[#8B572A] mb-2">Main Content</h3>
// // // // // //               {editor && renderToolbar(editor)}
// // // // // //               <div className="border bg-[#FDF8E1] rounded-md min-h-[150px]">
// // // // // //                 <EditorContent editor={editor} />
// // // // // //               </div>
// // // // // //             </div>
// // // // // //           </div>

// // // // // //           {/* 📌 Submit Button */}
// // // // // //           <button
// // // // // //             type="submit"
// // // // // //             className="bg-[#8B572A] text-white p-2 rounded-md w-full mt-4 hover:bg-[#704522] transition"
// // // // // //           >
// // // // // //             Post
// // // // // //           </button>
// // // // // //         </form>

// // // // // //         {showModal && (
// // // // // //           <motion.div
// // // // // //             initial={{ x: 50, opacity: 0 }}
// // // // // //             animate={{ x: 0, opacity: 1 }}
// // // // // //             exit={{ x: 50, opacity: 0 }}
// // // // // //             transition={{ type: "spring", stiffness: 120 }}
// // // // // //             className="fixed bottom-5 right-5 flex items-center gap-4 bg-gray-900 text-white p-4 rounded-lg shadow-xl"
// // // // // //           >
// // // // // //             <div>
// // // // // //               <p className="text-sm font-semibold">{modalMessage}</p>
// // // // // //             </div>
// // // // // //           </motion.div>
// // // // // //         )}
// // // // // //       </div>
// // // // // //     </MainLayout>
// // // // // //   );
// // // // // // }

// // // // // "use client";

// // // // // import { useState } from "react";
// // // // // import { useEditor, EditorContent } from "@tiptap/react";
// // // // // import StarterKit from "@tiptap/starter-kit";
// // // // // import Bold from "@tiptap/extension-bold";
// // // // // import Italic from "@tiptap/extension-italic";
// // // // // import Underline from "@tiptap/extension-underline";
// // // // // import Strike from "@tiptap/extension-strike";
// // // // // import TextAlign from "@tiptap/extension-text-align";
// // // // // import BulletList from "@tiptap/extension-bullet-list";
// // // // // import OrderedList from "@tiptap/extension-ordered-list";
// // // // // import ListItem from "@tiptap/extension-list-item";
// // // // // import Highlight from "@tiptap/extension-highlight";
// // // // // import Blockquote from "@tiptap/extension-blockquote";
// // // // // import CodeBlock from "@tiptap/extension-code-block";
// // // // // import { motion, AnimatePresence } from "framer-motion";
// // // // // import MainLayout from "./admin/components/ui/MainLayout";
// // // // // import Placeholder from "@tiptap/extension-placeholder";

// // // // // import "./globals.css";

// // // // // export default function BlogForm() {
// // // // //   const [title, setTitle] = useState("");
// // // // //   const [image, setImage] = useState(null);
// // // // //   const [content, setContent] = useState("");
// // // // //   const [tableName, setTableName] = useState("");
// // // // //   const [modalMessage, setModalMessage] = useState("");
// // // // //   const [showModal, setShowModal] = useState(false);

// // // // //   const editor = useEditor({
// // // // //     extensions: [
// // // // //       StarterKit,
// // // // //       Bold,
// // // // //       Italic,
// // // // //       Underline,
// // // // //       Strike,
// // // // //       BulletList,
// // // // //       OrderedList,
// // // // //       ListItem,
// // // // //       TextAlign.configure({ types: ["heading", "paragraph"] }),
// // // // //       Highlight,
// // // // //       Blockquote,
// // // // //       CodeBlock,
// // // // //       Placeholder.configure({
// // // // //         placeholder: "Content",
// // // // //       }),
// // // // //     ],
// // // // //     content: "",
// // // // //     onUpdate: ({ editor }) => setContent(editor.getHTML()),
// // // // //   });

// // // // //   const formatButtons = [
// // // // //     { action: "toggleBold", label: "B", style: "font-bold" },
// // // // //     { action: "toggleItalic", label: "I", style: "italic" },
// // // // //     { action: "toggleUnderline", label: "U", style: "underline" },
// // // // //     { action: "toggleStrike", label: "S", style: "line-through" },
// // // // //     { action: "toggleBulletList", label: "• List", style: "font-bold" },
// // // // //     { action: "toggleOrderedList", label: "1. List", style: "font-bold" },
// // // // //     { action: "toggleHighlight", label: "✦ Highlight", style: "bg-yellow-300" },
// // // // //     { action: "undo", label: "↩ Undo", style: "text-blue-500" },
// // // // //     { action: "redo", label: "↪ Redo", style: "text-green-500" },
// // // // //     { action: "clearContent", label: "🗑 Clear", style: "text-red-500" },
// // // // //   ];

// // // // //   const handleAction = (editor, action) => {
// // // // //     if (action === "clearContent") {
// // // // //       editor.commands.clearContent();
// // // // //     } else {
// // // // //       editor.chain().focus()[action]().run();
// // // // //     }
// // // // //   };

// // // // //   const handleSubmit = async (e) => {
// // // // //     e.preventDefault();
// // // // //     const formData = new FormData();
// // // // //     formData.append("title", title);
// // // // //     formData.append("image", image);
// // // // //     formData.append("content", content);
// // // // //     formData.append("tableName", tableName);

// // // // //     console.log(formData, "formData");

// // // // //     const response = await fetch("../api/card-data/send-wazaif-data", {
// // // // //       method: "POST",
// // // // //       body: formData,
// // // // //     });

// // // // //     if (response.ok) {
// // // // //       setModalMessage("✅ Blog submitted successfully!");
// // // // //     } else {
// // // // //       setModalMessage("❌ Blog submission failed!");
// // // // //     }

// // // // //     setShowModal(true);

// // // // //     setTimeout(() => {
// // // // //       setShowModal(false);
// // // // //     }, 5000);
// // // // //   };

// // // // //   const renderToolbar = (editor) => (
// // // // //     <div className="flex gap-2 flex-wrap">
// // // // //       {formatButtons.map(({ action, label, style }) => (
// // // // //         <button
// // // // //           key={action}
// // // // //           type="button"
// // // // //           onClick={() => handleAction(editor, action)}
// // // // //           className={`p-2 rounded-md text-sm ${style} bg-gray-300 hover:bg-gray-400 transition`}
// // // // //         >
// // // // //           {label}
// // // // //         </button>
// // // // //       ))}
// // // // //     </div>
// // // // //   );

// // // // //   return (
// // // // //     <MainLayout>
// // // // //       <div>
// // // // //         <form
// // // // //           onSubmit={handleSubmit}
// // // // //           className="w-full h-full grid grid-cols-12 gap-4"
// // // // //         >
// // // // //           {/* 📌 Table Selection */}
// // // // //           <div className="col-span-12 md:col-span-3">
// // // // //             <select
// // // // //               value={tableName}
// // // // //               onChange={(e) => setTableName(e.target.value)}
// // // // //               className="px-1 py-2.5 w-full text-[#6C472D] font-semibold border-2 border-[#6C472D] rounded-md bg-white outline-none"
// // // // //             >
// // // // //               <option value="Select Table">Select Table</option>
// // // // //               <option value="wazaif">wazaif</option>
// // // // //               <option value="jado_tona_alaj">jado_tona_alaj</option>
// // // // //               <option value="mujrab_nakosh">mujrab_nakosh</option>
// // // // //               <option value="qutab">qutab</option>
// // // // //             </select>
// // // // //           </div>

// // // // //           {/* 📌 Table Selection */}
// // // // //           <div className="col-span-12 md:col-span-6">
// // // // //             <input
// // // // //               type="text"
// // // // //               dir="auto" // or dir="rtl"
// // // // //               placeholder="Title"
// // // // //               value={title}
// // // // //               onChange={(e) => setTitle(e.target.value)}
// // // // //               className="p-[0.45rem] w-full text-[#6C472D] font-semibold border-2 border-[#6C472D] rounded-md bg-white outline-none placeholder-[#6C472D]"
// // // // //             />
// // // // //           </div>

// // // // //           <div className="col-span-12 md:col-span-3">
// // // // //             <label
// // // // //               htmlFor="image-upload"
// // // // //               className="block p-[0.45rem] w-full text-[#6C472D] font-semibold border-2 border-[#6C472D] rounded-md bg-white outline-none cursor-pointer placeholder-[#B08968] truncate overflow-hidden whitespace-nowrap"
// // // // //               title={image ? image.name : "Upload an image"}
// // // // //             >
// // // // //               {image ? image.name : "Upload an image"}
// // // // //             </label>

// // // // //             <input
// // // // //               id="image-upload"
// // // // //               type="file"
// // // // //               accept="image/*"
// // // // //               onChange={(e) => setImage(e.target.files[0])}
// // // // //               className="hidden"
// // // // //             />
// // // // //           </div>

// // // // //           {/* 📝 Main Content Editor */}
// // // // //           <div className="col-span-12">
// // // // //             <div className="px-2 py-3 border-2 border-[#D4AF37] w-full rounded-md bg-white shadow-md">
// // // // //               {editor && renderToolbar(editor)}
// // // // //               <div className="mt-3 border-2 border-[#D4AF37] rounded-md ">
// // // // //                 <EditorContent editor={editor} />
// // // // //               </div>
// // // // //             </div>
// // // // //           </div>

// // // // //           {/* 📌 Submit Button */}
// // // // //           <div className="col-span-12">
// // // // //             <div className="flex justify-end">
// // // // //               <button
// // // // //                 type="submit"
// // // // //                 className="py-3 px-10 text-white text-lg font-semibold bg-[#6C472D] rounded-md cursor-pointer"
// // // // //               >
// // // // //                 Post
// // // // //               </button>
// // // // //             </div>
// // // // //           </div>
// // // // //         </form>

// // // // //         {showModal && (
// // // // //           <motion.div
// // // // //             initial={{ x: 50, opacity: 0 }}
// // // // //             animate={{ x: 0, opacity: 1 }}
// // // // //             exit={{ x: 50, opacity: 0 }}
// // // // //             transition={{ type: "spring", stiffness: 120 }}
// // // // //             className="fixed bottom-5 right-5 flex items-center gap-4 bg-gray-900 text-white p-4 rounded-lg shadow-xl"
// // // // //           >
// // // // //             <div>
// // // // //               <p className="text-sm font-semibold">{modalMessage}</p>
// // // // //             </div>
// // // // //           </motion.div>
// // // // //         )}
// // // // //       </div>
// // // // //     </MainLayout>
// // // // //   );
// // // // // }

// // // // "use client";

// // // // import { useState, useEffect } from "react";
// // // // import { useSearchParams } from "next/navigation";
// // // // import { useEditor, EditorContent } from "@tiptap/react";
// // // // import StarterKit from "@tiptap/starter-kit";
// // // // import Bold from "@tiptap/extension-bold";
// // // // import Italic from "@tiptap/extension-italic";
// // // // import Underline from "@tiptap/extension-underline";
// // // // import Strike from "@tiptap/extension-strike";
// // // // import TextAlign from "@tiptap/extension-text-align";
// // // // import BulletList from "@tiptap/extension-bullet-list";
// // // // import OrderedList from "@tiptap/extension-ordered-list";
// // // // import ListItem from "@tiptap/extension-list-item";
// // // // import Highlight from "@tiptap/extension-highlight";
// // // // import Blockquote from "@tiptap/extension-blockquote";
// // // // import CodeBlock from "@tiptap/extension-code-block";
// // // // import Placeholder from "@tiptap/extension-placeholder";
// // // // import { motion } from "framer-motion";
// // // // import MainLayout from "./admin/components/ui/MainLayout";

// // // // import "./globals.css";

// // // // export default function BlogForm() {
// // // //   const searchParams = useSearchParams();
// // // //   const id = searchParams.get("id");
// // // //   const queryTable = searchParams.get("tableName") || "";

// // // //   const [title, setTitle] = useState("");
// // // //   const [image, setImage] = useState(null);
// // // //   const [content, setContent] = useState("");
// // // //   const [tableName, setTableName] = useState(queryTable);
// // // //   const [modalMessage, setModalMessage] = useState("");
// // // //   const [showModal, setShowModal] = useState(false);

// // // //   ///////////////////////////////////////////////////////////////////////////////////////////////
// // // //   const editor = useEditor({
// // // //     extensions: [
// // // //       StarterKit,
// // // //       Bold,
// // // //       Italic,
// // // //       Underline,
// // // //       Strike,
// // // //       BulletList,
// // // //       OrderedList,
// // // //       ListItem,
// // // //       TextAlign.configure({ types: ["heading", "paragraph"] }),
// // // //       Highlight,
// // // //       Blockquote,
// // // //       CodeBlock,
// // // //       Placeholder.configure({ placeholder: "Content" }),
// // // //     ],
// // // //     content: "",
// // // //     onUpdate: ({ editor }) => setContent(editor.getHTML()),
// // // //   });

// // // //   const handleAction = (editor, action) => {
// // // //     if (action === "clearContent") {
// // // //       editor.commands.clearContent();
// // // //     } else {
// // // //       editor.chain().focus()[action]().run();
// // // //     }
// // // //   };

// // // //   const formatButtons = [
// // // //     { action: "toggleBold", label: "B", style: "font-bold" },
// // // //     { action: "toggleItalic", label: "I", style: "italic" },
// // // //     { action: "toggleUnderline", label: "U", style: "underline" },
// // // //     { action: "toggleStrike", label: "S", style: "line-through" },
// // // //     { action: "toggleBulletList", label: "• List", style: "font-bold" },
// // // //     { action: "toggleOrderedList", label: "1. List", style: "font-bold" },
// // // //     { action: "toggleHighlight", label: "✦ Highlight", style: "bg-yellow-300" },
// // // //     { action: "undo", label: "↩ Undo", style: "text-blue-500" },
// // // //     { action: "redo", label: "↪ Redo", style: "text-green-500" },
// // // //     { action: "clearContent", label: "🗑 Clear", style: "text-red-500" },
// // // //   ];
// // // //   ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// // // //   useEffect(() => {
// // // //     const fetchData = async () => {
// // // //       if (!id || !tableName) return;

// // // //       try {
// // // //         const res = await fetch(
// // // //           `/api/card-data/update-data?id=${id}&tableName=${tableName}`
// // // //         );
// // // //         const data = await res.json();

// // // //         console.log(data);

// // // //         setTitle(data.title || "");
// // // //         setContent(data.content || "");
// // // //         setTableName(data.tableName || "");
// // // //         setImage(data.image || "image not found");

// // // //         if (editor && data.content) {
// // // //           editor.commands.setContent(data.content);
// // // //         }
// // // //       } catch (err) {
// // // //         console.error("Error fetching blog data:", err);
// // // //       }
// // // //     };

// // // //     fetchData();
// // // //   }, [id, editor]);

// // // //   const handleSubmit = async (e) => {
// // // //     e.preventDefault();

// // // //     const formData = new FormData();
// // // //     formData.append("title", title);
// // // //     if (image) formData.append("image", image);
// // // //     formData.append("content", content);
// // // //     formData.append("tableName", tableName);
// // // //     if (id) formData.append("id", id);

// // // //     const response = await fetch("/api/card-data/send-data", {
// // // //       method: "POST",
// // // //       body: formData,
// // // //     });

// // // //     if (response.ok) {
// // // //       setModalMessage(`✅ Blog ${id ? "updated" : "submitted"} successfully!`);
// // // //     } else {
// // // //       setModalMessage("❌ Blog submission failed!");
// // // //     }

// // // //     setShowModal(true);
// // // //     setTimeout(() => setShowModal(false), 5000);
// // // //   };

// // // //   const renderToolbar = (editor) => (
// // // //     <div className="flex gap-2 flex-wrap">
// // // //       {formatButtons.map(({ action, label, style }) => (
// // // //         <button
// // // //           key={action}
// // // //           type="button"
// // // //           onClick={() => handleAction(editor, action)}
// // // //           className={`p-2 rounded-md text-sm ${style} bg-gray-300 hover:bg-gray-400 transition`}
// // // //         >
// // // //           {label}
// // // //         </button>
// // // //       ))}
// // // //     </div>
// // // //   );

// // // //   return (
// // // //     <MainLayout>
// // // //       <form onSubmit={handleSubmit} className="w-full grid grid-cols-12 gap-4">
// // // //         <div className="col-span-12 md:col-span-3">
// // // //           <select
// // // //             value={tableName}
// // // //             onChange={(e) => setTableName(e.target.value)}
// // // //             className="px-1 py-2.5 w-full text-[#6C472D] font-semibold border-2 border-[#6C472D] rounded-md bg-white outline-none"
// // // //           >
// // // //             <option value="Select Table">Select Table</option>
// // // //             <option value="wazaif">wazaif</option>
// // // //             <option value="jado_tona_alaj">jado_tona_alaj</option>
// // // //             <option value="mujrab_nakosh">mujrab_nakosh</option>
// // // //             <option value="qutab">qutab</option>
// // // //           </select>
// // // //         </div>

// // // //         <div className="col-span-12 md:col-span-6">
// // // //           <input
// // // //             type="text"
// // // //             dir="auto"
// // // //             placeholder="Title"
// // // //             value={title}
// // // //             onChange={(e) => setTitle(e.target.value)}
// // // //             className="p-[0.45rem] w-full text-[#6C472D] font-semibold border-2 border-[#6C472D] rounded-md bg-white outline-none placeholder-[#6C472D]"
// // // //           />
// // // //         </div>

// // // //         <div className="col-span-12 md:col-span-3">
// // // //           <label
// // // //             htmlFor="image-upload"
// // // //             className="block p-[0.45rem] w-full text-[#6C472D] font-semibold border-2 border-[#6C472D] rounded-md bg-white cursor-pointer truncate"
// // // //             title={image ? image.name : "Upload an image"}
// // // //           >
// // // //             {image ? image.name : "Upload an image"}
// // // //           </label>
// // // //           <input
// // // //             id="image-upload"
// // // //             type="file"
// // // //             accept="image/*"
// // // //             onChange={(e) => setImage(e.target.files[0])}
// // // //             className="hidden"
// // // //           />
// // // //         </div>

// // // //         <div className="col-span-12">
// // // //           <div className="px-2 py-3 border-2 border-[#D4AF37] w-full rounded-md bg-white shadow-md">
// // // //             {editor && renderToolbar(editor)}
// // // //             <div className="mt-3 border-2 border-[#D4AF37] rounded-md">
// // // //               <EditorContent editor={editor} />
// // // //             </div>
// // // //           </div>
// // // //         </div>

// // // //         <div className="col-span-12">
// // // //           <div className="flex justify-end">
// // // //             <button
// // // //               type="submit"
// // // //               className="py-3 px-10 text-white text-lg font-semibold bg-[#6C472D] rounded-md"
// // // //             >
// // // //               {id ? "Update" : "Post"}
// // // //             </button>
// // // //           </div>
// // // //         </div>
// // // //       </form>

// // // //       {showModal && (
// // // //         <motion.div
// // // //           initial={{ x: 50, opacity: 0 }}
// // // //           animate={{ x: 0, opacity: 1 }}
// // // //           exit={{ x: 50, opacity: 0 }}
// // // //           transition={{ type: "spring", stiffness: 120 }}
// // // //           className="fixed bottom-5 right-5 flex items-center gap-4 bg-gray-900 text-white p-4 rounded-lg shadow-xl"
// // // //         >
// // // //           <p className="text-sm font-semibold">{modalMessage}</p>
// // // //         </motion.div>
// // // //       )}
// // // //     </MainLayout>
// // // //   );
// // // // }

// // // "use client";

// // // import { useState, useEffect } from "react";
// // // import { useSearchParams } from "next/navigation";
// // // import { useEditor, EditorContent } from "@tiptap/react";
// // // import StarterKit from "@tiptap/starter-kit";
// // // import Bold from "@tiptap/extension-bold";
// // // import Italic from "@tiptap/extension-italic";
// // // import Underline from "@tiptap/extension-underline";
// // // import Strike from "@tiptap/extension-strike";
// // // import TextAlign from "@tiptap/extension-text-align";
// // // import BulletList from "@tiptap/extension-bullet-list";
// // // import OrderedList from "@tiptap/extension-ordered-list";
// // // import ListItem from "@tiptap/extension-list-item";
// // // import Highlight from "@tiptap/extension-highlight";
// // // import Blockquote from "@tiptap/extension-blockquote";
// // // import CodeBlock from "@tiptap/extension-code-block";
// // // import Placeholder from "@tiptap/extension-placeholder";
// // // import { motion } from "framer-motion";
// // // import MainLayout from "./admin/components/ui/MainLayout";

// // // import "./globals.css";

// // // export default function BlogForm() {
// // //   const searchParams = useSearchParams();
// // //   const id = searchParams.get("id");
// // //   const queryTable = searchParams.get("tableName") || "";

// // //   const [title, setTitle] = useState("");
// // //   const [image, setImage] = useState(null);
// // //   const [content, setContent] = useState("");
// // //   const [tableName, setTableName] = useState(queryTable);
// // //   const [modalMessage, setModalMessage] = useState("");
// // //   const [showModal, setShowModal] = useState(false);

// // //   const editor = useEditor({
// // //     extensions: [
// // //       StarterKit,
// // //       Bold,
// // //       Italic,
// // //       Underline,
// // //       Strike,
// // //       BulletList,
// // //       OrderedList,
// // //       ListItem,
// // //       TextAlign.configure({ types: ["heading", "paragraph"] }),
// // //       Highlight,
// // //       Blockquote,
// // //       CodeBlock,
// // //       Placeholder.configure({ placeholder: "Content" }),
// // //     ],
// // //     content: "",
// // //     onUpdate: ({ editor }) => setContent(editor.getHTML()),
// // //   });

// // //   const handleAction = (editor, action) => {
// // //     if (action === "clearContent") {
// // //       editor.commands.clearContent();
// // //     } else {
// // //       editor.chain().focus()[action]().run();
// // //     }
// // //   };

// // //   const formatButtons = [
// // //     { action: "toggleBold", label: "B", style: "font-bold" },
// // //     { action: "toggleItalic", label: "I", style: "italic" },
// // //     { action: "toggleUnderline", label: "U", style: "underline" },
// // //     { action: "toggleStrike", label: "S", style: "line-through" },
// // //     { action: "toggleBulletList", label: "• List", style: "font-bold" },
// // //     { action: "toggleOrderedList", label: "1. List", style: "font-bold" },
// // //     { action: "toggleHighlight", label: "✦ Highlight", style: "bg-yellow-300" },
// // //     { action: "undo", label: "↩ Undo", style: "text-blue-500" },
// // //     { action: "redo", label: "↪ Redo", style: "text-green-500" },
// // //     { action: "clearContent", label: "🗑 Clear", style: "text-red-500" },
// // //   ];

// // //   useEffect(() => {
// // //     const fetchData = async () => {
// // //       if (!id || !queryTable) return;

// // //       try {
// // //         const res = await fetch(
// // //           `/api/card-data/update-data?id=${id}&tableName=${queryTable}`
// // //         );
// // //         const data = await res.json();

// // //         setTitle(data.title || "");
// // //         setContent(data.content || "");
// // //         setTableName(data.queryTable || "");
// // //         setImage(data.image || null);

// // //         if (editor && data.content) {
// // //           editor.commands.setContent(data.content);
// // //         }
// // //       } catch (err) {
// // //         showMessage("❌ Failed to load blog data.");
// // //       }
// // //     };

// // //     fetchData();
// // //   }, [id, queryTable, editor]);

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();

// // //     const formData = new FormData();
// // //     formData.append("title", title);
// // //     if (image) formData.append("image", image);
// // //     formData.append("content", content);
// // //     formData.append("tableName", tableName);
// // //     if (id) formData.append("id", id);

// // //     try {
// // //       const response = await fetch("/api/card-data/send-data", {
// // //         method: "POST",
// // //         body: formData,
// // //       });

// // //       if (response.ok) {
// // //         showMessage(`✅ Blog ${id ? "updated" : "submitted"} successfully!`);
// // //       } else {
// // //         showMessage("❌ Blog submission failed!");
// // //       }
// // //     } catch (err) {
// // //       showMessage("❌ Something went wrong!");
// // //     }
// // //   };

// // //   const showMessage = (message) => {
// // //     setModalMessage(message);
// // //     setShowModal(true);
// // //     setTimeout(() => setShowModal(false), 5000);
// // //   };

// // //   const renderToolbar = (editor) => (
// // //     <div className="flex gap-2 flex-wrap">
// // //       {formatButtons.map(({ action, label, style }) => (
// // //         <button
// // //           key={action}
// // //           type="button"
// // //           onClick={() => handleAction(editor, action)}
// // //           className={`p-2 rounded-md text-sm ${style} bg-gray-300 hover:bg-gray-400 transition`}
// // //         >
// // //           {label}
// // //         </button>
// // //       ))}
// // //     </div>
// // //   );

// // //   return (
// // //     <MainLayout>
// // //       <form onSubmit={handleSubmit} className="w-full grid grid-cols-12 gap-4">
// // //         <div className="col-span-12 md:col-span-3">
// // //           <select
// // //             value={tableName}
// // //             onChange={(e) => setTableName(e.target.value)}
// // //             className="px-1 py-2.5 w-full text-[#6C472D] font-semibold border-2 border-[#6C472D] rounded-md bg-white outline-none"
// // //           >
// // //             <option value="">Select Table</option>
// // //             <option value="wazaif">wazaif</option>
// // //             <option value="jado_tona_alaj">jado_tona_alaj</option>
// // //             <option value="mujrab_nakosh">mujrab_nakosh</option>
// // //             <option value="qutab">qutab</option>
// // //           </select>
// // //         </div>

// // //         <div className="col-span-12 md:col-span-6">
// // //           <input
// // //             type="text"
// // //             dir="auto"
// // //             placeholder="Title"
// // //             value={title}
// // //             onChange={(e) => setTitle(e.target.value)}
// // //             className="p-[0.45rem] w-full text-[#6C472D] font-semibold border-2 border-[#6C472D] rounded-md bg-white outline-none placeholder-[#6C472D]"
// // //           />
// // //         </div>

// // //         <div className="col-span-12 md:col-span-3">
// // //           <label
// // //             htmlFor="image-upload"
// // //             className="block p-[0.45rem] w-full text-[#6C472D] font-semibold border-2 border-[#6C472D] rounded-md bg-white cursor-pointer truncate"
// // //             title={image ? image.name || image : "Upload an image"}
// // //           >
// // //             {image ? image.name || image : "Upload an image"}
// // //           </label>
// // //           <input
// // //             id="image-upload"
// // //             type="file"
// // //             accept="image/*"
// // //             onChange={(e) => setImage(e.target.files[0])}
// // //             className="hidden"
// // //           />
// // //         </div>

// // //         <div className="col-span-12">
// // //           <div className="px-2 py-3 border-2 border-[#D4AF37] w-full rounded-md bg-white shadow-md">
// // //             {editor && renderToolbar(editor)}
// // //             <div className="mt-3 border-2 border-[#D4AF37] rounded-md">
// // //               <EditorContent editor={editor} />
// // //             </div>
// // //           </div>
// // //         </div>

// // //         <div className="col-span-12">
// // //           <div className="flex justify-end">
// // //             <button
// // //               type="submit"
// // //               className="py-3 px-10 text-white text-lg font-semibold bg-[#6C472D] rounded-md"
// // //             >
// // //               {id ? "Update" : "Post"}
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </form>

// // //       {showModal && (
// // //         <motion.div
// // //           initial={{ x: 50, opacity: 0 }}
// // //           animate={{ x: 0, opacity: 1 }}
// // //           exit={{ x: 50, opacity: 0 }}
// // //           transition={{ type: "spring", stiffness: 120 }}
// // //           className="fixed bottom-5 right-5 flex items-center gap-4 bg-gray-900 text-white p-4 rounded-lg shadow-xl z-50"
// // //         >
// // //           <p className="text-sm font-semibold">{modalMessage}</p>
// // //         </motion.div>
// // //       )}
// // //     </MainLayout>
// // //   );
// // // }

// // "use client";

// // import { useState, useEffect } from "react";
// // import { useSearchParams } from "next/navigation";
// // import { useEditor, EditorContent } from "@tiptap/react";
// // import StarterKit from "@tiptap/starter-kit";
// // import Bold from "@tiptap/extension-bold";
// // import Italic from "@tiptap/extension-italic";
// // import Underline from "@tiptap/extension-underline";
// // import Strike from "@tiptap/extension-strike";
// // import TextAlign from "@tiptap/extension-text-align";
// // import BulletList from "@tiptap/extension-bullet-list";
// // import OrderedList from "@tiptap/extension-ordered-list";
// // import ListItem from "@tiptap/extension-list-item";
// // import Highlight from "@tiptap/extension-highlight";
// // import Blockquote from "@tiptap/extension-blockquote";
// // import CodeBlock from "@tiptap/extension-code-block";
// // import Placeholder from "@tiptap/extension-placeholder";
// // import { motion } from "framer-motion";
// // import MainLayout from "./admin/components/ui/MainLayout";

// // import "./globals.css";

// // export default function BlogForm() {
// //   const searchParams = useSearchParams();
// //   const id = searchParams.get("id");
// //   const queryTable = searchParams.get("tableName") || "";

// //   const [title, setTitle] = useState("");
// //   const [image, setImage] = useState(null);
// //   const [content, setContent] = useState("");
// //   const [tableName, setTableName] = useState("");
// //   const [modalMessage, setModalMessage] = useState("");
// //   const [showModal, setShowModal] = useState(false);

// //   const editor = useEditor({
// //     extensions: [
// //       StarterKit,
// //       Bold,
// //       Italic,
// //       Underline,
// //       Strike,
// //       BulletList,
// //       OrderedList,
// //       ListItem,
// //       TextAlign.configure({ types: ["heading", "paragraph"] }),
// //       Highlight,
// //       Blockquote,
// //       CodeBlock,
// //       Placeholder.configure({ placeholder: "Content" }),
// //     ],
// //     content: "",
// //     onUpdate: ({ editor }) => setContent(editor.getHTML()),
// //   });

// //   const showMessage = (message) => {
// //     setModalMessage(message);
// //     setShowModal(true);
// //     setTimeout(() => setShowModal(false), 5000);
// //   };

// //   const clearForm = () => {
// //     setTitle("");
// //     setImage(null);
// //     setContent("");
// //     setTableName("");
// //     if (editor) editor.commands.clearContent();
// //   };

// //   const handleAction = (editor, action) => {
// //     if (action === "clearContent") {
// //       editor.commands.clearContent();
// //     } else {
// //       editor.chain().focus()[action]().run();
// //     }
// //   };

// //   const formatButtons = [
// //     { action: "toggleBold", label: "B", style: "font-bold" },
// //     { action: "toggleItalic", label: "I", style: "italic" },
// //     { action: "toggleUnderline", label: "U", style: "underline" },
// //     { action: "toggleStrike", label: "S", style: "line-through" },
// //     { action: "toggleBulletList", label: "• List", style: "font-bold" },
// //     { action: "toggleOrderedList", label: "1. List", style: "font-bold" },
// //     { action: "toggleHighlight", label: "✦ Highlight", style: "bg-yellow-300" },
// //     { action: "undo", label: "↩ Undo", style: "text-blue-500" },
// //     { action: "redo", label: "↪ Redo", style: "text-green-500" },
// //     { action: "clearContent", label: "🗑 Clear", style: "text-red-500" },
// //   ];

// //   useEffect(() => {
// //     setTableName(queryTable); // show correct table name
// //   }, [queryTable]);

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       if (!id || !queryTable) return;

// //       try {
// //         const res = await fetch(
// //           `/api/card-data/update-data?id=${id}&tableName=${queryTable}`
// //         );
// //         const data = await res.json();
// //         console.log(data, "update data");

// //         setTitle(data.title || "");
// //         setContent(data.content || "");
// //         setImage(data.image || null);
// //         setTableName(queryTable);

// //         if (editor && data.content) {
// //           editor.commands.setContent(data.content);
// //         }
// //       } catch (err) {
// //         showMessage("❌ Failed to load blog data.");
// //       }
// //     };

// //     fetchData();
// //   }, [id, queryTable, editor]);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     if (!title || !content || !tableName) {
// //       const missingFields = [];
// //       if (!title) missingFields.push("Title");
// //       if (!content) missingFields.push("Content");
// //       if (!tableName) missingFields.push("Table Name");
// //       showMessage(`⚠ Missing field(s): ${missingFields.join(", ")}`);
// //       return;
// //     }

// //     const formData = new FormData();
// //     formData.append("title", title);
// //     if (image) formData.append("image", image);
// //     formData.append("content", content);
// //     formData.append("tableName", tableName);
// //     if (id) formData.append("id", id);
// //     console.log(formData, "formData");
// //     try {
// //       const response = await fetch("/api/card-data/send-data", {
// //         method: "POST",
// //         body: formData,
// //       });

// //       if (response.ok) {
// //         showMessage(`✅ Blog ${id ? "updated" : "submitted"} successfully!`);
// //         clearForm();
// //       } else {
// //         showMessage("❌ Blog submission failed!");
// //       }
// //     } catch (err) {
// //       showMessage("❌ Something went wrong!");
// //     }
// //   };

// //   const renderToolbar = (editor) => (
// //     <div className="flex gap-2 flex-wrap">
// //       {formatButtons.map(({ action, label, style }) => (
// //         <button
// //           key={action}
// //           type="button"
// //           onClick={() => handleAction(editor, action)}
// //           className={`p-2 rounded-md text-sm ${style} bg-gray-300 hover:bg-gray-400 transition`}
// //         >
// //           {label}
// //         </button>
// //       ))}
// //     </div>
// //   );

// //   return (
// //     <MainLayout>
// //       <form onSubmit={handleSubmit} className="w-full grid grid-cols-12 gap-4">
// //         <div className="col-span-12 md:col-span-3">
// //           <select
// //             value={tableName}
// //             onChange={(e) => setTableName(e.target.value)}
// //             className="px-1 py-2.5 w-full text-[#6C472D] font-semibold border-2 border-[#6C472D] rounded-md bg-white outline-none"
// //           >
// //             <option value="">Select Table</option>
// //             <option value="wazaif">wazaif</option>
// //             <option value="jado_tona_alaj">jado_tona_alaj</option>
// //             <option value="mujrab_nakosh">mujrab_nakosh</option>
// //             <option value="qutab">qutab</option>
// //           </select>
// //         </div>

// //         <div className="col-span-12 md:col-span-6">
// //           <input
// //             type="text"
// //             dir="auto"
// //             placeholder="Title"
// //             value={title}
// //             onChange={(e) => setTitle(e.target.value)}
// //             className="p-[0.45rem] w-full text-[#6C472D] font-semibold border-2 border-[#6C472D] rounded-md bg-white outline-none placeholder-[#6C472D]"
// //           />
// //         </div>

// //         <div className="col-span-12 md:col-span-3">
// //           <label
// //             htmlFor="image-upload"
// //             className="block p-[0.45rem] w-full text-[#6C472D] font-semibold border-2 border-[#6C472D] rounded-md bg-white cursor-pointer truncate"
// //             title={image ? image.name || image : "Upload an image"}
// //           >
// //             {image ? image.name || image : "Upload an image"}
// //           </label>
// //           <input
// //             id="image-upload"
// //             type="file"
// //             accept="image/*"
// //             onChange={(e) => setImage(e.target.files[0])}
// //             className="hidden"
// //           />
// //         </div>

// //         <div className="col-span-12">
// //           <div className="px-2 py-3 border-2 border-[#D4AF37] w-full rounded-md bg-white shadow-md">
// //             {editor && renderToolbar(editor)}
// //             <div className="mt-3 border-2 border-[#D4AF37] rounded-md">
// //               <EditorContent editor={editor} />
// //             </div>
// //           </div>
// //         </div>

// //         <div className="col-span-12">
// //           <div className="flex justify-end">
// //             <button
// //               type="submit"
// //               className="py-3 px-10 text-white text-lg font-semibold bg-[#6C472D] rounded-md"
// //             >
// //               {id ? "Update" : "Post"}
// //             </button>
// //           </div>
// //         </div>
// //       </form>

// //       {showModal && (
// //         <motion.div
// //           initial={{ x: 50, opacity: 0 }}
// //           animate={{ x: 0, opacity: 1 }}
// //           exit={{ x: 50, opacity: 0 }}
// //           transition={{ type: "spring", stiffness: 120 }}
// //           className="fixed bottom-5 right-5 flex items-center gap-4 bg-gray-900 text-white p-4 rounded-lg shadow-xl z-50"
// //         >
// //           <p className="text-sm font-semibold">{modalMessage}</p>
// //         </motion.div>
// //       )}
// //     </MainLayout>
// //   );
// // }

// "use client"; // Ensure this component is client-side
// import MainLayout from "./admin/components/ui/MainLayout";
// import { useEffect, useState } from "react";
// import { usePathname } from "next/navigation";
// import Link from "next/link";
// import Image from "next/image";

// // Updated list of tables
// const allowedTables = ["wazaif", "jado_tona_alaj", "mujrab_nakosh", "qutab"];

// export default function Dashboard() {
//   const [activeTable, setActiveTable] = useState("wazaif"); // Default
//   const [data, setData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;
//   const [totalPages, setTotalPages] = useState(1);
//   const [loading, setLoading] = useState(false);

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

//   /////////////////////////////////////////////////////////////////////////Handle table switch///////////////////////////////////////////////////////////
//   const handleTableChange = (table) => {
//     setActiveTable(table);
//     setCurrentPage(1);
//   };

//   /////////////////////////////////////////////////////////////////////////Handle Delete Request///////////////////////////////////////////////////////////
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
//           setCurrentPage(1);
//           fetchData();
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
//     <MainLayout>
//       <div>
//         {/* Cards for table selection */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
//           {allowedTables.map((table) => (
//             <div
//               key={table}
//               onClick={() => handleTableChange(table)}
//               className={`cursor-pointer h-28 flex items-center justify-center rounded-md transition-all duration-300 font-semibold capitalize ${
//                 activeTable === table
//                   ? "bg-[#6C472D] text-white"
//                   : "bg-white text-[#6C472D] border-2 border-[#D4AF37]"
//               }`}
//             >
//               {table}
//             </div>
//           ))}
//         </div>

//         {/* Table displaying data */}
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200 border-2 border-[#D4AF37] rounded-md">
//             <thead className="bg-[#6C472D]">
//               <tr>
//                 <th className="py-3 font-semibold text-white">ID</th>
//                 <th className="py-3 font-semibold text-white">Title</th>
//                 <th className="py-3 font-semibold text-white">Content</th>
//                 <th className="py-3 font-semibold text-white">Image</th>
//                 <th className="py-3 font-semibold text-white">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200 bg-white">
//               {loading ? (
//                 <tr>
//                   <td colSpan={5} className="text-center py-6">
//                     Loading...
//                   </td>
//                 </tr>
//               ) : data.length > 0 ? (
//                 data.map((item) => (
//                   <tr key={item.id}>
//                     <td className="px-4 py-3 text-center">{item.id}</td>
//                     <td className="px-4 py-3 text-center">{item.title}</td>
//                     <td className="px-4 py-3 text-center">
//                       {item.content.innerText}
//                     </td>
//                     <td className="px-4 py-3 flex justify-center">
//                       {item.image ? (
//                         <Image
//                           height={8}
//                           width={8}
//                           src={item.image}
//                           className="w-16 h-16 object-cover"
//                           alt=""
//                         />
//                       ) : (
//                         "No Image"
//                       )}
//                     </td>
//                     <td className="px-4 py-3 text-center">
//                       <Link
//                         href={{
//                           pathname: "./enter_blog",
//                           query: { id: item.id, tableName: activeTable },
//                         }}
//                       >
//                         <button className="bg-blue-600 text-white px-4 py-3 rounded-md mr-2">
//                           Update
//                         </button>
//                       </Link>
//                       <button
//                         onClick={() => handleDelete(item.id)}
//                         className="bg-red-500 text-white px-4 py-3 rounded-md ml-2"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td
//                     colSpan={5}
//                     className="text-center py-6 bg-[#6C472D] text-white font-semibold"
//                   >
//                     No Record Found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="flex justify-center mt-6 space-x-2">
//             {Array.from({ length: totalPages }, (_, i) => i + 1).map(
//               (number) => (
//                 <button
//                   key={number}
//                   onClick={() => setCurrentPage(number)}
//                   className={`px-3 py-1 rounded ${
//                     currentPage === number
//                       ? "bg-blue-500 text-white"
//                       : "bg-gray-200 text-black"
//                   }`}
//                 >
//                   {number}
//                 </button>
//               )
//             )}
//           </div>
//         )}
//       </div>
//     </MainLayout>
//   );
// }
"use client"; // Ensure this component is client-side
import MainLayout from "./admin/components/ui/MainLayout";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

// Updated list of tables
const allowedTables = ["wazaif", "jado_tona_alaj", "mujrab_nakosh", "qutab"];

export default function Dashboard() {
  const [activeTable, setActiveTable] = useState("wazaif"); // Default
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/card-data/get-table-data?tableName=${activeTable}`)
      .then((res) => res.json())
      .then((result) => {
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

  // Fetch data after table change
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {allowedTables.map((table) => (
            <div
              key={table}
              onClick={() => handleTableChange(table)}
              className={`cursor-pointer h-28 flex items-center justify-center rounded-md transition-all duration-300 font-semibold capitalize ${
                activeTable === table
                  ? "bg-[#6C472D] text-white"
                  : "bg-white text-[#6C472D] border-2 border-[#D4AF37]"
              }`}
            >
              {table}
            </div>
          ))}
        </div>

        {/* Table displaying data */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 border-2 border-[#D4AF37] rounded-md">
            <thead className="bg-[#6C472D]">
              <tr>
                <th className="py-3 font-semibold text-white">ID</th>
                <th className="py-3 font-semibold text-white">Title</th>
                <th className="py-3 font-semibold text-white">Content</th>
                <th className="py-3 font-semibold text-white">Image</th>
                <th className="py-3 font-semibold text-white">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center py-6">
                    Loading...
                  </td>
                </tr>
              ) : data.length > 0 ? (
                data.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 py-3 text-center">{item.id}</td>
                    <td className="px-4 py-3 text-center">{item.title}</td>
                    <td
                      className="px-4 py-3 text-center"
                      dangerouslySetInnerHTML={{ __html: item.content }}
                    ></td>
                    <td className="px-4 py-3 flex justify-center">
                      {item.image ? (
                        <img
                          height={8}
                          width={8}
                          src={item.image}
                          className="w-16 h-16 object-cover"
                          alt=""
                        />
                      ) : (
                        "No Image"
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Link
                        href={{
                          pathname: "./enter_blog",
                          query: { id: item.id, tableName: activeTable },
                        }}
                      >
                        <button className="bg-blue-600 text-white px-4 py-3 rounded-md mr-2">
                          Update
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="bg-red-500 text-white px-4 py-3 rounded-md ml-2"
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
                    className="text-center py-6 bg-[#6C472D] text-white font-semibold"
                  >
                    No Record Found
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
