import React from 'react';
import ReactDOM from 'react-dom'; 
import store from './store/store'
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import '../src/assets/css/mdb.min.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from "react-redux";

ReactDOM.render(
  <Provider store={ store }>
       <App />
    </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
