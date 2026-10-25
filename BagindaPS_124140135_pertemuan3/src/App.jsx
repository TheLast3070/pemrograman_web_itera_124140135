import {
  Routes,
  Route,
  NavLink,
  Navigate,
} from 'react-router-dom'

import DaftarBuku from './pages/DaftarBuku'
import TambahBuku from './pages/TambahBuku'
import './App.css'

function App() {
  return (
    <div className="app">
    <header className="app-header">
      <div className="header-content">
        <div className="brand">
          <div className="brand-icon">KB</div>
          <div>
            <h1>Kumpulan Buku AShiaap</h1>
            <p>Tempat buat nyimpan koleksi buku.</p>
          </div>
        </div>

        <nav className="navigation">
          <NavLink to="/" end>
            Daftar Buku
          </NavLink>

          <NavLink to="/tambah">
            + Tambah Buku
          </NavLink>
        </nav>
      </div>
    </header>

      <Routes>
        <Route path="/" element={<DaftarBuku />} />
        <Route path="/tambah" element={<TambahBuku />} />
        <Route path="/edit/:id" element={<TambahBuku />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App