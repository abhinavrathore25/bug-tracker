export const moduleSortReducer = (state= "default", action) => {
    switch(action.type) {
        case "MODULE SORT":
            return state = action.payload;
        
        default:
            return state;
    }
}