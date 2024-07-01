// src/ImageUploadForm.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 500px;
  margin: 0 auto;
  padding: 40px 20px;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: #333333;
  font-size: 24px;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const FormField = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  margin-bottom: 8px;
  font-weight: bold;
  color: #555555;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #cccccc;
  border-radius: 8px;
  width: 100%;
  box-sizing: border-box;
  font-size: 16px;

  &:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

const TextArea = styled.textarea`
  padding: 12px;
  border: 1px solid #cccccc;
  border-radius: 8px;
  width: 100%;
  resize: none;
  font-size: 16px;

  &:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

const Select = styled.select`
  padding: 12px;
  border: 1px solid #cccccc;
  border-radius: 8px;
  width: 100%;
  font-size: 16px;

  &:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

const Button = styled.button`
  padding: 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  margin-top: 10px;

  &:hover {
    background-color: #0056b3;
  }

  &:active {
    background-color: #003d7a;
  }
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 14px;
`;

const ImageUploadForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = async data => {
    console.log(data);
    const formData = new FormData();
      formData.append("image", data.image[0]);
      formData.append("description", data.description);
      formData.append("username", data.username);
      formData.append("password", data.password);
      formData.append("type", data.type);
      formData.append("title", data.title);
      console.log(formData);

      try {
         await axios.post("https://file-upload-backend-iota.vercel.app/upload",formData,{
          headers: {
            "Content-Type": "multipart/form-data",
          },
         }).then((res)=>{
  
          if (res.status === 200) {
            console.log(res.data);
            // Clear form fields
            document.getElementById("image").value = "";
            document.getElementById("description").value = "";
            document.getElementById("username").value = "";
            document.getElementById("password").value = "";
            document.getElementById("type").value = "";
            document.getElementById("title").value = "";
          }

       
        });
        
        // Handle the response data here
      } catch (error) {

        if(error.response.status===403){
          alert("You are not authorized");
           // Clear form fields
           document.getElementById("image").value = "";
           document.getElementById("description").value = "";
           document.getElementById("username").value = "";
           document.getElementById("password").value = "";
           document.getElementById("type").value = "";
           document.getElementById("title").value = "";
        }
      }
  };

  return (
    <FormContainer>
      <Title>Upload Image</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormField>
          <Label htmlFor="image">Image</Label>
          <Input type="file" id="image" {...register('image', { required: true })} />
          {errors.image && <ErrorMessage>Image is required</ErrorMessage>}
        </FormField>
        <FormField>
          <Label htmlFor="title">Title</Label>
          <Input type="text" id="title" {...register('title', { required: true })} />
          {errors.title && <ErrorMessage>Title is required</ErrorMessage>}
        </FormField>
        <FormField>
          <Label htmlFor="description">Description</Label>
          <TextArea id="description" rows="4" {...register('description', { required: true })} />
          {errors.description && <ErrorMessage>Description is required</ErrorMessage>}
        </FormField>
        <FormField>
          <Label htmlFor="username">Username</Label>
          <Input type="text" id="username" {...register('username', { required: true })} />
          {errors.username && <ErrorMessage>Username is required</ErrorMessage>}
        </FormField>
        <FormField>
          <Label htmlFor="password">Password</Label>
          <Input type="password" id="password" {...register('password', { required: true })} />
          {errors.password && <ErrorMessage>Password is required</ErrorMessage>}
        </FormField>
        <FormField>
          <Label htmlFor="type">Type</Label>
          <Select id="type" {...register('type', { required: true })}>
            <option value="">Select Type</option>
            <option value="Publication">Publication</option>
            <option value="Logo">Logo</option>
            <option value="Gallery">Gallery</option>
            <option value="Random">Random</option>
          </Select>
          {errors.type && <ErrorMessage>Type is required</ErrorMessage>}
        </FormField>
        <Button type="submit">Submit</Button>
      </Form>
    </FormContainer>
  );
};

export default ImageUploadForm;
