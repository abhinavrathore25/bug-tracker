export const showSearchReducer = (state = false, action) => {
    switch (action.type) {
        case "TOGGLE SEARCH":
            return state = action.payload;

        default:
            return state;
    }
}