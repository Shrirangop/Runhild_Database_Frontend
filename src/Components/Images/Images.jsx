import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import "./Images.css";
import { useNavigate } from 'react-router-dom';

const Images = () => {
    const [images, setimages] = useState([]);
    const navigate = useNavigate();

    const getimages = async()=>{

        await axios.get(`https://file-upload-backend-p3em.vercel.app/getphotos`

        ).then(
            (response)=>{
                setimages(response.data);
                console.log(response.data);
            }
        ).catch(
            (error)=>{
                console.log(error);
            }
        )
    }

    useEffect( ()=>{

        getimages();
        
        },[])

    const handleclick = ()=>{
        navigate("/upload");
    }

        // https://file-upload-backend-iota.vercel.app/Photos/${id}

    const handledelete = (uid)=>{
        axios.delete(`https://file-upload-backend-p3em.vercel.app/Photos`,{
            params:{
                id:uid
            }
        }).then(
            (response)=>{
                console.log(response.data);
                getimages();
            }
        ).catch(
            (error)=>{
                console.log(error);
            }
        )
    }

    return (
        <>
        <div className = "con"><button onClick={handleclick} className="button-9">Upload</button></div>
        <div className="gallery">
            {images.map((image,index) => (
                <div className="img">
                          <img key={index} src={image.photo}  className="gallery__image" />
                            <div className="gallery__det">
                                <h3>{image.title}</h3>
                                <p>{image.description}</p>
                                <p>{image.type}</p>
                               
                        </div>
                    <button className = "deletepic" onClick={()=>handledelete(image._id)}>Delete</button>
                </div>
          
            ))}
 

        </div>
        </>
    );
};

export default Images;