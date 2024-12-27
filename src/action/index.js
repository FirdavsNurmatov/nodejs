import { updateUserById } from "../utils/user.service.js";

export const hearAddKeyboard = async (ctx) => {
  await ctx.reply("Istagan ma'lumot turini menga jo'nating 🙂...");
};

export const continueConversation = async (conversation, ctx) => {
  const messageId = ctx.msg.message_id;
  const msg = `Endi kalit so'z yuboring! 
  
Aynan shu kalit so'z orqali bu ma'lumotni chatda jo'natasiz. Shuning uchun, kalit so'zni eslab qoling!`;
  await ctx.reply(msg, { reply_to_message_id: messageId });

  const data = await conversation.wait();

  const userId = String(ctx.update.message.from.id);
  const key = ctx.msg.text;
  const value = data.update.message.text;

  await updateUserById(userId, { key, value });

  ctx.reply(`Kalit so'z : ${key} 

Tekst : ${value}`);
};
