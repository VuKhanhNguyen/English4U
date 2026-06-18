"use server";

import nodemailer from "nodemailer";

export interface SendEmailResponse {
  success: boolean;
  error?: string;
}

export interface EmailAttachment {
  name: string;
  content: string; // Base64 Data URL
}

export async function sendEmail(
  name: string,
  email: string,
  messageHtml: string,
  attachments?: EmailAttachment[]
): Promise<SendEmailResponse> {
  // Simple validation
  if (!name || !name.trim() || !email || !email.trim() || !messageHtml || !messageHtml.trim()) {
    return { success: false, error: "Please fill out all fields" };
  }

  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;
  // If EMAIL_TO is not set, fallback to sending it to EMAIL_USER
  const emailTo = process.env.EMAIL_TO || emailUser;

  if (!emailUser || !emailPass) {
    console.error("Missing SMTP credentials (EMAIL_USER or EMAIL_PASS) in .env");
    return {
      success: false,
      error: "SMTP credentials are not configured on the server. Please check environment variables.",
    };
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    // Strip HTML tags for the fallback plain text version
    const textMessage = messageHtml.replace(/<[^>]*>/g, "");

    const mailOptions: any = {
      from: `"${name}" <${email}>`,
      to: emailTo,
      replyTo: email,
      subject: `[English4U Contact Form] Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${textMessage}`,
      html: `
        <div style="font-family: sans-serif; padding: 24px; color: #242424; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
          <h2 style="font-size: 20px; font-weight: bold; border-bottom: 1px solid #e2e8f0; padding-bottom: 12px; margin-top: 0; color: #000;">New Contact Form Submission</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 6px 0; font-weight: bold; width: 80px; font-size: 14px;">Name:</td>
              <td style="padding: 6px 0; font-size: 14px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold; font-size: 14px;">Email:</td>
              <td style="padding: 6px 0; font-size: 14px;"><a href="mailto:${email}" style="color: #242424; text-decoration: underline;">${email}</a></td>
            </tr>
          </table>
          <p style="font-weight: bold; margin-bottom: 8px; font-size: 14px;">Message:</p>
          <div style="background-color: #f6f3f1; padding: 20px; border-left: 4px solid #cfdaf5; border-radius: 8px; font-size: 14px; line-height: 1.6; color: #000; overflow-wrap: break-word;">
            ${messageHtml}
          </div>
        </div>
      `,
    };

    if (attachments && attachments.length > 0) {
      mailOptions.attachments = attachments.map((att) => {
        const base64Data = att.content.split(";base64,").pop() || att.content;
        return {
          filename: att.name,
          content: Buffer.from(base64Data, "base64"),
        };
      });
    }

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (err: any) {
    console.error("Error sending email via Nodemailer:", err);
    return { success: false, error: err.message || "Failed to send message." };
  }
}
