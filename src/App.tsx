import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import ProductsContainer from './ProductsContainer';
import GetId from './components/ProductDetail';

const App: React.FC = () => {
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
};

export default App;