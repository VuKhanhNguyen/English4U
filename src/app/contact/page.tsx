"use client";

import * as React from "react";
import { useTransition, useState, useRef, useEffect } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/providers/language-provider";
import { showToast } from "@/components/ui/toast";
import { sendEmail, EmailAttachment } from "@/app/actions/send-email";
import { SocialIcon } from "react-social-icons";
import { 
  MapPin, Mail, Briefcase, Send, CheckCircle2, AlertCircle, 
  Bold, Italic, Underline, List, Image as ImageIcon, Trash2, X 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import NextLink from "next/link";

export default function ContactPage() {
  const { translate } = useLanguage();
  const [isPending, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [messageHtml, setMessageHtml] = useState("");
  const [attachments, setAttachments] = useState<EmailAttachment[]>([]);

  // Editor refs
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Strip HTML to calculate text length
  const getTextLength = (html: string) => {
    if (typeof window === "undefined") return 0;
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    // Replace block-level elements or breaks to spaces for better accuracy if needed
    const text = tempDiv.textContent || tempDiv.innerText || "";
    return text.length;
  };

  const textLength = getTextLength(messageHtml);
  const isOverLimit = textLength > 2000;

  const handleEditorChange = () => {
    if (editorRef.current) {
      setMessageHtml(editorRef.current.innerHTML);
    }
  };

  // Keep state in sync with editor changes
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== messageHtml) {
      // Avoid resetting cursor if state was updated from elsewhere (e.g. submit reset)
      if (messageHtml === "") {
        editorRef.current.innerHTML = "";
      }
    }
  }, [messageHtml]);

  // Command handlers
  const handleFormat = (e: React.MouseEvent, command: string, value: string = "") => {
    e.preventDefault();
    if (typeof document !== "undefined") {
      document.execCommand(command, false, value);
    }
    if (editorRef.current) {
      editorRef.current.focus();
      handleEditorChange();
    }
  };

  // Image upload
  const handleImageButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      // Validate is image
      if (!file.type.startsWith("image/")) {
        showToast({
          title: translate("Error!"),
          message: "Only image files are allowed.",
          variant: "error",
        });
        return;
      }

      // Max 5MB per file
      if (file.size > 5 * 1024 * 1024) {
        showToast({
          title: translate("Error!"),
          message: `${file.name} is too large. Max size is 5MB.`,
          variant: "error",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        
        // Prevent duplicate files
        setAttachments((prev) => {
          if (prev.some((att) => att.name === file.name)) return prev;
          return [...prev, { name: file.name, content: base64 }];
        });
      };
      reader.readAsDataURL(file);
    });

    // Reset input value to allow uploading same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeAttachment = (nameToRemove: string) => {
    setAttachments((prev) => prev.filter((att) => att.name !== nameToRemove));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsSuccess(false);

    const strippedText = messageHtml.replace(/<[^>]*>/g, "").trim();

    if (!name.trim() || !email.trim() || !strippedText) {
      showToast({
        title: translate("Error!"),
        message: translate("Please fill out all fields"),
        variant: "error",
      });
      return;
    }

    if (isOverLimit) {
      showToast({
        title: translate("Error!"),
        message: translate("Character Limit") + " (2000 " + translate("Characters") + ")",
        variant: "error",
      });
      return;
    }

    startTransition(async () => {
      try {
        const response = await sendEmail(name, email, messageHtml, attachments);
        if (response.success) {
          setIsSuccess(true);
          setName("");
          setEmail("");
          setMessageHtml("");
          setAttachments([]);
          if (editorRef.current) {
            editorRef.current.innerHTML = "";
          }
          showToast({
            title: translate("Success!"),
            message: translate("Your message has been sent successfully!"),
            variant: "success",
          });
        } else {
          const err = response.error || translate("Failed to send message. Please try again.");
          setErrorMsg(err);
          showToast({
            title: translate("Error!"),
            message: err,
            variant: "error",
          });
        }
      } catch (err: any) {
        const errStr = err.message || translate("Failed to send message. Please try again.");
        setErrorMsg(errStr);
        showToast({
          title: translate("Error!"),
          message: errStr,
          variant: "error",
        });
      }
    });
  };

  return (
      
    <div className="flex flex-col min-h-screen relative overflow-x-clip bg-paper-canvas text-ink">
      <style dangerouslySetInnerHTML={{__html: `
        .rich-editor:empty:before {
          content: attr(data-placeholder);
          color: var(--color-pale-stone);
          opacity: 0.6;
          pointer-events: none;
          display: block;
        }
        /* Custom scrollbar and resizer for the resizable div */
        .rich-editor {
          resize: vertical;
          overflow: auto;
        }
      `}} />
      <Navbar />
      <div className="relative z-0 w-full overflow-hidden">
        <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80 dark:opacity-20 dark:brightness-[0.35] pointer-events-none -z-10"
            style={{ backgroundImage: "url('/imgs/bg8.png')" }}
          /> 
      <main className="flex-grow pt-[140px] pb-24 z-10">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative z-10 flex flex-col gap-8 md:gap-12">
          
          {/* Breadcrumb home > contact */}
          <Breadcrumb className="mt-2.5 mb-2 text-xs">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" asChild>
                  <NextLink href="/">{translate("Home")}</NextLink>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-pale-stone font-medium">{translate("Contact")}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Header Section (Modern Typographic Capsule + Heading) */}
          <div className="flex flex-col items-start gap-4 max-w-4xl mt-6 md:mt-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-max px-3 py-1.5 rounded-full border border-off-black/20 dark:border-white/20 bg-atmosphere-wash/30 font-mono text-[10px] uppercase tracking-wider text-ink font-semibold"
            >
              {translate("Get in touch")}
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="font-heading text-4xl sm:text-6xl md:text-8xl text-gradient-heading tracking-tight font-normal leading-[1.05] pb-1"
            >
              {translate("Keep in touch.")}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="font-mono text-xs sm:text-sm md:text-base text-pale-stone max-w-2xl leading-relaxed mt-1"
            >
              {translate("Get in touch for collaborations, questions, or just a friendly hello.")}
            </motion.p>
          </div>

          {/* Divider */}
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
            className="w-full h-[1px] bg-ink/10 dark:bg-white/10 origin-left"
          />

          {/* Grid Layout (Asymmetric Stack) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            
            {/* Left Column: Personal Info Card */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="lg:col-span-5 liquid-glass border-3d shadow-3d-card p-4 sm:p-8 md:p-10 rounded-[30px] flex flex-col gap-8 relative overflow-hidden"
            >
              <div className="liquid-glass-bg" />
              {/* Avatar / Brand Illustration */}
              <div className="relative w-full aspect-[4/3] rounded-[20px] overflow-hidden bg-gradient-to-tr from-[#a0b5eb] to-[#ffa773] dark:from-[#1e1b4b] dark:to-[#311042] border border-ink/10 dark:border-white/10 flex items-center justify-center relative z-10">
                <img
                  src="/imgs/contact-illustration.png"
                  alt="Contact Illustration"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
                <div className="absolute inset-0 bg-ink/5 dark:bg-white/5 pointer-events-none mix-blend-overlay" />
              </div>

              {/* Text Info */}
              <div className="flex flex-col gap-4 font-mono text-sm text-ink relative z-10">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-atmosphere-wash/10 hover:bg-atmosphere-wash/20 border border-off-black/5 dark:border-white/5 transition-all duration-300 group">
                  <div className="p-2.5 rounded-xl bg-ink/5 dark:bg-white/5 text-pale-stone group-hover:text-ink dark:group-hover:text-white group-hover:scale-110 transition-all duration-300">
                    <Briefcase className="w-4 h-4 flex-shrink-0" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-pale-stone block mb-0.5">
                      {translate("Role")}
                    </span>
                    <span className="font-semibold text-xs sm:text-sm leading-relaxed">
                      {translate("Full-stack Developer")}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-atmosphere-wash/10 hover:bg-atmosphere-wash/20 border border-off-black/5 dark:border-white/5 transition-all duration-300 group">
                  <div className="p-2.5 rounded-xl bg-ink/5 dark:bg-white/5 text-pale-stone group-hover:text-ink dark:group-hover:text-white group-hover:scale-110 transition-all duration-300">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-pale-stone block mb-0.5">
                      {translate("Location")}
                    </span>
                    <span className="font-semibold text-xs sm:text-sm leading-relaxed">
                      {translate("Da Nang, Vietnam")}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-atmosphere-wash/10 hover:bg-atmosphere-wash/20 border border-off-black/5 dark:border-white/5 transition-all duration-300 group">
                  <div className="p-2.5 rounded-xl bg-ink/5 dark:bg-white/5 text-pale-stone group-hover:text-ink dark:group-hover:text-white group-hover:scale-110 transition-all duration-300">
                    <Mail className="w-4 h-4 flex-shrink-0" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] uppercase tracking-wider text-pale-stone block mb-0.5">
                      {translate("Email Address")}
                    </span>
                    <a 
                      href="mailto:nguyenvukhanh09112004@gmail.com" 
                      className="font-semibold text-xs sm:text-sm underline hover:text-pale-stone transition-colors break-all block"
                    >
                      nguyenvukhanh09112004@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="flex flex-col gap-3 pt-4 border-t border-ink/10 dark:border-white/10 relative z-10">
                <span className="font-mono text-[11px] uppercase tracking-wider text-pale-stone">
                  {translate("Find me on")}
                </span>
                <div className="flex items-center gap-3">
                  <SocialIcon 
                    url="https://www.linkedin.com/in/v%C5%A9-khanh-nguy%E1%BB%85n-020a563a9/" 
                    bgColor="transparent" 
                    fgColor="currentColor" 
                    style={{ height: 40, width: 40 }}
                    className="hover:scale-110 text-[#000000] dark:text-[#ffffff] opacity-70 hover:opacity-100 transition-all duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                  <SocialIcon 
                    url="https://www.facebook.com/vukhanh.nguyen.9461?locale=vi_VN" 
                    bgColor="transparent" 
                    fgColor="currentColor" 
                    style={{ height: 40, width: 40 }}
                    className="hover:scale-110 text-[#000000] dark:text-[#ffffff] opacity-70 hover:opacity-100 transition-all duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                  <SocialIcon 
                    url="https://github.com/VuKhanhNguyen" 
                    bgColor="transparent" 
                    fgColor="currentColor" 
                    style={{ height: 40, width: 40 }}
                    className="hover:scale-110 text-[#000000] dark:text-[#ffffff] opacity-70 hover:opacity-100 transition-all duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                </div>
              </div>
            </motion.div>

            {/* Right Column: Form Card */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              className="lg:col-span-7 liquid-glass border-3d shadow-3d-card p-4 sm:p-8 md:p-10 rounded-[30px] flex flex-col gap-8 relative overflow-hidden"
            >
              <div className="liquid-glass-bg" />
              
              <div className="relative z-10 flex flex-col gap-6 w-full">
                <div className="flex flex-col gap-3">
                  <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl text-ink font-normal leading-tight">
                    {translate("Let's create something together.")}
                  </h2>
                  <p className="font-sans text-xs sm:text-sm md:text-base text-pale-stone leading-relaxed">
                    {translate("Feel free to reach out via the form, or connect with me through social media.")}
                  </p>
                </div>

                {/* Form Submission */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  
                  {/* Name Input */}
                  <div className="flex flex-col gap-2 group relative z-10 transition-all duration-300 md:hover:-translate-y-1 md:focus-within:-translate-y-1 md:hover:shadow-subtle md:focus-within:shadow-subtle rounded-xl p-1 -m-1 bg-transparent">
                    <label className="font-mono text-[11px] uppercase tracking-wider text-pale-stone transition-colors group-focus-within:text-ink dark:group-focus-within:text-white">
                      {translate("Name")}
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={translate("Enter your name")}
                      className="w-full bg-atmosphere-wash/5 focus:bg-atmosphere-wash/10 border border-off-black/10 dark:border-white/10 focus:border-off-black dark:focus:border-white rounded-xl px-4 py-3 text-ink font-mono text-sm outline-none transition-all duration-250 placeholder-ink/25 dark:placeholder-white/15 shadow-sm"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="flex flex-col gap-2 group relative z-10 transition-all duration-300 md:hover:-translate-y-1 md:focus-within:-translate-y-1 md:hover:shadow-subtle md:focus-within:shadow-subtle rounded-xl p-1 -m-1 bg-transparent">
                    <label className="font-mono text-[11px] uppercase tracking-wider text-pale-stone transition-colors group-focus-within:text-ink dark:group-focus-within:text-white">
                      {translate("Email")}
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={translate("Enter your email")}
                      className="w-full bg-atmosphere-wash/5 focus:bg-atmosphere-wash/10 border border-off-black/10 dark:border-white/10 focus:border-off-black dark:focus:border-white rounded-xl px-4 py-3 text-ink font-mono text-sm outline-none transition-all duration-250 placeholder-ink/25 dark:placeholder-white/15 shadow-sm"
                    />
                  </div>

                  {/* Rich Text Message Editor */}
                  <div className="flex flex-col gap-2 group relative z-10 transition-all duration-300 md:hover:-translate-y-1 md:focus-within:-translate-y-1 md:hover:shadow-subtle md:focus-within:shadow-subtle rounded-xl p-1 -m-1 bg-transparent">
                    <label className="font-mono text-[11px] uppercase tracking-wider text-pale-stone">
                      {translate("Message")}
                    </label>
                    
                    {/* Editor Container */}
                    <div className="flex flex-col border border-off-black/15 dark:border-white/10 rounded-xl overflow-hidden focus-within:border-ink dark:focus-within:border-white transition-colors duration-250 bg-off-black/[0.01] dark:bg-black/25">
                      
                      {/* Formatting Toolbar */}
                      <div className="flex items-center justify-between px-3 py-2 bg-atmosphere-wash/20 border-b border-off-black/10 dark:border-white/10">
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={(e) => handleFormat(e, "bold")}
                            title="Bold"
                            className="p-1.5 rounded-lg hover:bg-ink/5 dark:hover:bg-white/10 text-ink/75 hover:text-ink transition-colors cursor-pointer"
                          >
                            <Bold className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => handleFormat(e, "italic")}
                            title="Italic"
                            className="p-1.5 rounded-lg hover:bg-ink/5 dark:hover:bg-white/10 text-ink/75 hover:text-ink transition-colors cursor-pointer"
                          >
                            <Italic className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => handleFormat(e, "underline")}
                            title="Underline"
                            className="p-1.5 rounded-lg hover:bg-ink/5 dark:hover:bg-white/10 text-ink/75 hover:text-ink transition-colors cursor-pointer"
                          >
                            <Underline className="w-4 h-4" />
                          </button>
                          <div className="w-[1px] h-4 bg-ink/10 dark:bg-white/10 mx-1" />
                          <button
                            type="button"
                            onClick={(e) => handleFormat(e, "insertUnorderedList")}
                            title="Bullet List"
                            className="p-1.5 rounded-lg hover:bg-ink/5 dark:hover:bg-white/10 text-ink/75 hover:text-ink transition-colors cursor-pointer"
                          >
                            <List className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Image Upload Button */}
                        <div>
                          <button
                            type="button"
                            onClick={handleImageButtonClick}
                            title={translate("Attach Image")}
                            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg hover:bg-ink/5 dark:hover:bg-white/10 text-ink/75 hover:text-ink transition-colors text-xs font-mono cursor-pointer"
                          >
                            <ImageIcon className="w-4 h-4" />
                            <span className="hidden sm:inline">{translate("Attach Image")}</span>
                          </button>
                          <input
                            type="file"
                            ref={fileInputRef}
                            multiple
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                        </div>
                      </div>

                      {/* Contenteditable Rich Text Area */}
                      <div 
                        ref={editorRef}
                        contentEditable={!isPending}
                        onInput={handleEditorChange}
                        data-placeholder={translate("Enter your message")}
                        className="rich-editor min-h-[160px] max-h-[600px] min-w-full p-4 text-ink font-sans text-base outline-none bg-transparent overflow-y-auto"
                        style={{ resize: "vertical" }}
                      />

                      {/* Bottom Status Bar (Character limit & alert) */}
                      <div className="flex items-center justify-between px-4 py-2 bg-atmosphere-wash/10 border-t border-ink/5 dark:border-white/5 font-mono text-[10px] text-pale-stone">
                        <span>{translate("Character Limit")}</span>
                        <span className={isOverLimit ? "text-red-500 font-bold" : ""}>
                          {textLength} / 2000
                        </span>
                      </div>

                    </div>
                  </div>

                  {/* Image Attachments Preview Grid */}
                  {attachments.length > 0 && (
                    <div className="flex flex-col gap-2">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-pale-stone">
                        {translate("Attached Files")} ({attachments.length})
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        <AnimatePresence>
                          {attachments.map((att) => (
                            <motion.div
                              key={att.name}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.9 }}
                              className="relative border border-ink/10 dark:border-white/10 rounded-lg overflow-hidden aspect-video bg-atmosphere-wash group flex items-center justify-center"
                            >
                              <img
                                src={att.content}
                                alt={att.name}
                                className="w-full h-full object-cover"
                              />
                              {/* Overlay and hover delete */}
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => removeAttachment(att.name)}
                                  className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-transform hover:scale-110 cursor-pointer shadow-md"
                                  title="Remove Image"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                              {/* Truncated File Name Badge */}
                              <div className="absolute bottom-1 left-1 right-1 bg-black/60 text-white text-[9px] font-mono px-2 py-0.5 rounded-lg truncate text-center">
                                {att.name}
                              </div>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    </div>
                  )}

                  {/* Success/Error Alerts inside Form */}
                  <AnimatePresence mode="wait">
                    {isSuccess && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-3 p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-700 dark:text-green-400 font-mono text-xs"
                      >
                        <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                        <span>{translate("Your message has been sent successfully!")}</span>
                      </motion.div>
                    )}
                    {errorMsg && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-3 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-700 dark:text-red-400 font-mono text-xs"
                      >
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <span>{errorMsg}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit Button */}
                  <motion.div whileTap={{ scale: 0.98 }}>
                    <Button
                      type="submit"
                      disabled={isPending || isOverLimit || textLength === 0 || !name || !email}
                      variant="primary"
                      size="primary"
                      className="w-full sm:w-fit font-mono font-medium tracking-wide flex items-center justify-center gap-2 px-8 py-4 bg-off-black hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-paper-canvas dark:text-black border border-transparent rounded-lg shadow-md active:opacity-90 transition-all duration-200 pointer-events-auto cursor-pointer disabled:pointer-events-auto disabled:cursor-not-allowed"
                    >
                      {isPending ? (
                        <>
                          <span className="animate-pulse">{translate("Sending...")}</span>
                        </>
                      ) : (
                        <>
                          <span>{translate("Send Message")}</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </Button>
                  </motion.div>

                </form>
              </div>
            </motion.div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
    </div>
  );
}
