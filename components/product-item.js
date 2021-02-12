// product-item.js

class ProductItem extends HTMLElement {
  // TODO
  constructor() {
    super();
    const li = document.createElement('li');
    li.setAttribute('class', 'product');
    const img = li.appendChild(document.createElement('img'));
    const title = li.appendChild(document.createElement('p'));
    title.setAttribute('class', 'title');
    const price = li.appendChild(document.createElement('p'));
    price.setAttribute('class', 'price');
    const btn = li.appendChild(document.createElement('button'));
    btn.setAttribute('onclick', 'alert(\'Cart Updated!\')');
    btn.innerHTML = 'Add to Cart';
    btn.addEventListener('click', function () {
      const count = document.getElementById('cart-count');
      if (this.innerHTML == 'Add to Cart') {
        this.innerHTML = 'Remove from Cart';
        count.innerHTML = parseInt(count.innerHTML) + 1;
        localStorage.setItem(this.id, 1);
      } else {
        this.innerHTML = 'Add to Cart';
        count.innerHTML = parseInt(count.innerHTML) - 1;
        localStorage.removeItem(this.id);
      }
    });

    let style = document.createElement('style');

    style.textContent = `
    .price {
      color: green;
      font-size: 1.8em;
      font-weight: bold;
      margin: 0;
    }
    
    .product {
      align-items: center;
      background-color: white;
      border-radius: 5px;
      display: grid;
      grid-template-areas: 
      'image'
      'title'
      'price'
      'add';
      grid-template-rows: 67% 11% 11% 11%;
      height: 450px;
      filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
      margin: 0 30px 30px 0;
      padding: 10px 20px;
      width: 200px;
    }
    
    .product > button {
      background-color: rgb(255, 208, 0);
      border: none;
      border-radius: 5px;
      color: black;
      justify-self: center;
      max-height: 35px;
      padding: 8px 20px;
      transition: 0.1s ease all;
    }
    
    .product > button:hover {
      background-color: rgb(255, 166, 0);
      cursor: pointer;
      transition: 0.1s ease all;
    }
    
    .product > img {
      align-self: center;
      justify-self: center;
      width: 100%;
    }
    
    .title {
      font-size: 1.1em;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
    .title:hover {
      font-size: 1.1em;
      margin: 0;
      white-space: wrap;
      overflow: auto;
      text-overflow: unset;
    }`;

    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(style);
    shadow.appendChild(li);
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    const li = this.shadowRoot.lastChild;
    const img = li.getElementsByTagName('img')[0];
    const title = li.getElementsByClassName('title')[0];
    const price = li.getElementsByClassName('price')[0];
    const btn = li.getElementsByTagName('button')[0];
    if (attrName === 'img') {
      img.src = newVal;
    }
    else if (attrName === 'title') {
      img.alt = newVal;
      title.textContent = newVal;
    }
    else if (attrName === 'price') {
      price.textContent = newVal;
    }
    else if (attrName === 'cartid') {
      btn.id = newVal;
      if (localStorage.getItem(newVal)) {
        btn.innerHTML = 'Remove from Cart';
        const count = document.getElementById('cart-count');
        count.innerHTML = parseInt(count.innerHTML) + 1;
      }
    }
  }

  static get observedAttributes() {
    return ['img', 'title', 'price', 'cartid'];
  }
  get img() {
    return this.getAttribute('img');
  }

  set img(newValue) {
    this.setAttribute('img', newValue);
  }

  get title() {
    return this.getAttribute('title');
  }

  set title(newValue) {
    this.setAttribute('title', newValue);
  }

  get price() {
    return this.getAttribute('price');
  }

  set price(newValue) {
    this.setAttribute('price', newValue);
  }

  get cartid() {
    return this.getAttribute('cartid');
  }

  set cartid(newValue) {
    this.setAttribute('cartid', newValue);
  }

}

customElements.define('product-item', ProductItem);
