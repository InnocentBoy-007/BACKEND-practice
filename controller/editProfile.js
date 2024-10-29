import model from '../model/users.js'
import bcrypt from 'bcrypt'

const Users = model.signUpUser;

export const getUserprofile = async(req, res) => {
    const {id} = req.params;
    try {
        const response = await Users.findById(id).select("+password");
        if(!response) return res.status(404).json({
            message:"User not found!"
        })
        res.status(200).json({
            message:`Hello ${response.username} from - backend`,
            username:response.username,
            email:response.email,
            password:response.password
        })
    } catch (error) {
        res.status(500).json({
            message:"Internal server error!"
        })
    }
}

export const patchUsers = async(req, res) => {
    const {username, email, password} = req.body;
    const {id} = req.params;

    if(!id) return res.status(401).json({
        error:"Invalid id - backend"
    })

    try {
        const findUser = await Users.findById(id)
        if(!findUser) return res.status(404).json({
            message:"User not found! - backend"
        })
        const hashPassword = await bcrypt.hash(password, 10)

        // should return an updated document
        const updateUsers = await Users.findByIdAndUpdate(id, {
            username, email,
            password:hashPassword
        }, {new:true}) // it returns an updated document
        res.status(200).json({
            message:"Profile update successfully! - backend",
            updateUsers
        })
    } catch (error) {
        res.status(500).json({
            error:`Internal server error:${error} - backend`
        })
    }
}


export const deleteUsers = async(req, res) => {
    const {id} = req.params;
    if(!id) return res.status(400).json({
        message:"Id is required! - backend"
    })
    try {
        const response = await Users.findByIdAndDelete(id);
        if(!response) return res.status(404).json({
            message:"Users not found! - backend"
        })
        res.status(200).json({
            message:`User, ${response.username} deleted successfully! - backend`
        })
    } catch (error) {
        res.status(500).json({
            message:`Internal server error - backend: ${error}`
        })
    }
}
