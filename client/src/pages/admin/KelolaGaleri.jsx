import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

function KelolaGaleri() {
  const [galeri, setGaleri] = useState([])
  const [judulFoto, setJudulFoto] = useState('')
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)

  async function fetchGaleri() {
    const { data, error } = await supabase
      .from('galeri')
      .select('*')
      .order('created_at', { ascending: false })
    if (!error) setGaleri(data)
  }

  useEffect(() => {
    fetchGaleri()
  }, [])

  async function handleUpload(e) {
    e.preventDefault()
    if (!file) return alert('Pilih foto dulu')

    setUploading(true)

    // 1. Upload file ke Storage
    const namaFile = `${Date.now()}_${file.name}`
    const { error: uploadError } = await supabase.storage
      .from('galeri')
      .upload(namaFile, file)

    if (uploadError) {
      alert('Gagal upload: ' + uploadError.message)
      setUploading(false)
      return
    }

    // 2. Ambil URL publik dari file yang barusan diupload
    const { data: urlData } = supabase.storage
      .from('galeri')
      .getPublicUrl(namaFile)

    // 3. Simpan URL-nya ke tabel galeri
    const { error: insertError } = await supabase
      .from('galeri')
      .insert([{ judul_foto: judulFoto, url_foto: urlData.publicUrl }])

    if (insertError) {
      alert('Gagal simpan data: ' + insertError.message)
    } else {
      setJudulFoto('')
      setFile(null)
      fetchGaleri()
    }
    setUploading(false)
  }

  async function handleHapus(id) {
    const konfirmasi = confirm('Yakin mau hapus foto ini?')
    if (!konfirmasi) return
    const { error } = await supabase.from('galeri').delete().eq('id', id)
    if (!error) fetchGaleri()
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Kelola Galeri</h1>

      <form onSubmit={handleUpload} style={{ marginBottom: '30px' }}>
        <input
          type="text"
          placeholder="Judul foto"
          value={judulFoto}
          onChange={(e) => setJudulFoto(e.target.value)}
          required
        /><br /><br />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          required
        /><br /><br />
        <button type="submit" disabled={uploading}>
          {uploading ? 'Mengupload...' : 'Upload Foto'}
        </button>
      </form>

      <h2>Daftar Foto</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
        {galeri.map((item) => (
          <div key={item.id} style={{ border: '1px solid #ccc', padding: '10px', width: '200px' }}>
            <img src={item.url_foto} alt={item.judul_foto} style={{ width: '100%' }} />
            <p>{item.judul_foto}</p>
            <button onClick={() => handleHapus(item.id)}>Hapus</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default KelolaGaleri