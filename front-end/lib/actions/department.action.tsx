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
export const addDepartment = async (name: string)=>{
    try {
        const {data} = await axios.post('http://localhost:5228/department/add',
            {
                name: name,
            },{
            headers: {
                'Content-Type': 'application/json',
            }
        })
        console.log("data: ", data);
        
        return data;
    } catch (error) {
        console.log("Error", error);
        
    }
}