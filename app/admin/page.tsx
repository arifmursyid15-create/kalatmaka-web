export default function AdminPage() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Admin Kalatmaka</h1>
      <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
        <a href="/admin/portfolio" style={{ padding: '0.75rem 1.5rem', background: '#071a38', color: 'white', borderRadius: '8px', textDecoration: 'none' }}>
          + Tambah Portfolio
        </a>
        <a href="/admin/testimoni" style={{ padding: '0.75rem 1.5rem', background: '#f5c518', color: '#071a38', borderRadius: '8px', textDecoration: 'none' }}>
          + Tambah Testimoni
        </a>
      </div>
    </div>
  )
}