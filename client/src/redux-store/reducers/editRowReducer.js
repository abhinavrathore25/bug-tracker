export const editRowReducer = (state = false, action) => {
    switch(action.type){
        case "EDIT ROW":
            return state = action.payload;
        
        default:
            return state;
    }
}