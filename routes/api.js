const express = require('express');
const router  = express.Router();
const { stats, orders, bookings, users, padData } = require('../data/mockData');

// ── Stats
router.get('/stats', (req, res) => res.json({ success:true, data:stats }));

// ── Orders
router.get('/orders', (req, res) => res.json({ success:true, total:orders.length, data:orders }));
router.post('/orders', (req, res) => {
  const o = { id:'ORD-'+Date.now(), product:req.body.productName||'Produk Papua', qty:req.body.qty||1, total:req.body.total||0, status:'pending', date:new Date().toISOString().split('T')[0], buyer:req.body.buyer||'Pelanggan', kota:req.body.kota||'-' };
  orders.unshift(o);
  res.json({ success:true, message:'Pesanan berhasil dibuat!', data:o });
});

// ── Bookings
router.get('/bookings', (req, res) => res.json({ success:true, total:bookings.length, data:bookings }));

// ── Auth
router.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user || password !== 'papuana123')
    return res.status(401).json({ success:false, message:'Email/password salah. Demo: papuana123' });
  res.json({ success:true, message:`Selamat datang, ${user.name}!`, data:{ token:'papuana-token-'+user.id, user } });
});

router.post('/auth/register', (req, res) => {
  const { name, email, kabupaten, isOAP } = req.body;
  if (users.find(u => u.email === email))
    return res.status(400).json({ success:false, message:'Email sudah terdaftar.' });
  const u = { id:users.length+1, name, email, role:'umkm', oap:isOAP||false, kabupaten:kabupaten||'Sorong', joined:new Date().toISOString().split('T')[0], status:'active', saldo:0 };
  users.push(u);
  res.json({ success:true, message:'Registrasi berhasil! Selamat bergabung di PAPUANA 🌿', data:{ token:'papuana-token-'+u.id, user:u } });
});

// ── Fintech
router.post('/fintech/pinjaman', (req, res) => {
  const { jumlah, tenor, tujuan, isOAP } = req.body;
  res.json({ success:true, message:'Pengajuan pinjaman berhasil! Tim PAPUANA akan menghubungi dalam 1x24 jam.', data:{ pengajuanId:'PIN-'+Date.now(), jumlah, tenor:tenor||12, bunga:isOAP?'0%':'6% p.a.', statusPengajuan:'review' } });
});

router.get('/fintech/saldo', (req, res) => {
  res.json({ success:true, data:{ saldo:2450000, totalTransaksi:8750000, tabungan:1200000 } });
});

router.get('/fintech/transaksi', (req, res) => {
  const { transaksiFintech } = require('../data/mockData');
  res.json({ success:true, data:transaksiFintech });
});

// ── PAD
router.get('/pad', (req, res) => res.json({ success:true, data:padData }));

// ── Pengaduan
router.get('/pengaduan', (req, res) => {
  const { pengaduan } = require('../data/mockData');
  res.json({ success:true, data:pengaduan });
});
router.post('/pengaduan', (req, res) => {
  const { pengaduan } = require('../data/mockData');
  const p = { id:'PGD-'+Date.now(), judul:req.body.judul, kategori:req.body.kategori||'umum', status:'menunggu', tgl:new Date().toISOString().split('T')[0], pelapor:req.body.pelapor||'Anonim' };
  pengaduan.unshift(p);
  res.json({ success:true, message:'Laporan pengaduan berhasil dikirim!', data:p });
});

module.exports = router;
