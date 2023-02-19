export const pageReducer = (state = 1, action) => {

    switch (action.type) {
        case "PAGE":
            return state = action.payload;
        default:
            return state;
    }
}