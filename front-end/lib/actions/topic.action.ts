import axios from "axios"

export const getAllTopics = async () =>{
    try {
        const {data} = await axios.get('http://localhost:5228/topic/all', {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        return data;
    } catch (error) {
        console.log(error);
        
    }
}