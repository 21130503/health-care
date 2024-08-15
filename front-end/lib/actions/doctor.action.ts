import axios from "axios";

export const getAllDoctor = async () => {
    try {
        const response = await axios.get('http://localhost:5228/api/doctor/all',
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );
        return response.data;
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
export const  getDoctorById = async (id : number)=> {
    try {
        const response = await axios.get(`http://localhost:5228/api/doctor/${id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error message:', error.message);
            if (error.response) {
                // Có phản hồi từ server
                console.error('Error response data:', error.response.data);
            }
        } else {
            // L��i không phải từ axios
            console.error('Unexpected error:', error);
        }
    }
    
}