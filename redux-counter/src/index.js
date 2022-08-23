import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore } from 'redux';

const counterReducer = (state=0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case "DECREMENT":
      return state - 1
    case "ZERO":
      return 0
    default:
      return state
  }
}

const store = createStore(counterReducer)

const App = () => (
  <div>
    <div>
      {store.getState()}
      <button onClick={evt => store.dispatch({type: 'INCREMENT'})}>
        plus
      </button>
      <button onClick={evt => store.dispatch({type: 'DECREMENT'})}>
        minus
      </button>
      <button onClick={evt => store.dispatch({type: 'ZERO'})}>
        zero
      </button>
    </div>
  </div>
)

const renderApp = () => {
  ReactDOM.createRoot(document.getElementById('root')).render(<App />)
}

renderApp()
store.subscribe(renderApp)
