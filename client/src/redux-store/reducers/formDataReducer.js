const initialState = {
    id: -1,
    description: "",
    module: "",
    technology: "",
    platform: "",
    severity: ""
};

export const formDataReducer = (state = initialState, action) => {
    switch(action.type){
        case "NEW FORM DATA":
            return state = { ...state , ...action.payload };
        
        default:
            return state;
    }
}