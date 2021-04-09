import React from 'react';
import ReactDOM from 'react-dom';import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import UserProvider from './Context/UserContext';
//REDUX
import { Provider } from 'react-redux';
import store from './Redux/store';
//FIXE ME : Remove QueryClient
import { QueryClient, QueryClientProvider } from 'react-query';
const client = new QueryClient();


ReactDOM.render(
  <UserProvider>
  <React.StrictMode>
    <BrowserRouter>
    <QueryClientProvider client={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
  </UserProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
