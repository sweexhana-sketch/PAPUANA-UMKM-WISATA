// ============================================================
//  PAPUANA Backend Server — Full Platform v2.0
// ============================================================

const express = require('express');
const cors    = require('cors');
const path    = require('path');

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:true }));

app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString('id-ID')}] ${req.method} ${req.path}`);
  next();
});

// Static frontend
app.use(express.static(path.join(__dirname, 'frontend')));

// API Routes
app.use('/api/products', require('./routes/products'));
app.use('/api/wisata',   require('./routes/wisata'));
app.use('/api',          require('./routes/extended'));
app.use('/api',          require('./routes/api'));

// Health
app.get('/api/health', (req, res) => {
  res.json({ status:'ok', platform:'PAPUANA v2.0', timestamp:new Date().toISOString() });
});

// SPA Fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/index.html'));
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log('\n  ╔══════════════════════════════════════════════════╗');
    console.log('  ║   🌿  PAPUANA Platform Digital Papua Barat Daya  ║');
    console.log(`  ║   🚀  http://localhost:${PORT}                      ║`);
    console.log('  ╚══════════════════════════════════════════════════╝\n');
  });
}

module.exports = app;
