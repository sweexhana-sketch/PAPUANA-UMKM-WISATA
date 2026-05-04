// ============================================================
//  PAPUANA — Frontend Application (SPA)
//  Terhubung ke Backend API Express.js
// ============================================================

const API = '';  // kosong = relative URL (same host)
let currentUser = null;
let allProducts = [];
let allWisata   = [];

// ── Utility ─────────────────────────────────────────────────

function fmt(n) {
  if (n >= 1_000_000_000) return 'Rp ' + (n / 1_000_000_000).toFixed(1) + ' M';
  if (n >= 1_000_000)     return 'Rp ' + (n / 1_000_000).toFixed(1) + ' Jt';
  return 'Rp ' + Number(n).toLocaleString('id-ID');
}

function fmtNum(n) {
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return n;
}

async function apiFetch(path, opts = {}) {
  try {
    const res  = await fetch(API + path, {
      headers: { 'Content-Type': 'application/json', ...(opts.headers || {}) },
      ...opts
    });
    return await res.json();
  } catch (e) {
    console.error('API Error:', path, e);
    return { success: false, message: 'Gagal menghubungi server' };
  }
}

// ── Toast ────────────────────────────────────────────────────

function showToast(msg, type = 'success') {
  const c = document.getElementById('toast-container');
  const t = document.createElement('div');
  t.className = `toast toast-${type}`;
  t.innerHTML = `<span>${type === 'success' ? '✅' : '❌'}</span><span>${msg}</span>`;
  c.appendChild(t);
  requestAnimationFrame(() => t.classList.add('show'));
  setTimeout(() => { 
    t.classList.remove('show'); 
    setTimeout(() => t.remove(), 300); 
  }, 3500);
}

// ── Navigation ───────────────────────────────────────────────

function navigate(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  const el = document.getElementById('page-' + page);
  if (el) el.classList.add('active');
  const nl = document.querySelector(`[data-nav="${page}"]`);
  if (nl) nl.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (page === 'home')        loadHome();
  if (page === 'marketplace') loadMarketplace();
  if (page === 'wisata')      loadWisata();
  if (page === 'edukasi')     loadEdukasi();
  if (page === 'fintech')     loadFintech();
  if (page === 'agri')        loadAgri();
  if (page === 'budaya')      loadBudaya();
  if (page === 'dashboard')   loadDashboard();
  if (page === 'pad')         loadPAD();
}

// ── Modal ────────────────────────────────────────────────────

function openModal(id)  { 
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add('open'); 
    document.body.style.overflow = 'hidden'; 
  }
}

function closeModal(id) { 
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove('open'); 
    document.body.style.overflow = ''; 
  }
}

function closeModalIfOverlay(e, id) { 
  if (e.target.classList.contains('modal-overlay')) closeModal(id); 
}

// ── Auth ─────────────────────────────────────────────────────

async function doLogin() {
  const email = document.getElementById('login-email').value.trim();
  const pass  = document.getElementById('login-pass').value;
  if (!email || !pass) return showToast('Isi email dan password', 'error');

  const r = await apiFetch('/api/auth/login', {
    method: 'POST', body: JSON.stringify({ email, password: pass })
  });
  if (r.success) {
    currentUser = r.data.user;
    localStorage.setItem('papuana_user', JSON.stringify(currentUser));
    updateNavUser();
    closeModal('modal-login');
    showToast(r.message, 'success');
  } else {
    showToast(r.message, 'error');
  }
}

async function doRegister() {
  const name  = document.getElementById('reg-name').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const pass  = document.getElementById('reg-pass').value;
  const isOAP = document.getElementById('reg-oap')?.checked || false;
  const kabupaten = document.getElementById('reg-kabupaten')?.value || 'Sorong';

  if (!name || !email || !pass) return showToast('Lengkapi semua field', 'error');

  const r = await apiFetch('/api/auth/register', {
    method: 'POST', body: JSON.stringify({ name, email, password: pass, kabupaten, isOAP })
  });
  if (r.success) {
    currentUser = r.data.user;
    localStorage.setItem('papuana_user', JSON.stringify(currentUser));
    updateNavUser();
    closeModal('modal-register');
    showToast(r.message, 'success');
    if (isOAP) showToast('🌿 Status OAP terverifikasi! Anda mendapat akses prioritas.', 'success');
  } else {
    showToast(r.message, 'error');
  }
}

function logout() {
  currentUser = null;
  localStorage.removeItem('papuana_user');
  updateNavUser();
  showToast('Sampai jumpa! 👋', 'success');
}

function updateNavUser() {
  const areaAnon = document.getElementById('nav-user-area');
  const areaUser = document.getElementById('nav-user-info');
  if (currentUser) {
    areaAnon.classList.add('hidden');
    areaUser.classList.remove('hidden');
    document.getElementById('nav-username').textContent = currentUser.name;
    const oapBadge = document.getElementById('nav-oap-badge');
    if (currentUser.oap) oapBadge.classList.remove('hidden');
    else oapBadge.classList.add('hidden');
  } else {
    areaAnon.classList.remove('hidden'); areaUser.classList.add('hidden');
  }
}

// ── HOME ─────────────────────────────────────────────────────

async function loadHome() {
  // Load stats
  const s = await apiFetch('/api/stats');
  if (s.success) {
    const d = s.data;
    animateCounter('hs-umkm',      d.totalUMKM,    '+');
    animateCounter('hs-oap',       d.totalOAP,     '');
    animateCounter('hs-produk',    d.totalProduk,  '+');
    animateCounter('hs-wisatawan', d.wisatawan,    'k');
  }

  // Load featured products (top 4)
  const p = await apiFetch('/api/products?sort=terlaris');
  if (p.success) {
    const html = p.data.slice(0, 4).map(renderProductCard).join('');
    document.getElementById('home-products').innerHTML = html;
  }
}

function animateCounter(id, target, suffix) {
  const el = document.getElementById(id);
  if (!el) return;
  let cur = 0;
  const step = Math.ceil(target / 50) || 1;
  const t = setInterval(() => {
    cur = Math.min(cur + step, target);
    el.textContent = cur + suffix;
    if (cur >= target) clearInterval(t);
  }, 30);
}

// ── MARKETPLACE ──────────────────────────────────────────────

async function loadMarketplace() {
  const grid = document.getElementById('mp-grid');
  if (!grid) return;
  grid.innerHTML = '<div style="padding: 40px; text-align: center; grid-column: 1/-1;">Memuat produk...</div>';

  const params = buildMpParams();
  const r = await apiFetch('/api/products?' + params);

  if (r.success) {
    allProducts = r.data;
    grid.innerHTML = r.data.length
      ? r.data.map(renderProductCard).join('')
      : '<p style="padding:40px; text-align:center; grid-column: 1/-1;">Tidak ada produk ditemukan</p>';
  }
}

function buildMpParams() {
  const search  = document.getElementById('mp-search')?.value   || '';
  const cat     = document.getElementById('mp-category')?.value || 'all';
  const kab     = document.getElementById('mp-kabupaten')?.value|| 'all';
  const p = new URLSearchParams();
  if (search) p.set('search', search);
  if (cat !== 'all') p.set('category', cat);
  if (kab !== 'all') p.set('kabupaten', kab);
  return p.toString();
}

let mpTimer;
function filterProducts() {
  clearTimeout(mpTimer);
  mpTimer = setTimeout(loadMarketplace, 400);
}

function renderProductCard(p) {
  return `
  <div class="card product-card reveal" onclick="openProductDetail(${p.id})">
    <div style="font-size:64px; text-align:center; padding: 24px; background: var(--p-bg); border-radius: 12px; margin-bottom: 16px;">${p.image}</div>
    <div class="flex-between mb-8">
      <span class="product-cat">${p.category}</span>
      ${p.sellerOAP ? '<div class="badge-oap">🌿 OAP</div>' : ''}
    </div>
    <h3 class="mb-4">${p.name}</h3>
    <p class="mb-8" style="font-size: 13px; color: var(--p-text-muted)">oleh ${p.seller} · ${p.kabupaten}</p>
    <div class="flex-between">
      <div style="font-weight: 700; color: var(--p-forest); font-size: 18px;">${fmt(p.price)}</div>
      <div style="font-size: 12px; font-weight: 600; color: var(--p-text-muted)">⭐ ${p.rating}</div>
    </div>
  </div>`;
}

async function openProductDetail(id) {
  const r = await apiFetch('/api/products/' + id);
  if (!r.success) return showToast('Gagal memuat produk', 'error');
  const p = r.data;
  const body = document.getElementById('mp-body');
  body.innerHTML = `
    <div style="text-align:center;font-size:80px;padding:32px;background:var(--p-bg);border-radius:16px;margin-bottom:24px">${p.image}</div>
    <div class="flex-between mb-12">
      <span class="product-cat">${p.category}</span>
      ${p.sellerOAP ? '<div class="badge-oap">🌿 OAP Terverifikasi</div>' : ''}
    </div>
    <h2 class="mb-8">${p.name}</h2>
    <p class="mb-12" style="color: var(--p-text-muted)">Penjual: <strong>${p.seller}</strong> · ${p.kabupaten}</p>
    <p class="mb-24">${p.desc}</p>
    <div class="card mb-24" style="background: var(--p-bg); border: none;">
      <div class="flex-between">
        <div>
          <div style="font-size: 12px; color: var(--p-text-muted);">Harga</div>
          <div style="font-size: 24px; font-weight: 800; color: var(--p-forest);">${fmt(p.price)}</div>
        </div>
        <div style="text-align: right;">
          <div style="font-size: 12px; color: var(--p-text-muted);">Rating</div>
          <div style="font-weight: 700;">⭐ ${p.rating} (${p.reviews} ulasan)</div>
        </div>
      </div>
    </div>
    <button class="btn btn-primary btn-full" onclick="beliSekarang(${p.id}, '${p.name.replace(/'/g, "\\'")}', ${p.price})">Beli Sekarang</button>
  `;
  openModal('modal-product');
}

async function beliSekarang(id, name, price) {
  if (!currentUser) {
    closeModal('modal-product');
    openModal('modal-login');
    return showToast('Login terlebih dahulu', 'error');
  }
  const r = await apiFetch('/api/orders', {
    method: 'POST',
    body: JSON.stringify({ productId: id, productName: name, qty: 1, total: price, buyer: currentUser.name, kota: 'Sorong' })
  });
  if (r.success) {
    closeModal('modal-product');
    showToast(`✅ Pesanan ${name} berhasil!`, 'success');
  } else showToast(r.message, 'error');
}

// ── WISATA ───────────────────────────────────────────────────

async function loadWisata() {
  const grid = document.getElementById('ws-grid');
  if (!grid) return;
  grid.innerHTML = '<div style="padding:40px;text-align:center;grid-column:1/-1;"><div class="spinner"></div> Memuat destinasi...</div>';
  const kat = document.getElementById('ws-kategori')?.value || 'all';
  const srch = document.getElementById('ws-search')?.value || '';
  const srt = document.getElementById('ws-sort')?.value || '';
  const params = new URLSearchParams();
  if (kat !== 'all') params.set('kategori', kat);
  if (srch) params.set('search', srch);
  if (srt) params.set('sort', srt);
  const r = await apiFetch('/api/wisata?' + params);
  if (r.success) {
    allWisata = r.data;
    grid.innerHTML = r.data.length ? r.data.map(renderWisataCard).join('') : '<p style="padding:40px;text-align:center;grid-column:1/-1;">Tidak ada destinasi ditemukan</p>';
  }
  const gr = await apiFetch('/api/wisata/guides');
  if (gr.success) {
    const guidesEl = document.getElementById('ws-guides');
    if (guidesEl) guidesEl.innerHTML = gr.data.map(g => `
      <div class="card" style="display:flex;gap:16px;align-items:flex-start">
        <div style="font-size:40px;width:56px;text-align:center">👤</div>
        <div style="flex:1">
          <div style="font-weight:700;margin-bottom:2px">${g.name} ${g.oap?'<span class="oap-badge">🌿 OAP</span>':''}</div>
          <div style="font-size:12px;color:var(--muted);margin-bottom:6px">⭐ ${g.rating} · ${g.reviews} ulasan · ${g.spesialisasi}</div>
          <div style="font-size:12px;color:var(--muted);margin-bottom:10px">🗣 ${g.bahasa.join(', ')}</div>
          <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px">
            <strong style="color:var(--forest)">${fmt(g.harga)}/hari</strong>
            <button class="btn btn-primary btn-sm" onclick="bookGuide(${g.id},'${g.name}')" ${!g.tersedia?'disabled style="opacity:.5"':''}>
              ${g.tersedia?'📅 Pesan Guide':'Tidak Tersedia'}
            </button>
          </div>
        </div>
      </div>`).join('');
  }
}

function renderWisataCard(w) {
  const st = w.tersedia ? '' : 'opacity:.6;';
  return `
  <div class="card reveal" style="${st}cursor:pointer" onclick="openWisataDetail(${w.id})">
    <div style="font-size:56px;text-align:center;padding:24px;background:linear-gradient(135deg,#e0f4ff,#c3e8f5);border-radius:12px;margin-bottom:16px;position:relative">
      ${w.image}
      ${!w.tersedia?'<span style="position:absolute;top:8px;right:8px;background:#fee2e2;color:#dc2626;font-size:10px;font-weight:700;padding:2px 8px;border-radius:20px">Tutup</span>':''}
    </div>
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
      <span class="badge badge-blue">${w.kategori}</span>
      <span style="font-size:13px;font-weight:700;color:var(--forest)">⭐ ${w.rating} (${w.reviews})</span>
    </div>
    <h3 style="margin-bottom:4px">${w.name}</h3>
    <p style="font-size:12px;margin-bottom:10px">📍 ${w.lokasi} · 🕐 ${w.durasi}</p>
    <div style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:14px">
      ${w.highlights.map(h=>`<span class="wisata-highlight">${h}</span>`).join('')}
    </div>
    <div style="display:flex;justify-content:space-between;align-items:center">
      <div style="font-weight:800;font-size:18px;color:var(--forest)">${fmt(w.harga)}<span style="font-size:11px;font-weight:400;color:var(--muted)">/org</span></div>
      <button class="btn btn-primary btn-sm" onclick="event.stopPropagation();openWisataDetail(${w.id})" ${!w.tersedia?'disabled':''}>Pesan</button>
    </div>
  </div>`;
}

let filterTimer;
function filterWisata() { clearTimeout(filterTimer); filterTimer = setTimeout(loadWisata, 400); }

async function openWisataDetail(id) {
  const r = await apiFetch('/api/wisata/' + id);
  if (!r.success) return showToast('Gagal memuat data', 'error');
  const w = r.data;
  const body = document.getElementById('ws-modal-body');
  if (!body) return;
  body.innerHTML = `
    <div style="font-size:72px;text-align:center;padding:28px;background:linear-gradient(135deg,#e0f4ff,#c3e8f5);border-radius:16px;margin-bottom:20px">${w.image}</div>
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
      <span class="badge badge-blue">${w.kategori}</span>
      <span style="font-weight:700">⭐ ${w.rating} (${w.reviews} ulasan)</span>
    </div>
    <h2 style="margin-bottom:6px">${w.name}</h2>
    <p style="font-size:13px;margin-bottom:12px">📍 ${w.lokasi} · 🕐 ${w.durasi}</p>
    <p style="margin-bottom:16px">${w.desc}</p>
    <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:20px">${w.highlights.map(h=>`<span class="wisata-highlight">${h}</span>`).join('')}</div>
    <div class="card" style="background:var(--wash);border:none;margin-bottom:16px">
      <h3 style="margin-bottom:12px">📅 Buat Booking</h3>
      <div class="form-group"><label class="form-label">Nama Pemesan</label><input class="form-input" id="book-nama" placeholder="Nama lengkap"></div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
        <div class="form-group"><label class="form-label">Tanggal Kunjungan</label><input class="form-input" id="book-tgl" type="date" min="${new Date().toISOString().split('T')[0]}"></div>
        <div class="form-group"><label class="form-label">Jumlah Orang</label><input class="form-input" id="book-pax" type="number" value="2" min="1" max="20"></div>
      </div>
      <div style="background:linear-gradient(135deg,var(--forest),var(--mid));color:white;border-radius:12px;padding:16px;margin-bottom:12px">
        <div style="font-size:12px;opacity:.7;margin-bottom:4px">Total Estimasi</div>
        <div id="book-total" style="font-size:1.5rem;font-weight:800">${fmt(w.harga)} × <span id="book-pax-label">2</span> orang = <span id="book-total-label">${fmt(w.harga*2)}</span></div>
      </div>
      <button class="btn btn-primary btn-full" onclick="doBooking(${w.id},'${w.name.replace(/'/g,"\\'")}',${w.harga})">✅ Konfirmasi Booking</button>
    </div>`;
  document.getElementById('book-pax')?.addEventListener('input', function() {
    const pax = parseInt(this.value)||1;
    document.getElementById('book-pax-label').textContent = pax;
    document.getElementById('book-total-label').textContent = fmt(w.harga * pax);
  });
  openModal('modal-wisata');
}

async function doBooking(id, name, harga) {
  const nama = document.getElementById('book-nama')?.value.trim();
  const tgl = document.getElementById('book-tgl')?.value;
  const pax = parseInt(document.getElementById('book-pax')?.value)||1;
  if (!nama) return showToast('Masukkan nama pemesan', 'error');
  if (!tgl) return showToast('Pilih tanggal kunjungan', 'error');
  const r = await apiFetch('/api/wisata/' + id + '/book', {
    method: 'POST', body: JSON.stringify({ nama, tgl, pax })
  });
  if (r.success) {
    closeModal('modal-wisata');
    showToast(`🏝️ Booking ${name} berhasil! ID: ${r.data.bookingId}`, 'success');
  } else showToast(r.message, 'error');
}

async function bookGuide(id, name) {
  if (!currentUser) { openModal('modal-login'); return showToast('Login terlebih dahulu', 'error'); }
  showToast(`📅 Pemesanan guide ${name} berhasil! Tim akan menghubungi Anda.`, 'success');
}




// ── EDUKASI ──────────────────────────────────────────────────

async function loadEdukasi() {
  const grid = document.getElementById('edu-grid');
  if (!grid) return;
  grid.innerHTML = '<div class="loading"><div class="spinner"></div>Memuat kursus...</div>';
  const search = document.getElementById('edu-search')?.value || '';
  const cat = document.getElementById('edu-cat')?.value || 'all';
  const level = document.getElementById('edu-level')?.value || 'all';
  const params = new URLSearchParams();
  if (search) params.set('search', search);
  if (cat !== 'all') params.set('kategori', cat);
  if (level !== 'all') params.set('level', level);
  const r = await apiFetch('/api/edukasi/kursus?' + params);
  if (r.success) {
    grid.innerHTML = r.data.length ? r.data.map(renderKursusCard).join('') : '<p style="padding:40px;text-align:center;grid-column:1/-1">Tidak ada kursus</p>';
  }
}

function renderKursusCard(k) {
  return `
  <div class="kursus-card reveal">
    <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px">
      <span class="kursus-level level-${k.level}">${k.level}</span>
      ${k.gratis ? '<span class="badge badge-green">GRATIS OAP</span>' : '<span class="badge badge-gold">Berbayar</span>'}
    </div>
    <h3 style="margin-bottom:6px;font-size:1rem">${k.judul}</h3>
    <p style="font-size:12px;margin-bottom:12px">${k.desc}</p>
    <div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:12px">
      ${k.modul.map(m=>`<span style="font-size:10px;padding:2px 8px;background:var(--wash);border-radius:20px;color:var(--muted)">${m}</span>`).join('')}
    </div>
    <div style="display:flex;justify-content:space-between;align-items:center;font-size:12px;color:var(--muted);margin-bottom:14px">
      <span>👨‍🏫 ${k.instruktur}</span><span>⏱ ${k.durasi}</span><span>👥 ${k.peserta.toLocaleString('id-ID')}</span><span>⭐ ${k.rating}</span>
    </div>
    <button class="btn btn-primary btn-full btn-sm" onclick="daftarKursus(${k.id},'${k.judul.replace(/'/g,"\\'")}')">
      ${k.gratis ? '🎓 Daftar Gratis' : '🎓 Daftar Sekarang'}
    </button>
  </div>`;
}

let eduTimer;
function filterKursus() { clearTimeout(eduTimer); eduTimer = setTimeout(loadEdukasi, 400); }

async function daftarKursus(id, judul) {
  if (!currentUser) { openModal('modal-login'); return showToast('Login untuk daftar kursus', 'error'); }
  const r = await apiFetch('/api/edukasi/daftar', {
    method: 'POST', body: JSON.stringify({ kursusId: id, nama: currentUser.name, email: currentUser.email })
  });
  if (r.success) showToast(`🎓 ${r.message}`, 'success');
  else showToast(r.message, 'error');
}

function daftarSertifikasi(nama) {
  if (!currentUser) { openModal('modal-login'); return showToast('Login terlebih dahulu', 'error'); }
  showToast(`🏆 Pendaftaran program "${nama}" berhasil! Tim PAPUANA akan menghubungi Anda.`, 'success');
}

// ── FINTECH ──────────────────────────────────────────────────

async function loadFintech() {
  const guest = document.getElementById('fintech-guest');
  const logged = document.getElementById('fintech-logged');
  if (!guest || !logged) return;
  if (!currentUser) { guest.classList.remove('hidden'); logged.classList.add('hidden'); return; }
  guest.classList.add('hidden'); logged.classList.remove('hidden');
  const el = document.getElementById('ft-user-name');
  if (el) el.textContent = currentUser.name + (currentUser.oap ? ' · 🌿 OAP' : '');
  const s = await apiFetch('/api/fintech/saldo');
  if (s.success) {
    const sal = document.getElementById('ft-saldo');
    if (sal) sal.textContent = fmt(s.data.saldo);
  }
  const tx = await apiFetch('/api/fintech/transaksi');
  if (tx.success) {
    const el2 = document.getElementById('ft-transaksi');
    if (el2) el2.innerHTML = tx.data.map(t => `
      <div style="display:flex;justify-content:space-between;align-items:center;padding:12px;border:1px solid var(--border);border-radius:10px;margin-bottom:8px">
        <div>
          <div style="font-weight:600;font-size:13px">${t.keterangan}</div>
          <div style="font-size:11px;color:var(--muted)">${t.waktu}</div>
        </div>
        <div style="font-weight:800;color:${t.jenis==='Terima'?'#10b981':'#ef4444'}">${t.jenis==='Terima'?'+':'-'}${fmt(t.nominal)}</div>
      </div>`).join('');
  }
}

async function ajukanPinjaman() {
  if (!currentUser) { openModal('modal-login'); return showToast('Login terlebih dahulu', 'error'); }
  const jumlah = document.getElementById('loan-amount')?.value;
  const tenor = document.getElementById('loan-tenor')?.value;
  const tujuan = document.getElementById('loan-tujuan')?.value?.trim();
  const isOAP = document.getElementById('loan-oap')?.checked;
  if (!tujuan) return showToast('Isi tujuan pinjaman', 'error');
  const r = await apiFetch('/api/fintech/pinjaman', {
    method: 'POST', body: JSON.stringify({ jumlah: parseInt(jumlah), tenor: parseInt(tenor), tujuan, isOAP })
  });
  if (r.success) showToast(`💸 ${r.message}`, 'success');
  else showToast(r.message, 'error');
}

// ── AGRI-MARITIM ─────────────────────────────────────────────

async function loadAgri() {
  const r = await apiFetch('/api/agri/komoditas');
  if (r.success) {
    const el = document.getElementById('agri-komoditas');
    if (el) el.innerHTML = r.data.map(k => `
      <div class="komoditas-item">
        <div>
          <div style="font-weight:700">${k.nama}</div>
          <div style="font-size:11px;color:var(--muted)">/  ${k.satuan}</div>
        </div>
        <div style="text-align:right">
          <div style="font-weight:800;color:var(--forest)">${fmt(k.harga)}</div>
          <div class="tren-${k.tren}">${k.tren==='naik'?'↑':k.tren==='turun'?'↓':'→'} ${k.persen !== 0 ? Math.abs(k.persen)+'%' : 'Stabil'}</div>
        </div>
      </div>`).join('');
  }
  const n = await apiFetch('/api/agri/nelayan');
  if (n.success) {
    const el = document.getElementById('agri-nelayan');
    if (el) el.innerHTML = n.data.map(g => `
      <div class="card" style="margin-bottom:10px;padding:16px">
        <div style="font-weight:700;margin-bottom:4px">🎣 ${g.nama}</div>
        <div style="font-size:12px;color:var(--muted)">${g.anggota} anggota · Tangkapan: ${g.tangkapanBulan}</div>
        <span class="badge badge-green" style="margin-top:6px">${g.statusKuota}</span>
      </div>`).join('');
  }
}

async function laporHasil() {
  if (!currentUser) { openModal('modal-login'); return showToast('Login terlebih dahulu', 'error'); }
  const jenis = document.getElementById('agri-jenis')?.value?.trim();
  const jumlah = document.getElementById('agri-jumlah')?.value;
  const satuan = document.getElementById('agri-satuan')?.value;
  const harga = document.getElementById('agri-harga')?.value;
  const lokasi = document.getElementById('agri-lokasi')?.value?.trim();
  if (!jenis || !jumlah) return showToast('Isi jenis dan jumlah komoditas', 'error');
  const r = await apiFetch('/api/agri/lapor-hasil', {
    method: 'POST', body: JSON.stringify({ jenis, jumlah, satuan, harga, lokasi })
  });
  if (r.success) { showToast(`✅ ${r.message}`, 'success'); ['agri-jenis','agri-jumlah','agri-harga','agri-lokasi'].forEach(id => { const el=document.getElementById(id); if(el) el.value=''; }); }
  else showToast(r.message, 'error');
}

// ── BUDAYA ───────────────────────────────────────────────────

async function loadBudaya() {
  const grid = document.getElementById('budaya-grid');
  if (!grid) return;
  grid.innerHTML = '<div class="loading"><div class="spinner"></div>Memuat galeri...</div>';
  const r = await apiFetch('/api/budaya/galeri');
  if (r.success) {
    grid.innerHTML = r.data.map(b => `
      <div class="card reveal" style="cursor:pointer" onclick="showToast('${b.judul} — ${b.daerah}')">
        <div style="font-size:56px;text-align:center;padding:24px;background:linear-gradient(135deg,#fdf3e3,#fde68a);border-radius:12px;margin-bottom:16px">${b.image}</div>
        <div style="display:flex;justify-content:space-between;margin-bottom:8px">
          <span class="badge badge-gold">${b.jenis}</span>
          ${b.hki?'<span class="badge badge-green">🛡 HKI</span>':''}
        </div>
        <h3 style="margin-bottom:4px;font-size:1rem">${b.judul}</h3>
        <p style="font-size:12px;margin-bottom:12px">📍 ${b.daerah}</p>
        <p style="font-size:12px;margin-bottom:16px">${b.desc}</p>
        <button class="btn btn-secondary btn-sm btn-full" onclick="event.stopPropagation();showToast('Detail budaya ${b.judul}')">Lihat Detail</button>
      </div>`).join('');
  }
}

// ── DASHBOARD ────────────────────────────────────────────────

async function loadDashboard() {
  const s = await apiFetch('/api/stats');
  const dStats = document.getElementById('dash-stats');
  if (s.success && dStats) {
    const d = s.data;
    dStats.innerHTML = `
      <div class="stat-card"><div class="stat-icon">🏪</div><div class="stat-val">${d.totalUMKM.toLocaleString('id-ID')}</div><div class="stat-lbl">UMKM Aktif</div><div class="stat-growth">↑ 8% bulan ini</div></div>
      <div class="stat-card"><div class="stat-icon">💰</div><div class="stat-val">${fmt(d.omzetBulanIni)}</div><div class="stat-lbl">Omzet/Bulan</div><div class="stat-growth">↑ 15% vs April</div></div>
      <div class="stat-card"><div class="stat-icon">🏛️</div><div class="stat-val">${fmt(d.padTerkumpul)}</div><div class="stat-lbl">PAD Masuk</div><div class="stat-growth">↑ 57% dari target</div></div>
      <div class="stat-card"><div class="stat-icon">✈️</div><div class="stat-val">${d.wisatawan.toLocaleString('id-ID')}</div><div class="stat-lbl">Wisatawan/Bln</div><div class="stat-growth">↑ 22% vs bulan lalu</div></div>`;
    const co = document.getElementById('chart-omzet');
    if (co) { const mx = Math.max(...d.chartOmzet.map(x=>x.nilai)); co.innerHTML = d.chartOmzet.map(x=>`<div class="chart-row"><div class="chart-label">${x.bulan}</div><div class="chart-track"><div class="chart-fill" style="width:${Math.round(x.nilai/mx*100)}%"><span class="chart-val">${fmt(x.nilai)}</span></div></div></div>`).join(''); }
    const cs = document.getElementById('chart-sektor');
    if (cs) cs.innerHTML = d.sektorProduk.map(x=>`<div class="chart-row"><div style="font-size:12px;color:var(--muted);width:80px;flex-shrink:0">${x.sektor}</div><div class="chart-track"><div class="chart-fill" style="width:${x.persen}%"><span class="chart-val">${x.persen}%</span></div></div></div>`).join('');
  }
  switchDashTab('orders', document.querySelector('.tab-btn.active'));
}

async function switchDashTab(tab, btn) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  ['dash-orders','dash-bookings','dash-pengaduan','dash-ptsp'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.add('hidden');
  });
  const target = document.getElementById('dash-' + tab);
  if (target) target.classList.remove('hidden');
  if (tab === 'orders') {
    const o = await apiFetch('/api/orders');
    const el = document.getElementById('dash-orders');
    if (o.success && el) el.innerHTML = `<table><thead><tr><th>ID</th><th>Produk</th><th>Pembeli</th><th>Total</th><th>Status</th></tr></thead><tbody>${o.data.map(x=>`<tr><td><strong>#${x.id.slice(-8)}</strong></td><td>${x.product}</td><td>${x.buyer} · ${x.kota}</td><td>${fmt(x.total)}</td><td><span class="status status-${x.status}">${x.status}</span></td></tr>`).join('')}</tbody></table>`;
  }
  if (tab === 'bookings') {
    const b = await apiFetch('/api/bookings');
    const el = document.getElementById('dash-bookings');
    if (b.success && el) el.innerHTML = `<table><thead><tr><th>ID</th><th>Destinasi</th><th>Tanggal</th><th>Pax</th><th>Total</th><th>Guide</th><th>Status</th></tr></thead><tbody>${b.data.map(x=>`<tr><td><strong>${x.id}</strong></td><td>${x.wisata}</td><td>${x.tgl}</td><td>${x.pax} org</td><td>${fmt(x.total)}</td><td>${x.guide}</td><td><span class="status status-${x.status}">${x.status}</span></td></tr>`).join('')}</tbody></table>`;
  }
  if (tab === 'pengaduan') {
    const p = await apiFetch('/api/pengaduan');
    const el = document.getElementById('pgd-list');
    if (p.success && el) el.innerHTML = p.data.map(x=>`<div class="pengaduan-item"><div style="width:40px;height:40px;border-radius:50%;background:var(--wash);display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0">📢</div><div style="flex:1"><div style="font-weight:700;margin-bottom:2px">${x.judul}</div><div style="font-size:12px;color:var(--muted)">${x.pelapor} · ${x.tgl} · <span class="badge badge-gray">${x.kategori}</span></div></div><span class="status status-${x.status}">${x.status}</span></div>`).join('');
  }
}

async function kirimPengaduan() {
  const judul = document.getElementById('pgd-judul')?.value?.trim();
  const kategori = document.getElementById('pgd-kategori')?.value;
  const pelapor = document.getElementById('pgd-pelapor')?.value?.trim();
  if (!judul) return showToast('Isi judul pengaduan', 'error');
  const r = await apiFetch('/api/pengaduan', {
    method: 'POST', body: JSON.stringify({ judul, kategori, pelapor: pelapor || 'Anonim' })
  });
  if (r.success) {
    showToast('📢 Pengaduan berhasil dikirim!', 'success');
    document.getElementById('pgd-judul').value = '';
    document.getElementById('pgd-pelapor').value = '';
    switchDashTab('pengaduan', null);
  } else showToast(r.message, 'error');
}

async function ajukanPTSP() {
  const jenis = document.getElementById('ptsp-jenis')?.value;
  const nama = document.getElementById('ptsp-nama')?.value?.trim();
  const usaha = document.getElementById('ptsp-usaha')?.value?.trim();
  const kab = document.getElementById('ptsp-kab')?.value;
  if (!nama || !usaha) return showToast('Lengkapi nama dan nama usaha', 'error');
  const r = await apiFetch('/api/ptsp/ajukan', {
    method: 'POST', body: JSON.stringify({ jenisIzin: jenis, nama, usaha, kabupaten: kab })
  });
  if (r.success) showToast(`🏛️ ${r.message}`, 'success');
  else showToast(r.message, 'error');
}

// ── PAD ──────────────────────────────────────────────────────

async function loadPAD() {
  const r = await apiFetch('/api/pad');
  if (!r.success) return;
  const d = r.data;
  const el = document.getElementById('pad-content');
  if (!el) return;
  el.innerHTML = `
    <div class="grid-4" style="margin-bottom:28px">
      <div class="stat-card" style="background:linear-gradient(135deg,#064e3b,#065f46);color:white;border:none">
        <div class="stat-icon">💰</div>
        <div style="font-family:var(--font-display);font-size:1.5rem;font-weight:800">${fmt(d.totalPAD)}</div>
        <div style="font-size:11px;opacity:.7;margin-top:4px">PAD Terkumpul</div>
        <div style="margin-top:8px;height:6px;background:rgba(255,255,255,.2);border-radius:4px;overflow:hidden">
          <div style="height:100%;background:#34d399;border-radius:4px;width:${d.persen}%"></div>
        </div>
        <div style="font-size:11px;opacity:.7;margin-top:4px">${d.persen}% dari target ${fmt(d.target)}</div>
      </div>
      ${d.sumberPAD.map(s=>`
        <div class="stat-card">
          <div class="stat-val" style="font-size:1.2rem">${fmt(s.nominal)}</div>
          <div class="stat-lbl">${s.sumber}</div>
          <div style="margin-top:8px;height:6px;background:var(--pale);border-radius:4px;overflow:hidden"><div style="height:100%;background:linear-gradient(90deg,var(--forest),var(--emerald));border-radius:4px;width:${s.persen}%"></div></div>
          <div class="stat-growth">${s.persen}% kontribusi</div>
        </div>`).join('')}
    </div>
    <div class="grid-2">
      <div class="card">
        <h3 style="margin-bottom:16px">📍 PAD per Kabupaten/Kota</h3>
        ${d.perKabupaten.map(k=>`<div class="chart-row" style="margin-bottom:8px"><div style="font-size:12px;color:var(--muted);width:110px;flex-shrink:0">${k.kab}</div><div class="chart-track" style="height:26px"><div class="chart-fill" style="width:${Math.round(k.nominal/d.totalPAD*100)}%"><span class="chart-val">${fmt(k.nominal)}</span></div></div></div>`).join('')}
      </div>
      <div class="card">
        <h3 style="margin-bottom:16px">🏝️ Retribusi per Destinasi Wisata</h3>
        <div class="table-wrap" style="border:none"><table><thead><tr><th>Destinasi</th><th>Tiket</th><th>Pendapatan</th></tr></thead><tbody>
          ${d.retribusiWisata.map(rv=>`<tr><td>${rv.destinasi}</td><td>${rv.tiket.toLocaleString('id-ID')}</td><td><strong style="color:var(--forest)">${fmt(rv.pendapatan)}</strong></td></tr>`).join('')}
        </tbody></table></div>
      </div>
    </div>`;
}

// ── HOME (update to load wisata) ─────────────────────────────

async function loadHomeWisata() {
  const hw = document.getElementById('home-wisata');
  if (!hw) return;
  const r = await apiFetch('/api/wisata');
  if (r.success) hw.innerHTML = r.data.slice(0,3).map(renderWisataCard).join('');
}

// ── Init ──────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('papuana_user');
  if (saved) { try { currentUser = JSON.parse(saved); updateNavUser(); } catch(e) {} }
  loadHome();
  loadHomeWisata();
});

