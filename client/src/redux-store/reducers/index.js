import { combineReducers } from 'redux';
import { pageReducer } from './pageReducer';
import { lastItemIdReducer } from './lastItemIdReducer';
import { bugListReducer } from './bugListReducer';
import { bugsPerPageReducer } from './bugsPerPageReducer';
import { editRowReducer } from './editRowReducer';
import { formDataReducer } from './formDataReducer';
import { idSortReducer } from './idSortReducer';
import { moduleSortReducer } from './moduleSortReducer';
import { showSearchReducer } from './showSearchReducer';
import { themeReducer } from './themeReducer';

const reducers = combineReducers({
    currentPage: pageReducer,
    lastItemId: lastItemIdReducer,
    bugList: bugListReducer,
    bugsPerPage: bugsPerPageReducer,
    editContent: editRowReducer,
    newData: formDataReducer,
    moduleCurrentSort: moduleSortReducer,
    idCurrentSort: idSortReducer,
    showSearch: showSearchReducer,
    theme: themeReducer
});

export default reducers;