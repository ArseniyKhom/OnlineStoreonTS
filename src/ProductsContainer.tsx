import React, { useState, useEffect, ChangeEvent, MouseEvent } from 'react';
import Filter from './components/Filter';
import Products from './components/Products';
import Basket from './components/Basket';

interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  image: string;
}

interface CartItem extends Product {
  count: number;
}

const ProductsContainer: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<string>('');
  const [categories, setCategories] = useState<string[]>([]);
  const [sort, setSort] = useState<string>('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data: Product[]) => {
        const categories = data
          .map((x) => x.category)
          .filter((category, index, arr) => arr.indexOf(category) === index)
          .sort();

        setProducts(data);
        setFilteredProducts(data);
        setCategories(categories);
      });

    if (localStorage.getItem("cartItems")) {
      setCartItems(JSON.parse(localStorage.getItem("cartItems")) as CartItem[]);
    }
  }, []);

  useEffect(() => {
    listProducts();
  }, [sort, category, search]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, key: string) => {
    const { value } = e.target;
    switch (key) {
      case 'sort':
        setSort(value);
        break;
      case 'search':
        setSearch(value);
        break;
      case 'category':
        setCategory(value);
        break;
      default:
        break;
    }
  };

  const listProducts = () => {
    const updatedProducts = [...products];

    switch (sort) {
      case "lowest":
        updatedProducts.sort((a, b) => a.price - b.price);
        break;
      case "highest":
        updatedProducts.sort((a, b) => b.price - a.price);
        break;
      case "az":
        updatedProducts.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "za":
        updatedProducts.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }

    let updatedFilteredProducts = updatedProducts;

    if (category) {
      updatedFilteredProducts = updatedFilteredProducts.filter((p) =>
        p.category.indexOf(category) !== -1
      );
    }

    if (search) {
      updatedFilteredProducts = updatedFilteredProducts.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredProducts(updatedFilteredProducts);
  };

  const handleAddToCart = (e: MouseEvent<HTMLButtonElement>, product: Product) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = [...prevCartItems];
      let productAlreadyInCart = false;

      updatedCartItems.forEach((item, index) => {
        if (item.id === product.id) {
          productAlreadyInCart = true;
          updatedCartItems[index].count++;
        }
      });

      if (!productAlreadyInCart) {
        updatedCartItems.push({ ...product, count: 1 });
      }

      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      return updatedCartItems;
    });
  };

 

 const handleRemoveFromCart = (e: MouseEvent<HTMLButtonElement>, item: CartItem) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.filter((elm) => elm.id !== item.id);
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      return updatedCartItems;
    });
  };

  const handleIncrement = (item: CartItem) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.map((elm) => {
        if (elm.id === item.id) {
          return { ...elm, count: elm.count + 1 };
        }
        return elm;
      });
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      return updatedCartItems;
    });
  };

  const handleDecrement = (item: CartItem) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.map((elm) => {
        if (elm.id === item.id) {
          return { ...elm, count: Math.max(elm.count - 1, 1) };
        }
        return elm;
      });
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      return updatedCartItems;
    });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          <Filter
            category={category}
            categories={categories}
            handleChangeCategory={(e) => handleChange(e, 'category')}
            count={filteredProducts.length}
            sort={sort}
            handleChangeSort={(e) => handleChange(e, 'sort')}
            search={search}
            handleChangeSearch={(e) => handleChange(e, 'search')}
          />
          <hr />
          <Products products={filteredProducts} handleAddToCart={handleAddToCart} />
        </div>

        <div className="col-md-4">
          <Basket
            cartItems={cartItems}
            handleRemoveFromCart={handleRemoveFromCart}
            handleIncrement={handleIncrement}
            handleDecrement={handleDecrement}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductsContainer;