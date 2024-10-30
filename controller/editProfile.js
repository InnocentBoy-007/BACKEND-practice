import model from '../model/users.js'
import bcrypt from 'bcrypt'

const Users = model.signUpUser;

export const getUserprofile = async (req, res) => {
    const { id } = req.params;
    if(!id) return res.status(400).json({
        message:"Invalid ID - backend"
    })
    try {
        const response = await Users.findById(id);
        if (!response) return res.status(404).json({
            message:"User not found! - backend"
        })

        res.status(200).json({
            message: `Hello ${response.username} from - backend`,
            username: response.username,
            email: response.email,
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

    if (!id) return res.status(400).json({
        message:"Invalid ID - backend",
    })

    try {
        const findUser = await Users.findById(id)

        if (!findUser) return res.status(404).json({
            message:"User not found! - backend"
        })

        // if the newUsername is provided, update the override the old username with the new
        if(newUsername) {
            findUser.username = newUsername;
        }

        // if the newEmail is provided, update the override the old email with the new
        if(newEmail) {
            findUser.email = newEmail;
        }


        const updatedUser = await findUser.save();

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
    const { confirmPassword, newPassword } = req.body;

    if (!id) return res.status(400).json({
        message:"Invalid ID - backend"
    })

    try {
        const findUserByID = await Users.findById(id).select("+password");
        console.log("User ---> ", findUserByID);

        if (!findUserByID) {
            const error = new Error("User not found! - backend");
            error.statusCode = 404;
            throw error;
        }

        // letting the user type a password in the input field and comparing it with the stored password, verification
        const comparePassword = await bcrypt.compare(confirmPassword, findUserByID.password);

        if (!comparePassword) {
            const error = new Error("Wrong password - backend");
            error.statusCode = 401;
            throw error;
        }

        // if the input password is same as the stored password, process the given instructions
        const hashNewPassword = await bcrypt.hash(newPassword, 10);
        findUserByID.password = hashNewPassword;
        await findUserByID.save();


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
    if (!id) return res.status(400).json({
        message: "Id is required! - backend"
    })
    try {
        const response = await Users.findByIdAndDelete(id);
        if (!response) return res.status(404).json({
            message: "Users not found! - backend"
        })
        res.status(200).json({
            message: `User, ${response.username} deleted successfully! - backend`
        })
    } catch (error) {
        res.status(500).json({
            message: `Internal server error - backend: ${error}`
        })
    }
}
