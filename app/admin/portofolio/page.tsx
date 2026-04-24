'use client'
import { useState } from 'react'

export default function TambahPortfolio() {
  const [form, setForm] = useState({
    judul: '', kategori: '', lokasi: '', deskripsi: '', urutan: 0
  })
  const [foto, setFoto] = useState<File | null>(null)
  const [preview, setPreview] = useState('')
  const [loading, setLoading] = useState(false)
  const [pesan, setPesan] = useState('')

  const API = process.env.NEXT_PUBLIC_API_URL

  const handleFoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFoto(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    setPesan('')
    try {
      let fotoUrl = ''
      if (foto) {
        const formData = new FormData()
        formData.append('file', foto)
        const res = await fetch(`${API}/upload`, { method: 'POST', body: formData })
        const data = await res.json()
        if (!data.success) throw new Error('Upload foto gagal')
        fotoUrl = data.url
      }

      const res = await fetch(`${API}/portfolios`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, foto: fotoUrl, is_active: true })
      })
      const data = await res.json()
      if (data.success) {
        setPesan('✅ Portfolio berhasil disimpan!')
        setForm({ judul: '', kategori: '', lokasi: '', deskripsi: '', urutan: 0 })
        setFoto(null)
        setPreview('')
      } else {
        setPesan('❌ Gagal menyimpan portfolio')
      }
    } catch (err) {
      setPesan('❌ Terjadi kesalahan')
    }
    setLoading(false)
  }

  const input = { width: '100%', padding: '0.5rem', marginBottom: '1rem', borderRadius: '6px', border: '1px solid #ccc', fontSize: '1rem' }

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', fontFamily: 'sans-serif' }}>
      <a href="/admin" style={{ color: '#071a38' }}>← Kembali</a>
      <h1 style={{ margin: '1rem 0' }}>Tambah Portfolio</h1>

      <label>Judul *</label>
      <input style={input} value={form.judul} onChange={e => setForm({...form, judul: e.target.value})} />

      <label>Kategori *</label>
      <input style={input} value={form.kategori} onChange={e => setForm({...form, kategori: e.target.value})} placeholder="Contoh: Desain Interior" />

      <label>Lokasi</label>
      <input style={input} value={form.lokasi} onChange={e => setForm({...form, lokasi: e.target.value})} placeholder="Contoh: Surabaya" />

      <label>Deskripsi</label>
      <textarea style={{...input, height: '100px'}} value={form.deskripsi} onChange={e => setForm({...form, deskripsi: e.target.value})} />

      <label>Urutan</label>
      <input style={input} type="number" value={form.urutan} onChange={e => setForm({...form, urutan: Number(e.target.value)})} />

      <label>Foto</label>
      <input type="file" accept="image/*" onChange={handleFoto} style={{ marginBottom: '1rem' }} />
      {preview && <img src={preview} alt="preview" style={{ width: '100%', borderRadius: '8px', marginBottom: '1rem' }} />}

      {pesan && <p style={{ marginBottom: '1rem', color: pesan.includes('✅') ? 'green' : 'red' }}>{pesan}</p>}

      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{ padding: '0.75rem 2rem', background: '#071a38', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', cursor: 'pointer' }}
      >
        {loading ? 'Menyimpan...' : 'Simpan Portfolio'}
      </button>
    </div>
  )
}