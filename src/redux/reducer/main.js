import * as actionTypes from '../action/actionTypes';

export const initialState = {
    searchKeyword: '',
};

function reducer (state = initialState, action) {
    switch (action.type) {

        case actionTypes.UPDATE_SEARCH_KEYWORD:
        return {
            ...state,
            ...{ searchKeyword: action.value }
        };


        default:
        return state;
    }
}

export default reducer;
