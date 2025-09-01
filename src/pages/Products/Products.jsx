import React, { useEffect, useState } from 'react'
import './Products.css'
import Navbar from '../../components/Navbar/Navbar'
import Banner from '../../components/Banner/Banner'
import ProductCard from '../../components/ProductCard/ProductCard'


const Products = () => {




    const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from fakestoreapi
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);


  return (
    <div className='products-container'>
      <Navbar/>
      <Banner/>
     <div className="products-container-map">
      {products.map((p) => (
        <ProductCard
          key={p.id}
          title={p.title}
          price={p.price}
          image={p.image}
          rating={p.rating?.rate}
          ratingCount={p.rating?.count}
          variantsText="5 types of shoes available"
          onAddToCart={() => alert(`Added ${p.title} to cart`)}
          onAddShortlist={() => alert(`Shortlisted ${p.title}`)}
        />
      ))}
    </div>
      
    </div>
  )
}

export default Products
