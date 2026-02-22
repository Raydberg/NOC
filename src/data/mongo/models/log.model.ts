import mongoose from "mongoose";


const logShema = new mongoose.Schema({
    message: {
        type: String,
        require: true,
    },
    origin: {
        type: String,
    },
    level: {
        type: String,
        enum: ['low', 'medium', 'high']
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})


export const LogModel = mongoose.model("Log", logShema)