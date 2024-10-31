import model from '../model/users.js'
import bcrypt from 'bcrypt'
import mongoose from 'mongoose';

const Users = model.signUpUser;

export const getUserprofile = async (req, res) => {
    const { id } = req.params;
    if(!id || !mongoose.Types.ObjectId.isValid) return res.status(400).json({
        message:"Invalid ID - backend"
    })
    try {
        const user = await Users.findById(id);
        if (!user) return res.status(404).json({
            message:"User not found! - backend"
        })

        res.status(200).json({
            message: `Hello ${user.username} from - backend`,
            username: user.username,
            email: user.email,
        })

    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message || "Internal server error! - backend"
        })
    }
}

export const patchUsers = async (req, res) => {
    const { newUsername, newEmail } = req.body;
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid) return res.status(400).json({
        message:"Invalid ID - backend",
    })

    try {
        const user = await Users.findById(id)

        if (!user) return res.status(404).json({
            message:"User not found! - backend"
        })

        // if the newUsername is provided, update the override the old username with the new
        if(newUsername) {
            user.username = newUsername;
        }

        // if the newEmail is provided, update the override the old email with the new
        if(newEmail) {
            user.email = newEmail;
        }

        const updatedUser = await user.save();

        res.status(200).json({
            message: "Profile update successfully! - backend",
            updatedUser
        })
    } catch (error) {
        res.status(error.statusCode || 500).json({
            error: error.message || "Internal server error - backend"
        })
    }
}

export const updatePassword = async (req, res) => {
    const { id } = req.params;
    const { currentPassword, newPassword } = req.body;

    if (!id || !mongoose.Types.ObjectId.isValid) return res.status(400).json({
        message:"Invalid ID - backend"
    })

    try {
        const user = await Users.findById(id).select("+password");

        if (!user) return res.status(404).json({
            message:"User not found! - backend"
        })

        // letting the user type a password in the input field and comparing it with the stored password, verification
        const comparePassword = await bcrypt.compare(currentPassword, user.password);

        if (!comparePassword) {
            const error = new Error("Wrong password - backend");
            error.statusCode = 401;
            throw error;
        }

        // if the input password is same as the stored password, hash the new password and update the new password
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        res.status(200).json({
            message: "Password updated successfully! - backend",
        })

    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message || "Internal server error! - backend"
        })
    }
}

export const deleteUsers = async (req, res) => {
    const { id } = req.params;
    if (!id || mongoose.Types.ObjectId.isValid) return res.status(400).json({
        message: "Id is required! - backend"
    })
    try {
        const user = await Users.findByIdAndDelete(id);
        if (!user) return res.status(404).json({
            message: "Users not found! - backend"
        })
        res.status(200).json({
            message: `User, ${user.username} deleted successfully! - backend`
        })
    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message || `Internal server error - backend`
        })
    }
}
