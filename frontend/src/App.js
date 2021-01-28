import React from 'react';
import { Switch, Route } from 'react-router-dom';

import TopNavbar from './navbar/TopNavbar.js';
import Home from './home/Home.js';
import Blog from './blog/Blog.js';
import Chat from './chat/Chat.js';

function App() {
  return (
    <>
      <TopNavbar />
      <Switch>
        <Route exact path="/home">
	  <Home />
	</Route>

        <Route exact path="/blog">
	  <Blog />
	</Route>

        <Route exact path="/chat">
	  <Chat />
	</Route>
      </Switch>
    </>
  );
}

export default App;
