import axios from "axios";

const API_URL="http://localhost:5000/api/notes";



//add a note
export const addNote=async(note)=>{
    const response=await axios.post(API_URL,note,{
        headers:{"Content-Type": "multipart/form-data"},
    });
    return response.data;
};

//delete a note
export const deleteNote=async(id)=>{
    const response=await axios.delete(`${API_URL}/${id}`);
    return response.data;
};

// Update a note
export const updateNote = async (note) => {
    const response = await axios.put(`${API_URL}/${note._id}`, note, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  };
  
//fetch notes
export const fetchNotes = async (searchQuery = "") => {
    const response = await axios.get("http://localhost:5000/api/notes", {
      params: { searchQuery }, 
    });
    return response.data;
  };
