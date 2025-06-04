import bcrypt from "bcryptjs";
import mongoose, { model, Schema,models } from "mongoose";

export interface Iuser{
email:string
password:string
_id ?:mongoose.Types.ObjectId
createdAt : Date
updateddAt :Date
}
const userSchema = new Schema<Iuser>(
    {
        email:{type:String,required:true,unique:true},
        password :{type:String,required :true}

    },
    {timestamps:true}
)

userSchema.pre("save", async function (this, next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const User = models.User || model<Iuser>("User", userSchema);
export default User