// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; // Make sure to import Switch

import AllProductsPage from './components/AllProductsPage';
import ProductDetailsPage from './components/ProductDetailsPage';

function App() {
  return (
    <Router>
      <Switch> {/* Ensure Switch is imported and used */}
        <Route path="/" exact component={AllProductsPage} />
        <Route path="/product/:productId" component={ProductDetailsPage} />
      </Switch>
    </Router>
  );
}

export default App;
