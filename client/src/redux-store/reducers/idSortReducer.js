export const idSortReducer = (state= "default", action) => {
    switch(action.type) {
        case "ID SORT":
            return state = action.payload;
        
        default:
            return state;
    }
}