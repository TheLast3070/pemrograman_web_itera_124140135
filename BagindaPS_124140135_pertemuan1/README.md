# Mini POS

## Identitas

Nama            : Baginda Parulian Siregar
NIM             : 124140135
Kelas Praktikum : RB
Praktikum PAW RB

## Deskripsi

Mini POS adalah aplikasi kasir sederhana berbasis HTML, CSS, dan JavaScript. Aplikasi ini digunakan untuk menambahkan barang ke dalam keranjang, menghitung subtotal dan total belanja, memberikan diskon, menghitung pembayaran dan kembalian, serta menyimpan data keranjang menggunakan localStorage.

## Panduan Menjalankan

1. Pastikan file `index.html`, `style.css`, `script.js`, dan `README.md` berada dalam satu folder.
2. Buka folder project menggunakan Visual Studio Code.
3. Jalankan file `index.html` menggunakan Live Server.
4. Aplikasi akan terbuka pada browser.

## Fitur

* Menambahkan barang ke keranjang.
* Validasi nama barang minimal 3 karakter.
* Validasi harga minimal Rp500.
* Validasi jumlah barang harus berupa bilangan bulat minimal 1.
* Menghitung subtotal setiap barang.
* Menghitung total belanja.
* Memberikan diskon 10% jika total belanja minimal Rp50.000.
* Menghitung total akhir setelah diskon.
* Menghitung pembayaran dan kembalian.
* Menampilkan pesan jika uang pembayaran tidak mencukupi.
* Menghapus barang dari keranjang.
* Menyimpan data keranjang menggunakan localStorage.
* Mempertahankan data keranjang setelah halaman di-refresh.
* Menghapus seluruh data saat melakukan transaksi baru.

## Penjelasan Teknis

Data barang disimpan dalam array `keranjang` yang kemudian disimpan ke localStorage menggunakan `JSON.stringify()`. Saat halaman dibuka, data dari localStorage dibaca kembali menggunakan `JSON.parse()`.

Perhitungan subtotal dilakukan dengan mengalikan harga barang dengan jumlah barang. Total belanja diperoleh dari seluruh subtotal barang. Jika total belanja mencapai Rp50.000 atau lebih, sistem memberikan diskon sebesar 10%.

Validasi dilakukan sebelum barang dimasukkan ke dalam keranjang. Jika data tidak memenuhi ketentuan, sistem menampilkan pesan kesalahan dan barang tidak dimasukkan ke keranjang.

Fungsi pembayaran digunakan untuk menghitung kembalian dari uang yang diberikan setelah dikurangi total akhir. Jika uang pembayaran lebih kecil dari total akhir, sistem menampilkan pesan bahwa pembayaran tidak mencukupi.

## Screenshot
### Tampilan Utama
![Tampilan Utama](screenshot/tampilan_utama.png)
### tampilan uang kurang
![tampilan uang kurang](screenshot/tampilan_uangkurang_error.png)
### tampilan tabel data dan kalkulator
![tampilan tabel data dan kalkulator](screenshot/tampilan_tabeldata_kalkulator.png)
### tampilan input tidak sesuai
![tampilan input tidak sesuai](screenshot/tampilan_inputtidaksesuai_error.png)