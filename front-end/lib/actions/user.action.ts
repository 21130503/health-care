
import Cookies from 'js-cookie';


export const getUser = ()=>{
    const userCookie = Cookies.get('user');
    console.log("Cookie: " + userCookie);
    

    if (!userCookie) {
        // Trường hợp cookie không tồn tại
        console.log("ccc");
        
        return null;
    }

    try {
        // Giải mã chuỗi JSON trước khi phân tích cú pháp
        const decodedCookie = decodeURIComponent(userCookie);
        return JSON.parse(decodedCookie);
    } catch (error) {
        console.error("Failed to parse user JSON:", error);
        // Trường hợp JSON không hợp lệ, trả về null hoặc xử lý lỗi
        return null;
    }
}