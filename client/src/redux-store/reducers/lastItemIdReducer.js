export const lastItemIdReducer = (state = 0, action) => {
    switch(action.type){
        case "LAST ITEM ID":
            return state = action.payload;
        default:
            return state;
    }
}