const redux = require("redux");
const axios = require("axios");
const thunkMiddleware = require("redux-thunk").default;
const loggerMiddleware = require("redux-logger").default;

const initialState = {
    loading: false,
    users: [],
    error: ''
};

const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

const fetchUsersRequest = () => {
    return { type: FETCH_USERS_REQUEST }
}
const fetchUsersSuccess = (users) => {
    return { type: FETCH_USERS_SUCCESS, paylaod: users }
}
const fetchUsersFailure = (error) => {
    return { type: FETCH_USERS_FAILURE, paylaod: error }
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_USERS_REQUEST: return { ...state, loading: true };
        case FETCH_USERS_SUCCESS: return { 
            ...state, 
            loading: false, 
            users: action.paylaod,
            error: ''
        };
        case FETCH_USERS_FAILURE: return { 
            ...state, 
            loading: false, 
            users: [],
            error: action.paylaod
        };
    }
}

const fetchUsers = () => {
    return function (dispatch) {
        dispatch(fetchUsersRequest())
        axios.get('https://jsonplaceholder.typicode.com/users')
         .then(response => {
            const users = response.data.map(user => user.id);
            dispatch(fetchUsersSuccess(users))
         })
         .catch(error => {
            dispatch(fetchUsersFailure(error.message));
         })
    }
}

const store = redux.createStore(reducer, redux.applyMiddleware(thunkMiddleware));
store.subscribe(() => { console.log(store.getState()) });
store.dispatch(fetchUsers());
// store.dispatch(fetchUsersFailure({message: "hello"}));
