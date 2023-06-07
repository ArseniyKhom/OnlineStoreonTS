import React from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../helpers/util';

interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
}

interface ProductsProps {
  products: Product[];
  handleAddToCart: (e: React.MouseEvent<HTMLButtonElement>, product: Product) => void;
}

const Products: React.FC<ProductsProps> = ({ products, handleAddToCart }) => {
  console.log('products:', products);

  const productItems = products.map((product) => (
    <div className="col-xs-6 col-md-3" key={product.id}>
      <div className="thumbnail text-center">
        <Link to={`/product/${product.id}`}>
          <div style={{ width: '150px', height: '200px', overflow: 'hidden' }}>
            <img src={product.image} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div className="caption">{product.title}</div>
        </Link>
        <div className="for-button" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div>
            <b>{formatCurrency(product.price)}</b>
          </div>
          <button
            className="btn btn-primary"
            onClick={(e) => handleAddToCart(e, product)}
            style={{ marginTop: '10px' }}
          >
            В корзину
          </button>
        </div>
      </div>
    </div>
  ));

  return <div className="row">{productItems}</div>;
};

export default Products;