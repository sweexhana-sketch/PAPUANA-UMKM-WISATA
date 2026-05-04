// ============================================================
//  PAPUANA — Extended Mock Data
//  Edukasi, Keuangan, Pengumuman, Pelatihan OAP
// ============================================================

const kursus = [
  { id: 1, judul: "Digital Marketing untuk UMKM Papua", instruktur: "Bapak Yohanis Rumainum", kategori: "marketing", durasi: "8 jam", modul: 12, rating: 4.9, peserta: 342, harga: 0, oap_gratis: true, level: "Pemula", image: "📱", deskripsi: "Pelajari cara memasarkan produk OAP di media sosial, marketplace, dan platform digital." },
  { id: 2, judul: "Pembukuan Sederhana & Laporan Keuangan", instruktur: "Ibu Maria Wanggai", kategori: "keuangan", durasi: "6 jam", modul: 8, rating: 4.8, peserta: 289, harga: 0, oap_gratis: true, level: "Pemula", image: "📊", deskripsi: "Cara mencatat pemasukan, pengeluaran, dan membuat laporan keuangan sederhana untuk UMKM." },
  { id: 3, judul: "Panduan Pemandu Wisata Profesional", instruktur: "Pak Yoseph Faidiban", kategori: "wisata", durasi: "16 jam", modul: 20, rating: 5.0, peserta: 178, harga: 0, oap_gratis: true, level: "Menengah", image: "🏝️", deskripsi: "Sertifikasi resmi pemandu wisata Raja Ampat dan Papua Barat Daya. Kurikulum standar nasional." },
  { id: 4, judul: "Fotografer Produk dengan HP", instruktur: "Sdr. Kevin Sawaki", kategori: "marketing", durasi: "4 jam", modul: 6, rating: 4.7, peserta: 412, harga: 0, oap_gratis: true, level: "Pemula", image: "📷", deskripsi: "Teknik foto produk menggunakan smartphone untuk keperluan marketplace dan media sosial." },
  { id: 5, judul: "Pengolahan Ikan & Seafood Premium", instruktur: "Ibu Rosina Agun", kategori: "produksi", durasi: "10 jam", modul: 14, rating: 4.8, peserta: 156, harga: 0, oap_gratis: true, level: "Menengah", image: "🐟", deskripsi: "Teknik pengolahan ikan asap, abon ikan, dan produk seafood bernilai tambah tinggi." },
  { id: 6, judul: "Bahasa Inggris untuk Pelaku Wisata", instruktur: "Miss Sarah Krey", kategori: "bahasa", durasi: "20 jam", modul: 24, rating: 4.6, peserta: 234, harga: 0, oap_gratis: true, level: "Pemula", image: "🗣️", deskripsi: "Percakapan bahasa Inggris dasar untuk berinteraksi dengan wisatawan mancanegara." }
];

const transaksiKeuangan = [
  { id: "TRX-001", tanggal: "2025-04-28", keterangan: "Penjualan Noken x2", tipe: "masuk", jumlah: 370000 },
  { id: "TRX-002", tanggal: "2025-04-27", keterangan: "Ongkir ke Jakarta", tipe: "keluar", jumlah: 45000 },
  { id: "TRX-003", tanggal: "2025-04-26", keterangan: "Penjualan Gelang Manik x3", tipe: "masuk", jumlah: 360000 },
  { id: "TRX-004", tanggal: "2025-04-25", keterangan: "Beli bahan baku", tipe: "keluar", jumlah: 120000 },
  { id: "TRX-005", tanggal: "2025-04-24", keterangan: "Penjualan Kopi Papua x5", tipe: "masuk", jumlah: 375000 },
  { id: "TRX-006", tanggal: "2025-04-23", keterangan: "Retribusi pasar", tipe: "keluar", jumlah: 15000 },
  { id: "TRX-007", tanggal: "2025-04-22", keterangan: "Booking wisata Raja Ampat", tipe: "masuk", jumlah: 1400000 },
  { id: "TRX-008", tanggal: "2025-04-21", keterangan: "Biaya sertifikasi guide", tipe: "keluar", jumlah: 75000 }
];

const padLaporan = {
  tahun: 2025,
  realisasiBulanIni: 487250000,
  targetTahunan: 5000000000,
  persenCapaian: 9.75,
  sumber: [
    { nama: "Retribusi Wisata Digital", jumlah: 187500000, target: 500000000, persen: 37.5, icon: "🏝️" },
    { nama: "Pajak UMKM Digital", jumlah: 134250000, target: 300000000, persen: 44.7, icon: "🛒" },
    { nama: "Biaya Perizinan PTSP", jumlah: 98750000, target: 200000000, persen: 49.4, icon: "📋" },
    { nama: "Komisi Platform", jumlah: 42500000, target: 100000000, persen: 42.5, icon: "💳" },
    { nama: "Retribusi Parkir Digital", jumlah: 24250000, target: 80000000, persen: 30.3, icon: "🚗" }
  ],
  trendBulanan: [
    { bulan: "Jan", nilai: 285000000 },
    { bulan: "Feb", nilai: 312000000 },
    { bulan: "Mar", nilai: 378000000 },
    { bulan: "Apr", nilai: 421000000 },
    { bulan: "Mei", nilai: 487250000 }
  ]
};

const pengumuman = [
  { id: 1, judul: "Program Pinjaman OAP 0% Bunga Dibuka", isi: "Pemerintah Provinsi Papua Barat Daya membuka program pinjaman lunak 0% bunga khusus Orang Asli Papua. Kuota terbatas untuk 500 pelaku UMKM OAP.", tanggal: "2025-04-30", tipe: "penting", icon: "🌿" },
  { id: 2, judul: "Festival Budaya Papua Barat Daya 2025", isi: "Festival Budaya tahunan akan digelar di Kota Sorong pada 17-20 Mei 2025. Daftarkan UMKM dan produk Anda untuk tampil di pameran!", tanggal: "2025-04-28", tipe: "event", icon: "🎉" },
  { id: 3, judul: "Pelatihan Digital Marketing Batch 5", isi: "Pendaftaran pelatihan digital marketing untuk pelaku UMKM OAP dibuka. Gratis, sertifikat resmi, dan ada insentif Rp 500.000 untuk peserta yang menyelesaikan semua modul.", tanggal: "2025-04-25", tipe: "pelatihan", icon: "📚" },
  { id: 4, judul: "Update: Fitur PAPUANA Pay v2.0", isi: "PAPUANA Pay kini mendukung transfer ke semua bank nasional dan dompet digital. Limit transfer harian naik menjadi Rp 50.000.000.", tanggal: "2025-04-20", tipe: "update", icon: "💳" }
];

const kabupatenData = [
  { nama: "Kota Sorong", umkm: 456, oap: 289, omzet: 1250000000, wisatawan: 1245, icon: "🏙️" },
  { nama: "Raja Ampat", umkm: 312, oap: 278, omzet: 875000000, wisatawan: 1876, icon: "🏝️" },
  { nama: "Maybrat", umkm: 198, oap: 189, omzet: 345000000, wisatawan: 234, icon: "🌊" },
  { nama: "Sorong Selatan", umkm: 167, oap: 145, omzet: 267000000, wisatawan: 45, icon: "🌳" },
  { nama: "Tambrauw", umkm: 114, oap: 108, omzet: 178000000, wisatawan: 21, icon: "🏔️" }
];

module.exports = { kursus, transaksiKeuangan, padLaporan, pengumuman, kabupatenData };
