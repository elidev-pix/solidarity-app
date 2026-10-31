import { useMemo } from "react";
import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";

const extensions = [
  StarterKit,
  Underline,
  Image.configure({ inline: false, allowBase64: false }),
  Link.configure({ openOnClick: false, HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" } }),
  TextAlign.configure({ types: ["heading", "paragraph"] }),
];

export default function NewsArticleBody({ contentJson, content }) {
  const html = useMemo(() => {
    if (contentJson?.type === "doc" && Array.isArray(contentJson.content)) {
      try { return generateHTML(contentJson, extensions); } catch { return ""; }
    }
    return "";
  }, [contentJson]);

  if (html) return <div className="news-article-body" dangerouslySetInnerHTML={{ __html: html }}/>;
  return <div className="news-article-body whitespace-pre-wrap">{content || "Le contenu de cet article sera bientôt disponible."}</div>;
}
