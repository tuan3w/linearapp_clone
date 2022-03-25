import 'animate.css/animate.min.css';
import Board from 'pages/Board';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { cssTransition, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';

const slideUp = cssTransition({
  enter: 'animate__animated animate__slideInUp',
  exit: 'animate__animated animate__slideOutDown',
});

function App() {
  var router = (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/board" exact component={Board} />
    </Switch>
  );
  return (
    <>
      {router}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        transition={slideUp}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
