# 🌿 PAPUANA — Platform Digital Terpadu Papua Barat Daya

> Ekosistem digital UMKM, Pariwisata & Kesejahteraan Orang Asli Papua (OAP)  
> Provinsi Papua Barat Daya · Sorong · Raja Ampat · Maybrat · Sorong Selatan · Tambrauw

---

## 📁 Struktur Project

```
papuana/
├── 📂 backend/
│   ├── server.js          ← Server Express utama
│   ├── package.json
│   ├── 📂 routes/
│   │   ├── products.js    ← API produk UMKM
│   │   ├── wisata.js      ← API destinasi wisata
│   │   └── api.js         ← API dashboard, auth, fintech
│   └── 📂 data/
│       └── mockData.js    ← Data mock Papua Barat Daya
│
├── 📂 frontend/
│   ├── index.html         ← SPA utama (semua halaman)
│   └── 📂 assets/
│       ├── css/style.css  ← Design system PAPUANA
│       └── app.js         ← Logic frontend + API calls
│
├── package.json           ← Root scripts
└── README.md
```

---

## 🚀 Cara Menjalankan Lokal

### Prasyarat
- **Node.js** versi 16 ke atas → https://nodejs.org
- **npm** (sudah termasuk di Node.js)

### Langkah Instalasi

```bash
# 1. Masuk ke folder project
cd papuana

# 2. Install dependensi backend
cd backend
npm install

# 3. Jalankan server
node server.js
```

### Buka Browser
```
http://localhost:3000
```

Server akan melayani **frontend + API** sekaligus dari port 3000.

---

## 🔌 API Endpoints

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET  | `/api/health`              | Cek status server & daftar endpoint |
| GET  | `/api/stats`               | Statistik dashboard daerah |
| GET  | `/api/products`            | Daftar produk UMKM (support filter) |
| GET  | `/api/products/:id`        | Detail produk |
| POST | `/api/products/:id/cart`   | Tambah ke keranjang |
| GET  | `/api/wisata`              | Daftar destinasi wisata |
| GET  | `/api/wisata/guides`       | Daftar pemandu wisata OAP |
| GET  | `/api/wisata/:id`          | Detail destinasi |
| POST | `/api/wisata/:id/book`     | Booking wisata |
| GET  | `/api/orders`              | Daftar pesanan |
| POST | `/api/orders`              | Buat pesanan baru |
| GET  | `/api/bookings`            | Daftar booking wisata |
| POST | `/api/auth/login`          | Login pengguna |
| POST | `/api/auth/register`       | Registrasi pengguna baru |
| POST | `/api/fintech/pinjaman`    | Ajukan pinjaman UMKM |

### Filter Produk (Query Params)
```
GET /api/products?category=kerajinan&kabupaten=Sorong&sort=terlaris&search=noken
```

---

## 👤 Akun Demo

| Email | Password | Role |
|-------|----------|------|
| `yuliana@papuana.id` | `papuana123` | UMKM OAP |
| `admin@pemda-sorong.go.id` | `papuana123` | Admin Pemda |

---

## 🌿 Halaman Aplikasi

| Halaman | Fitur |
|---------|-------|
| **Beranda** | Hero, produk unggulan, destinasi wisata, sektor terintegrasi |
| **Marketplace** | Filter produk, pencarian, detail produk, beli langsung |
| **Wisata** | Destinasi, booking, pemandu OAP |
| **Dashboard** | Statistik PAD, chart omzet, tabel pesanan & booking |
| **PAPUANA Pay** | Dompet digital, pinjaman UMKM, bayar pajak & retribusi |

---

## ✨ Fitur Unggulan OAP
- 🌿 Badge "OAP Terverifikasi" pada produk dan penjual
- 💸 Pinjaman 0% bunga khusus OAP
- 🛒 Komisi marketplace 0% tahun pertama untuk OAP
- 📚 Akses pelatihan gratis seluruh kursus
- 🏝️ Prioritas sebagai pemandu wisata

---

## 🛠 Teknologi

| Layer | Stack |
|-------|-------|
| Frontend | HTML5, CSS3 (Design System custom), Vanilla JS (SPA) |
| Backend  | Node.js, Express.js |
| Data     | In-memory mock data (siap migrasi ke PostgreSQL) |
| Font     | Playfair Display + Plus Jakarta Sans (Google Fonts) |

---

## 📞 Kontak & Kontribusi

**PAPUANA Development Team**  
Provinsi Papua Barat Daya, Indonesia 🇮🇩

> *"Membangun Papua Barat Daya dari dalam — oleh OAP, untuk OAP dan seluruh masyarakat Papua."*
