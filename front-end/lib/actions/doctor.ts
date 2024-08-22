'use client'
import axios from 'axios';
import Cookies from 'js-cookie';
export const getDoctor = async (doctor: CreateDoctorParams) => {
    try {
        const response = await axios.post('http://localhost:5228/api/doctor',
            doctor,
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );
        Cookies.set('doctor', JSON.stringify(response.data), { expires: 7 }); 
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
};
export const updateDoctor = async (editDoctor: FormData)=>{
    try {
        const response = await axios.post('http://localhost:5228/api/editdoctor',
            editDoctor,
            
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
