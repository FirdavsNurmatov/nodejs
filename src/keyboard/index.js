import { InlineKeyboard, Keyboard } from "grammy";

export const addKeyboard = new Keyboard().text("Qo'shish +").row().resized();

export const verifyInlineKeyboard = new InlineKeyboard()
  .text("Tasdiqlash ✅", "verify")
  .text("Tahrirlash ✏️", "change");
