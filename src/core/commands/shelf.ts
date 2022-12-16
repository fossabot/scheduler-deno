import { Composer } from "grammy";
import { shelf_inline_keyboard, show_book } from "../handlers/dx.ts";

export const shelf_composer = new Composer();
shelf_composer.command("shelf", async (ctx) => {
    await ctx.reply("📚 Оберіть книгу:", {
        reply_markup: shelf_inline_keyboard,
        disable_web_page_preview: true,
        reply_to_message_id: ctx.message?.message_id,
    });
});

shelf_composer.filter((ctx) => ctx.message?.text?.startsWith("📕 ") ?? false).on(
    "message",
    async (ctx) => {
        try {
            const book = ctx.message.text?.slice(3) ?? "Алгебра";
            const bookdata = show_book(book);
            await ctx.reply(`📕 <b><a href="${bookdata.url}">${book}</a></b>:`, {
                disable_web_page_preview: true,
                reply_markup: { remove_keyboard: true },
            });
            await ctx.replyWithDocument(bookdata.file_id);
        } catch (_e) {
            await ctx.reply("Невідома книга!");
        }
    },
);
