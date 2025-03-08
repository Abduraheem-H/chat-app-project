import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModels.js";
export const sendMessage = async (req, res) => {
	try {
		const { message } = req.body;
		const { id: recieverId } = req.params
		console.log("User in request:", req.user);

		const senderId = req.user._id

		let conversation = await Conversation.findOne({
			participants: { $all: [senderId, recieverId] },
		})

		if (!conversation) {
			conversation = await Conversation.create({
				participants: [senderId, recieverId],
			})
		}

		const newMessage = new Message({
			senderId: senderId,
			recieverId: recieverId,
			message: message,
		})
		if (newMessage) {
			conversation.messages.push(newMessage._id)
		}

		//Socket.io functionality will be inserted here

		await Promise.all([conversation.save(), newMessage.save()])// for better performance of parallel save

		return res.status(201).json(newMessage);

	} catch (error) {
		console.log("Error in sendMessage contoller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
}

export const getSendToMessage = async (req, res) => {
	try {
		const { id: recieverId } = req.params
		const senderId = req.user._id

		let conversation = await Conversation.findOne({
			participants: { $all: [senderId, recieverId] },
		}).populate("messages")

		if (!conversation) {
			return res.status(200).json({ messages: [] })
		}

		return res.status(200).json(conversation.messages);
	} catch (error) {
		console.log("Error in getSendToMessage contoller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
}

