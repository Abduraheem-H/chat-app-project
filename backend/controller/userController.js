import User from "../models/userModels.js";

export const getUserToChat = async (req, res) => {
	try {
		// selected users from our database excluding the currently logged user(req.user._id).
		const selectedUsers = await User.find({ _id: { $ne: req.user._id } }).select("-password");
		res.status(200).json(selectedUsers);
	} catch (error) {
		console.error("Error in getUserToChat contoller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
}