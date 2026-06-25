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
          resize: both;
          overflow: auto;
        }
      `}} />
      <Navbar />

      <main className="flex-grow pt-32 pb-24 md:pt-40 md:pb-32 z-10">
        <div className="mx-auto max-w-6xl w-full px-6 md:px-8 flex flex-col gap-12 md:gap-16">
          
          {/* Header Section (Typographic Brutalism) */}
          <div className="flex flex-col gap-4 max-w-4xl mt-28">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="font-heading text-6xl sm:text-7xl md:text-8xl text-ink tracking-tight font-normal leading-[1.05]"
            >
              {translate("Keep in touch.")}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="font-mono text-sm md:text-base text-pale-stone max-w-2xl leading-relaxed mt-2"
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Personal Info Card */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="lg:col-span-5 bg-atmosphere-wash dark:bg-atmosphere-wash p-8 md:p-10 rounded-lg border border-ink/5 dark:border-white/5 flex flex-col gap-8"
            >
              {/* Avatar / Brand Illustration */}
              <div className="relative w-full aspect-[4/3] rounded-md overflow-hidden bg-gradient-to-tr from-[#a0b5eb] to-[#ffa773] dark:from-[#1e1b4b] dark:to-[#311042] border border-ink/10 dark:border-white/10 flex items-center justify-center">
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
              <div className="flex flex-col gap-6 font-mono text-sm text-ink">
                <div className="flex items-start gap-3">
                  <Briefcase className="w-4 h-4 mt-1 text-pale-stone flex-shrink-0" />
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-pale-stone block mb-1">
                      {translate("Role")}
                    </span>
                    <span className="font-medium leading-relaxed">
                      {translate("Full-stack Developer")}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-1 text-pale-stone flex-shrink-0" />
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-pale-stone block mb-1">
                      {translate("Location")}
                    </span>
                    <span className="font-medium leading-relaxed">
                      {translate("Da Nang, Vietnam")}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 mt-1 text-pale-stone flex-shrink-0" />
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-pale-stone block mb-1">
                      {translate("Email Address")}
                    </span>
                    <a 
                      href="mailto:nguyenvukhanh09112004@gmail.com" 
                      className="font-medium underline hover:text-pale-stone transition-colors break-all"
                    >
                      nguyenvukhanh09112004@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="flex flex-col gap-3 pt-4 border-t border-ink/10 dark:border-white/10">
                <span className="font-mono text-[11px] uppercase tracking-wider text-pale-stone">
                  {translate("Find me on")}
                </span>
                <div className="flex items-center gap-3">
                  <SocialIcon 
                    url="https://linkedin.com" 
                    bgColor="transparent" 
                    fgColor="currentColor" 
                    style={{ height: 40, width: 40 }}
                    className="hover:scale-110 text-[#000000] dark:text-[#ffffff] opacity-70 hover:opacity-100 transition-all duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                  <SocialIcon 
                    url="https://facebook.com" 
                    bgColor="transparent" 
                    fgColor="currentColor" 
                    style={{ height: 40, width: 40 }}
                    className="hover:scale-110 text-[#000000] dark:text-[#ffffff] opacity-70 hover:opacity-100 transition-all duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                  <SocialIcon 
                    url="https://github.com" 
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

            {/* Right Column: Form Container */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              className="lg:col-span-7 flex flex-col gap-8"
            >
              <div className="flex flex-col gap-3">
                <h2 className="font-heading text-3xl md:text-4xl text-ink font-normal leading-tight">
                  {translate("Let's create something together.")}
                </h2>
                <p className="font-sans text-base text-pale-stone leading-relaxed">
                  {translate("Feel free to reach out via the form, or connect with me through social media.")}
                </p>
              </div>

              {/* Form Submission */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                
                {/* Name Input */}
                <div className="flex flex-col gap-2 group">
                  <label className="font-mono text-[11px] uppercase tracking-wider text-pale-stone transition-colors group-focus-within:text-ink dark:group-focus-within:text-white">
                    {translate("Name")}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={translate("Enter your name")}
                    className="bg-transparent border-b border-ink/20 dark:border-white/20 py-3 text-ink font-mono text-base outline-none focus:border-ink dark:focus:border-white transition-colors duration-250 placeholder-ink/30 dark:placeholder-white/20"
                  />
                </div>

                {/* Email Input */}
                <div className="flex flex-col gap-2 group">
                  <label className="font-mono text-[11px] uppercase tracking-wider text-pale-stone transition-colors group-focus-within:text-ink dark:group-focus-within:text-white">
                    {translate("Email")}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={translate("Enter your email")}
                    className="bg-transparent border-b border-ink/20 dark:border-white/20 py-3 text-ink font-mono text-base outline-none focus:border-ink dark:focus:border-white transition-colors duration-250 placeholder-ink/30 dark:placeholder-white/20"
                  />
                </div>

                {/* Rich Text Message Editor */}
                <div className="flex flex-col gap-2 group">
                  <label className="font-mono text-[11px] uppercase tracking-wider text-pale-stone">
                    {translate("Message")}
                  </label>
                  
                  {/* Editor Container */}
                  <div className="flex flex-col border border-ink/20 dark:border-white/20 rounded-md overflow-hidden focus-within:border-ink dark:focus-within:border-white transition-colors duration-250">
                    
                    {/* Formatting Toolbar */}
                    <div className="flex items-center justify-between px-3 py-2 bg-atmosphere-wash/40 border-b border-ink/10 dark:border-white/10">
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
                      style={{ resize: "both" }}
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
                    className="w-full sm:w-fit font-mono font-medium tracking-wide flex items-center justify-center gap-2 px-8 py-4 bg-off-black hover:bg-ink dark:bg-white dark:hover:bg-white/95 text-paper-canvas dark:text-black border border-transparent rounded-lg shadow-md active:opacity-90 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
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
            </motion.div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
