import mongoose from "mongoose";

const paperSchema = mongoose.Schema(
    {
        email:{
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        publishYear: {
            type: Number,
            required: true,
        },
        journal: {
            type: String,
            required: true,
        },
        paperImage: {
            type: String,
            required: true,
        },

    },
    {
        timestamps: true,
    }
)

const userSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        }
    }
)

export const Paper = mongoose.model('Paper', paperSchema);
export const User = mongoose.model('User', userSchema);
