import React from "react";
import { useState } from "react";
import axios from "axios";
import ImageUploadForm from "./Components/ImageUploadForm";
import {Routes,Route} from "react-router-dom";
import Images from "./Components/Images/Images"

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
    <Routes>
      <Route path="/" element={<Images/>} />
      <Route path="/upload" element={<ImageUploadForm />}/>
    </Routes>
      {/* <ImageUploadForm /> */}
    </>
  )
}

export default App
