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
};
