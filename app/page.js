// "use client";

// import { useState } from "react";
// import { useEditor, EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import Bold from "@tiptap/extension-bold";
// import Italic from "@tiptap/extension-italic";
// import Underline from "@tiptap/extension-underline";
// import Strike from "@tiptap/extension-strike";
// import TextAlign from "@tiptap/extension-text-align";
// import BulletList from "@tiptap/extension-bullet-list";
// import OrderedList from "@tiptap/extension-ordered-list";
// import ListItem from "@tiptap/extension-list-item";
// import Highlight from "@tiptap/extension-highlight";
// import Blockquote from "@tiptap/extension-blockquote";
// import CodeBlock from "@tiptap/extension-code-block";
// import { motion, AnimatePresence } from "framer-motion";
// import MainLayout from "./admin/components/ui/MainLayout";

// export default function BlogForm() {
//   const [title, setTitle] = useState("");
//   const [subtitle, setSubtitle] = useState("");
//   const [image, setImage] = useState(null);
//   const [content, setContent] = useState("");
//   const [tableName, setTableName] = useState("");
//   const [modalMessage, setModalMessage] = useState("");
//   const [showModal, setShowModal] = useState(false);

//   const editor = useEditor({
//     extensions: [
//       StarterKit,
//       Bold,
//       Italic,
//       Underline,
//       Strike,
//       BulletList,
//       OrderedList,
//       ListItem,
//       TextAlign.configure({ types: ["heading", "paragraph"] }),
//       Highlight,
//       Blockquote,
//       CodeBlock,
//     ],
//     content: "",
//     onUpdate: ({ editor }) => setContent(editor.getHTML()),
//   });

//   const subEditor = useEditor({
//     extensions: [
//       StarterKit,
//       Bold,
//       Italic,
//       Underline,
//       Strike,
//       BulletList,
//       OrderedList,
//       ListItem,
//       TextAlign.configure({ types: ["heading", "paragraph"] }),
//       Highlight,
//       Blockquote,
//       CodeBlock,
//     ],
//     content: "",
//     onUpdate: ({ editor }) => setSubContent(editor.getHTML()),
//   });

//   const formatButtons = [
//     { action: "toggleBold", label: "B", style: "font-bold" },
//     { action: "toggleItalic", label: "I", style: "italic" },
//     { action: "toggleUnderline", label: "U", style: "underline" },
//     { action: "toggleStrike", label: "S", style: "line-through" },
//     { action: "toggleBulletList", label: "• List", style: "font-bold" },
//     { action: "toggleOrderedList", label: "1. List", style: "font-bold" },
//     { action: "toggleHighlight", label: "✦ Highlight", style: "bg-yellow-300" },
//     {
//       action: "toggleBlockquote",
//       label: "❝ Blockquote",
//       style: "italic text-gray-600",
//     },
//     {
//       action: "toggleCodeBlock",
//       label: "<> Code",
//       style: "font-mono bg-gray-200 p-1",
//     },
//     { action: "undo", label: "↩ Undo", style: "text-blue-500" },
//     { action: "redo", label: "↪ Redo", style: "text-green-500" },
//     { action: "clearContent", label: "🗑 Clear", style: "text-red-500" },
//   ];

//   const handleAction = (editor, action) => {
//     if (action === "clearContent") {
//       editor.commands.clearContent();
//     } else {
//       editor.chain().focus()[action]().run();
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("subtitle", subtitle);
//     formData.append("image", image);
//     formData.append("content", content);
//     formData.append("tableName", tableName);

//     console.log(formData, "formData");

//     const response = await fetch("../api/card-data/send-card-data", {
//       method: "POST",
//       body: formData,
//     });

//     if (response.ok) {
//       setModalMessage("✅ Blog submitted successfully!");
//     } else {
//       setModalMessage("❌ Blog submission failed!");
//     }

//     setShowModal(true);

//     setTimeout(() => {
//       setShowModal(false);
//     }, 5000);
//   };

//   const renderToolbar = (editor) => (
//     <div className="mb-3 flex gap-2 flex-wrap">
//       {formatButtons.map(({ action, label, style }) => (
//         <button
//           key={action}
//           type="button"
//           onClick={() => handleAction(editor, action)}
//           className={`p-2 rounded-md text-sm ${style} bg-gray-300 hover:bg-gray-400 transition`}
//         >
//           {label}
//         </button>
//       ))}
//     </div>
//   );

//   return (
//     <MainLayout>
//       <div className="container mx-auto">
//         <form
//           onSubmit={handleSubmit}
//           className="w-full grid grid-cols-12 gap-4 p-6 bg-[#F8F1E8]"
//         >
//           {/* 📌 Table Selection */}
//           <div className="col-span-12 md:col-span-6">
//             <select
//               value={tableName}
//               onChange={(e) => setTableName(e.target.value)}
//               className="p-2.5 text-base border-2 border-[#D4AF37] w-full rounded-sm bg-white shadow-md outline-none"
//             >
//               <option value="Select Table">Select Table</option>
//               <option value="blogs">blogs</option>
//               <option value="Articles">Articles</option>
//             </select>
//           </div>

//           {/* 📌 Table Selection */}
//           <div className="col-span-12 md:col-span-6">
//             <input
//               type="text"
//               placeholder="Enter Title"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               className="p-2 text-base border-2 border-[#D4AF37] w-full rounded-sm bg-white shadow-md outline-none"
//             />
//           </div>
//           <div className="col-span-12 md:col-span-6">
//             {/* 📌 Subtitle Input */}

//             <input
//               type="text"
//               placeholder="Enter Subtitle"
//               value={subtitle}
//               onChange={(e) => setSubtitle(e.target.value)}
//               className="p-2 text-base border-2 border-[#D4AF37] w-full rounded-sm bg-white shadow-md outline-none"
//             />
//           </div>
//           <div className="col-span-12 md:col-span-6">
//             {/* 📌 Image Upload */}

//             <input
//               type="file"
//               onChange={(e) => setImage(e.target.files[0])}
//               className="p-2 text-base border-2 border-[#D4AF37] w-full rounded-sm bg-white shadow-md outline-none"
//             />
//           </div>

//           {/* 📝 Main Content Editor */}
//           <div className="col-span-12">
//             <div className="p-2 border-2 border-[#D4AF37] w-full rounded-md bg-white shadow-md">
//               <h3 className="font-bold text-[#8B572A] mb-2">Main Content</h3>
//               {editor && renderToolbar(editor)}
//               <div className="border bg-[#FDF8E1] rounded-md min-h-[150px]">
//                 <EditorContent editor={editor} />
//               </div>
//             </div>
//           </div>

//           {/* 📌 Submit Button */}
//           <button
//             type="submit"
//             className="bg-[#8B572A] text-white p-2 rounded-md w-full mt-4 hover:bg-[#704522] transition"
//           >
//             Post
//           </button>
//         </form>

//         {showModal && (
//           <motion.div
//             initial={{ x: 50, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             exit={{ x: 50, opacity: 0 }}
//             transition={{ type: "spring", stiffness: 120 }}
//             className="fixed bottom-5 right-5 flex items-center gap-4 bg-gray-900 text-white p-4 rounded-lg shadow-xl"
//           >
//             <div>
//               <p className="text-sm font-semibold">{modalMessage}</p>
//             </div>
//           </motion.div>
//         )}
//       </div>
//     </MainLayout>
//   );
// }

"use client";

import { useState } from "react";
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
import { motion, AnimatePresence } from "framer-motion";
import MainLayout from "./admin/components/ui/MainLayout";
import Placeholder from "@tiptap/extension-placeholder";

import "./globals.css";

export default function BlogForm() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");
  const [tableName, setTableName] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

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
      Placeholder.configure({
        placeholder: "Content",
      }),
    ],
    content: "",
    onUpdate: ({ editor }) => setContent(editor.getHTML()),
  });

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

  const handleAction = (editor, action) => {
    if (action === "clearContent") {
      editor.commands.clearContent();
    } else {
      editor.chain().focus()[action]().run();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", image);
    formData.append("content", content);
    formData.append("tableName", tableName);

    console.log(formData, "formData");

    const response = await fetch("../api/card-data/send-card-data", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      setModalMessage("✅ Blog submitted successfully!");
    } else {
      setModalMessage("❌ Blog submission failed!");
    }

    setShowModal(true);

    setTimeout(() => {
      setShowModal(false);
    }, 5000);
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
      <div>
        <form
          onSubmit={handleSubmit}
          className="w-full h-full grid grid-cols-12 gap-4"
        >
          {/* 📌 Table Selection */}
          <div className="col-span-12 md:col-span-3">
            <select
              value={tableName}
              onChange={(e) => setTableName(e.target.value)}
              className="px-1 py-2.5 w-full text-[#6C472D] font-semibold border-2 border-[#6C472D] rounded-md bg-white outline-none"
            >
              <option value="Select Table">Select Table</option>
              <option value="blogs">blogs</option>
              <option value="Articles">Articles</option>
            </select>
          </div>

          {/* 📌 Table Selection */}
          <div className="col-span-12 md:col-span-6">
            <input
              type="text"
              dir="auto" // or dir="rtl"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="p-[0.45rem] w-full text-[#6C472D] font-semibold border-2 border-[#6C472D] rounded-md bg-white outline-none placeholder-[#6C472D]"
            />
          </div>

          <div className="col-span-12 md:col-span-3">
            <label
              htmlFor="image-upload"
              className="block p-[0.45rem] w-full text-[#6C472D] font-semibold border-2 border-[#6C472D] rounded-md bg-white outline-none cursor-pointer placeholder-[#B08968] truncate overflow-hidden whitespace-nowrap"
              title={image ? image.name : "Upload an image"}
            >
              {image ? image.name : "Upload an image"}
            </label>

            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="hidden"
            />
          </div>

          {/* 📝 Main Content Editor */}
          <div className="col-span-12">
            <div className="px-2 py-3 border-2 border-[#D4AF37] w-full rounded-md bg-white shadow-md">
              {editor && renderToolbar(editor)}
              <div className="mt-3 border-2 border-[#D4AF37] rounded-md ">
                <EditorContent editor={editor} />
              </div>
            </div>
          </div>

          {/* 📌 Submit Button */}
          <div className="col-span-12">
            <div className="flex justify-end">
              <button
                type="submit"
                className="py-3 px-10 text-white text-lg font-semibold bg-[#6C472D] rounded-md cursor-pointer"
              >
                Post
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
            className="fixed bottom-5 right-5 flex items-center gap-4 bg-gray-900 text-white p-4 rounded-lg shadow-xl"
          >
            <div>
              <p className="text-sm font-semibold">{modalMessage}</p>
            </div>
          </motion.div>
        )}
      </div>
    </MainLayout>
  );
}
