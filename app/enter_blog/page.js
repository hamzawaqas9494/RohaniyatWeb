'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");
  const [tableName, setTableName] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState("");
    const [activeButtons, setActiveButtons] = useState([]); // 🆕 New state

  
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
      Placeholder.configure({ placeholder: "یہاں مواد لکھیں" }),
    ],
    content: "",
    onUpdate: ({ editor }) => setContent(editor.getHTML()),
    immediatelyRender: false,
  });
const formatButtons = [
    { action: "toggleBold", label: "Bold", style: "text-black font-bold" },
    { action: "toggleItalic", label: "Italic", style: "italic" },
    { action: "toggleUnderline", label: "Underline", style: "underline" },
    { action: "toggleStrike", label: "Line-through", style: "line-through" },
    { action: "toggleHighlight", label: "✦Highlight", style: "" },
    
    { action: "setHeading", level: 1, label: "H1", style: "text-lg font-bold" },
  { action: "setHeading", level: 2, label: "H2", style: "text-base font-semibold" },
  { action: "setHeading", level: 3, label: "H3", style: "text-sm font-medium" },
  { action: "setHeading", level: 4, label: "H4", style: "text-xs font-medium" },
  { action: "setHeading", level: 5, label: "H5", style: "text-[10px] font-medium" },
  { action: "setHeading", level: 6, label: "H6", style: "text-[8px] font-medium" },
    { action: "toggleBulletList", label: "☰", style: "text-xl" },
    { action: "toggleOrderedList", label: "🔢", style: "text-xl" },
    { action: "undo", label: "↩Undo", style: "text-blue-500" },
    { action: "redo", label: "↪Redo", style: "text-green-500" },
    { action: "clearContent", label: "🗑Clear", style: "text-red-500" },
  ];
    const router = useRouter();
  // Check user login
  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");
    if (!loggedIn) {
      router.push("/");
    }
  }, [router]);

const handleAction = (editor, action, level = null) => {
  if (!editor) return;
 if (action === "clearContent") {
      editor.commands.clearContent();
      setActiveButtons([]);
      return;
    }

    if (action === "setHeading" && level) {
      editor.chain().focus().setHeading({ level }).run();
      setActiveButtons((prev) => [...prev.filter(b => !b.startsWith("setHeading")), `${action}-${level}`]);
      return;
    }
    editor.chain().focus()[action]().run();
   // Toggle button in activeButtons
    const key = level ? `${action}-${level}` : action;
    setActiveButtons((prev) =>
      prev.includes(key)
        ? prev.filter((item) => item !== key)
        : [...prev, key]
    );
  };

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
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const id = searchParams.get("id");
      const queryTable = searchParams.get("tableName");
      setId(id || "");
      setTableName(queryTable || "");
    }
  }, []);

  ///////////////////////////////////////////////////update data on the base of id////////////////////////////////
 useEffect(() => {
  const fetchData = async () => {
    if (!id || !tableName || !editor) return;

    try {
      console.log(id, tableName, "hamza waqas");
      const res = await fetch(
        `/api/card-data/update-data?id=${id}&tableName=${tableName}`
      );
      const data = await res.json();

      setTitle(data.title || "");
      setContent(data.content || "");
      setImage(data.image || null);
      setTableName(tableName);

      // ✅ Only set content if editor exists and content is non-empty
      if (data.content) {
        editor.commands.setContent(data.content);
      }
    } catch (err) {
      showMessage("❌ Failed to load blog data.");
    }
  };

  fetchData();
}, [id, tableName, editor]);



      /////////////////////////////////////send data to the database through editor////////////////////////////////////////
 const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content || !tableName) {
      const missing = [];
      if (!title) missing.push("Title");
      if (!content) missing.push("Content");
      if (!tableName) missing.push("Table Name");
      showMessage(`⚠ Missing field(s): ${missing.join(", ")}`);
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    if (image) formData.append("image", image);
    formData.append("content", content);
    formData.append("tableName", tableName);
    if (id) formData.append("id", id);
    try {
      const response = await fetch("/api/card-data/send-data", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        showMessage(`✅ Blog ${id ? "updated" : "submitted"} successfully!`);
        clearForm();
        setId("");
    // Remove query params from URL after using them
      const newUrl = window.location.pathname;
      router.replace(newUrl, undefined, { shallow: true });
      } else {
        showMessage("❌ Blog submission failed!");
      }
  
          
    } catch (err) {
      showMessage("❌ Something went wrong!");
    }

  };

  // eiditor
  const renderToolbar = (editor) => (
    <div className="flex gap-2 flex-wrap">
      {formatButtons.map(({ action, label, style, level }) => {
        const key = level ? `${action}-${level}` : action;
        const isActive = activeButtons.includes(key);
        return (
          <button
            key={key}
            type="button"
            onClick={() => handleAction(editor, action, level)}
            className={`p-2 rounded-md text-sm transition border 
              ${style} 
              ${isActive ? "bg-yellow-800 text-white" : "bg-gray-200 hover:bg-gray-300"}
            `}
          >
            {label}
          </button>
        );
      })}

    </div>
  );
  return (
    <MainLayout>
      <form onSubmit={handleSubmit} className="w-full grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-3 max-h-[150px] overflow-y-auto">
          <select
            value={tableName || ""}
            onChange={(e) => setTableName(e.target.value)}
            className="p-2 w-full text-[#6C472D] text-right text-xl font-urdu font-semibold border-2 border-[#6C472D] rounded-md bg-white outline-none"
          >
            <option value="">ٹیبل منتخب کریں</option>
            <option value="taweez">تعویذ</option>
            <option value="wazaif">وظائف</option>
            <option value="qutb">کتب</option>
            <option value="rohaniilaaj">روحانی علاج</option>
            <option value="tawizatusmaniya">تعویزات عثمانیہ</option>
            <option value="rohanidokan">روحانی دکان</option>
            <option value="nooriaamal">نوری اعمال</option>
            <option value="noorialviaamal">نوری علوی اعمال</option>
            <option value="ooliaallahkaamal">اولیاء اللہ کے اعمال</option>
            <option value="bamokalamal">با موکل اعمال</option>
            <option value="khasulkhasammal">خاص الخالص اعمال</option>
            <option value="alviamal">علوی اعمال</option>
            <option value="saflitavezat">سفلی تعویذات</option>
          </select>
        </div>
        <div className="col-span-12 md:col-span-6">
          <input
            type="text"
            dir="auto"
            placeholder="عنوان یہاں لکھیں"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-3 w-full text-right text-[#6C472D] text-xl font-urdu font-semibold border-2 border-[#6C472D] rounded-md bg-white outline-none placeholder-[#6C472D]"
          />
        </div>
        <div className="col-span-12 md:col-span-3">
          <label
            htmlFor="image-upload"
            className="block p-3 w-full text-[#6C472D] font-urdu text-xl text-right font-semibold border-2 border-[#6C472D] rounded-md bg-white cursor-pointer truncate"
            title={image ? image.name || image : "Upload an image"}
          >
            {image ? image.name || image : "تصویر اپلوڈ کریں"}
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
          <div className="px-2 py-3 border-2 border-[#D4AF37] w-full rounded-md bg-white">
            {editor && renderToolbar(editor)}
            <div
              className="mt-3 border-2 border-[#D4AF37] text-xl rounded-md text-right font-urdu overflow-y-auto max-h-96"
              dir="rtl"
            >
              <EditorContent editor={editor} />
            </div>
          </div>
        </div>
        <div className="col-span-12">
          <div className="flex justify-end">
            <button
              type="submit"
              className="py-3 px-10 text-white text-lg font-semibold bg-[#6C472D] rounded-md cursor-pointer"
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
