import { useEffect, useRef, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { uploadApi } from "@/services/api";
import {
  Bold, Italic, Underline as UnderlineIcon, Heading1, Heading2, List, ListOrdered,
  Quote, Undo2, Redo2, ImagePlus, Link2, AlignLeft, AlignCenter, AlignRight,
} from "lucide-react";

const buttonBase = "inline-flex h-9 min-w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:border-[#D6336C] hover:text-[#D6336C] disabled:cursor-not-allowed disabled:opacity-40";
const active = "border-[#D6336C] bg-pink-50 text-[#D6336C]";

function ToolButton({ title, active: selected, disabled, onClick, children }) {
  return <button type="button" title={title} aria-label={title} disabled={disabled} onClick={onClick} className={buttonBase + (selected ? " " + active : "")}>{children}</button>;
}

export default function NewsEditor({ value, onChange }) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileRef = useRef(null);
  const initialValueRef = useRef(value || { type: "doc", content: [{ type: "paragraph" }] });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Image.configure({ inline: false, allowBase64: false }),
      Link.configure({ openOnClick: false, autolink: true, HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" } }),
      Placeholder.configure({ placeholder: "Racontez l’actualité de Solidarity Group…" }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: initialValueRef.current,
    onUpdate: ({ editor: instance }) => onChange(instance.getJSON(), instance.getText()),
    editorProps: { attributes: { class: "news-editor-content min-h-[260px] px-4 py-4 text-[15px] leading-7 text-gray-800 focus:outline-none" } },
  });

  useEffect(() => {
    if (editor && value && JSON.stringify(editor.getJSON()) !== JSON.stringify(value)) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
  }, [editor, value]);

  async function addImage(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type) || file.size > 5 * 1024 * 1024) {
      setUploadError("Choisissez une image JPEG, PNG ou WebP de 5 Mo maximum.");
      event.target.value = "";
      return;
    }
    setUploading(true);
    setUploadError("");
    try {
      const { data } = await uploadApi.image(file);
      if (!data?.imageUrl) throw new Error("Le serveur n’a pas retourné l’URL de l’image.");
      editor?.chain().focus().setImage({ src: data.imageUrl, alt: file.name.replace(/\.[^.]+$/, "") }).run();
    } catch (error) {
      setUploadError(error.response?.data?.message || error.message || "Impossible d’envoyer cette image.");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  function addLink() {
    if (!editor) return;
    const previous = editor.getAttributes("link").href;
    const url = window.prompt("Adresse du lien (https://…)", previous || "https://");
    if (url === null) return;
    if (!url.trim()) editor.chain().focus().extendMarkRange("link").unsetLink().run();
    else editor.chain().focus().extendMarkRange("link").setLink({ href: url.trim() }).run();
  }

  if (!editor) return <div className="rounded-xl border border-gray-200 p-4 text-sm text-gray-400">Chargement de l’éditeur…</div>;

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
      <div className="flex flex-wrap items-center gap-1.5 border-b border-gray-100 bg-gray-50 p-2">
        <ToolButton title="Gras" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}><Bold size={17}/></ToolButton>
        <ToolButton title="Italique" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}><Italic size={17}/></ToolButton>
        <ToolButton title="Souligné" active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()}><UnderlineIcon size={17}/></ToolButton>
        <span className="mx-1 h-6 w-px bg-gray-200"/>
        <ToolButton title="Titre 1" active={editor.isActive("heading", { level: 1 })} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}><Heading1 size={18}/></ToolButton>
        <ToolButton title="Titre 2" active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}><Heading2 size={18}/></ToolButton>
        <ToolButton title="Liste à puces" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}><List size={18}/></ToolButton>
        <ToolButton title="Liste numérotée" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}><ListOrdered size={18}/></ToolButton>
        <ToolButton title="Citation" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}><Quote size={17}/></ToolButton>
        <span className="mx-1 h-6 w-px bg-gray-200"/>
        <ToolButton title="Aligner à gauche" active={editor.isActive({ textAlign: "left" })} onClick={() => editor.chain().focus().setTextAlign("left").run()}><AlignLeft size={17}/></ToolButton>
        <ToolButton title="Centrer" active={editor.isActive({ textAlign: "center" })} onClick={() => editor.chain().focus().setTextAlign("center").run()}><AlignCenter size={17}/></ToolButton>
        <ToolButton title="Aligner à droite" active={editor.isActive({ textAlign: "right" })} onClick={() => editor.chain().focus().setTextAlign("right").run()}><AlignRight size={17}/></ToolButton>
        <ToolButton title="Ajouter un lien" active={editor.isActive("link")} onClick={addLink}><Link2 size={17}/></ToolButton>
        <ToolButton title="Ajouter une image" disabled={uploading} onClick={() => fileRef.current?.click()}><ImagePlus size={17}/></ToolButton>
        <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={addImage}/>
        <span className="mx-1 h-6 w-px bg-gray-200"/>
        <ToolButton title="Annuler" disabled={!editor.can().undo()} onClick={() => editor.chain().focus().undo().run()}><Undo2 size={17}/></ToolButton>
        <ToolButton title="Rétablir" disabled={!editor.can().redo()} onClick={() => editor.chain().focus().redo().run()}><Redo2 size={17}/></ToolButton>
      </div>
      {uploading && <p className="border-b border-pink-100 bg-pink-50 px-4 py-2 text-xs text-[#D6336C]">Envoi de l’image vers Appwrite…</p>}
      {uploadError && <p role="alert" className="border-b border-red-100 bg-red-50 px-4 py-2 text-xs text-red-700">{uploadError}</p>}
      <EditorContent editor={editor}/>
      <div className="border-t border-gray-100 bg-gray-50 px-4 py-2 text-xs text-gray-400">Les images ajoutées sont hébergées sur Appwrite. Vous pouvez insérer plusieurs images dans un même article.</div>
    </div>
  );
}
