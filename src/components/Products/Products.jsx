import React from 'react';
import star from '../../images/star-svgrepo-com.svg';
import classes from './style.module.css';

const Product = React.memo(function Product({ product }) {
  return (
    <div className={classes.Product}>
      <img src={product.ImageURL} alt={product.name} />
      <div>{product.name}</div>
      <div className={classes.Description}>{product.description}</div>
      <div className={classes.TextContent}>
        <span>Color:</span>
        <span>{product.color}</span>
      </div>
      <div className={classes.TextContent}>
        <span>Category:</span>
        <span>{product.category}</span>
      </div>
      <div className={classes.TextContent}>
        <span>Price:</span>
        <span>{product.price}</span>
      </div>
      <div className={classes.TextContent}>
        <span>Rating:</span>
        <span
          className={
            product.rating <= 5 && product.rating >= 4
              ? classes.High
              : product.rating < 4 && product.rating >= 3
              ? classes.Medium
              : classes.Low
          }
        >
          <img src={star} alt='star' />
          {product.rating}
        </span>
      </div>
    </div>
  );
});

function Products({ products }) {
  if (!products.length) {
    return <div className={classes.EmptyMessage}>Items not found...</div>;
  }

  return (
    <div className={classes.Products}>
      {products.map((product) => (
        <Product product={product} key={product.id} />
      ))}
    </div>
  );
}

export default React.memo(Products);
