// ============================================================
//  PAPUANA — Complete Mock Data Store (All Workflow Modules)
// ============================================================

const products = [
  { id:1,  name:"Noken Rajut Tradisional",    category:"kerajinan",  price:185000,  stock:24,  seller:"Mama Yuliana Yabansabra",  sellerOAP:true,  rating:4.9, reviews:87,  image:"🎒", kabupaten:"Sorong",        sold:312,  desc:"Noken asli rajutan tangan dengan motif burung cendrawasih khas Papua Barat Daya." },
  { id:2,  name:"Ikan Kerapu Segar",           category:"perikanan",  price:95000,   stock:40,  seller:"Kelompok Nelayan Doom",     sellerOAP:true,  rating:4.8, reviews:134, image:"🐟", kabupaten:"Sorong",        sold:890,  desc:"Kerapu segar tangkap langsung dari perairan Raja Ampat setiap pagi." },
  { id:3,  name:"Kopi Papua Arabika 250g",     category:"pertanian",  price:75000,   stock:60,  seller:"Petani Kopi Maybrat",       sellerOAP:true,  rating:4.7, reviews:56,  image:"☕", kabupaten:"Maybrat",       sold:445,  desc:"Kopi arabika single origin dataran tinggi Maybrat, sangrai medium." },
  { id:4,  name:"Ukiran Kayu Kamoro",          category:"kerajinan",  price:450000,  stock:8,   seller:"Bapak Agus Kamoro",         sellerOAP:true,  rating:5.0, reviews:23,  image:"🗿", kabupaten:"Sorong Selatan", sold:67,  desc:"Ukiran kayu motif leluhur suku Kamoro, karya seniman OAP bersertifikat." },
  { id:5,  name:"Sagu Mutiara Premium",        category:"pertanian",  price:35000,   stock:120, seller:"UD Sagu Sorong",            sellerOAP:true,  rating:4.6, reviews:201, image:"🌾", kabupaten:"Sorong",        sold:1203, desc:"Sagu mutiara murni proses tradisional, bebas bahan pengawet." },
  { id:6,  name:"Pinang Sirih Paket",          category:"pertanian",  price:25000,   stock:200, seller:"Mama Rosina Sorong",        sellerOAP:true,  rating:4.5, reviews:88,  image:"🌿", kabupaten:"Tambrauw",      sold:567,  desc:"Pinang dan sirih segar pilihan, simbol budaya dan keramahan OAP." },
  { id:7,  name:"Gelang Manik Papua",          category:"kerajinan",  price:120000,  stock:35,  seller:"Sanggar Karya OAP Sorong",  sellerOAP:true,  rating:4.8, reviews:65,  image:"📿", kabupaten:"Sorong",        sold:234,  desc:"Gelang manik warna-warni motif suku Moi, dibuat tangan pengrajin OAP." },
  { id:8,  name:"Lobster Beku 500g",           category:"perikanan",  price:280000,  stock:15,  seller:"CV Hasil Laut Tambrauw",    sellerOAP:true,  rating:4.9, reviews:44,  image:"🦞", kabupaten:"Tambrauw",      sold:189,  desc:"Lobster beku vacuum-pack dari perairan Tambrauw, segar dan berkualitas ekspor." },
  { id:9,  name:"Minyak Kayu Putih 100ml",    category:"pertanian",  price:55000,   stock:80,  seller:"Koperasi Herbal Papua",     sellerOAP:true,  rating:4.7, reviews:112, image:"🧴", kabupaten:"Sorong Selatan", sold:678, desc:"Minyak kayu putih murni destilasi tradisional dari hutan Papua Barat Daya." },
  { id:10, name:"Tas Anyaman Pandan",          category:"kerajinan",  price:165000,  stock:18,  seller:"Mama Kreasi Ayamaru",       sellerOAP:true,  rating:4.8, reviews:39,  image:"👜", kabupaten:"Maybrat",       sold:156,  desc:"Tas anyaman daun pandan asli Maybrat, kuat dan ramah lingkungan." },
  { id:11, name:"Udang Galah Segar",           category:"perikanan",  price:175000,  stock:25,  seller:"Nelayan Sorong Selatan",    sellerOAP:true,  rating:4.7, reviews:71,  image:"🦐", kabupaten:"Sorong Selatan", sold:342, desc:"Udang galah air tawar segar dari sungai-sungai Papua Barat Daya." },
  { id:12, name:"Madu Hutan Papua 250ml",      category:"pertanian",  price:135000,  stock:50,  seller:"Komunitas Lebah Tambrauw",  sellerOAP:true,  rating:4.9, reviews:93,  image:"🍯", kabupaten:"Tambrauw",      sold:421,  desc:"Madu hutan murni dipanen secara lestari oleh komunitas adat Tambrauw." },
  { id:13, name:"Kain Timor Sorong",           category:"kerajinan",  price:320000,  stock:12,  seller:"Tenun Mama Sara Sorong",    sellerOAP:true,  rating:4.8, reviews:28,  image:"🧵", kabupaten:"Sorong",        sold:89,   desc:"Kain tenun tangan dengan motif geometris khas Papua Barat Daya." },
  { id:14, name:"Cengkeh Kering 500g",         category:"pertanian",  price:85000,   stock:75,  seller:"Petani Rempah Maybrat",     sellerOAP:true,  rating:4.6, reviews:48,  image:"🌺", kabupaten:"Maybrat",       sold:267,  desc:"Cengkeh kering berkualitas tinggi dari perkebunan organik Maybrat." },
];

const wisata = [
  { id:1, name:"Raja Ampat Islands",       lokasi:"Kabupaten Raja Ampat",   harga:350000, rating:5.0, reviews:2847, image:"🏝️", kategori:"bahari",  durasi:"3-7 hari", highlights:["Snorkeling & Diving","Bird Watching","Island Hopping"], tersedia:true,  desc:"Surga bawah laut dunia dengan 1.500+ spesies ikan dan 600+ terumbu karang." },
  { id:2, name:"Danau Ayamaru",            lokasi:"Kabupaten Maybrat",      harga:75000,  rating:4.8, reviews:445,  image:"🏞️", kategori:"alam",    durasi:"1-2 hari", highlights:["Kayak","Memancing","Sunset"],                              tersedia:true,  desc:"Danau biru kristal di tengah hutan tropis, keindahan tersembunyi Papua Barat Daya." },
  { id:3, name:"Pulau Doom Bersejarah",    lokasi:"Kota Sorong",            harga:50000,  rating:4.6, reviews:312,  image:"⛵",  kategori:"budaya",  durasi:"1 hari",   highlights:["Sejarah Kolonial","Pantai","Kuliner Laut"],                  tersedia:true,  desc:"Pulau bersejarah dekat kota Sorong, perpaduan wisata sejarah dan pantai indah." },
  { id:4, name:"Hutan Tambrauw",           lokasi:"Kabupaten Tambrauw",     harga:125000, rating:4.9, reviews:178,  image:"🌳", kategori:"alam",    durasi:"2-4 hari", highlights:["Trekking","Cendrawasih","Kampung Adat"],                    tersedia:true,  desc:"Hutan tropis primer terlindungi, habitat cendrawasih dan anggrek langka Papua." },
  { id:5, name:"Pantai Tanjung Kasuari",  lokasi:"Kota Sorong",            harga:30000,  rating:4.5, reviews:623,  image:"🌊", kategori:"bahari",  durasi:"1 hari",   highlights:["Berenang","Sunset","Kuliner"],                               tersedia:true,  desc:"Pantai berpasir putih favorit warga Sorong dengan pemandangan matahari terbenam." },
  { id:6, name:"Kampung Adat Maybrat",    lokasi:"Kabupaten Maybrat",      harga:95000,  rating:4.7, reviews:89,   image:"🏘️", kategori:"budaya",  durasi:"1-2 hari", highlights:["Tari Adat","Kerajinan","Ritual Tradisional"],               tersedia:true,  desc:"Pengalaman autentik kehidupan OAP suku Maybrat, adat istiadat dan kearifan lokal." },
  { id:7, name:"Sorong Selatan Mangrove", lokasi:"Kabupaten Sorong Selatan",harga:85000,  rating:4.6, reviews:134,  image:"🦜", kategori:"alam",    durasi:"1-2 hari", highlights:["Kano","Mangrove Tour","Birdwatching"],                      tersedia:true,  desc:"Hutan mangrove terluas di Papua Barat Daya dengan keanekaragaman hayati tinggi." },
  { id:8, name:"Festival Budaya Sorong",  lokasi:"Kota Sorong",            harga:45000,  rating:4.8, reviews:267,  image:"🎭", kategori:"budaya",  durasi:"1 hari",   highlights:["Tari Papua","Pameran Kuliner","Kerajinan"],                  tersedia:false, desc:"Festival tahunan yang menampilkan kebudayaan 5 kabupaten/kota Papua Barat Daya." },
];

const orders = [
  { id:"ORD-2025-001", product:"Noken Rajut Tradisional", qty:2, total:370000,  status:"delivered",  date:"2025-04-28", buyer:"Budi Santoso",   kota:"Jakarta" },
  { id:"ORD-2025-002", product:"Kopi Papua Arabika 250g", qty:5, total:375000,  status:"shipping",   date:"2025-04-29", buyer:"Sari Dewi",      kota:"Surabaya" },
  { id:"ORD-2025-003", product:"Ukiran Kayu Kamoro",      qty:1, total:450000,  status:"processing", date:"2025-04-30", buyer:"James Wally",    kota:"Manokwari" },
  { id:"ORD-2025-004", product:"Lobster Beku 500g",       qty:3, total:840000,  status:"pending",    date:"2025-04-30", buyer:"Rudi Harmoko",   kota:"Makassar" },
  { id:"ORD-2025-005", product:"Madu Hutan Papua 250ml",  qty:2, total:270000,  status:"delivered",  date:"2025-04-27", buyer:"Dewi Kurnia",    kota:"Bandung" },
];

const bookings = [
  { id:"BKG-2025-001", wisata:"Raja Ampat Islands",    tgl:"2025-05-10", pax:4, total:1400000, status:"confirmed", guide:"Yoseph Faidiban (OAP)" },
  { id:"BKG-2025-002", wisata:"Danau Ayamaru",          tgl:"2025-05-15", pax:2, total:150000,  status:"pending",   guide:"Maria Kambu (OAP)" },
  { id:"BKG-2025-003", wisata:"Kampung Adat Maybrat",  tgl:"2025-05-08", pax:6, total:570000,  status:"confirmed", guide:"Yonas Aibo (OAP)" },
  { id:"BKG-2025-004", wisata:"Hutan Tambrauw",         tgl:"2025-05-20", pax:3, total:375000,  status:"review",    guide:"Belum ditentukan" },
];

const stats = {
  totalUMKM:1247, totalOAP:834, totalProduk:4523, totalTransaksi:15678,
  omzetBulanIni:2847650000, wisatawan:3421, padTerkumpul:487250000,
  kabupaten:["Sorong","Raja Ampat","Maybrat","Sorong Selatan","Tambrauw"],
  chartOmzet:[
    {bulan:"Jan",nilai:1850000000},{bulan:"Feb",nilai:2100000000},
    {bulan:"Mar",nilai:1975000000},{bulan:"Apr",nilai:2350000000},{bulan:"Mei",nilai:2847650000}
  ],
  sektorProduk:[
    {sektor:"Kerajinan",persen:35},{sektor:"Perikanan",persen:28},
    {sektor:"Pertanian",persen:22},{sektor:"Kuliner",persen:10},{sektor:"Lainnya",persen:5}
  ]
};

const users = [
  { id:1, name:"Yuliana Yabansabra", email:"yuliana@papuana.id",          role:"umkm",  oap:true,  kabupaten:"Sorong",        joined:"2024-01-15", status:"active", saldo:2450000 },
  { id:2, name:"Admin Pemda Sorong", email:"admin@pemda-sorong.go.id",    role:"admin", oap:false, kabupaten:"Sorong",        joined:"2024-01-01", status:"active", saldo:0 },
  { id:3, name:"Agus Kamoro",        email:"agus@papuana.id",             role:"umkm",  oap:true,  kabupaten:"Sorong Selatan",joined:"2024-02-20", status:"active", saldo:1200000 },
  { id:4, name:"Demo User",          email:"demo@papuana.id",             role:"umkm",  oap:true,  kabupaten:"Maybrat",       joined:"2025-01-01", status:"active", saldo:500000 },
];

const guides = [
  { id:1, name:"Yoseph Faidiban", rating:4.9, reviews:87, bahasa:["Indonesia","Inggris","Raja Ampat"], spesialisasi:"Diving & Snorkeling",    oap:true, harga:350000, tersedia:true  },
  { id:2, name:"Maria Kambu",     rating:4.8, reviews:54, bahasa:["Indonesia","Inggris"],              spesialisasi:"Alam & Trekking",         oap:true, harga:250000, tersedia:true  },
  { id:3, name:"Yonas Aibo",      rating:5.0, reviews:32, bahasa:["Indonesia","Maybrat"],              spesialisasi:"Budaya & Adat",           oap:true, harga:200000, tersedia:true  },
  { id:4, name:"Samuel Mandowen", rating:4.7, reviews:61, bahasa:["Indonesia","Inggris","Mandarin"],   spesialisasi:"Fotografi & Birding",     oap:true, harga:300000, tersedia:true  },
  { id:5, name:"Elsina Wanma",    rating:4.8, reviews:43, bahasa:["Indonesia","Inggris"],              spesialisasi:"Homestay & Kuliner Lokal",oap:true, harga:180000, tersedia:false },
];

const kursus = [
  { id:1,  judul:"Digital Marketing untuk UMKM", kategori:"digital",   level:"pemula",   durasi:"8 jam", peserta:1247, rating:4.8, instruktur:"Tim PAPUANA", gratis:true,  desc:"Pelajari cara memasarkan produk OAP ke pasar nasional lewat media sosial dan marketplace.", modul:["Pengenalan Digital Marketing","Instagram & TikTok Shop","Google My Business","Analitik Dasar"] },
  { id:2,  judul:"Pembukuan Sederhana UMKM",      kategori:"keuangan",  level:"pemula",   durasi:"6 jam", peserta:934,  rating:4.7, instruktur:"Ir. Budi CPA", gratis:true,  desc:"Cara mencatat pemasukan, pengeluaran, dan menghitung laba rugi usaha kecil.",              modul:["Dasar Akuntansi","Kas Harian","Laporan Laba Rugi","Pajak Sederhana"] },
  { id:3,  judul:"Bisnis Kerajinan OAP Go Online", kategori:"bisnis",   level:"pemula",   durasi:"10 jam",peserta:756,  rating:4.9, instruktur:"Mama Yuliana", gratis:true,  desc:"Panduan lengkap membuka toko online dan menjual kerajinan khas OAP ke seluruh Indonesia.",  modul:["Foto Produk HP","Pricing Strategy","Kemasan Menarik","COD & Pengiriman"] },
  { id:4,  judul:"Pemandu Wisata Profesional",     kategori:"wisata",   level:"menengah", durasi:"16 jam",peserta:423,  rating:4.9, instruktur:"Yoseph Faidiban",gratis:false, desc:"Sertifikasi resmi pemandu wisata OAP dari Dinas Pariwisata Papua Barat Daya.",            modul:["Sejarah & Budaya Papua","Keselamatan Wisata","Bahasa Inggris Pariwisata","P3K"] },
  { id:5,  judul:"Budidaya Ikan Lele & Nila",      kategori:"pertanian",level:"pemula",   durasi:"12 jam",peserta:612,  rating:4.6, instruktur:"Penyuluh KKP",  gratis:true,  desc:"Teknik budidaya ikan air tawar untuk menambah pendapatan keluarga OAP.",                  modul:["Persiapan Kolam","Pemilihan Bibit","Pakan & Nutrisi","Panen & Pemasaran"] },
  { id:6,  judul:"E-Commerce Lanjutan",             kategori:"digital",  level:"lanjutan", durasi:"20 jam",peserta:287,  rating:4.8, instruktur:"Tim Shopee Edu",gratis:false, desc:"Optimalkan toko online: SEO produk, iklan berbayar, dan manajemen stok otomatis.",        modul:["SEO Produk","Tokopedia Ads","Flash Sale Strategy","Auto-Responder"] },
  { id:7,  judul:"Anyaman & Kerajinan Noken",       kategori:"kerajinan",level:"pemula",   durasi:"14 jam",peserta:534,  rating:5.0, instruktur:"Sanggar OAP",   gratis:true,  desc:"Teknik anyaman noken tradisional dan inovasi desain untuk pasar modern.",                 modul:["Teknik Dasar Anyam","Motif Tradisional","Inovasi Desain","HKI Produk"] },
  { id:8,  judul:"Manajemen Keuangan UMKM",         kategori:"keuangan", level:"menengah", durasi:"12 jam",peserta:389,  rating:4.7, instruktur:"OJK Papua",     gratis:true,  desc:"Strategi pengelolaan keuangan, akses modal, dan perencanaan investasi usaha kecil.",      modul:["Cash Flow Management","Akses KUR","Investasi Reksa Dana","Asuransi UMKM"] },
];

const transaksiFintech = [
  { id:"TXN-001", jenis:"Terima",  nominal:185000,  keterangan:"Penjualan Noken Rajut",     waktu:"2025-05-01 09:30", saldo:2635000 },
  { id:"TXN-002", jenis:"Keluar",  nominal:50000,   keterangan:"Beli bahan baku anyaman",   waktu:"2025-05-01 11:00", saldo:2585000 },
  { id:"TXN-003", jenis:"Terima",  nominal:75000,   keterangan:"Penjualan Kopi Arabika",    waktu:"2025-04-30 14:20", saldo:2660000 },
  { id:"TXN-004", jenis:"Keluar",  nominal:35000,   keterangan:"Ongkir pengiriman produk",  waktu:"2025-04-29 10:15", saldo:2625000 },
  { id:"TXN-005", jenis:"Terima",  nominal:120000,  keterangan:"Komisi booking guide",      waktu:"2025-04-28 16:45", saldo:2745000 },
];

const padData = {
  totalPAD: 487250000,
  target:   850000000,
  persen:   57,
  sumberPAD: [
    { sumber:"Retribusi Wisata",   nominal:245000000, persen:50 },
    { sumber:"Pajak UMKM Digital", nominal:118000000, persen:24 },
    { sumber:"Biaya Perizinan",    nominal:78000000,  persen:16 },
    { sumber:"Komisi Platform",    nominal:46250000,  persen:10 },
  ],
  perKabupaten: [
    { kab:"Sorong",          nominal:198000000 },
    { kab:"Raja Ampat",      nominal:142000000 },
    { kab:"Maybrat",         nominal:67000000  },
    { kab:"Sorong Selatan",  nominal:48000000  },
    { kab:"Tambrauw",        nominal:32250000  },
  ],
  retribusiWisata: [
    { destinasi:"Raja Ampat Islands",    tiket:1420, pendapatan:142000000 },
    { destinasi:"Danau Ayamaru",         tiket:567,  pendapatan:42525000  },
    { destinasi:"Pantai Tanjung Kasuari",tiket:1890, pendapatan:56700000  },
    { destinasi:"Hutan Tambrauw",        tiket:312,  pendapatan:39000000  },
    { destinasi:"Pulau Doom",            tiket:445,  pendapatan:22250000  },
    { destinasi:"Kampung Adat Maybrat",  tiket:234,  pendapatan:22230000  },
  ]
};

const agriData = {
  komoditas: [
    { nama:"Ikan Kerapu",    harga:95000,  satuan:"kg",   tren:"naik",   persen:8  },
    { nama:"Lobster",        harga:280000, satuan:"kg",   tren:"naik",   persen:12 },
    { nama:"Udang Galah",    harga:175000, satuan:"kg",   tren:"stabil", persen:0  },
    { nama:"Kopi Arabika",   harga:75000,  satuan:"250g", tren:"naik",   persen:5  },
    { nama:"Sagu Mutiara",   harga:35000,  satuan:"kg",   tren:"turun",  persen:-3 },
    { nama:"Cengkeh",        harga:170000, satuan:"kg",   tren:"naik",   persen:15 },
    { nama:"Madu Hutan",     harga:540000, satuan:"liter",tren:"naik",   persen:7  },
    { nama:"Pinang",         harga:25000,  satuan:"ikat", tren:"stabil", persen:0  },
  ],
  nelayan: [
    { nama:"Kelompok Nelayan Doom",      anggota:24, statusKuota:"aktif",  tangkapanBulan:"4.2 ton" },
    { nama:"Koperasi Nelayan Tambrauw",  anggota:18, statusKuota:"aktif",  tangkapanBulan:"3.1 ton" },
    { nama:"Nelayan Sorong Selatan",     anggota:31, statusKuota:"aktif",  tangkapanBulan:"5.8 ton" },
  ]
};

const pengaduan = [
  { id:"PGD-001", judul:"Jalan rusak menuju Kampung Maybrat", kategori:"infrastruktur", status:"diproses",  tgl:"2025-04-28", pelapor:"Warga Maybrat" },
  { id:"PGD-002", judul:"Bantuan bibit belum tersalurkan",     kategori:"pertanian",    status:"selesai",   tgl:"2025-04-20", pelapor:"Petani Tambrauw" },
  { id:"PGD-003", judul:"Sinyal internet lemah di Sorong Selatan",kategori:"digital",   status:"menunggu",  tgl:"2025-04-30", pelapor:"UMKM Sorong Sel" },
];

module.exports = { products, wisata, orders, bookings, stats, users, guides, kursus, transaksiFintech, padData, agriData, pengaduan };
