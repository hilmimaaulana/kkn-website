import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

function Galeri() {
  const [galeri, setGaleri] = useState([])

  useEffect(() => {
    async function fetchGaleri() {
      const { data, error } = await supabase
        .from('galeri')
        .select('*')
        .order('created_at', { ascending: false })
      if (!error) setGaleri(data)
    }
    fetchGaleri()
  }, [])

  return (
    <div>
      <h1>Galeri Kegiatan</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
        {galeri.map((item) => (
          <div key={item.id} style={{ width: '220px' }}>
            <img src={item.url_foto} alt={item.judul_foto} style={{ width: '100%' }} />
            <p>{item.judul_foto}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Galeri