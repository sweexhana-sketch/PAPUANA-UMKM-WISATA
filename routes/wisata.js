const express = require('express');
const router = express.Router();
const { wisata, guides } = require('../data/mockData');

router.get('/', (req, res) => {
  let hasil = [...wisata];
  const { kategori, search, sort } = req.query;
  if (kategori && kategori !== 'all') hasil = hasil.filter(w => w.kategori === kategori);
  if (search) hasil = hasil.filter(w => w.name.toLowerCase().includes(search.toLowerCase()));
  if (sort === 'rating') hasil.sort((a, b) => b.rating - a.rating);
  else if (sort === 'harga_asc') hasil.sort((a, b) => a.harga - b.harga);
  res.json({ success: true, total: hasil.length, data: hasil });
});

router.get('/guides', (req, res) => {
  res.json({ success: true, data: guides });
});

router.get('/:id', (req, res) => {
  const dest = wisata.find(w => w.id === Number(req.params.id));
  if (!dest) return res.status(404).json({ success: false, message: 'Destinasi tidak ditemukan' });
  res.json({ success: true, data: dest });
});

router.post('/:id/book', (req, res) => {
  const dest = wisata.find(w => w.id === Number(req.params.id));
  if (!dest) return res.status(404).json({ success: false, message: 'Destinasi tidak ditemukan' });
  const { pax, tgl, nama } = req.body;
  const bookingId = 'BKG-' + Date.now();
  res.json({
    success: true,
    message: 'Booking berhasil! Konfirmasi dikirim via WhatsApp.',
    data: { bookingId, wisata: dest.name, pax, tgl, total: dest.harga * (pax || 1), status: 'pending', guide: guides[0].name + ' (OAP)' }
  });
});

module.exports = router;
