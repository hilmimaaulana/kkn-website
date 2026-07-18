import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

function Berita() {
  const [berita, setBerita] = useState([])

  useEffect(() => {
    async function fetchBerita() {
      const { data, error } = await supabase
        .from('berita')
        .select('*')
        .order('created_at', { ascending: false })
      if (!error) setBerita(data)
    }
    fetchBerita()
  }, [])

  return (
    <div>
      <h1>Berita</h1>
      {berita.map((item) => (
        <div key={item.id} style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '15px' }}>
          {item.foto_sampul && <img src={item.foto_sampul} alt={item.judul} style={{ width: '250px' }} />}
          <h3>{item.judul}</h3>
          <p>{item.isi}</p>
        </div>
      ))}
    </div>
  )
}

export default Berita