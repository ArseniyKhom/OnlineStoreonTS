import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../helpers/util';

interface Product {
  title: string;
  description: string;
  id: number;
  price: number;
  image: string;
}

interface ProductDetailsProps {
  id: string;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ id }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [product, setProduct] = useState<Product>({
    title: '',
    description: '',
    id: 0,
    price: 0,
    image: '',
  });

  useEffect(() => {
    console.log('ProductId', id);
    fetchData(Number(id));
  }, [id]);

  const fetchData = (id: number) => {
    setLoading(true);
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((resp) => resp.json())
      .then((data: Product) => {
        console.log(data);
        setProduct(data);
        setLoading(false);
      });
  };

  const { title, description, price, image } = product;

  return (
    <div className="container">
      <div className="back-to-products">
        <Link to="/products">Вернуться к товарам</Link>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <h1>{title}</h1>
          <div className="row">
            <div className="col-md-4">
              <div className="details-image" key={id}>
                <img src={image} alt={title} width="100%" height="100%" />
              </div>
            </div>
            <div className="col-md-4">
              <div className="details-info">
                <b>Описание:</b>
                <div>{description}</div>
              </div>
              <br />
              <div className="details-info">
                <b>Цена:</b>
                <div>
                  <b>{formatCurrency(price)}</b>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetails;
