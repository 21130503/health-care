import axios from "axios"
import { Message } from "postcss";

export const getMessages = async (topicId: number)=>{
    try {
        const {data} = await axios.get(`http://localhost:5228/message/${topicId}`,{
            headers: {
                'Content-Type': 'application/json',
            }
        })
        return data;
    } catch (error) {
        console.log("Error getting messages: ", error);
        
    }
}
export const addMessage = async (message: Message)=>{
    try {
        const {data} = await axios.post("http://localhost:5228/message/addMessage", message,
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        )
        return data
    } catch (error) {
        console.log("Error: ", error);
        
    }
}