import axios from "axios"

export const getDepartments = async()=>{
    try {
        const {data} = await axios.get('http://localhost:5228/department',{
            headers: {
                'Content-Type': 'application/json',
            }
        })
        return data;
    } catch (error) {
        
    }
}