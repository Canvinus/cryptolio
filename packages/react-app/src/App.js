import { BrowserRouter as Router } from 'react-router-dom';
import { Main } from './Main';

import axios from 'axios';

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
if (isDev) {
  axios.defaults.baseURL = 'http://localhost:4000';
} else {
  axios.defaults.baseURL = 'https://agruz.dev/cryptolio/api';
}

const App = () => {
  return (
    <>
      {isDev ?
        <Main />
        :
        <Router basename="/cryptolio/">
          <Main />
        </Router>
      }
    </>
  );
}

export default App;
