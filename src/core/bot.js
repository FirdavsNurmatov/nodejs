const { Bot, session } = require("grammy");
const {
  conversations,
  createConversation,
} = require("@grammyjs/conversations");
const { limit: rateLimit } = require("@grammyjs/ratelimiter");
const { config } = require("dotenv");

config();

// Bot yaratish
const bot = new Bot(process.env.BOT_API);

// Middleware'larni ulash
bot.use(
  session({
    initial: () => ({
      step: null,
      data: {},
    }),
  })
);

bot.use(conversations());

// So'rovlar sonini cheklash
bot.use(
  rateLimit({
    timeFrame: 2000,
    limit: 3,
  })
);

// Bekor qilish va Bosh menyu tugmalarini tekshirish
bot.hears(["❌ Bekor qilish", "🏠 Bosh menyu"], async (ctx) => {
  ctx.session.step = null;
  ctx.session.data = {};
  await ctx.reply("Bosh menyuga qaytdingiz", {
    reply_markup: {
      keyboard: [
        ["🔍 Sherik kerak", "🎯 Ish joyi kerak"],
        ["👨‍💼 Xodim kerak", "👨‍🏫 Ustoz kerak"],
        ["👨‍🎓 Shogird kerak"],
      ],
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  });
});

// Xatolarni qayta ishlash
bot.catch((err) => {
  const ctx = err.ctx;
  console.error(`Error while handling update ${ctx.update.update_id}:`);
  console.error(err.error);

  ctx
    .reply("Xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring.")
    .catch((e) => {
      console.error("Error while sending error message:", e);
    });
});

// Botni to'xtatish
const botniToxtatis = () => {
  console.log("Bot to'xtatilmoqda...");
  bot.stop();
};

// Jarayonni to'xtatish signallarini qayta ishlash
process.on("SIGTERM", botniToxtatis);
process.on("SIGINT", botniToxtatis);

module.exports = {
  bot,
};
