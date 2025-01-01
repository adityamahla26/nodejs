import { timeStamp } from "console";
import {Schema, model} from mongoose;
import { type } from "os";

const userSchema = new Schema({
    name:{type:String, required: true},
    email:{type:String, required: true, uniqure: true},
    password:{type:String, required: true}
},{timeStamps: true});

const User = model("User",userSchema);

export default User;