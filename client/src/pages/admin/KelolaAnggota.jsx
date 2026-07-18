import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

function KelolaAnggota() {
  const [anggota, setAnggota] = useState([])
  const [nama, setNama] = useState('')
  const [nim, setNim] = useState('')
  const [jurusan, setJurusan] = useState('')
  const [jabatan, setJabatan] = useState('')
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)

  async function fetchAnggota() {
    const { data, error } = await supabase
      .from('anggota')
      .select('*')
      .order('id', { ascending: true })
    if (!error) setAnggota(data)
  }

  useEffect(() => {
    fetchAnggota()
  }, [])

  async function handleTambah(e) {
    e.preventDefault()
    setUploading(true)

    let fotoUrl = ''

    if (file) {
      const namaFile = `${Date.now()}_${file.name}`
      const { error: uploadError } = await supabase.storage
        .from('anggota')
        .upload(namaFile, file)

      if (uploadError) {
        alert('Gagal upload foto: ' + uploadError.message)
        setUploading(false)
        return
      }

      const { data: urlData } = supabase.storage
        .from('anggota')
        .getPublicUrl(namaFile)
      fotoUrl = urlData.publicUrl
    }

    const { error: insertError } = await supabase
      .from('anggota')
      .insert([{ nama, nim, jurusan, jabatan, foto: fotoUrl }])

    if (insertError) {
      alert('Gagal simpan: ' + insertError.message)
    } else {
      setNama('')
      setNim('')
      setJurusan('')
      setJabatan('')
      setFile(null)
      fetchAnggota()
    }
    setUploading(false)
  }

  async function handleHapus(id) {
    const konfirmasi = confirm('Yakin mau hapus anggota ini?')
    if (!konfirmasi) return
    const { error } = await supabase.from('anggota').delete().eq('id', id)
    if (!error) fetchAnggota()
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Kelola Anggota</h1>

      <form onSubmit={handleTambah} style={{ marginBottom: '30px' }}>
        <input
          type="text"
          placeholder="Nama"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          required
        /><br /><br />
        <input
          type="text"
          placeholder="NIM"
          value={nim}
          onChange={(e) => setNim(e.target.value)}
        /><br /><br />
        <input
          type="text"
          placeholder="Jurusan"
          value={jurusan}
          onChange={(e) => setJurusan(e.target.value)}
        /><br /><br />
        <input
          type="text"
          placeholder="Jabatan (misal: Ketua, Anggota)"
          value={jabatan}
          onChange={(e) => setJabatan(e.target.value)}
        /><br /><br />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        /><br /><br />
        <button type="submit" disabled={uploading}>
          {uploading ? 'Menyimpan...' : 'Tambah Anggota'}
        </button>
      </form>

      <h2>Daftar Anggota</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
        {anggota.map((item) => (
          <div key={item.id} style={{ border: '1px solid #ccc', padding: '10px', width: '200px' }}>
            {item.foto && <img src={item.foto} alt={item.nama} style={{ width: '100%' }} />}
            <h3>{item.nama}</h3>
            <p>{item.jabatan}</p>
            <p>{item.jurusan} — {item.nim}</p>
            <button onClick={() => handleHapus(item.id)}>Hapus</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default KelolaAnggota