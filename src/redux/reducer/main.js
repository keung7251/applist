import * as actionTypes from '../action/actionTypes';

export const initialState = {
    searchKeyword: '',
    loadingIndicator: false,
};

function reducer (state = initialState, action) {
    switch (action.type) {

        case actionTypes.UPDATE_SEARCH_KEYWORD:
            return {
                ...state,
                ...{ searchKeyword: action.value }
            };
        case actionTypes.SHOW_LOADING_INDICATOR:
            return {
                ...state,
                ...{ loadingIndicator: action.value }
            };

        default:
            return state;
    }
}

export default reducer;
