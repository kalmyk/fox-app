// This file bootstraps the entire application.

import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, NavLink, BrowserRouter, HashRouter } from 'react-router-dom';

import * as dataServer from './dataServer';
import ChatApp from '../routes/chat/components/ChatApp';
import * as ChatActions from '../routes/chat/actions';
import TicketApp from '../routes/ticket/components/TicketApp';
import SchemaApp from '../routes/schema/components/SchemaApp';

const dark = 'hsl(200, 20%, 20%)'
const light = '#fff'
const styles = {}

styles.wrapper = {
  padding: '10px 20px',
  overflow: 'hidden',
  background: dark,
  color: light
}

styles.link = {
  padding: 11,
  color: light,
  fontWeight: 200
}

styles.activeLink = {
  ...styles.link,
  background: light,
  color: dark
}

const Header = () => (
  <header>
    <nav>
      <div style={styles.wrapper}>
        <div style={{ float: 'left' }}>
          <NavLink style={styles.link} activeStyle={styles.activeLink} to='/'>Home</NavLink>{' '}
          <NavLink style={styles.link} activeStyle={styles.activeLink} to='/chat'>Chat</NavLink>
          <NavLink style={styles.link} activeStyle={styles.activeLink} to='/ticket'>Ticket</NavLink>
          <NavLink style={styles.link} activeStyle={styles.activeLink} to='/schema'>Schema</NavLink>
        </div>
        <div style={{ float: 'right' }}>
        </div>
      </div>
    </nav>
  </header>
);

const Home = () => (
  <div>
    <h1>Welcome to the Cooperation Platform!</h1>
  </div>
)

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/chat' component={ChatApp}/>
      <Route path='/ticket' component={TicketApp}/>
      <Route path='/schema' component={SchemaApp}/>
    </Switch>
  </main>
)

const App = () => (
  <div>
    <Header />
    <Main />
  </div>
);

ReactDOM.render(

  <HashRouter>
    <App />
  </HashRouter>,

  document.getElementById('react')
);

dataServer.openConnection().then(
  (result) => { ChatActions.loadRawMessages(); }
);
