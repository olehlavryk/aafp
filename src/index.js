import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from 'src/components/App/App';
import { store } from "src/store/store";

ReactDOM.render(

  <React.StrictMode>
    <Provider {...{ store }}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);