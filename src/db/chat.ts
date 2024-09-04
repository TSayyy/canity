import { db } from "@/db";

export const initializeChat = async (id: string, title: string, message: string) => {
  try {
    const time = Date.now();
    await db.chatTitle.add({ id, title, time });
    await db.chat.add({ chatID: id, role: "user", parts: message, time });
    return id;
  } catch (error) {
    return false;
  }
};

export const sendMessage = async (chatID: string, role: "user" | "model", message: string) => {
  try {
    await db.chat.add({ chatID, role, parts: message, time: Date.now() });
    return true;
  } catch (error) {
    return false;
  }
};

export const deleteChat = async (chatID: string) => {
  try {
    await db.chatTitle.delete(chatID);
    await db.chat.where("chatID").equals(chatID).delete();
    return true;
  } catch (error) {
    return false;
  }
};

export const getChatByID = async (chatID: string | null) => {
  if (!chatID) return;
  // return all the chat data and sort it by time
  try {
    const chat = await db.chat.where("chatID").equals(chatID).sortBy("time");
    // check if empty
    if (!chat.length) return;
    return chat;
  } catch (error) {
    return;
  }
};
