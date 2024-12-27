const express=require("express");
const dotenv=require("dotenv");
const cors=require("cors");
const connectDB=require("./db/connection");
const noteRoute=require("./routes/noteRoutes");

dotenv.config();

const app=express();
const PORT=process.env.PORT || 5000;

//database
connectDB();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/uploads",express.static("uploads")); //images

//routes
app.use("/api/notes",noteRoute);

app.get("/", (req, res)=>{
    res.send("Notes API is running");
})

app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
});