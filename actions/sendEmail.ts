"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
export const validateString = (
    value: unknown,
    maxLength: number
  ): value is string => {
    if (!value || typeof value !== "string" || value.length > maxLength) {
      return false;
    }
  
    return true;
  };

export const sendEmail = async (formData: FormData) => {
  const email = formData.get("email");
  const message = formData.get("message");


  if (!validateString(email, 320)) {
    return {
      error: "Invalid sender email",
    };
  }
  if (!validateString(message, 2000)) {
    return {
      error: "Invalid message",
    };
  }
  try {
    await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: "franconicolascoronel94@gmail.com",
      subject: "Message from contact form",
      reply_to: email,
      text: `${message}`
    });
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
  
  return {
    error: null
  }

};