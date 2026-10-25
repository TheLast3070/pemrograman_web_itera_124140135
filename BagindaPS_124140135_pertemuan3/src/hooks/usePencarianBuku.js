import { useState } from 'react'

function usePencarianBuku(buku) {
  const [pencarian, setPencarian] = useState('')
  const [filterTahun, setFilterTahun] = useState('semua')

  const bukuDifilter = buku.filter((item) => {
    const cocokJudul = item.judul
      .toLowerCase()
      .includes(pencarian.toLowerCase())

    const cocokTahun =
      filterTahun === 'semua' ||
      String(item.tahun) === filterTahun

    return cocokJudul && cocokTahun
  })

  const daftarTahun = [
    ...new Set(buku.map((item) => String(item.tahun))),
  ]

  return {
    pencarian,
    setPencarian,
    filterTahun,
    setFilterTahun,
    bukuDifilter,
    daftarTahun,
  }
}

export default usePencarianBuku