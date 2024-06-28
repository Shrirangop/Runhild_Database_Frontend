import React from "react";
import { useState } from "react";
import axios from "axios";
import ImageUploadForm from "./Components/ImageUploadForm";

function App() {

  const [File,setFile] = useState({});

  const handleFile = (e) => {
    setFile(e.target.files[0]);
    
  }

 
    const handleUpload = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("image", File);
      console.log(formData);

      try {
         await axios.post("http://localhost:8000/upload",formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }).then((res)=>{
          console.log(res.data);
        });
        
        // Handle the response data here
      } catch (error) {
        console.error(error);
        // Handle the error here
      }
    }




  

  return (
    <>
      <ImageUploadForm />
    </>
  )
}

export default App
