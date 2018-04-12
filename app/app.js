// This file bootstraps the entire application.

import React from 'react';
import ReactDOM from 'react-dom';
import ChatApp from '../routes/chat/components/ChatApp';
import SchemaApp from '../routes/schema/components/SchemaApp';
import * as ChatDataServer from './ChatDataServer';
import { Switch, Route, NavLink, BrowserRouter, HashRouter } from 'react-router-dom'

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
    <h1>Welcome to the Chat!</h1>
  </div>
)

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/chat' component={ChatApp}/>
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
