import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import usePencarianBuku from './usePencarianBuku'

const dataBuku = [
  { id: 1, judul: 'Belajar React', penulis: 'Andi', tahun: 2024 },
  { id: 2, judul: 'Belajar Java', penulis: 'Budi', tahun: 2023 },
  { id: 3, judul: 'Dasar JavaScript', penulis: 'Citra', tahun: 2024 },
]
describe('usePencarianBuku', () => {
  it('1. Menampilkan semua buku pada awalnya', () => {
    const { result } = renderHook(() =>
      usePencarianBuku(dataBuku)
    )
    expect(result.current.bukuDifilter).toHaveLength(3)
  })
  it('2. Mencari buku berdasarkan judul', () => {
    const { result } = renderHook(() =>
      usePencarianBuku(dataBuku)
    )
    act(() => {
      result.current.setPencarian('react')
    })
    expect(result.current.bukuDifilter).toHaveLength(1)
    expect(result.current.bukuDifilter[0].judul).toBe('Belajar React')
  })
  it('3. Memfilter buku berdasarkan tahun', () => {
    const { result } = renderHook(() =>
      usePencarianBuku(dataBuku)
    )
    act(() => {
      result.current.setFilterTahun('2024')
    })
    expect(result.current.bukuDifilter).toHaveLength(2)
  })
  it('4. Menghasilkan daftar kosong jika judul tidak ditemukan', () => {
    const { result } = renderHook(() =>
      usePencarianBuku(dataBuku)
    )
    act(() => {
      result.current.setPencarian('Buku Tidak Ada')
    })
    expect(result.current.bukuDifilter).toHaveLength(0)
  })
  it('5. Menggabungkan pencarian judul dan filter tahun', () => {
    const { result } = renderHook(() =>
      usePencarianBuku(dataBuku)
    )
    act(() => {
      result.current.setPencarian('belajar')
      result.current.setFilterTahun('2023')
    })
    expect(result.current.bukuDifilter).toHaveLength(1)
    expect(result.current.bukuDifilter[0].judul).toBe('Belajar Java')
  })
})