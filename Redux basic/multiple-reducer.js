const redux = require("redux");

// multiple reducer
const BUY_CAKE = 'BUY_CAKE';
const BUY_ICECREAM = 'BUY_ICECREAM';

function buyCake() {
    return { type: BUY_CAKE };
}
function buyIceCream() {
    return { type: BUY_ICECREAM }
}

const initialCakesState = {
    numOfCakes: 10
}
const initialIceCreamsState = {
    numOfIceCreams: 20
}

const cakeReducer = (state = initialCakesState, action) => {
    switch(action.type) {
        case BUY_CAKE: return { ...state, numOfCakes: state.numOfCakes - 1 };
        default: return state;
    }
}

const iceCreamReducer = (state = initialIceCreamsState, action) => {
    switch(action.type) {
        case BUY_ICECREAM: return { ...state, numOfIceCreams: state.numOfIceCreams - 1 };
        default: return state;
    }
}

const rootReducer = redux.combineReducers({ cake: cakeReducer, iceCream: iceCreamReducer });
const store = redux.createStore(rootReducer);
const unsubsribe = store.subscribe(() => console.log(store.getState()));
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());
console.log(store.getState().cake.numOfCakes);