    import mongoose from "mongoose";

    const signUpModel = new mongoose.Schema({
        username:{
            type:String,
            required:true
        },
        email:{
            type:String,
            unique:true,
            required:true
        },
        password:{
            type:String,
            select:false,
            required:true
        }
    })

    const signUpUser = mongoose.model("users", signUpModel);
    export default {signUpUser};
