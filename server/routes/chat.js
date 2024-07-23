import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { newGroupChat, getMyChats, getMyGroups, addMembers, removeMember, leaveGroup, sendAttachments, getChatDetails, renameGroup, deleteChat, getMessages } from "../controllers/chat.js";
import { attachmentsMulter } from "../middlewares/multer.js";
import { addMemberValidator, chatIdValidator, newGroupValidator, removeMemberValidator, renameGroupValidator, sendAttachmentsValidator, validateHandler } from "../lib/validators.js";

const app = express.Router();

//after here user must be logged in to access the routes

app.use(isAuthenticated);

//create group chat
app.post("/new", newGroupValidator(), validateHandler, newGroupChat);
app.get("/my", getMyChats);
app.get("/my/groups", getMyGroups);
app.put("/addmembers", addMemberValidator(), validateHandler, addMembers);
app.put("/removemember", removeMemberValidator(), validateHandler, removeMember);
app.delete("/leave/:id", chatIdValidator(), validateHandler, leaveGroup);


//send attachments
app.post("/message", attachmentsMulter, sendAttachmentsValidator(), validateHandler, sendAttachments);

//get messages
app.get("/message/:id", chatIdValidator(), validateHandler, getMessages);

//get chat details, rename, delete
app.route("/:id")
    .get(chatIdValidator(), validateHandler, getChatDetails)
    .put(renameGroupValidator(), validateHandler, renameGroup)
    .delete(chatIdValidator(), validateHandler, deleteChat);


export default app;