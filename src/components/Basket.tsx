import React, { Component } from 'react';
import { formatCurrency } from '../helpers/util';
import plusIcon from '../helpers/plus.png';
import minusIcon from '../helpers/minus.png';
import './Product.css';

function getCartItemWordForm(count: number): string {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastDigit === 1 && lastTwoDigits !== 11) {
    return "товар";
  } else if ([2, 3, 4].includes(lastDigit) && ![12, 13, 14].includes(lastTwoDigits)) {
    return "товара";
  } else {
    return "товаров";
  }
}

interface Props {
  cartItems: {
    title: string;
    count: number;
    price: number;
  }[];
  handleRemoveFromCart: (e: React.MouseEvent<HTMLButtonElement>, item: any) => void;
  handleIncrement: (item: any) => void;
  handleDecrement: (item: any) => void;
}

class Basket extends Component<Props> {
  render() {
    const { cartItems } = this.props;
    const cartItemCount = cartItems.length;

    return (
      <div className="alert alert-info">
        {cartItemCount === 0 ? (
          "Корзина пуста"
        ) : (
          <div>
            {" "}
            У вас есть {cartItemCount} {getCartItemWordForm(cartItemCount)} в вашей корзине{" "}
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
                  <button className='btn-basket' onClick={() => this.props.handleIncrement(item)}><img src={plusIcon} alt="+" /></button>
                     {item.count}   
                  <button className='btn-basket btn-minus' onClick={() => this.props.handleDecrement(item)}><img src={minusIcon} alt="-" /></button>
                  <button 
                    className="btn btn-danger btn-basket"
                    onClick={(e) => this.props.handleRemoveFromCart(e, item)}
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
  }
}

export default Basket;
