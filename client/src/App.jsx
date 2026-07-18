import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/public/Home'
import Login from './pages/admin/Login'
import Dashboard from './pages/admin/Dashboard'
import ProtectedRoute from './components/admin/ProtectedRoute'
import KelolaKegiatan from './pages/admin/KelolaKegiatan'
import KelolaGaleri from './pages/admin/KelolaGaleri'
import KelolaBerita from './pages/admin/KelolaBerita'
import KelolaAnggota from './pages/admin/KelolaAnggota'
import Galeri from './pages/public/Galeri'
import Berita from './pages/public/Berita'
import Anggota from './pages/public/Anggota'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/galeri" element={<Galeri />} />
        <Route path="/berita" element={<Berita />} />
        <Route path="/anggota" element={<Anggota />} />
        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/kegiatan"
          element={
            <ProtectedRoute>
              <KelolaKegiatan />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/galeri"
          element={
            <ProtectedRoute>
              <KelolaGaleri />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/berita"
          element={
            <ProtectedRoute>
              <KelolaBerita />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/anggota"
          element={
            <ProtectedRoute>
              <KelolaAnggota />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App