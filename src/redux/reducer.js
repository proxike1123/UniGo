import { combineReducers } from 'redux';

const INITIAL_STATE = {
    profile: {},
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "ADD_PROFILE": 
            return ({
                ...state,
                profile: action.payload
            })
        default:
            return state
    }
};

export default reducer;