'user client'
import axios from  'axios';
export const getDoctor = async(doctor : CreateDoctorParams )=>{
    try {
        // const doctor = await axios.get(env.END_POINT,)
        console.log(doctor);
        
    } catch (error) {
        console.log(error)
    }
}