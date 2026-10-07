const formBarang = document.getElementById("formBarang");
const namaBarang = document.getElementById("namaBarang");
const hargaBarang = document.getElementById("hargaBarang");
const qtyBarang = document.getElementById("qtyBarang");
const errorNama = document.getElementById("errorNama");
const errorHarga = document.getElementById("errorHarga");
const errorQty = document.getElementById("errorQty");
const tabelKeranjang = document.getElementById("tabelKeranjang");
const uangBayar = document.getElementById("uangBayar");
const errorBayar = document.getElementById("errorBayar");
const kembalian = document.getElementById("kembalian");
const btnBayar = document.getElementById("btnBayar");
const btnTransaksiBaru = document.getElementById("btnTransaksiBaru");

let keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];
function tampilkanKeranjang() {
    tabelKeranjang.innerHTML = "";

    keranjang.forEach(function(barang, index) {

        const subtotal = barang.harga * barang.qty;

        const baris = document.createElement("tr");

        baris.innerHTML = `
            <td>${index + 1}</td>
            <td>${barang.nama}</td>
            <td>Rp${barang.harga.toLocaleString("id-ID")}</td>
            <td>${barang.qty}</td>
            <td>Rp${subtotal.toLocaleString("id-ID")}</td>
            <td>
                <button onclick="hapusBarang(${index})">
                    Hapus
                </button>
            </td>
        `;

        tabelKeranjang.appendChild(baris);
    });
}

function hitungTotal() {
    let total = 0;

    keranjang.forEach(function(barang) {
        total += barang.harga * barang.qty;
    });

    document.getElementById("totalBelanja").textContent =
        "Rp" + total.toLocaleString("id-ID");
}

function hitungTotal() {
    let total = 0;

    keranjang.forEach(function(barang) {
        total += barang.harga * barang.qty;
    });

    let diskon = 0;

    if (total >= 50000) {
        diskon = total * 0.10;
    }

    let totalAkhir = total - diskon;

    document.getElementById("totalBelanja").textContent =
        "Rp" + total.toLocaleString("id-ID");

    document.getElementById("diskon").textContent =
        "Rp" + diskon.toLocaleString("id-ID");

    document.getElementById("totalAkhir").textContent =
        "Rp" + totalAkhir.toLocaleString("id-ID");
}

formBarang.addEventListener("submit", function(event) {
    event.preventDefault();

    // Bersihkan pesan error sebelumnya
    errorNama.textContent = "";
    errorHarga.textContent = "";
    errorQty.textContent = "";

    let valid = true;

    // Validasi nama
    if (namaBarang.value.trim().length < 3) {
        errorNama.textContent = "Nama barang minimal 3 karakter.";
        valid = false;
    }

    // Validasi harga
    const harga = Number(hargaBarang.value);

    if (harga < 500 || isNaN(harga)) {
        errorHarga.textContent = "Harga harus minimal Rp500.";
        valid = false;
    }

    // Validasi jumlah
    const qty = Number(qtyBarang.value);

    if (!Number.isInteger(qty) || qty < 1) {
        errorQty.textContent = "Jumlah harus berupa bilangan bulat minimal 1.";
        valid = false;
    }

    // Jika validasi gagal
    if (!valid) {
        return;
    }

    // Membuat data barang
    const barang = {
        nama: namaBarang.value.trim(),
        harga: harga,
        qty: qty
    };

    // Masukkan barang ke keranjang
    keranjang.push(barang);
    localStorage.setItem("keranjang", JSON.stringify(keranjang));
    tampilkanKeranjang();
    hitungTotal();
    console.log("Keranjang:", keranjang);

    // Kosongkan form
    namaBarang.value = "";
    hargaBarang.value = "";
    qtyBarang.value = "";
});

function hapusBarang(index) {
    keranjang.splice(index, 1);
    localStorage.setItem("keranjang", JSON.stringify(keranjang));
    tampilkanKeranjang();
    hitungTotal();
}


btnBayar.addEventListener("click", function() {

    errorBayar.textContent = "";

    let total = 0;

    keranjang.forEach(function(barang) {
        total += barang.harga * barang.qty;
    });

    let diskon = 0;

    if (total >= 50000) {
        diskon = total * 0.10;
    }

    let totalAkhir = total - diskon;

    let pembayaran = Number(uangBayar.value);

    if (keranjang.length === 0) {
        errorBayar.textContent = "Keranjang masih kosong.";
        return;
    }

    if (isNaN(pembayaran) || pembayaran < totalAkhir) {
        errorBayar.textContent = "Uang pembayaran tidak mencukupi.";
        kembalian.textContent = "Rp0";
        return;
    }

    let hasilKembalian = pembayaran - totalAkhir;

    kembalian.textContent =
        "Rp" + hasilKembalian.toLocaleString("id-ID");
});

btnTransaksiBaru.addEventListener("click", function() {

    keranjang = [];

    localStorage.removeItem("keranjang");

    tampilkanKeranjang();
    hitungTotal();

    uangBayar.value = "";
    kembalian.textContent = "Rp0";
    errorBayar.textContent = "";

});
tampilkanKeranjang();
hitungTotal();