import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'

function AdminLayout({ children }) {
  const navigate = useNavigate()

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/admin/login')
  }

  const sidebarStyle = {
    width: '200px',
    background: '#222',
    color: '#fff',
    height: '100vh',
    padding: '20px',
    position: 'fixed',
    left: 0,
    top: 0,
  }

  const linkStyle = {
    display: 'block',
    color: '#fff',
    textDecoration: 'none',
    padding: '10px 0',
  }

  const contentStyle = {
    marginLeft: '220px',
    padding: '20px',
    width: '100%',
  }

  return (
    <div style={{ display: 'flex' }}>
      <div style={sidebarStyle}>
        <h3>Admin KKN</h3>
        <Link to="/admin/dashboard" style={linkStyle}>Dashboard</Link>
        <Link to="/admin/kegiatan" style={linkStyle}>Kelola Kegiatan</Link>
        <Link to="/admin/galeri" style={linkStyle}>Kelola Galeri</Link>
        <Link to="/admin/berita" style={linkStyle}>Kelola Berita</Link>
        <Link to="/admin/anggota" style={linkStyle}>Kelola Anggota</Link>
        <button onClick={handleLogout} style={{ marginTop: '20px' }}>Logout</button>
      </div>
      <div style={contentStyle}>
        {children}
      </div>
    </div>
  )
}

export default AdminLayout