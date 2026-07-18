import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

function KelolaKegiatan() {
  const [kegiatan, setKegiatan] = useState([])
  const [judul, setJudul] = useState('')
  const [deskripsi, setDeskripsi] = useState('')
  const [tanggal, setTanggal] = useState('')

  async function fetchKegiatan() {
    const { data, error } = await supabase
      .from('kegiatan')
      .select('*')
      .order('created_at', { ascending: false })
    if (!error) setKegiatan(data)
  }

  useEffect(() => {
    fetchKegiatan()
  }, [])

  async function handleTambah(e) {
    e.preventDefault()
    const { error } = await supabase
      .from('kegiatan')
      .insert([{ judul, deskripsi, tanggal, status: 'rencana' }])

    if (!error) {
      setJudul('')
      setDeskripsi('')
      setTanggal('')
      fetchKegiatan()
    } else {
      alert('Gagal tambah: ' + error.message)
    }
  }

  async function handleHapus(id) {
    const konfirmasi = confirm('Yakin mau hapus kegiatan ini?')
    if (!konfirmasi) return

    const { error } = await supabase.from('kegiatan').delete().eq('id', id)
    if (!error) fetchKegiatan()
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Kelola Kegiatan</h1>

      <form onSubmit={handleTambah} style={{ marginBottom: '30px' }}>
        <input
          type="text"
          placeholder="Judul kegiatan"
          value={judul}
          onChange={(e) => setJudul(e.target.value)}
          required
        /><br /><br />
        <textarea
          placeholder="Deskripsi"
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}
        /><br /><br />
        <input
          type="date"
          value={tanggal}
          onChange={(e) => setTanggal(e.target.value)}
        /><br /><br />
        <button type="submit">Tambah Kegiatan</button>
      </form>

      <h2>Daftar Kegiatan</h2>
      {kegiatan.map((item) => (
        <div key={item.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
          <strong>{item.judul}</strong> — {item.status}<br />
          <small>{item.tanggal}</small>
          <p>{item.deskripsi}</p>
          <button onClick={() => handleHapus(item.id)}>Hapus</button>
        </div>
      ))}
    </div>
  )
}

export default KelolaKegiatan