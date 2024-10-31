// import asyncHandler from "express-async-handler";
// import User from "../models/userModel.js";
// import vision from '@google-cloud/vision';
// import { GoogleGenerativeAI } from '@google/generative-ai';
// import path from 'path';
// import { dirname } from 'path';
// import { fileURLToPath } from 'url';
// import Conversation from "../models/conversationModel.js";
// import Message from "../models/messageModel.js"
// import { io } from '../socket/socket.js';
// import cloudinary from '../cloudinary/cloudinaryConfig.js';
// import fs from 'fs';
// import { getReceiverSocketId } from "../socket/socket.js";
// import dotenv from 'dotenv';
// dotenv.config();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);


// // const client = new vision.ImageAnnotatorClient({
// //     keyFilename: path.resolve(__dirname, '../config/api-learn-432706-d6966a1d489e.json')
// // });

// const apiKey = process.env.GEMINI_API_KEY;
// const genAI = new GoogleGenerativeAI(apiKey);

// export const getUserForSidebar = asyncHandler(async (req, res) => {
//     try {
//         const loggedInUserId = req.user._id;
//         const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
//         res.status(200).json({ filteredUsers, hasSpecificId: "66c048e50d7696b4b17b5d53" });
//     } catch (error) {
//         console.error("Error in UserController", error.message);
//         res.status(500).json({ error: "Internal Server Error!" });
//     }
// });
// export const auramicaiTextExtract = asyncHandler(async (req, res) => {
//     try {
//         let { message: question, previousMessage } = req.body;
//         const image = req.file || null;

//         const receiverId = req.user._id;
//         console.log("image, question receiverId ----", image, question, receiverId);

//         if (question !== "") {
//             question = `The user input is: "${question}". 
//             You are AuramicAi, a assistant that works inside this application. 
//             Your task is to answer questions or provide relevant information based on the user's input. 
//             You can generate creative content (stories, articles, poems, code, scripts, music, emails, etc.), summarize texts, translate languages,Image Analysis , and offer detailed explanations or answers to the user's queries. 
//             If an image is provided, analyze the image and incorporate relevant details into your response. 
//             Use this to assist the user effectively.`;
//         }
        
//         if (previousMessage !== "") {
//             question += ` Here is the context from a previous response or selected text: "${previousMessage}". 
//             Please consider this while formulating your answer.`;
//         }
        
//         if (image) {
//             question += ` An image has been provided. Analyze the image and use the information to enhance your answer to the user's query.`;
//         }
        
//         question += ` Provide a clear and helpful answer to the user's query based on the text, image, or previous context.`;
        
//         if (question.length > 3000) {
//             return res.status(400).json({ error: 'String length exceeds 3000 characters' });
//         }
        

//         console.log("question:------", question);
//         let extractedText = "";

//         const model = await genAI.getGenerativeModel({
//             model: "gemini-1.5-flash",
//         });
//         function fileToGenerativePart(path, mimeType) {
//             return {
//                 inlineData: {
//                     data: Buffer.from(fs.readFileSync(path)).toString("base64"),
//                     mimeType,
//                 },
//             };
//         }
//         const prompt = question + extractedText;
//         let imagePart;
//         if(image){
//             imagePart = fileToGenerativePart(
//                 `${image.path}`,
//                 "image/jpeg",
//             );
//         }
//         let result;
//         if(imagePart){
//             result = await model.generateContent([prompt, imagePart]);
//         }else{
//             result = await model.generateContent([prompt]);
//         }
//         const responseText = result.response.text();
//         console.log("result.response.text()---- ",responseText)
//         if (responseText) {
//             let newMessage;
//             const sendMessageResponse = await sendAuramicDb(responseText, receiverId, image);
//             if(sendMessageResponse){
//                 newMessage = sendMessageResponse.newMessage;
//             }else{
//                 newMessage = responseText;
//             }
//             res.json({ response: newMessage });
//             const receiverSocketId = getReceiverSocketId(receiverId);
//             if (receiverSocketId) {
//                 io.to(receiverSocketId).emit("newMessage", newMessage);
//             }
//         }
//         if(imagePart){
//             fs.unlink(image.path, (err) => {
//                 if (err) {
//                     console.error('Error deleting the file from the server:', err);
//                 }
//             });
//         }
//     } catch (error) {
//         console.error('Error processing request:', error);
//         res.status(500).json({ error: error.toString() });
//     }
// });

// const sendAuramicDb = async (message, receiverId, image) => {
//     try {
//         const senderId = "66c048e50d7696b4b17b5d53";

//         let conversation = await Conversation.findOne({
//             participants: { $all: [senderId, receiverId] }
//         });
//         if (!conversation) {
//             conversation = await Conversation.create({
//                 participants: [senderId, receiverId]
//             });
//         }
//         if(image){
//             fs.unlink(image.path, (err) => {
//                 if (err) {
//                     console.error('Error deleting the file from the server:', err);
//                 }
//             });
//         }

//         const newMessage = new Message({
//             senderId,
//             receiverId,
//             message
//         });

//         if (newMessage) {
//             conversation.messages.push(newMessage._id);
//         }

//         await Promise.all([conversation.save(), newMessage.save()]);

//         return { newMessage };

//     } catch (error) {
//         console.error("Error in Message Controller", error.message);
//         throw new Error("Internal Server Error!");
//     }
// };

