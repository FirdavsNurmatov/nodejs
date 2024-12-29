import { Bot, session } from "grammy";
import { helpCommand, startCommand } from "../command/index.js";
import {
  continueConversation,
  hearAddKeyboard,
  helpMessage,
} from "../action/index.js";
import { conversations, createConversation } from "@grammyjs/conversations";
// import { CommandGroup } from "@grammyjs/commands";

export const bot = new Bot(process.env.BOT_TOKEN);

// const myCommands = new CommandGroup();
// myCommands.command("start", "Assalomu alaykum", (ctx) => ctx.reply("salom"));
// bot.use(myCommands);
const commands = [
  { command: "start", description: "Botni ishga tushurish" },
  { command: "help", description: "Yordam" },
  // { command: "info", description: "Get bot information" },
];

bot.api.setMyCommands(commands);

bot.command("start", startCommand);
bot.command("help", helpCommand);
// bot.command("help", (ctx) =>
//   ctx.reply(
//     "Here is a list of commands:\n" +
//       commands.map((c) => `/${c.command} - ${c.description}`).join("\n")
//   )
// );
// bot.command("info", (ctx) =>
//   ctx.reply("This is a sample bot created with Grammy.")
// );

bot.use(session({ initial: () => ({}) }));
bot.use(conversations());
bot.use(createConversation(continueConversation));

bot.command("start", startCommand);
bot.command("help", helpCommand);
// bot.command("add");
bot.hears("Qo'shish +", hearAddKeyboard);
bot.on("message", helpMessage);
bot.on("message:text", async (ctx) => {
  await ctx.conversation.enter("continueConversation");
});
