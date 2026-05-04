const express = require('express');
const router  = express.Router();
const { kursus, agriData } = require('../data/mockData');

// ── Kursus / Edukasi
router.get('/edukasi/kursus', (req, res) => {
  let data = [...kursus];
  const { search, kategori, level } = req.query;
  if (search)   data = data.filter(k => k.judul.toLowerCase().includes(search.toLowerCase()));
  if (kategori && kategori !== 'all') data = data.filter(k => k.kategori === kategori);
  if (level    && level !== 'all')    data = data.filter(k => k.level === level);
  res.json({ success:true, total:data.length, data });
});

router.post('/edukasi/daftar', (req, res) => {
  const { kursusId, nama, email } = req.body;
  const k = kursus.find(k => k.id === parseInt(kursusId));
  if (!k) return res.status(404).json({ success:false, message:'Kursus tidak ditemukan' });
  k.peserta = (k.peserta||0) + 1;
  res.json({ success:true, message:`Berhasil mendaftar kursus "${k.judul}"! Cek email untuk akses.`, data:{ kursusId, pesertaId:'PST-'+Date.now(), nama, kursus:k.judul } });
});

// ── Agri-Maritim
router.get('/agri/komoditas', (req, res) => {
  res.json({ success:true, data:agriData.komoditas });
});

router.get('/agri/nelayan', (req, res) => {
  res.json({ success:true, data:agriData.nelayan });
});

router.post('/agri/lapor-hasil', (req, res) => {
  const { jenis, jumlah, satuan, harga, lokasi } = req.body;
  res.json({ success:true, message:`Hasil ${jenis} sebesar ${jumlah} ${satuan} berhasil dicatat!`, data:{ id:'AGR-'+Date.now(), jenis, jumlah, satuan, harga, lokasi, tgl:new Date().toISOString().split('T')[0] } });
});

// ── Warisan Budaya
router.get('/budaya/galeri', (req, res) => {
  const galeri = [
    { id:1, judul:"Noken — Tas Rajut Suku Moi",         daerah:"Sorong",         jenis:"kerajinan", image:"🎒", desc:"Noken adalah tas tradisional OAP, simbol kehidupan dan budaya Papua.",         hki:true  },
    { id:2, judul:"Ukiran Kamoro — Seni Leluhur",       daerah:"Sorong Selatan", jenis:"ukiran",    image:"🗿", desc:"Ukiran kayu sakral suku Kamoro, menggambarkan hubungan manusia dan alam.",     hki:true  },
    { id:3, judul:"Tari Yospan — Tarian Pergaulan",     daerah:"Sorong",         jenis:"seni",      image:"🎭", desc:"Tarian pergaulan khas Papua yang riang dan dinamis, sering ditampilkan OAP.", hki:false },
    { id:4, judul:"Kain Timor Motif Geometris",         daerah:"Sorong",         jenis:"kerajinan", image:"🧵", desc:"Kain tenun tangan dengan motif geometris khas Papua Barat Daya.",              hki:true  },
    { id:5, judul:"Pakaian Adat Suku Maybrat",          daerah:"Maybrat",        jenis:"budaya",    image:"👗", desc:"Pakaian adat suku Maybrat digunakan dalam upacara adat dan penyambutan.",    hki:false },
    { id:6, judul:"Kuliner Papeda — Ikon Kuliner OAP",  daerah:"Papua Barat Daya",jenis:"kuliner",  image:"🍲", desc:"Papeda adalah makanan pokok berbahan sagu, identitas kuliner masyarakat Papua.",hki:false },
  ];
  res.json({ success:true, data:galeri });
});

// ── PTSP / Perizinan
router.get('/ptsp/jenis-izin', (req, res) => {
  const izin = [
    { id:1, nama:"SIUP — Surat Izin Usaha Perdagangan", biaya:150000, waktu:"1 hari kerja", syarat:["KTP","NPWP","Foto Usaha"] },
    { id:2, nama:"NIB — Nomor Induk Berusaha",          biaya:0,      waktu:"30 menit",     syarat:["KTP","Email aktif"] },
    { id:3, nama:"IUMK — Izin Usaha Mikro Kecil",       biaya:0,      waktu:"1 hari kerja", syarat:["KTP","Surat RT/RW"] },
    { id:4, nama:"Izin Usaha Wisata",                    biaya:250000, waktu:"3 hari kerja", syarat:["KTP","NPWP","Dok. Lokasi"] },
    { id:5, nama:"Sertifikat Halal UMKM",                biaya:0,      waktu:"7 hari kerja", syarat:["KTP","Data Produk","Proses Produksi"] },
  ];
  res.json({ success:true, data:izin });
});

router.post('/ptsp/ajukan', (req, res) => {
  const { jenisIzin, nama, usaha, kabupaten } = req.body;
  res.json({ success:true, message:`Permohonan ${jenisIzin} berhasil diajukan! Nomor antrian: PTSP-${Date.now().toString().slice(-6)}`, data:{ nomorAntrian:'PTSP-'+Date.now(), jenisIzin, nama, usaha, kabupaten, status:'proses', estimasi:'1-3 hari kerja' } });
});

module.exports = router;
