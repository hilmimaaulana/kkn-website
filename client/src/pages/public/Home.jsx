import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import PublicLayout from '../../layouts/PublicLayout'

function Home() {
  const [kegiatan, setKegiatan] = useState([])

  useEffect(() => {
    async function fetchKegiatan() {
      const { data, error } = await supabase
        .from('kegiatan')
        .select('*')
        .order('created_at', { ascending: false })

      if (!error) setKegiatan(data)
    }
    fetchKegiatan()
  }, [])

  return (
    <PublicLayout>
      <h1>Selamat Datang di Website KKN</h1>

      <h2>Program Kerja</h2>
      {kegiatan.length === 0 && <p>Belum ada kegiatan.</p>}
      {kegiatan.map((item) => (
        <div key={item.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
          <strong>{item.judul}</strong> — <em>{item.status}</em><br />
          <small>{item.tanggal}</small>
          <p>{item.deskripsi}</p>
        </div>
      ))}
    </PublicLayout>
  )
}

export default Home