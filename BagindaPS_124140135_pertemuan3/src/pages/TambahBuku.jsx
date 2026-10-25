
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useBuku } from '../context/BookContext'

function TambahBuku() {
  const { buku, tambahBuku, editBuku } = useBuku()
  const { id } = useParams()
  const navigate = useNavigate()

  const bukuEdit = id
    ? buku.find((item) => String(item.id) === id)
    : null

  const [judul, setJudul] = useState(bukuEdit?.judul || '')
  const [penulis, setPenulis] = useState(bukuEdit?.penulis || '')
  const [tahun, setTahun] = useState(
    bukuEdit ? String(bukuEdit.tahun) : ''
  )

  function handleSubmit(event) {
    event.preventDefault()

    if (!judul.trim() || !penulis.trim() || !tahun) {
      alert('Semua kolom harus diisi!')
      return
    }

    const dataBuku = {
      judul: judul.trim(),
      penulis: penulis.trim(),
      tahun: Number(tahun),
    }

    if (id && bukuEdit) {
      editBuku(bukuEdit.id, dataBuku)
    } else {
      tambahBuku(dataBuku)
    }

    navigate('/')
  }

  if (id && !bukuEdit) {
    return (
      <main className="container">
        <h2>Buku tidak ditemukan.</h2>
        <Link to="/">Kembali ke Daftar Buku</Link>
      </main>
    )
  }

  return (
    <main className="container">
      <section className="form-section">
        <h2>{id ? 'Edit Buku' : 'Tambah Buku'}</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="judul">Judul Buku</label>
            <input
              id="judul"
              type="text"
              value={judul}
              onChange={(event) => setJudul(event.target.value)}
              placeholder="Masukkan judul buku"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="penulis">Penulis</label>
            <input
              id="penulis"
              type="text"
              value={penulis}
              onChange={(event) => setPenulis(event.target.value)}
              placeholder="Masukkan nama penulis"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="tahun">Tahun Terbit</label>
            <input
              id="tahun"
              type="number"
              value={tahun}
              onChange={(event) => setTahun(event.target.value)}
              placeholder="Masukkan tahun terbit"
              min="1"
              max={new Date().getFullYear()}
              required
            />
          </div>

          <button type="submit">
            {id ? 'Simpan Perubahan' : 'Simpan Buku'}
          </button>

          <Link to="/">Kembali ke Daftar Buku</Link>
        </form>
      </section>
    </main>
  )
}

export default TambahBuku