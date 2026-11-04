
import { createContext, useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const BookContext = createContext()

export function BookProvider({ children }) {
  const [buku, setBuku] = useLocalStorage('daftarBuku', [])

  // Menambahkan buku baru beserta statusnya
  function tambahBuku(dataBuku) {
    const bukuBaru = {
      id: Date.now(),
      judul: dataBuku.judul.trim(),
      penulis: dataBuku.penulis.trim(),
      tahun: Number(dataBuku.tahun),
      status: dataBuku.status || 'Milik Saya',
    }

    setBuku((daftarLama) => [...daftarLama, bukuBaru])
  }

  // Menghapus buku berdasarkan ID
  function hapusBuku(id) {
    setBuku((daftarLama) =>
      daftarLama.filter((item) => item.id !== id)
    )
  }

  // Memperbarui informasi dan status buku
  function editBuku(id, dataBuku) {
    setBuku((daftarLama) =>
      daftarLama.map((item) =>
        item.id === id
          ? {
              ...item,
              judul: dataBuku.judul.trim(),
              penulis: dataBuku.penulis.trim(),
              tahun: Number(dataBuku.tahun),
              status: dataBuku.status || item.status || 'Milik Saya',
            }
          : item
      )
    )
  }

  return (
    <BookContext.Provider
      value={{ buku, tambahBuku, hapusBuku, editBuku }}
    >
      {children}
    </BookContext.Provider>
  )
}

export function useBuku() {
  return useContext(BookContext)
}
