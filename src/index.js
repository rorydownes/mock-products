import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

// Add polyfills
import 'whatwg-fetch';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
