"use client";

import { useState, use } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import TiptapLink from "@tiptap/extension-link";
import TiptapImage from "@tiptap/extension-image";
import CharacterCount from "@tiptap/extension-character-count";
import Placeholder from "@tiptap/extension-placeholder";
import { MOCK_POSTS } from "@/features/cms/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import {
  Bold, Italic, UnderlineIcon, Strikethrough, AlignLeft, AlignCenter, AlignRight,
  Heading1, Heading2, List, ListOrdered, Link2, ImageIcon, Undo2, Redo2,
  Save, Send, Clock, Globe, Tag, ChevronLeft
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

function ToolbarButton({ active, onClick, children }: { active?: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "h-8 w-8 rounded-lg flex items-center justify-center text-sm transition-all",
        active ? "bg-primary text-primary-foreground" : "hover:bg-muted text-muted-foreground hover:text-foreground"
      )}
    >
      {children}
    </button>
  );
}

export default function BlogEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const post = MOCK_POSTS.find(p => p.id === id) ?? MOCK_POSTS[0];

  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.seo?.slug ?? "");
  const [metaDesc, setMetaDesc] = useState(post?.seo?.description ?? "");
  const [tags, setTags] = useState(post?.tags?.join(", ") ?? "");
  const [status, setStatus] = useState(post?.status ?? "draft");
  const [isSaving, setIsSaving] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TiptapLink.configure({ openOnClick: false }),
      TiptapImage,
      CharacterCount,
      Placeholder.configure({ placeholder: "Start writing your masterpiece..." }),
    ],
    content: post?.content ?? "<p></p>",
  });

  const handleSave = (publish = false) => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      if (publish) {
        setStatus("published");
        toast.success("Post published successfully!");
      } else {
        toast.success("Draft saved");
      }
    }, 1000);
  };

  if (!editor) return null;

  return (
    <div className="max-w-7xl mx-auto space-y-0">
      {/* Top Bar */}
      <div className="flex items-center justify-between py-6 border-b mb-8">
        <Link href="/vendor/blog" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-[10px] font-black uppercase tracking-widest">
          <ChevronLeft className="h-4 w-4" /> Back to Blog
        </Link>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className={cn(
            "font-black italic text-[8px] uppercase tracking-widest px-3 border-2",
            status === "published" ? "text-emerald-600 border-emerald-500/20" : "text-zinc-500"
          )}>{status}</Badge>
          <Button variant="outline" onClick={() => handleSave(false)} disabled={isSaving} className="rounded-full font-black italic uppercase h-10 px-6 border-2 gap-2">
            <Save className="h-3.5 w-3.5" /> {isSaving ? "Saving..." : "Save Draft"}
          </Button>
          <Button onClick={() => handleSave(true)} disabled={isSaving} className="rounded-full font-black italic uppercase h-10 px-6 shadow-xl gap-2">
            <Send className="h-3.5 w-3.5" /> Publish
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Editor Area */}
        <div className="lg:col-span-8 space-y-6">
          {/* Title */}
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Post Title..."
            className="w-full text-4xl font-black italic tracking-tighter uppercase bg-transparent border-none outline-none placeholder:text-muted-foreground/40 resize-none"
          />

          <Separator className="border-dashed" />

          {/* Toolbar */}
          <div className="flex flex-wrap gap-1 p-3 bg-muted/20 rounded-2xl border border-dashed">
            <ToolbarButton active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}>
              <Bold className="h-3.5 w-3.5" />
            </ToolbarButton>
            <ToolbarButton active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}>
              <Italic className="h-3.5 w-3.5" />
            </ToolbarButton>
            <ToolbarButton active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()}>
              <UnderlineIcon className="h-3.5 w-3.5" />
            </ToolbarButton>
            <ToolbarButton active={editor.isActive("strike")} onClick={() => editor.chain().focus().toggleStrike().run()}>
              <Strikethrough className="h-3.5 w-3.5" />
            </ToolbarButton>
            <div className="w-px bg-border mx-1" />
            <ToolbarButton active={editor.isActive("heading", { level: 1 })} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
              <Heading1 className="h-3.5 w-3.5" />
            </ToolbarButton>
            <ToolbarButton active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
              <Heading2 className="h-3.5 w-3.5" />
            </ToolbarButton>
            <div className="w-px bg-border mx-1" />
            <ToolbarButton active={editor.isActive({ textAlign: "left" })} onClick={() => editor.chain().focus().setTextAlign("left").run()}>
              <AlignLeft className="h-3.5 w-3.5" />
            </ToolbarButton>
            <ToolbarButton active={editor.isActive({ textAlign: "center" })} onClick={() => editor.chain().focus().setTextAlign("center").run()}>
              <AlignCenter className="h-3.5 w-3.5" />
            </ToolbarButton>
            <ToolbarButton active={editor.isActive({ textAlign: "right" })} onClick={() => editor.chain().focus().setTextAlign("right").run()}>
              <AlignRight className="h-3.5 w-3.5" />
            </ToolbarButton>
            <div className="w-px bg-border mx-1" />
            <ToolbarButton active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}>
              <List className="h-3.5 w-3.5" />
            </ToolbarButton>
            <ToolbarButton active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
              <ListOrdered className="h-3.5 w-3.5" />
            </ToolbarButton>
            <div className="w-px bg-border mx-1 ml-auto" />
            <ToolbarButton onClick={() => editor.chain().focus().undo().run()}>
              <Undo2 className="h-3.5 w-3.5" />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().redo().run()}>
              <Redo2 className="h-3.5 w-3.5" />
            </ToolbarButton>
          </div>

          {/* Editor */}
          <EditorContent
            editor={editor}
            className="prose prose-zinc max-w-none min-h-[400px] focus:outline-none [&_.ProseMirror]:outline-none [&_.ProseMirror]:min-h-[400px] [&_.ProseMirror_p.is-editor-empty:first-child::before]:text-muted-foreground [&_.ProseMirror_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)] [&_.ProseMirror_p.is-editor-empty:first-child::before]:float-left [&_.ProseMirror_p.is-editor-empty:first-child::before]:pointer-events-none"
          />

          <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest text-right">
            {editor.storage.characterCount?.characters()} characters · {editor.storage.characterCount?.words()} words
          </div>
        </div>

        {/* SEO & Settings Panel */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-8 rounded-[2.5rem] bg-background border space-y-6">
            <h3 className="text-lg font-black italic uppercase tracking-tight">SEO & Metadata</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">SLUG</label>
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input value={slug} onChange={e => setSlug(e.target.value)} className="pl-10 h-11 rounded-2xl bg-muted/20 border-none text-sm font-mono" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">META DESCRIPTION</label>
                <textarea value={metaDesc} onChange={e => setMetaDesc(e.target.value)} className="w-full min-h-[80px] text-sm font-medium bg-muted/20 rounded-2xl border-none p-4 outline-none resize-none" placeholder="Describe this post for search engines..." />
                <p className={cn("text-[10px] font-bold uppercase tracking-widest text-right", metaDesc.length > 160 ? "text-destructive" : "text-muted-foreground")}>
                  {metaDesc.length}/160
                </p>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-1"><Tag className="h-3 w-3" /> TAGS</label>
                <Input value={tags} onChange={e => setTags(e.target.value)} placeholder="lifestyle, wellness, sleep" className="h-11 rounded-2xl bg-muted/20 border-none text-sm font-medium" />
              </div>
            </div>
          </div>

          <div className="p-8 rounded-[2.5rem] bg-background border space-y-6">
            <h3 className="text-lg font-black italic uppercase tracking-tight">Publishing</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black italic uppercase tracking-tight">Enable Comments</span>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-black italic uppercase tracking-tight">Feature on Homepage</span>
                <Switch />
              </div>
            </div>
            <Separator className="border-dashed" />
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" /> SCHEDULE FOR</label>
              <Input type="datetime-local" className="h-11 rounded-2xl bg-muted/20 border-none text-sm font-medium" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
