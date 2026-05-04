const express = require('express');
const router = express.Router();
const { products } = require('../data/mockData');

// GET semua produk dengan filter
router.get('/', (req, res) => {
  let hasil = [...products];
  const { category, search, minPrice, maxPrice, kabupaten, sort } = req.query;

  if (category && category !== 'all') hasil = hasil.filter(p => p.category === category);
  if (kabupaten && kabupaten !== 'all') hasil = hasil.filter(p => p.kabupaten === kabupaten);
  if (search) hasil = hasil.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.seller.toLowerCase().includes(search.toLowerCase()));
  if (minPrice) hasil = hasil.filter(p => p.price >= Number(minPrice));
  if (maxPrice) hasil = hasil.filter(p => p.price <= Number(maxPrice));

  if (sort === 'price_asc') hasil.sort((a, b) => a.price - b.price);
  else if (sort === 'price_desc') hasil.sort((a, b) => b.price - a.price);
  else if (sort === 'rating') hasil.sort((a, b) => b.rating - a.rating);
  else if (sort === 'terlaris') hasil.sort((a, b) => b.sold - a.sold);

  res.json({ success: true, total: hasil.length, data: hasil });
});

// GET produk by ID
router.get('/:id', (req, res) => {
  const produk = products.find(p => p.id === Number(req.params.id));
  if (!produk) return res.status(404).json({ success: false, message: 'Produk tidak ditemukan' });
  res.json({ success: true, data: produk });
});

// POST tambah ke keranjang (simulasi)
router.post('/:id/cart', (req, res) => {
  const produk = products.find(p => p.id === Number(req.params.id));
  if (!produk) return res.status(404).json({ success: false, message: 'Produk tidak ditemukan' });
  res.json({ success: true, message: `${produk.name} berhasil ditambahkan ke keranjang`, data: { product: produk, qty: req.body.qty || 1 } });
});

module.exports = router;
