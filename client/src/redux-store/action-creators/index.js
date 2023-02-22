/* APP COMPONENT */
// Action's for pageNumber (state: currentPage)

export const setCurrentPage = (number) => {
    return {
        type: "PAGE",
        payload: number
    }
}

// Action for lastItemId (state: lastItemId)

export const setLastItemId = (id) => {
    return {
        type: "LAST ITEM ID",
        payload: id
    }
}

// Action for bugList (state: bugList)

export const setBugList = (bugList) => {
    return {
        type: "BUG LIST",
        payload: bugList
    }
}

// Action for bugsPerPage (state: bugsPerPage)

export const setBugsPerPage = (numberOfBugs) => {
    return {
        type: "NUMBER OF BUGS",
        payload: numberOfBugs
    }
}

/* TABLE COMPONENT */

// Action for toggle Edit Row (state: editContent)

export const setEditContent = (toggle) => {
    return {
        type: "EDIT ROW",
        payload: toggle
    }
}

// Action for newData (state: newData)

export const setNewData = (newData) => {
    return {
        type: "NEW FORM DATA",
        payload: newData
    }
}

// Action for Module Sort (state: moduleCurrentSort)

export const setModuleCurrentSort = (nextSort) => {
    return {
        type: "MODULE SORT",
        payload: nextSort
    }
}

// Action for Id Sort (state: idCurrentSort)

export const setIdCurrentSort = (nextSort) => {
    return {
        type: "ID SORT",
        payload: nextSort
    }
}

// Action for Show Search Box (state: showSearch)

export const setShowSearch = (toggle) => {
    return {
        type: "TOGGLE SEARCH",
        payload: toggle
    }
}

// Action for Theme

export const setTheme = (theme) => {
    return {
        type: "THEME",
        payload: theme
    }
}