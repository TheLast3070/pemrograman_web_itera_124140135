import { useEffect, useState } from 'react'

function useLocalStorage(key, nilaiAwal) {
  const [nilai, setNilai] = useState(() => {
    try {
      const dataTersimpan = localStorage.getItem(key)
      return dataTersimpan !== null
        ? JSON.parse(dataTersimpan)
        : nilaiAwal
    } catch {
      return nilaiAwal
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(nilai))
    } catch (error) {
      console.error('Gagal menyimpan data:', error)
    }
  }, [key, nilai])

  return [nilai, setNilai]
}

export default useLocalStorage