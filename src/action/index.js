import { verifyInlineKeyboard } from "../keyboard/index.js";
import { updateUserById } from "../utils/user.service.js";

export const hearAddKeyboard = async (ctx) => {
  await ctx.reply("Istagan ma'lumot turini menga jo'nating 🙂...", {
    reply_markup: { remove_keyboard: true },
  });
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

  await ctx.reply(`Kalit so'z : ${key} 

Tekst : ${value}`);

  await ctx.reply(`Endi ma'lumot va kalit so'zni tasdiqlang!`, {
    reply_markup: verifyInlineKeyboard,
  });

  const answer = await conversation.wait();

  if (answer.update.callback_query.data === "verify") {
    await ctx.reply(`Ma'lumot muvaffaqiyatli qo'shildi! 🥳 

👉@n14_firdavs_bot kalit so'z👈 
shu jumlani Telegramdagi istagan chatga yozish orqali saqlangan ma'lumotni jo'natishingiz mumkin!`);

    await updateUserById(userId, { key, value });
  } else if (answer.update.callback_query.data === "change") {
    await ctx.reply("just a minute...");
  }
};

export const helpMessage = async (ctx) => {
  ctx.reply(`Iltimos, ma'lumot qo'shish uchun pastdagi Qo'shish tugmasini bosing. 

Yoki yordam oling...

/help
👆`);
};
