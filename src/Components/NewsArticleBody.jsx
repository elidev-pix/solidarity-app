import { Fragment } from "react";

function renderMarks(text, marks = [], key = "") {
  return marks.reduce((node, mark, index) => {
    if (mark.type === "bold") return <strong key={key + index}>{node}</strong>;
    if (mark.type === "italic") return <em key={key + index}>{node}</em>;
    if (mark.type === "underline") return <u key={key + index}>{node}</u>;
    if (mark.type === "strike") return <s key={key + index}>{node}</s>;
    if (mark.type === "link") {
      const href = mark.attrs?.href || "#";
      const safeHref = /^(https?:|mailto:)/i.test(href) ? href : "#";
      return <a key={key + index} href={safeHref} target="_blank" rel="noopener noreferrer">{node}</a>;
    }
    return node;
  }, text);
}

function renderNode(node, index) {
  if (!node) return null;
  if (node.type === "text") return renderMarks(node.text || "", node.marks, String(index));
  const children = (node.content || []).map((child, childIndex) => <Fragment key={childIndex}>{renderNode(child, childIndex)}</Fragment>);
  switch (node.type) {
    case "paragraph": return <p key={index}>{children}</p>;
    case "heading": {
      const level = Math.min(3, Math.max(1, Number(node.attrs?.level) || 2));
      const Tag = `h${level}`;
      return <Tag key={index}>{children}</Tag>;
    }
    case "bulletList": return <ul key={index}>{children}</ul>;
    case "orderedList": return <ol key={index}>{children}</ol>;
    case "listItem": return <li key={index}>{children}</li>;
    case "blockquote": return <blockquote key={index}>{children}</blockquote>;
    case "hardBreak": return <br key={index}/>;
    case "horizontalRule": return <hr key={index}/>;
    case "image": {
      const src = node.attrs?.src || "";
      if (!/^https?:\/\//i.test(src)) return null;
      return <figure key={index}><img src={src} alt={node.attrs?.alt || ""} loading="lazy"/>{node.attrs?.title && <figcaption>{node.attrs.title}</figcaption>}</figure>;
    }
    default: return children.length ? <div key={index}>{children}</div> : null;
  }
}

export default function NewsArticleBody({ contentJson, content }) {
  if (contentJson?.type === "doc" && Array.isArray(contentJson.content)) {
    return <div className="news-article-body">{contentJson.content.map((node, index) => <Fragment key={index}>{renderNode(node, index)}</Fragment>)}</div>;
  }
  return <div className="news-article-body whitespace-pre-wrap">{content || "Le contenu de cet article sera bientôt disponible."}</div>;
}
