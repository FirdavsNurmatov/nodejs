import { Menu } from "@grammyjs/menu";

export const menu = new Menu("my-menu-identifier")
  .text("start")
  .row()
  .text("help")
  .row()
  .text("add")
  .row()
  .text("delete");
