import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

function Anggota() {
  const [anggota, setAnggota] = useState([])

  useEffect(() => {
    async function fetchAnggota() {
      const { data, error } = await supabase
        .from('anggota')
        .select('*')
        .order('id', { ascending: true })
      if (!error) setAnggota(data)
    }
    fetchAnggota()
  }, [])

  return (
    <div>
      <h1>Anggota Kelompok</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
        {anggota.map((item) => (
          <div key={item.id} style={{ width: '200px', textAlign: 'center' }}>
            {item.foto && <img src={item.foto} alt={item.nama} style={{ width: '100%' }} />}
            <h3>{item.nama}</h3>
            <p>{item.jabatan}</p>
            <p>{item.jurusan}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Anggota