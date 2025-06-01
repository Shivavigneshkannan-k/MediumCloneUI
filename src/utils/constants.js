import { Bounce } from "react-toastify";

export const SKY_IMAGE = "https://images.pexels.com/photos/672451/pexels-photo-672451.jpeg?auto=compress&cs=tinysrgb&w=600"

export const initialState = {emailId:'test@gmail.com',password:'Test@123',userName:''};
export const reducer = (state,action)=>{
    switch(action.type){
        case "UPDATE_FIELD":
            return {
                ...state,
                [action.field]: action.value
            };
        case "RESET":
            return initialState;
        default:
            return state;
    }
}
export const API = "http://localhost:5000";
export const TOAST_CONFIG = {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        
        transition: Bounce
    }
