"use server";
import { ID, Query } from "node-appwrite"
import { databases, env, storage, users } from "../appwrite.config"
import { parseStringify } from "../utils"
import {InputFile} from 'node-appwrite/file'
import axios from "axios";
export const createUser = async (user: CreateUserParams) => {
    try {
        const {data} = await axios.post('http://localhost:5228/auth/register',
            user,{
                headers: {
                    'Content-Type': 'application/json',
                }
            }
            
        );
        return data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error message:', error.message);
            if (error.response) {
                // Có phản hồi từ server
                console.error('Error response data:', error.response.data);
            }
        } else {
            // Lỗi không phải từ axios
            console.error('Unexpected error:', error);
        }
    }
}
export const getUser = async (userLogin: LoginUserParams) =>{
    try {
        const {data} = await axios.post('http://localhost:5228/auth/login',
            userLogin,{
                headers: {
                    'Content-Type': 'application/json',
                }
            }
            
        );
        return data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error message:', error.message);
            if (error.response) {
                // Có phản hồi từ server
                console.error('Error response data:', error.response.data);
            }
        } else {
            // Lỗi không phải từ axios
            console.error('Unexpected error:', error);
        }
    }
}
export const registerPatient = async (formData: FormData) => {
    try {
        const response = await axios.post('http://localhost:5228/patient/add',
            formData,
        ); 
        console.log("Response: " + response.data);
        
        return response.data;
    } catch (error) {
        // Xử lý lỗi
        if (axios.isAxiosError(error)) {
            console.error('Error message:', error.message);
            if (error.response) {
                // Có phản hồi từ server
                console.error('Error response data:', error.response.data);
            }
        } else {
            // Lỗi không phải từ axios
            console.error('Unexpected error:', error);
        }
    }
}
export const getPatient = async (userId: string)=>{
    try {
        const {data} = await  axios.get(`http://localhost:5228/patient/${userId}`,{
            headers: {
                'Content-Type': 'application/json',
            }
        })
        return data
    } catch (error) {
        console.log("error: ", error);
        
    }
}
export const getPatientById = async (id: string)=>{
    try {
        const {data} = await  axios.get(`http://localhost:5228/patient/search/${id}`,{
            headers: {
                'Content-Type': 'application/json',
            }
        })
        return data
    } catch (error) {
        console.log("error: ", error);
        
    }
}