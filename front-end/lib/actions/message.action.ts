import axios from "axios"

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