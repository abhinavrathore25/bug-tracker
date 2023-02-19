export const bugsPerPageReducer = (state = 5, action) => {
    switch(action.type) {
        case "NUMBER OF BUGS":
            return state = action.payload;
        default:
            return state;
    }
}