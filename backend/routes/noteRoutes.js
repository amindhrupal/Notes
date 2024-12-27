const express= require("express");
const multer= require("multer");

const{
    getNotes,
    createNote,
    updateNote,
    deleteNote,
} = require("../controllers/noteController");

const router= express.Router();

const storage=multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, "uploads/")
    },
    
    filename: (req,file,cb)=>{
        cb(null, `${Date.now()}-${file.originalname}`);
        
    },
});
//multer init
const upload=multer({storage});

//routes for CRUD

router.get("/",getNotes);
router.post("/",upload.single("image"),createNote);
router.put("/:id", upload.single("image"), updateNote);
router.delete("/:id",deleteNote);

module.exports=router;