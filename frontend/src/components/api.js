import axiosInstance from "@/utils/axiosInstance"

export const getAllCourses =async()=>{
try{
    const res=await axiosInstance.get('/courses');
    return res.data;
}
catch(error){
console.log(error);
throw error;
}
}

export const createenroll=async(courseId)=>{
try {
    const res=await axiosInstance.post("/enrollment/create",{
        courseId,
    })
    return res.data;
} catch (error) {
    console.log(error);
    throw error;
}
}

export const mycourses=async()=>{
    try {
        const res=await axiosInstance.get("/enrollment/me");
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}