import mongoose from "mongoose";
import { bot } from "./src/bot/index.js";

await mongoose.connect(
  "mongodb+srv://firdavs:qwer1234@mongodb-demo.nq3sj.mongodb.net/ustoz_shogirt_bot"
);
bot.start();

// setTimeout(async ()=>{
//   const botInfo = await bot.api.getMe();
//   console.log(botInfo)
// }, 1000)
