export const SKY_IMAGE = "https://images.pexels.com/photos/672451/pexels-photo-672451.jpeg?auto=compress&cs=tinysrgb&w=600"

export const initialState = {emailId:'',password:'',userName:'',error:''};
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