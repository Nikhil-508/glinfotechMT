import React, { useEffect, useState } from 'react'
import './Products.css'
import Navbar from '../../components/Navbar/Navbar'
import Banner from '../../components/Banner/Banner'
import ProductCard from '../../components/ProductCard/ProductCard'

const Products = () => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 8;

  // Fetch products and categories
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setAllProducts(data);
      })
      .catch((err) => console.error("Error fetching products:", err));

    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  // Filter + Search
  useEffect(() => {
    let filteredProducts = allProducts;

    if (selectedCategory !== 'all') {
      filteredProducts = filteredProducts.filter(
        (p) => p.category === selectedCategory
      );
    }

    if (searchTerm.trim() !== '') {
      filteredProducts = filteredProducts.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setProducts(filteredProducts);
    setCurrentPage(1); // reset page
  }, [selectedCategory, searchTerm, allProducts]);

  // Pagination Logic
  const totalPages = Math.ceil(products.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className='products-container'>
      <Navbar />
      <Banner />

      {/* Search + Filter Section */}
      <div className="filter-container">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="category-select"
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Products Listing */}
      <div className="products-container-map">
        {currentProducts.map((p) => (
          <ProductCard
            key={p.id}
            title={p.title}
            price={p.price}
            image={p.image}
            rating={p.rating?.rate}
            ratingCount={p.rating?.count}
            variantsText="5 types of shoes available"  //same for all
            onAddToCart={() => alert(`Added ${p.title} to cart`)}
            onAddShortlist={() => alert(`Shortlisted ${p.title}`)}
          />
        ))}
      </div>

      {/* Pagination UI */}
      <div className="pagination">
        <button
          className="page-btn"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i + 1}
            className={`page-btn ${currentPage === i + 1 ? "active" : ""}`}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          className="page-btn"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>

      {/* Footer */}
      <div className='footer-container'>
        <h1>Footer</h1>
      </div>
    </div>
  )
}

export default Products
