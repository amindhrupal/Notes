const Note=require("../models/Note");

const getNotes = async (req, res) => {
    try {
        const { searchQuery } = req.query; 
        console.log("Received search query:", searchQuery);

        let notes;
        if (searchQuery) {
            
            const regex = new RegExp(searchQuery, 'i'); 
            notes = await Note.find({
                $or: [
                    { title: { $regex: regex } },
                    { content: { $regex: regex } }
                ]
            });
        } else {
        
            notes = await Note.find();
        }

        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch notes", error });
    }
};

const createNote=async(req,res)=>{
    const{title,content}=req.body;
    const image=req.file ? req.file.path:null;

    try {
        const note=new Note({
            title,
            content,
            image,
        });
        await note.save()
        res.status(201).json(note);
    } catch (error) {
        res.status(400).json({message:"failed to create note",error});
    }
};

const updateNote=async(req,res)=>{
    const {id} = req.params;
    const {title, content} = req.body;
    const image= req.file ? req.file.path: null;

    try {
        const updatedNote= await Note.findByIdAndUpdate(
            id,
            {title, content, image},
            {new: true}
        );
        res.status(200).json(updatedNote);
    } catch (error) {
        res.status(400).json({message:"Failed to update Note", error});
    }
};

const deleteNote= async(req,res)=>{
    const {id} =req.params;

    try {
        await Note.findByIdAndDelete(id);
        res.status(200).json({message: "Note deleted successfully"});
    } catch (error) {
        res.status(400).json({message: "Failed to delete note", error});
    }
};

module.exports={
    getNotes,
    createNote,
    updateNote,
    deleteNote,
};