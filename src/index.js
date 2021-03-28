import * as dotenv from "dotenv";
import { Client } from "discord.js";
import YoutubeUrl from "youtube-url";

dotenv.config();
const client = new Client();

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

client.once("ready", () => {
  console.log("Ready!");
});

client.on("message", async (message) => {
  const isYoutubeLink = YoutubeUrl.valid(message.content.trim());
  const isOwnMessage = message.author.id === client.user.id; // Message is authored by this bot

  if (!isOwnMessage) {
    if (!isYoutubeLink) {
      message.delete({ reason: "This is not a valid YouTube URL." });

      console.log(message.content);

      const deletionReasonMessage = await message.channel.send(
        `<@${message.author.id}>: Deine Nachricht wurde gelöscht. Bitte poste einen gültigen YouTube Link.`
      );

      deletionReasonMessage.delete({ timeout: 6000 });
    }
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
