import React from 'react';
import { formatCurrency } from '../helpers/util';
import plusIcon from '../helpers/plus.png';
import minusIcon from '../helpers/minus.png';
import './Product.css';

function declOfNum(number: number, words: string[]): string {
  return words[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? Math.abs(number) % 10 : 5]];
}

interface CartItem {
  title: string;
  count: number;
  price: number;
}

interface Props {
  cartItems: CartItem[];
  handleRemoveFromCart: (e: React.MouseEvent<HTMLButtonElement>, item: CartItem) => void;
  handleIncrement: (item: CartItem) => void;
  handleDecrement: (item: CartItem) => void;
}

const Basket: React.FC<Props> = ({ cartItems, handleRemoveFromCart, handleIncrement, handleDecrement }) => {
  const cartItemCount = cartItems.length;

  return (
    <div className="alert alert-info">
      {cartItemCount === 0 ? (
        "Корзина пуста"
      ) : (
        <div>
          {" "}
          У вас есть {cartItemCount} {declOfNum(cartItemCount, ["товар", "товара", "товаров"])} в вашей корзине{" "}
        </div>
      )}
      {cartItemCount > 0 && (
        <div>
          <ul>
            {cartItems.map((item) => (
              <li key={item.title}>
                <b>{item.title} </b>
                <br />
                {formatCurrency(item.price * item.count)} {}
                <br />
                <button className='btn-basket' onClick={() => handleIncrement(item)}><img src={plusIcon} alt="+" /></button>
                {item.count}
                <button className='btn-basket btn-minus' onClick={() => handleDecrement(item)}><img src={minusIcon} alt="-" /></button>
                <button
                  className="btn btn-danger btn-basket"
                  onClick={(e) => handleRemoveFromCart(e, item)}
                >
                  X
                </button>
              </li>
            ))}
          </ul>
          Итого: {formatCurrency(
            cartItems.reduce((a, c) => a + c.price * c.count, 0)
          )}{" "}
        </div>
      )}
    </div>
  );
};

export default Basket;
