import React from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';
import { Route } from "react-router";
import './App.css';
import ProductsContainer from './ProductsContainer';
import GetId from './components/ProductDetail';

class App extends React.Component<any, any> {
  render() {
    return (
      <div className="Container">
        <h1>Онлайн-магазин "Душевно в Душу"</h1>
        <hr />
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<ProductsContainer />} />
            <Route path='/products' element={<ProductsContainer />} />
            <Route path='/product/:id' element={<GetId />} />
          </Routes>

        </BrowserRouter>
      </div>
    );
  }

}

export default App;
