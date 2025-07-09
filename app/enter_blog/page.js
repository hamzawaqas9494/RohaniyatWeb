"use client";
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
import {
  Bold as BoldIcon,
  Italic as ItalicIcon,
  Underline as UnderlineIcon,
  Strikethrough,
  Highlighter,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  List,
  ListOrdered,
  Undo2,
  Redo2,
  Trash2,
} from "lucide-react";
import { TbLetterP } from "react-icons/tb";
import "../globals.css";
export default function BlogForm() {
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
  Underline, // ✅ not included in StarterKit
  TextAlign.configure({ types: ["heading", "paragraph"] }),
  Highlight,
  Placeholder.configure({ placeholder: "یہاں مواد لکھیں" }),
],

    content: "",
    onUpdate: ({ editor }) => setContent(editor.getHTML()),
    immediatelyRender: false,
  });
  const formatButtons = [
    {
      action: "setParagraph",
      icon: <TbLetterP size={16} />,
    },

    { action: "toggleBold", icon: <BoldIcon size={16} /> },
    { action: "toggleItalic", icon: <ItalicIcon size={16} /> },
    { action: "toggleUnderline", icon: <UnderlineIcon size={16} /> },
    { action: "toggleStrike", icon: <Strikethrough size={16} /> },
    { action: "toggleHighlight", icon: <Highlighter size={16} /> },
    { action: "setHeading", level: 1, icon: <Heading1 size={16} /> },
    { action: "setHeading", level: 2, icon: <Heading2 size={16} /> },
    { action: "setHeading", level: 3, icon: <Heading3 size={16} /> },
    { action: "setHeading", level: 4, icon: <Heading4 size={16} /> },
    { action: "setHeading", level: 5, icon: <Heading5 size={16} /> },
    { action: "setHeading", level: 6, icon: <Heading6 size={16} /> },
    { action: "toggleBulletList", icon: <List size={16} /> },
    { action: "toggleOrderedList", icon: <ListOrdered size={16} /> },
    { action: "undo", icon: <Undo2 size={16} /> },
    { action: "redo", icon: <Redo2 size={16} /> },
    { action: "clearContent", icon: <Trash2 size={16} /> },
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
      return;
    }

    if (action === "setHeading" && level) {
      editor.chain().focus().setHeading({ level }).run();
      return;
    }
    if (action === "setParagraph") {
      editor.chain().focus().setParagraph().run();
      return;
    }
    editor.chain().focus()[action]().run();
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
        const res = await fetch(
          `/api/blog-data/get-table-data?id=${id}&tableName=${tableName}`
        );
        const data = await res.json();

        console.log(data.rows[0].title,"data")
        setTitle(data.rows[0].title || "");
        setContent(data.rows[0].content || "");
        setImage(data.rows[0].image || null);
        setTableName(tableName);

        // ✅ Only set content if editor exists and content is non-empty
        if (data.rows[0].content) {
          editor.commands.setContent(data.rows[0].content);
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
  formData.append("content", content);
  formData.append("tableName", tableName);
  if (image) formData.append("image", image);

  try {
    let response;

    // ✅ If ID exists, it's an update (PUT)
    if (id) {
      formData.append("id", id);
      response = await fetch("/api/blog-data/update-data", {
        method: "PUT",
        body: formData,
      });
    } else {
      // ✅ Otherwise, it's a create (POST)
      response = await fetch("/api/blog-data/send-data", {
        method: "POST",
        body: formData,
      });
    }

    if (response.ok) {
      showMessage(`✅ Blog ${id ? "updated" : "posted"} successfully!`);
      clearForm();
      setId("");

      // Remove query params
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
      {formatButtons.map(({ action, label, icon, level }) => {
        const key = level ? `${action}-${level}` : action;

        let isActive = false;
        const hasContent =
          editor
            .getHTML()
            .replace(/<[^>]*>?/gm, "")
            .trim().length > 0;
        if (hasContent) {
          if (action === "setHeading" && level) {
            isActive = editor.isActive("heading", { level });
          } else if (action === "setParagraph") {
            isActive = editor.isActive("paragraph");
          } else if (action === "toggleBulletList") {
            isActive = editor.isActive("bulletList");
          } else if (action === "toggleOrderedList") {
            isActive = editor.isActive("orderedList");
          } else if (action === "toggleBold") {
            isActive = editor.isActive("bold");
          } else if (action === "toggleItalic") {
            isActive = editor.isActive("italic");
          } else if (action === "toggleUnderline") {
            isActive = editor.isActive("underline");
          } else if (action === "toggleStrike") {
            isActive = editor.isActive("strike");
          } else if (action === "toggleHighlight") {
            isActive = editor.isActive("highlight");
          }
        }
        return (
          <button
            key={key}
            type="button"
            onClick={() => handleAction(editor, action, level)}
            className={`p-2 flex items-center rounded-md text-sm transition border-2 border-[#6C472D]
            ${
              isActive
                ? "bg-[#6C472D] text-white"
                : "bg-[#EFEADF] hover:bg-gray-300 text-[#6C472D]"
            }
          `}
          >
            {icon}
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
  return (
    <MainLayout>
      <form onSubmit={handleSubmit} className="w-full grid grid-cols-12 gap-4">
        <div className="relative col-span-12 md:col-span-3 max-h-[150px] overflow-y-auto">
          <select
            value={tableName || ""}
            onChange={(e) => setTableName(e.target.value)}
            className="px-6 py-3 appearance-none [-webkit-appearance:none] bg-white border-2 border-[#6C472D] rounded-md  w-full text-[#6C472D] text-xl text-right font-urdu font-semibold outline-none cursor-pointer"
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
          <div className="p-1 pointer-events-none absolute right-0 top-1/2 transform -translate-y-1/2">
            <svg
              className="w-4 h-4 text-[#6C472D]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={4}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        <div className="col-span-12 md:col-span-6">
          <input
            type="text"
            dir="auto"
            placeholder="یہاں عنوان لکھیں"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-3 w-full text-right text-[#6C472D] text-xl font-urdu font-semibold border-2 border-[#6C472D] rounded-md bg-white outline-none placeholder-[#6C472D] cursor-pointer"
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
          <div className="p-4 border-2 border-[#D4AF37] w-full rounded-md bg-white">
            {editor && renderToolbar(editor)}
            <div
              className="mt-4 border-2 border-[#D4AF37] text-xl rounded-md text-right overflow-y-auto max-h-96"
              dir="rtl"
            >
              <EditorContent editor={editor} className="text-black" />
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
