import mongoose, { Schema } from "mongoose";

export const userSchema = new Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    birthdate: {
        type: Date,
        required: true
    },
    registeredAt: {
        type: Date,
        required: true
    }
});

export const UserModel = mongoose.model('User', userSchema);

