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
export const getUser = async (userId: string) =>{
    try {
        const user = await users.get(userId)
        return parseStringify(user)
    } catch (error:any) {
        console.log(error)
    }
}
export const registerPatient = async ({identificationDocument, ...patient}: RegisterUserParams) => {
    console.log("starting registration patient");
    
    try {
        let file;
        if(identificationDocument) {
            const inputFile = InputFile.fromBuffer(
                identificationDocument?.get('blobFile') as Blob,
                identificationDocument?.get('fileName') as string ,
            )
            file = await storage.createFile(env.NEXT_PUBLIC_BUCKET_ID!, ID.unique(), inputFile)
        }
        console.log({
            identificationDocumentId: file?.$id || null,
                identificationDocumentUrl: `${env.NEXT_PUBLIC_ENDPOINT}/storage/buckets/${env.NEXT_PUBLIC_BUCKET_ID}/files/
                ${file?.$id}/view??project=${env.PROJECT_ID}`
        });
        
        const newPatient = await  databases.createDocument(
            env.DATABASE_ID!,
            env.PATIENT_COLLECTION_ID!,
            ID.unique(),
            {
                identificationDocumentId: file?.$id || null,
                identificationDocumentUrl: `${env.NEXT_PUBLIC_ENDPOINT}/storage/buckets/${env.NEXT_PUBLIC_BUCKET_ID}/files/
                ${file?.$id}/view??project=${env.PROJECT_ID}`,
                ...patient,
            }
        )
        return parseStringify(newPatient)
    }catch (error) {
        console.log(error)
    }
}
export const getPatient = async (userId: string)=>{
    try {
        const patients = await databases.listDocuments(
            env.DATABASE_ID!,
            env.PATIENT_COLLECTION_ID!,
            [Query.equal("userId", [userId])]
        )
        return parseStringify(patients.documents[0])
    } catch (error) {
        console.log("error: ", error);
        
    }
}