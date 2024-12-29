import { addKeyboard } from "../keyboard/index.js";
import { createUser } from "../utils/user.service.js";

export const startCommand = async (ctx) => {
  const { id, first_name, last_name, username } = ctx.update.message.from;

  const result = await createUser({
    user_id: id,
    first_name,
    last_name,
    username,
  });

  ctx.reply(`Assalamu alaykum, ${first_name} ${last_name}! 🎉`, {
    reply_markup: addKeyboard,
  });
  ctx.reply(`Cho'ntak bot orqali siz har qanday ma'lumotni saqlab, uni telegramdagi ixtiyoriy chatga tezlik bilan jo'natish imkoniga ega bo'lasiz! 

Ma'lumot qo'shish uchun pastdagi 'Qo'shish' tugmasini bosing va kalit so'z bering.`);
};
