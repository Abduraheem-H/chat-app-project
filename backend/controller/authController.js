import bcrypt from 'bcryptjs';
import User from "../models/userModels.js";
import generateTokenAndSetCookie from '../utils/generateToken.js';


export const singup = async (req, res) => {
	try {
		const { fullName, username, password, confirmPassword, gender } = req.body;
		if (password != confirmPassword) {
			return res.status(400).json({ error: "Password did not match" })
		}
		const user = await User.findOne({ username })

		if (user) {
			return res.status(400).json({ error: "User already exists" })
		}

		// Hash the user password 

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt)

		const maleProfilePicture = `https://avatar.iran.liara.run/public/boy?username=${username}`
		const femaleProfilePicture = `https://avatar.iran.liara.run/public/girl?username=${username}`

		const newUser = new User({
			fullName,
			username,
			password: hashedPassword,
			gender,
			profilePicture: gender === "male" ? maleProfilePicture : femaleProfilePicture
		})
		if (newUser) {
			generateTokenAndSetCookie(newUser._id, res);
			await newUser.save()

			res.status(200).json({
				_id: newUser.id,
				fullName: newUser.fullName,
				username: newUser.username,
				profilePicture: newUser.profilePicture
			})
		} else {
			res.status(404).json({ error: "Invalid user data" })
		}

	} catch (error) {
		console.log("Error in signup controller: ", error.message)

		res.status(500).json({ error: "Internal Server Error" })
	}

}

export const login = async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await User.findOne({ username: username })
		const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

		if (!isPasswordCorrect || !user) {
			return res.status(400).json({ error: "Ivalid username or password" })
		}

		generateTokenAndSetCookie(user._id, res);
		res.status(200).json({
			_id: user._id,
			fullName: user.fullName,
			username: user.username,
			profilePicture: user.profilePicture,

		});

	} catch (error) {
		console.log("Error in login controller: ", error.message)

		res.status(500).json({ error: "Internal Server Error" })
	}

}

export const logout = async (req, res) => {
	try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });

	} catch (error) {
		console.log("Error in logout controller: ", error.message)

		res.status(500).json({ error: "Internal Server Error" })
	}
}