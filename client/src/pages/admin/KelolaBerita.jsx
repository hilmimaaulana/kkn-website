import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

function KelolaBerita() {
  const [berita, setBerita] = useState([])
  const [judul, setJudul] = useState('')
  const [isi, setIsi] = useState('')
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)

  async function fetchBerita() {
    const { data, error } = await supabase
      .from('berita')
      .select('*')
      .order('created_at', { ascending: false })
    if (!error) setBerita(data)
  }

  useEffect(() => {
    fetchBerita()
  }, [])

  async function handleTambah(e) {
    e.preventDefault()
    setUploading(true)

    let fotoUrl = ''

    if (file) {
      const namaFile = `${Date.now()}_${file.name}`
      const { error: uploadError } = await supabase.storage
        .from('berita')
        .upload(namaFile, file)

      if (uploadError) {
        alert('Gagal upload foto: ' + uploadError.message)
        setUploading(false)
        return
      }

      const { data: urlData } = supabase.storage
        .from('berita')
        .getPublicUrl(namaFile)
      fotoUrl = urlData.publicUrl
    }

    const { error: insertError } = await supabase
      .from('berita')
      .insert([{ judul, isi, foto_sampul: fotoUrl }])

    if (insertError) {
      alert('Gagal simpan: ' + insertError.message)
    } else {
      setJudul('')
      setIsi('')
      setFile(null)
      fetchBerita()
    }
    setUploading(false)
  }

  async function handleHapus(id) {
    const konfirmasi = confirm('Yakin mau hapus berita ini?')
    if (!konfirmasi) return
    const { error } = await supabase.from('berita').delete().eq('id', id)
    if (!error) fetchBerita()
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Kelola Berita</h1>

      <form onSubmit={handleTambah} style={{ marginBottom: '30px' }}>
        <input
          type="text"
          placeholder="Judul berita"
          value={judul}
          onChange={(e) => setJudul(e.target.value)}
          required
        /><br /><br />
        <textarea
          placeholder="Isi berita"
          value={isi}
          onChange={(e) => setIsi(e.target.value)}
          rows={5}
          required
        /><br /><br />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        /><br /><br />
        <button type="submit" disabled={uploading}>
          {uploading ? 'Menyimpan...' : 'Tambah Berita'}
        </button>
      </form>

      <h2>Daftar Berita</h2>
      {berita.map((item) => (
        <div key={item.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
          {item.foto_sampul && (
            <img src={item.foto_sampul} alt={item.judul} style={{ width: '200px' }} />
          )}
          <h3>{item.judul}</h3>
          <p>{item.isi}</p>
          <button onClick={() => handleHapus(item.id)}>Hapus</button>
        </div>
      ))}
    </div>
  )
}

export default KelolaBerita