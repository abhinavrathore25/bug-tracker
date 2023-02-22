export const themeReducer = (state= "light", action) => {
    switch(action.type){
        case "THEME":
            return state = action.payload;
        default:
            return state;
    }
}