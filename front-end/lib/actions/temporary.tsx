import axios from "axios";

export const getTemporaryDoctor = async(id: string)=>{
    try {
        const {data} = await axios.get(`http://localhost:5228/api/editdoctor/${id}`,{
            headers: {
                'Content-Type': 'application/json',
            }
        })
        return data;
    } catch (error) {
        console.log(error);
        
    }
}
export const handleTemporary =async(status: {id: number, type: string, email: string}) =>{
    try {
        console.log("data: ", status);
        
        const {data} = await axios.post('http://localhost:5228/api/editdoctor/changeTemporary',
            status,
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );
        console.log("response: " + JSON.stringify(data));
        
        return data;
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