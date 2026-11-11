const products = [
  { id: 1, name: 'Foaming cleanser', cat: 'skincare', type: 'cleanser', price: 649, img: 'https://tse4.mm.bing.net/th/id/OIP.aq6q2fY4IKS86U-pT0g1iQHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3' },
  { id: 2, name: 'Hydrating serum', cat: 'skincare', type: 'serum', price: 1299, img: 'https://static.vecteezy.com/system/resources/previews/057/992/823/non_2x/bottle-with-moisturizing-serum-in-water-on-blue-background-photo.jpg' },
  { id: 3, name: 'Aloe face oil', cat: 'skincare', type: 'serum', price: 1499, img: 'https://static.vecteezy.com/system/resources/previews/039/894/766/non_2x/ai-generated-a-transparent-beautiful-bottle-of-face-serum-without-a-brand-stands-on-a-white-minimalistic-background-free-photo.jpg' },
  { id: 4, name: 'Botanical cream', cat: 'skincare', type: 'moisturiser', price: 999, img: 'https://img.freepik.com/premium-photo/ultra-realistic-jar-organic-moisturizer-cream-without-cap-wooden-board-table_25996-8990.jpg' },
  { id: 5, name: 'Daily sunscreen', cat: 'skincare', type: 'sunscreen', price: 749, img: 'https://images.rawpixel.com/image_social_landscape/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsb2ZmaWNlOF9jbG9zZV91cF9waG90b19vZl9hX2JsYW5rX3N1bnNjcmVlbl90dWJlX3NlYV9za19hNDVhNTZmZS0xYjE1LTRkZTQtYTQ2NS0wMDIwOGZjY2JjNzlfMS5qcGc.jpg' },
  { id: 6, name: 'Liquid lipstick', cat: 'makeup', type: 'lips', price: 799, img: 'https://jillkirshcolor.com/wp-content/uploads/2019/12/AB-100-Dusty-Pink-Liquid-Matte-Lipstick-Edited-Color.png' },
  { id: 7, name: 'Silk foundation', cat: 'makeup', type: 'face', price: 1099, img: 'https://i.pinimg.com/736x/d8/6a/58/d86a5858b99d6b42344b93bfe0b8e479.jpg' },
  { id: 8, name: 'Cream blush', cat: 'makeup', type: 'face', price: 899, img: 'https://cdn.chanhtuoi.com/kylie-hybrid-blush-front-photo-original.jpeg.webp' },
  { id: 9, name: 'Lash mascara', cat: 'makeup', type: 'eyes', price: 699, img: 'https://image.made-in-china.com/2f0j00RfLkZTPsqvpQ/Waterproof-Unique-Makeup-Packaging-Empty-Metal-Mascara-Container-with-Brush.jpg' },
  { id: 10, name: 'Eyeshadow palette', cat: 'makeup', type: 'eyes', price: 1299, img: 'https://img.freepik.com/premium-photo/luxury-eyeshadow-palette-black-background-floating-air-levitation_153090-515.jpg' },
  { id: 11, name: 'Glow highlighter', cat: 'makeup', type: 'face', price: 949, img: 'https://img.freepik.com/premium-photo/highlighter-makeup-product-isolated-white_145644-56152.jpg' }
];

const $ = id => document.getElementById(id);
const get = (key, fallback) => JSON.parse(localStorage.getItem(key)) || fallback;
const set = (key, value) => localStorage.setItem(key, JSON.stringify(value));
const money = n => '₹' + n.toLocaleString('en-IN');
const find = id => products.find(p => p.id == id);
let draw = null;

$('top').innerHTML = `<a class="logo" href="index.html">VELOURA</a>
  <nav><a href="index.html">Home</a><a href="skincare.html">Skincare</a><a href="makeup.html">Makeup</a><a href="contact.html">Contact</a></nav>
  <div class="icons"><a href="wishlist.html">Wishlist (<span id="wc">0</span>)</a><a href="cart.html">Cart (<span id="cc">0</span>)</a></div>`;
$('foot').innerHTML = `<b>VELOURA</b><span>12 Fern Lane, Sector 62, Noida</span><span>hello@veloura.in | +91 98765 43210</span>`;
document.querySelectorAll('nav a').forEach(a => a.classList.toggle('on', location.pathname.endsWith(a.getAttribute('href'))));

function update() {
  $('wc').textContent = get('wish', []).length;
  $('cc').textContent = Object.values(get('cart', {})).reduce((a, b) => a + b, 0);
  if (draw) draw();
}

function toggleWish(id) {
  const wish = get('wish', []);
  set('wish', wish.includes(id) ? wish.filter(x => x != id) : [...wish, id]);
  update();
}

function addCart(id) {
  const cart = get('cart', {});
  cart[id] = (cart[id] || 0) + 1;
  set('cart', cart);
  update();
}

function qty(id, change) {
  const cart = get('cart', {});
  cart[id] += change;
  if (cart[id] <= 0) delete cart[id];
  set('cart', cart);
  update();
}

function card(p) {
  const liked = get('wish', []).includes(p.id);
  return `<div class="card">
    <div class="pic"><img src="${p.img}" alt="${p.name}">
    <button class="heart ${liked ? 'on' : ''}" onclick="toggleWish(${p.id})" aria-label="Wishlist">♥</button></div>
    <h3>${p.name}</h3><p>${money(p.price)}</p>
    <button class="btn" onclick="addCart(${p.id})">Add to cart</button></div>`;
}

if ($('featured')) {
  draw = () => $('featured').innerHTML = [2, 6, 4, 7].map(id => card(find(id))).join('');
}

if ($('grid')) {
  const list = products.filter(p => p.cat == document.body.dataset.cat);
  let type = 'all';
  $('chips').innerHTML = ['all', ...new Set(list.map(p => p.type))].map(t => `<button data-t="${t}">${t}</button>`).join('');
  $('chips').onclick = e => { if (e.target.dataset.t) { type = e.target.dataset.t; draw(); } };
  $('q').oninput = $('sort').onchange = () => draw();
  draw = () => {
    const text = $('q').value.toLowerCase();
    const shown = list.filter(p => (type == 'all' || p.type == type) && p.name.toLowerCase().includes(text));
    if ($('sort').value == 'low') shown.sort((a, b) => a.price - b.price);
    if ($('sort').value == 'high') shown.sort((a, b) => b.price - a.price);
    $('grid').innerHTML = shown.map(card).join('') || '<p>No products match your search.</p>';
    document.querySelectorAll('#chips button').forEach(b => b.classList.toggle('on', b.dataset.t == type));
  };
}

if ($('wishlist')) {
  draw = () => {
    const wish = get('wish', []);
    $('wishlist').innerHTML = wish.map(id => card(find(id))).join('') || '<p>Your wishlist is empty. Tap the heart on a product to save it.</p>';
  };
}

if ($('cart')) {
  draw = () => {
    const cart = get('cart', {});
    let total = 0;
    $('cart').innerHTML = Object.keys(cart).map(id => {
      const p = find(id), sum = p.price * cart[id];
      total += sum;
      return `<div class="row"><img src="${p.img}" alt="">
        <span>${p.name}</span>
        <span><button onclick="qty(${id}, -1)">-</button> ${cart[id]} <button onclick="qty(${id}, 1)">+</button></span>
        <span>${money(sum)}</span>
        <button onclick="qty(${id}, -99)">Remove</button></div>`;
    }).join('') || '<p>Your cart is empty.</p>';
    $('total').textContent = money(total);
  };
}

if ($('form')) {
  $('form').onsubmit = e => {
    e.preventDefault();
    const [name, email, msg] = ['name', 'email', 'msg'].map(id => $(id).value.trim());
    const ok = name && /\S+@\S+\.\S+/.test(email) && msg;
    $('note').textContent = ok ? `Thank you, ${name}. We'll reply soon.` : 'Enter your name, a valid email and a message.';
    if (ok) e.target.reset();
  };
}

update();
