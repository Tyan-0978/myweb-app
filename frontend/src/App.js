import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { GlobalStyles } from './themes/GlobalStyles.js';
import { lightTheme, darkTheme } from './themes/Themes.js';

import TopNavbar from './navbar/TopNavbar.js';
import Home from './home/Home.js';
import Blog from './blog/Blog.js';
import Chat from './chat/Chat.js';

function App() {
  const [theme, setTheme] = useState("light");

  const switchTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeProvider theme={ theme === "light" ? lightTheme : darkTheme }>
      <GlobalStyles />
      <TopNavbar theme={ theme } switchTheme={ switchTheme } />
      <Switch>
        <Route exact path="/">
	  <Home theme={ theme } />
	</Route>

        <Route path="/blog">
	  <Blog />
	</Route>

        <Route path="/chat">
	  <Chat theme={ theme } />
	</Route>
      </Switch>
    </ThemeProvider>
  );
}

export default App;
