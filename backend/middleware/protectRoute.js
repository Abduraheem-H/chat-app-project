import jwt from "jsonwebtoken";
import User from "../models/userModels.js";

const protectRoute = async (req, res, next) => {
	try {
		const token = req.cookies.jwt;
		if (!token) {
			return res.status(401).json({ error: "Unauthorized access -No token provided" });
		}
		const decoded = jwt.verify(token, process.env.JWT_SECRET)
		// console.log("Decoded JWT:", decoded);

		if (!decoded) {
			return res.status(401).json({ error: "Unauthorized access -Invalid token " });
		}

		const user = await User.findById(decoded.userID).select("-password");
		console.log("Looking for user with ID:", decoded.userId);


		if (!user) {
			return res.status(401).json({ error: "User not found" });
		}

		req.user = user

		next();

	} catch (error) {
		console.log("Error in protectRoute middleware", error.message);
		res.status(500).json({ error: "Internal Server Error" });

	}
}

export default protectRoute;