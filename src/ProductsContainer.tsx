import React from 'react';
import Filter from './components/Filter';
import Products from './components/Products';
import Basket from './components/Basket';

class ProductsContainer extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      filteredProducts: [],
      category: '',
      categories: [],
      sort: '',
      cartItems: [],
      search: '',
    };
    this.handleChangeSort = this.handleChangeSort.bind(this);
    this.handleChangeCategory = this.handleChangeCategory.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleDecrement = this.handleDecrement.bind(this);
  }

  componentDidMount = () => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        const categories = data
          .map((x) => x.category)
          .filter((category, index, arr) => arr.indexOf(category) === index)
          .sort();

        this.setState({
          products: data,
          filteredProducts: data,
          category: '',
          categories: categories,
        });
      });

    if (localStorage.getItem("cartItems")) {
      this.setState({ cartItems: JSON.parse(localStorage.getItem("cartItems")) });
    }
  };

  handleChangeSort = (e) => {
    console.log("handleChangeSort");
    this.setState({ sort: e.target.value });
    this.listProducts();
  };

  handleChangeSearch = (e) => {
    console.log("handleChangeSearch");
    this.setState({ search: e.target.value });
    this.listProducts();
  };

  listProducts = () => {
    console.log("listProducts", this.state.sort);
    this.setState((state) => {
      console.log("setState", state);
      const products = [...state.products];
  
      if (state.sort === "lowest") {
        products.sort((a, b) => a.price - b.price);
      } else if (state.sort === "highest") {
        products.sort((a, b) => b.price - a.price);
      } else if (state.sort === "az") {
        products.sort((a, b) => a.title.localeCompare(b.title));
      } else if (state.sort === "za") {
        products.sort((a, b) => b.title.localeCompare(a.title));
      }
  
      let filteredProducts = products;
  
      if (state.category !== "") {
        filteredProducts = filteredProducts.filter((p) => p.category.indexOf(state.category) >= 0);
      }
  
      if (state.search !== "") {
        filteredProducts = filteredProducts.filter((p) =>
          p.title.toLowerCase().includes(state.search.toLowerCase())
        );
      }
  
      return { filteredProducts };
    });
  };  

  handleChangeCategory = (e) => {
    console.log("handleChangeCategory");
    this.setState({ category: e.target.value });
    this.listProducts();
  };

  handleAddToCart(e, product) {
    console.log("handleAddToCart");
    this.setState((state) => {
      const cartItems = [...state.cartItems];
      let productAlreadyInCart = false;
      cartItems.forEach((item) => {
        if (item.id === product.id) {
          productAlreadyInCart = true;
          item.count++;
        }
      });
      if (!productAlreadyInCart) {
        cartItems.push({ ...product, count: 1 });
      }

      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { cartItems };
    });
  }

  handleRemoveFromCart(e, item) {
    console.log("handleRemoveFromCart");
    this.setState((state) => {
      const cartItems = state.cartItems.filter((elm) => elm.id !== item.id);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { cartItems };
    });
  }

  handleIncrement(item) {
    console.log("handleIncrement");
    this.setState((state) => {
      const cartItems = state.cartItems.map((elm) => {
        if (elm.id === item.id) {
          return { ...elm, count: elm.count + 1 };
        }
        return elm;
      });
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { cartItems };
    });
  }

  handleDecrement(item) {
    console.log("handleDecrement");
    this.setState((state) => {
      const cartItems = state.cartItems.map((elm) => {
        if (elm.id === item.id) {
          return { ...elm, count: Math.max(elm.count - 1, 1) };
        }
        return elm;
      });
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { cartItems };
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <Filter
              category={this.state.category}
              categories={this.state.categories}
              handleChangeCategory={this.handleChangeCategory}
              count={this.state.filteredProducts.length}
              sort={this.state.sort}
              handleChangeSort={this.handleChangeSort}
              search={this.state.search}
              handleChangeSearch={this.handleChangeSearch}
            />
            <hr />
            <Products products={this.state.filteredProducts} handleAddToCart={this.handleAddToCart} />
          </div>
  
          <div className="col-md-4">
            <Basket
              cartItems={this.state.cartItems}
              handleRemoveFromCart={this.handleRemoveFromCart}
              handleIncrement={this.handleIncrement}
              handleDecrement={this.handleDecrement}
            />
          </div>
        </div>
      </div>
    );
  }
}  

export default ProductsContainer;
