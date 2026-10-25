import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBuku } from '../context/BookContext'
import BookCard from '../components/BookCard'
import usePencarianBuku from '../hooks/usePencarianBuku'

function DaftarBuku() {
  const { buku, hapusBuku } = useBuku()
  const navigate = useNavigate()

  const {
  pencarian, setPencarian, filterTahun, setFilterTahun, bukuDifilter, daftarTahun} = usePencarianBuku(buku)

  function konfirmasiHapus(id) {
    const yakin = window.confirm(
      'Apakah kamu yakin ingin menghapus buku ini?'
    )

    if (yakin) {
      hapusBuku(id)
    }
  }

  return (
    <main className="container">
      <section className="list-section">
        <h2>Daftar Buku ({bukuDifilter.length})</h2>

        <div className="filter-container">
          <input
            type="text"
            placeholder="Cari judul buku..."
            value={pencarian}
            onChange={(event) =>
              setPencarian(event.target.value)
            }
          />

          <select
            value={filterTahun}
            onChange={(event) =>
              setFilterTahun(event.target.value)
            }
          >
            <option value="semua">Semua Tahun</option>

            {daftarTahun.map((tahun) => (
              <option key={tahun} value={tahun}>
                {tahun}
              </option>
            ))}
          </select>
        </div>

        {bukuDifilter.length === 0 ? (
          <p>
            {buku.length === 0
              ? 'Belum ada buku. Silakan tambahkan buku.'
              : 'Buku tidak ditemukan.'}
          </p>
        ) : (
          <div className="book-list">
            {bukuDifilter.map((item) => (
              <BookCard
                key={item.id}
                buku={item}
                onEdit={(bukuEdit) =>
                  navigate(`/edit/${bukuEdit.id}`)
                }
                onDelete={konfirmasiHapus}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default DaftarBuku
