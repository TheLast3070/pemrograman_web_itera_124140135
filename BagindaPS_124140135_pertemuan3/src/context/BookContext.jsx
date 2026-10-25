import { createContext, useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const BookContext = createContext()

export function BookProvider({ children }) {
  const [buku, setBuku] = useLocalStorage('daftarBuku', [])

  function tambahBuku(dataBuku) {
    const bukuBaru = {
      id: Date.now(),
      judul: dataBuku.judul.trim(),
      penulis: dataBuku.penulis.trim(),
      tahun: Number(dataBuku.tahun),
    }

    setBuku((daftarLama) => [...daftarLama, bukuBaru])
  }

  function hapusBuku(id) {
    setBuku((daftarLama) =>
      daftarLama.filter((item) => item.id !== id)
    )
  }

  function editBuku(id, dataBuku) {
    setBuku((daftarLama) =>
      daftarLama.map((item) =>
        item.id === id
          ? {
              ...item,
              judul: dataBuku.judul.trim(),
              penulis: dataBuku.penulis.trim(),
              tahun: Number(dataBuku.tahun),
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