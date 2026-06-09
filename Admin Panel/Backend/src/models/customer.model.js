
import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const customerSchema = new Schema(
    {
        name: { 
            type: String, 
            required: true, 
            trim: true 
        },
        email: { 
            type: String, 
            required: true, 
            unique: true, 
            trim: true,
            lowercase: true
        },
        username: { 
            type: String, 
            required: true, 
            unique: true, 
            trim: true, 
            lowercase: true,
            index: true
        },
        password: { 
            type: String, 
            required: [true, 'Password is required'] 
        },
        phone: {
            type: String,
            trim: true
        },
        refreshToken: {
            type: String
        }
    }, 
    { timestamps: true }
);

// Middleware function to hash the password before saving
customerSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

customerSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

export const Customer = mongoose.model("Customer", customerSchema);