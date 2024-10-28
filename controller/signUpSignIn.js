import model from '../model/users.js'
import bcrypt from 'bcrypt'

const users = model.signUpUser;

export const signUp = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) return res.status(400).json({
        message: "All fields required! - backend"
    })

    try {
        const findByDuplicateEmail = await users.findOne({ email });
        if (findByDuplicateEmail) return res.status(400).json({
            message: "Email already exist! - backend"
        })

        const hashPassword = await bcrypt.hash(password, 10);

        const response = await users.create({
            username,
            email,
            password: hashPassword
        })
        res.status(201).json({
            message: "Sign up successfully! - backend",
            response
        })
    } catch (error) {
        console.log("Cannot sign up");

        res.status(400).json({
            error: "Internal server error! - backend"
        })
    }
}

export const signIn = async(req, res) => {
    const {username, password} = req.body;
    if(!username || !password) return res.status(400).json({
        message:"All fields required! - backend"
    })
    try {
        const findUser = await users.findOne({username}).select("+password");
        if(!findUser) return res.status(404).json({
            message:`${username} not found! - backend`
        })
        const comparePassword = await bcrypt.compare(password,findUser.password);
        if(!comparePassword) return res.status(401).json({
            message:"Wrong password - backend"
        })
        res.status(200).json({
            message:"Login successful! - backend",
            findUser
        })
    } catch (error) {
        res.status(500).json({
            message:`Internal server error: ${error} - backend`
        })
    }
}
