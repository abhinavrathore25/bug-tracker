export const bugListReducer = (state = [], action) => {
    switch (action.type) {
        case "BUG LIST":
            return state = action.payload;
        default:
            return state;
    }
}