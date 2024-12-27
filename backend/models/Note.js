const mongoose=require("mongoose");

const noteSchema=new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    content:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required:false,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
});

const Note=mongoose.model("Note", noteSchema);
module.exports=Note;