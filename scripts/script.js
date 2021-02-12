// Script.js
let cart;
window.addEventListener('DOMContentLoaded', () => {
  // TODO
  if (!localStorage.getItem('products')) {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => {
        localStorage.setItem('products', JSON.stringify(data));
      });
  }
  const products = JSON.parse(localStorage.getItem('products'));
  cart = Array(products.length);
  for (let i = 0; i < products.length; i++) {
    const item = document.createElement('product-item');
    item.img = products[i].image;
    item.title = products[i].title;
    item.price = products[i].price;
    item.cartid = products[i].id;
    document.getElementById('product-list').appendChild(item);
  }
});