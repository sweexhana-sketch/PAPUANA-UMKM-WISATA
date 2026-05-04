// ============================================================
//  PAPUANA — Extended Frontend Logic
//  Edukasi · Profil · Toko · PAD Report
// ============================================================

// ── EDUKASI ──────────────────────────────────────────────────

async function loadEdukasi() {
  const grid = document.getElementById('edu-grid');
  if (!grid) return;
  grid.innerHTML = '<div class="loading"><div class="spinner"></div>Memuat kursus…</div>';

  const search   = document.getElementById('edu-search')?.value || '';
  const kategori = document.getElementById('edu-kategori')?.value || 'all';
  const params   = new URLSearchParams();
  if (search) params.set('search', search);
  if (kategori !== 'all') params.set('kategori', kategori);

  const r = await apiFetch('/api/kursus?' + params);
  if (r.success) {
    grid.innerHTML = r.data.length
      ? r.data.map(renderKursusCard).join('')
      : '<p class="text-muted" style="padding:40px;text-align:center">Tidak ada kursus ditemukan</p>';
  }
}

let eduTimer;
function filterKursus() {
  clearTimeout(eduTimer);
  eduTimer = setTimeout(loadEdukasi, 350);
}

function renderKursusCard(k) {
  return `
  <div class="card" style="overflow:hidden">
    <div style="height:100px;background:linear-gradient(135deg,var(--forest),var(--mid));display:flex;align-items:center;justify-content:center;font-size:48px">${k.image}</div>
    <div style="padding:18px">
      <div class="flex-between mb-8">
        <span class="badge badge-${k.oap_gratis ? 'green' : 'blue'}">${k.oap_gratis ? '🌿 GRATIS OAP' : 'Rp '+k.harga.toLocaleString('id-ID')}</span>
        <span class="badge badge-gray">${k.level}</span>
      </div>
      <div style="font-weight:600;font-size:14px;margin-bottom:4px;line-height:1.3">${k.judul}</div>
      <div class="text-sm text-muted mb-8">oleh ${k.instruktur}</div>
      <p class="text-sm mb-12">${k.deskripsi}</p>
      <div class="flex-between" style="font-size:11px;color:var(--muted);margin-bottom:14px">
        <span>⏱ ${k.durasi}</span>
        <span>📚 ${k.modul} modul</span>
        <span>⭐ ${k.rating}</span>
        <span>👥 ${k.peserta}</span>
      </div>
      <button class="btn btn-primary btn-full" onclick="daftarKursus(${k.id},'${k.judul.replace(/'/g,"\\'")}')">
        Mulai Belajar →
      </button>
    </div>
  </div>`;
}

async function daftarKursus(id, judul) {
  if (!currentUser) {
    openModal('modal-login');
    return showToast('Login terlebih dahulu untuk mendaftar kursus', 'error');
  }
  const r = await apiFetch(`/api/kursus/${id}/daftar`, { method: 'POST' });
  if (r.success) showToast(r.message, 'success');
  else showToast(r.message, 'error');
}

// ── PROFIL ───────────────────────────────────────────────────

async function loadProfil() {
  if (!currentUser) {
    openModal('modal-login');
    return;
  }

  // Update profil fields
  document.getElementById('profil-name').textContent    = currentUser.name || '—';
  document.getElementById('profil-email').textContent   = currentUser.email || '—';
  document.getElementById('profil-kab').textContent     = currentUser.kabupaten || '—';
  document.getElementById('profil-role').textContent    = currentUser.role === 'admin' ? 'Admin Pemda' : 'Pelaku UMKM';
  document.getElementById('profil-joined').textContent  = currentUser.joined || '—';
  document.getElementById('edit-name').value            = currentUser.name || '';
  document.getElementById('edit-kab').value             = currentUser.kabupaten || 'Sorong';

  const oapWrap = document.getElementById('profil-oap-wrap');
  if (currentUser.oap) oapWrap.classList.remove('hidden');
  else oapWrap.classList.add('hidden');

  // Load pengumuman
  const pengEl = document.getElementById('profil-pengumuman');
  const r = await apiFetch('/api/pengumuman');
  if (r.success) {
    pengEl.innerHTML = r.data.slice(0,3).map(p => `
      <div style="padding:12px 0;border-bottom:1px solid var(--border);display:flex;gap:10px;align-items:flex-start">
        <span style="font-size:20px;flex-shrink:0">${p.icon}</span>
        <div>
          <div style="font-size:12px;font-weight:600;margin-bottom:2px">${p.judul}</div>
          <div class="text-sm text-muted" style="line-height:1.4">${p.isi.substring(0,80)}…</div>
          <div class="text-sm" style="color:var(--pale);margin-top:4px">${p.tanggal}</div>
        </div>
      </div>`).join('');
  }
}

async function simpanProfil() {
  if (!currentUser) return;
  const name  = document.getElementById('edit-name').value;
  const hp    = document.getElementById('edit-hp').value;
  const kab   = document.getElementById('edit-kab').value;
  const bio   = document.getElementById('edit-bio').value;

  const r = await apiFetch(`/api/profil/${currentUser.id}`, {
    method: 'PUT', body: JSON.stringify({ name, noHP: hp, kabupaten: kab, bio })
  });
  if (r.success) {
    currentUser.name = name;
    currentUser.kabupaten = kab;
    localStorage.setItem('papuana_user', JSON.stringify(currentUser));
    updateNavUser();
    document.getElementById('profil-name').textContent = name;
    showToast(r.message, 'success');
  } else showToast(r.message, 'error');
}

// ── TOKO ─────────────────────────────────────────────────────

async function loadToko() {
  if (!currentUser) {
    openModal('modal-login');
    return;
  }
  loadTokoProduk();
}

async function loadTokoProduk() {
  const grid = document.getElementById('toko-produk-grid');
  if (!grid) return;
  const r = await apiFetch('/api/products');
  if (r.success) {
    grid.innerHTML = r.data.map(p => `
      <div class="product-card">
        <div class="product-emoji" style="height:100px;font-size:40px">${p.image}</div>
        <div class="product-body">
          <div class="product-name">${p.name}</div>
          <div class="product-seller">${p.category} · Stok: ${p.stock}</div>
          <div class="product-price">${fmt(p.price)}</div>
          <div class="product-footer">
            <span class="text-sm text-muted">🔥 ${p.sold} terjual</span>
            <div style="display:flex;gap:6px">
              <button class="btn btn-secondary btn-sm" onclick="showToast('✏️ Mode edit produk segera hadir','success')">Edit</button>
              <button class="btn btn-danger btn-sm" onclick="showToast('🗑️ Produk dihapus','success')">Hapus</button>
            </div>
          </div>
        </div>
      </div>`).join('');
  }
}

async function loadTokoPesanan() {
  const el = document.getElementById('toko-pesanan-table');
  if (!el) return;
  const r = await apiFetch('/api/orders');
  if (r.success) {
    el.innerHTML = `
      <div style="display:flex;gap:12px;margin-bottom:16px">
        ${[
          ['semua','Semua','badge-gray'],
          ['pending','Menunggu','badge-red'],
          ['processing','Diproses','badge-gold'],
          ['shipping','Dikirim','badge-blue'],
          ['delivered','Terkirim','badge-green']
        ].map(([v,l,cls]) => `<span class="badge ${cls}" style="cursor:pointer" onclick="filterPesananStatus('${v}')">${l}</span>`).join('')}
      </div>
      <table id="pesanan-table">
        <thead><tr><th>ID</th><th>Produk</th><th>Pembeli</th><th>Total</th><th>Status</th><th>Aksi</th></tr></thead>
        <tbody>${r.data.map(o => `
          <tr>
            <td><span style="font-family:monospace;font-size:11px">${o.id}</span></td>
            <td>${o.product} <span class="text-muted text-sm">×${o.qty}</span></td>
            <td>${o.buyer} <br><span class="text-muted text-sm">${o.kota} · ${o.date}</span></td>
            <td style="font-weight:600;color:var(--forest)">${fmt(o.total)}</td>
            <td><span class="status status-${o.status}">${statusLabel(o.status)}</span></td>
            <td>
              <button class="btn btn-secondary btn-sm" onclick="prosesOrder('${o.id}')">
                ${o.status === 'pending' ? '✅ Proses' : o.status === 'processing' ? '📦 Kirim' : '👁 Detail'}
              </button>
            </td>
          </tr>`).join('')}
        </tbody>
      </table>`;
  }
}

async function loadTokoKeuangan() {
  const el = document.getElementById('toko-keu-content');
  if (!el) return;
  const r = await apiFetch('/api/keuangan/transaksi');
  if (!r.success) return;

  const { ringkasan, data } = r;
  el.innerHTML = `
    <div class="grid-3 mb-20">
      <div class="stat-card" style="background:#e8f5e9">
        <div class="stat-icon">📈</div>
        <div class="stat-val" style="color:#2e7d32">${fmt(ringkasan.totalMasuk)}</div>
        <div class="stat-lbl">Total Pemasukan</div>
      </div>
      <div class="stat-card" style="background:#fee2e2">
        <div class="stat-icon">📉</div>
        <div class="stat-val" style="color:#dc2626">${fmt(ringkasan.totalKeluar)}</div>
        <div class="stat-lbl">Total Pengeluaran</div>
      </div>
      <div class="stat-card" style="background:linear-gradient(135deg,var(--wash),#fff8e7)">
        <div class="stat-icon">💰</div>
        <div class="stat-val">${fmt(ringkasan.saldo)}</div>
        <div class="stat-lbl">Saldo Bersih</div>
      </div>
    </div>
    <h3 style="margin-bottom:16px">📋 Riwayat Transaksi</h3>
    <div class="table-wrap">
      <table>
        <thead><tr><th>ID</th><th>Keterangan</th><th>Tipe</th><th>Jumlah</th><th>Tanggal</th></tr></thead>
        <tbody>${data.map(t => `
          <tr>
            <td><span style="font-family:monospace;font-size:11px">${t.id}</span></td>
            <td>${t.keterangan}</td>
            <td><span class="badge ${t.tipe === 'masuk' ? 'badge-green' : 'badge-red'}">${t.tipe === 'masuk' ? '↑ Masuk' : '↓ Keluar'}</span></td>
            <td style="font-weight:600;color:${t.tipe === 'masuk' ? 'var(--mid)' : '#dc2626'}">${t.tipe === 'masuk' ? '+' : '-'}${fmt(t.jumlah)}</td>
            <td class="text-muted text-sm">${t.tanggal}</td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
    <div class="mt-16" style="display:flex;gap:10px">
      <button class="btn btn-secondary" onclick="showToast('📄 Laporan keuangan PDF siap diunduh','success')">📄 Export Laporan</button>
      <button class="btn btn-secondary" onclick="showToast('📊 File Excel berhasil diunduh','success')">📊 Download Excel</button>
    </div>`;
}

function switchTokoTab(tab, btn) {
  document.querySelectorAll('#page-toko .tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('toko-produk').classList.toggle('hidden',  tab !== 'produk');
  document.getElementById('toko-pesanan').classList.toggle('hidden', tab !== 'pesanan');
  document.getElementById('toko-keuangan').classList.toggle('hidden',tab !== 'keuangan');

  if (tab === 'pesanan')  loadTokoPesanan();
  if (tab === 'keuangan') loadTokoKeuangan();
}

function prosesOrder(id) {
  showToast(`📦 Pesanan ${id} diproses dan siap dikirim!`, 'success');
}

function filterPesananStatus(status) {
  showToast(`Filter pesanan: ${status === 'semua' ? 'semua ditampilkan' : status}`, 'success');
}

async function tambahProdukBaru() {
  if (!currentUser) {
    openModal('modal-login');
    return showToast('Login terlebih dahulu', 'error');
  }
  const name  = document.getElementById('tp-name').value.trim();
  const price = document.getElementById('tp-price').value;
  const stock = document.getElementById('tp-stock').value;
  const cat   = document.getElementById('tp-cat').value;
  const icon  = document.getElementById('tp-icon').value;
  const desc  = document.getElementById('tp-desc').value;
  const kab   = document.getElementById('tp-kab').value;

  if (!name || !price) return showToast('Nama dan harga produk wajib diisi', 'error');

  const r = await apiFetch('/api/toko/produk', {
    method: 'POST',
    body: JSON.stringify({ name, price, stock, category: cat, image: icon, desc, kabupaten: kab, seller: currentUser.name })
  });
  if (r.success) {
    closeModal('modal-tambah-produk');
    showToast(r.message, 'success');
    // reset form
    ['tp-name','tp-price','tp-stock','tp-desc'].forEach(id => { const el = document.getElementById(id); if(el) el.value = ''; });
    loadTokoProduk();
  } else showToast(r.message, 'error');
}

// ── PAD REPORT ───────────────────────────────────────────────

async function loadPAD() {
  const r  = await apiFetch('/api/pad/laporan');
  const rk = await apiFetch('/api/pad/kabupaten');

  if (r.success) {
    const d = r.data;

    // Summary
    document.getElementById('pad-summary').innerHTML = `
      <div class="stat-card">
        <div class="stat-icon">💰</div>
        <div class="stat-val">${fmt(d.realisasiBulanIni)}</div>
        <div class="stat-lbl">Realisasi PAD Bulan Ini</div>
        <div class="stat-growth">↑ ${d.persenCapaian}% dari target tahunan</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">🎯</div>
        <div class="stat-val">${fmt(d.targetTahunan)}</div>
        <div class="stat-lbl">Target PAD Tahunan ${d.tahun}</div>
        <div class="stat-growth">${d.persenCapaian}% tercapai s.d. Mei</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">📅</div>
        <div class="stat-val">5 Sektor</div>
        <div class="stat-lbl">Sumber PAD Digital</div>
        <div class="stat-growth">Via platform PAPUANA</div>
      </div>`;

    // Sumber PAD Chart
    const maxSumber = Math.max(...d.sumber.map(s => s.jumlah));
    document.getElementById('pad-sumber-chart').innerHTML = `
      <div style="display:flex;flex-direction:column;gap:14px">
        ${d.sumber.map(s => `
        <div>
          <div class="flex-between mb-4">
            <span style="font-size:12px;font-weight:600">${s.icon} ${s.nama}</span>
            <span style="font-size:11px;color:var(--muted)">${fmt(s.jumlah)} / ${fmt(s.target)}</span>
          </div>
          <div style="height:10px;background:var(--cream);border-radius:5px;overflow:hidden;margin-bottom:2px">
            <div style="height:100%;width:${s.persen}%;background:linear-gradient(90deg,var(--mid),var(--pale));border-radius:5px;transition:width .8s ease"></div>
          </div>
          <div class="text-sm text-muted" style="text-align:right">${s.persen}% dari target</div>
        </div>`).join('')}
      </div>`;

    // Trend Chart
    const maxTrend = Math.max(...d.trendBulanan.map(t => t.nilai));
    document.getElementById('pad-trend-chart').innerHTML = `
      <div class="chart-bar-wrap">
        ${d.trendBulanan.map(t => `
        <div class="chart-row">
          <div class="chart-label">${t.bulan}</div>
          <div class="chart-track">
            <div class="chart-fill" style="width:${(t.nilai/maxTrend*100).toFixed(1)}%;background:linear-gradient(90deg,var(--forest),var(--mid))">
              <span class="chart-val">${fmt(t.nilai)}</span>
            </div>
          </div>
        </div>`).join('')}
      </div>`;
  }

  if (rk.success) {
    const maxOmzet = Math.max(...rk.data.map(k => k.omzet));
    document.getElementById('pad-kabupaten-table').innerHTML = `
      <table>
        <thead><tr><th>Kabupaten/Kota</th><th>UMKM</th><th>OAP</th><th>Wisatawan</th><th>Omzet</th><th>Kontribusi</th></tr></thead>
        <tbody>
          ${rk.data.map(k => `
          <tr>
            <td><strong>${k.icon} ${k.nama}</strong></td>
            <td>${k.umkm.toLocaleString()}</td>
            <td><span class="oap-badge">🌿 ${k.oap}</span></td>
            <td>${k.wisatawan.toLocaleString()}</td>
            <td style="font-weight:600;color:var(--forest)">${fmt(k.omzet)}</td>
            <td>
              <div style="width:120px;height:8px;background:var(--cream);border-radius:4px;overflow:hidden">
                <div style="height:100%;width:${(k.omzet/maxOmzet*100).toFixed(0)}%;background:linear-gradient(90deg,var(--mid),var(--pale));border-radius:4px"></div>
              </div>
            </td>
          </tr>`).join('')}
        </tbody>
      </table>`;
  }
}

// ── Patch navigate() untuk halaman baru ──────────────────────

const _origNavigate = navigate;
window.navigate = function(page) {
  _origNavigate(page);
  if (page === 'edukasi') loadEdukasi();
  if (page === 'profil')  loadProfil();
  if (page === 'toko')    loadToko();
  if (page === 'pad')     loadPAD();
};
