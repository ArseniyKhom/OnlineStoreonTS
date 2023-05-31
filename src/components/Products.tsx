import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../helpers/util';

export default class Products extends Component<any>{
    render() {
        console.log("this.props.products")
        console.log(this.props.products)
        const productItems = this.props.products.map(product => (
            <div className="col-xs-6 col-md-3" key={product.id}>
                <div className="thumbnail text-center" >
                    <Link to={'/product/' + product.id} >
                        <img src={product.image} alt={product.title} width="150" height="150" />
                        <div className="caption">
                            {product.title}
                        </div>
                    </Link>
                    <div className='for-button'>
                        <div><b>{formatCurrency(product.price)}</b></div>
                        <button className="btn btn-primary" onClick={(e) => this.props.handleAddToCart(e, product)}>В корзину</button>
                    </div>
                </div>
            </div>
        ))
        return (
            <div className="row">
                {productItems}
            </div>
        );
    }
}