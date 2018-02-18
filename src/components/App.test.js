import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// I admit, i have no idea how to correctly test React applications, I'm a Node guy.
// I hope to learn it with Kiwi.

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
