
import mongoose, { Schema } from "mongoose";

const newsletterSchema = new Schema(
    {
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true, 
            trim: true,
            lowercase: true,
            match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please fill a valid email address"]
        }
    },
    { timestamps: true }
);

export const Newsletter = mongoose.model("Newsletter", newsletterSchema);