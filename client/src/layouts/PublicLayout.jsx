import { Link } from 'react-router-dom'

function PublicLayout({ children }) {
  const navStyle = {
    display: 'flex',
    gap: '20px',
    padding: '15px 20px',
    background: '#333',
  }

  const linkStyle = {
    color: '#fff',
    textDecoration: 'none',
  }

  return (
    <div>
      <nav style={navStyle}>
        <Link to="/" style={linkStyle}>Beranda</Link>
        <Link to="/galeri" style={linkStyle}>Galeri</Link>
        <Link to="/berita" style={linkStyle}>Berita</Link>
        <Link to="/anggota" style={linkStyle}>Anggota</Link>
      </nav>
      <div style={{ padding: '20px' }}>
        {children}
      </div>
    </div>
  )
}

export default PublicLayout