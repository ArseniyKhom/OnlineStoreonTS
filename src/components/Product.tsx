import { Component } from 'react';
import { Link } from 'react-router-dom'
import { formatCurrency } from '../helpers/util';


class Product extends Component<any, any> {

    state = {
        product: [],
        id: ""
    }

    componentDidMount = () => {
        console.log("ProductId", this.props.id)
        this.fetchData(this.props.id);
    };

    fetchData = (id: number) => {
        fetch("https://fakestoreapi.com/products/" + `${id}`)
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
                this.setState({
                    product: data,
                    id: id
                })
            })
    };

    render() {
        const { title, description, id, price, image } = this.state.product as any
        return (
            <div className="container">
                <div className="back-to-products">
                    <Link to="/products">Вернуться к товарам</Link>
                </div>
                <h1>{title}</h1>

                <div className="row">
                    <div className="col-md-4">
                        <div className="details-image" key={id}>
                            <img src={image} alt={title} width="300" height="300" />
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="details-info">
                            <b>Описание:</b>
                            <div>{description}</div>
                        </div>
                        <br></br>
                        <div className="details-info">
                            <b>Цена:</b>
                            <div><b>{formatCurrency(price)}</b></div>
                        </div>
                    </div>

                    {}
                </div>
            </div>
        )
    }
}

export default Product;