import React from 'react';
import './App.css';
import Nav from './Components/Nav'
import routes from './routes'
import { withRouter } from 'react-router-dom'
import MessageStore from './Components/MessageStore'

function App(props) {
  return (
    <div className='App'>
      <MessageStore>
        {props.location.pathname === '/' || props.location.pathname === '/register' ? (
          <>
            {routes}
          </>
        ) : (
            <>
              <Nav />
              {routes}
            </>
          )}
      </MessageStore>
    </div>
  );
}

export default withRouter(App);
