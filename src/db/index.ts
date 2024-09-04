import Dexie, { Table } from "dexie";
import { z } from "zod";

export const Chat = z.object({
  chatID: z.string(),
  role: z.union([z.literal("user"), z.literal("model")]),
  parts: z.string(),
  time: z.number(),
});

export const ChatTitle = z.object({
  id: z.string(),
  title: z.string(),
  time: z.number(),
});

export class DexieDB extends Dexie {
  chat!: Table<z.infer<typeof Chat>>;
  chatTitle!: Table<z.infer<typeof ChatTitle>>;

  constructor() {
    super("Coursanity");
    this.version(1).stores({
      chat: "++id, chatID, role, parts, time",
      chatTitle: "id, title, time",
    });
  }
}

export const db = new DexieDB();
