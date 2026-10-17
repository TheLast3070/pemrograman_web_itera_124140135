import { simpanData, ambilData } from './modules/utils.js';
// untuk amani teks sebelum dimasukkan ke dalam template HTML.
const escapeHTML = (teks) => String(teks).replace(/[&<>"']/g, (karakter) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
}[karakter]));

// Class untuk merepresentasikan satu tugas kuliah.
class TaskItem {
    constructor(data) {
        this.id = data.id ?? Date.now();
        this.nama = data.nama ?? '';
        this.mataKuliah = data.mataKuliah ?? '';
        this.deadline = data.deadline ?? '';
        this.selesai = data.selesai ?? false;
    }

    sudahTerlambat() {
        const hariIni = new Date();
        hariIni.setHours(0, 0, 0, 0);
        return new Date(`${this.deadline}T00:00:00`) < hariIni;
    }

    render() {
        const terlambat = this.sudahTerlambat();
        return `
            <article class="task-card">
                <h3>${escapeHTML(this.nama)}</h3>
                <p>Mata Kuliah: ${escapeHTML(this.mataKuliah)}</p>
                <p>Deadline: ${escapeHTML(this.deadline)}</p>
                <p>Status: ${this.selesai ? 'Selesai' : 'Belum Selesai'}</p>
                <button type="button" class="selesai-tugas" data-id="${this.id}"
                    ${terlambat || this.selesai ? 'disabled' : ''}>
                    ${this.selesai ? 'Sudah Selesai' : 'Tandai Selesai'}
                </button>
                ${terlambat && !this.selesai
                    ? '<p class="peringatan">YAhahaha Deadlinenya udah lewat Pak cik, gak bisa dikumpul lek.</p>'
                    : ''}
                <button type="button" class="edit-tugas" data-id="${this.id}">Edit Tugas</button>
                <button type="button" class="hapus-tugas" data-id="${this.id}">Hapus</button>
            </article>
        `;
    }
}

// Class untuk merepresentasikan satu catatan.
class NoteItem {
    constructor(data) {
        this.id = data.id ?? Date.now();
        this.judul = data.judul ?? '';
        this.isi = data.isi ?? '';
    }

    render() {
        return `
            <article class="catatan-card">
                <h3>${escapeHTML(this.judul)}</h3>
                <p class="isi-catatan">${escapeHTML(this.isi)}</p>
                <button type="button" class="edit-catatan" data-id="${this.id}">Edit Catatan</button>
                <button type="button" class="hapus-catatan" data-id="${this.id}">Hapus Catatan</button>
            </article>
        `;
    }
}

// Class utama yang mengelola dashboard, tugas, catatan, jam, dan cuaca.
class DashboardApp {
    constructor() {
        this.formTugas = document.getElementById('form-tugas');
        this.daftarTugas = document.getElementById('daftar-tugas');
        this.formCatatan = document.getElementById('form-catatan');
        this.daftarCatatan = document.getElementById('daftar-catatan');
        this.tasks = (ambilData('daftarTugasBaru') || []).map((item) => new TaskItem(item));
        this.catatan = (ambilData('daftarCatatan') || []).map((item) => new NoteItem(item));
    }

    init() {
        this.formTugas.addEventListener('submit', (event) => this.tambahTugas(event));
        this.daftarTugas.addEventListener('click', (event) => this.aksiTugas(event));
        this.formCatatan.addEventListener('submit', (event) => this.tambahCatatan(event));
        this.daftarCatatan.addEventListener('click', (event) => this.aksiCatatan(event));
        this.tampilkanTugas();
        this.tampilkanCatatan();
        this.perbaruiJam();
        setInterval(() => this.perbaruiJam(), 1000);
        this.tampilkanCuaca();
    }

    tampilkanTugas() {
        this.daftarTugas.innerHTML = this.tasks.map((task) => task.render()).join('');
        simpanData('daftarTugasBaru', this.tasks);
    }

    tambahTugas(event) {
        event.preventDefault();
        const nama = document.getElementById('nama').value.trim();
        const mataKuliah = document.getElementById('mataKuliah').value.trim();
        const deadline = document.getElementById('deadline').value;

        if (!nama || !mataKuliah || !deadline) {
            alert('Mohon isi semua kolom!');
            return;
        }

        this.tasks.push(new TaskItem({ id: Date.now(), nama, mataKuliah, deadline, selesai: false }));
        this.tampilkanTugas();
        this.formTugas.reset();
    }

    aksiTugas(event) {
        const tombol = event.target.closest('button[data-id]');
        if (!tombol) return;
        const id = Number(tombol.dataset.id);
        const task = this.tasks.find((item) => item.id === id);

        if (tombol.classList.contains('hapus-tugas')) {
            this.tasks = this.tasks.filter((item) => item.id !== id);
        } else if (tombol.classList.contains('selesai-tugas') && task) {
            if (!task.sudahTerlambat() && !task.selesai) task.selesai = true;
        } else if (tombol.classList.contains('edit-tugas') && task) {
            const nama = prompt('Ubah nama tugas:', task.nama);
            if (nama === null) return;
            const mataKuliah = prompt('Ubah mata kuliah:', task.mataKuliah);
            if (mataKuliah === null) return;
            const deadline = prompt('Ubah deadline (YYYY-MM-DD):', task.deadline);
            if (deadline === null) return;
            if (!nama.trim() || !mataKuliah.trim() || !/^\d{4}-\d{2}-\d{2}$/.test(deadline)) {
                alert('Data tidak valid cik. Pastiin nama, mata kuliah, dan deadline diisi dengan benar ya :).');
                return;
            }
            task.nama = nama.trim();
            task.mataKuliah = mataKuliah.trim();
            task.deadline = deadline;
        } else {
            return;
        }
        this.tampilkanTugas();
    }

    tampilkanCatatan() {
        this.daftarCatatan.innerHTML = this.catatan.map((item) => item.render()).join('');
        simpanData('daftarCatatan', this.catatan);
    }

    tambahCatatan(event) {
        event.preventDefault();
        const judul = document.getElementById('judul-catatan').value.trim();
        const isi = document.getElementById('isi-catatan').value.trim();
        if (!judul || !isi) {
            alert('Judul dan isi catatan harus diisi!');
            return;
        }
        this.catatan.push(new NoteItem({ id: Date.now(), judul, isi }));
        this.tampilkanCatatan();
        this.formCatatan.reset();
    }

    aksiCatatan(event) {
        const tombol = event.target.closest('button[data-id]');
        if (!tombol) return;
        const id = Number(tombol.dataset.id);
        const item = this.catatan.find((catatan) => catatan.id === id);

        if (tombol.classList.contains('hapus-catatan')) {
            this.catatan = this.catatan.filter((catatan) => catatan.id !== id);
        } else if (tombol.classList.contains('edit-catatan') && item) {
            const judul = prompt('Ubah judul catatan:', item.judul);
            if (judul === null) return;
            const isi = prompt('Ubah isi catatan:', item.isi);
            if (isi === null) return;
            if (!judul.trim() || !isi.trim()) {
                alert('Judul dan isi catatan tidak boleh kosong.');
                return;
            }
            item.judul = judul.trim();
            item.isi = isi.trim();
        } else {
            return;
        }
        this.tampilkanCatatan();
    }

    perbaruiJam() {
        const sekarang = new Date();
        document.getElementById('jam-digital').textContent = sekarang.toLocaleTimeString('id-ID', {
            timeZone: 'Asia/Jakarta', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
        });
        document.getElementById('tanggal-digital').textContent = sekarang.toLocaleDateString('id-ID', {
            timeZone: 'Asia/Jakarta', weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
        });
    }

    async tampilkanCuaca() {
        const infoCuaca = document.getElementById('info-cuaca');
        try {
            infoCuaca.innerHTML = '<p>Memuat informasi cuaca ITERA...</p>';
            const url = 'https://api.open-meteo.com/v1/forecast?latitude=-5.36&longitude=105.31&current_weather=true';
            const respons = await fetch(url);
            if (!respons.ok) throw new Error('Gagal mengambil data cuaca');
            const data = await respons.json();
            const cuaca = data.current_weather;
            if (!cuaca) throw new Error('Data cuaca tidak tersedia');

            const deskripsiCuaca = {
                0: 'Cerah', 1: 'Cerah berawan', 2: 'Berawan sebagian', 3: 'Mendung',
                45: 'Berkabut', 48: 'Kabut tebal', 51: 'Gerimis ringan', 53: 'Gerimis sedang',
                55: 'Gerimis lebat', 61: 'Hujan ringan', 63: 'Hujan sedang', 65: 'Hujan lebat',
                80: 'Hujan lokal ringan', 81: 'Hujan lokal sedang', 82: 'Hujan lokal lebat', 95: 'Badai petir'
            };
            const kondisi = deskripsiCuaca[cuaca.weathercode] || 'Kondisi cuaca lainnya';
            infoCuaca.innerHTML = `
                <p>ITERA, Lampung Selatan</p>
                <h3>${escapeHTML(cuaca.temperature)} °C</h3>
                <p>${escapeHTML(kondisi)}</p>
                <p>Kecepatan angin: ${escapeHTML(cuaca.windspeed)} km/jam</p>
            `;
        } catch (error) {
            console.error('Kesalahan cuaca:', error);
            infoCuaca.innerHTML = '<p>Cuaca ITERA gagal dimuat.</p><p>Periksa koneksi internet, lalu muat ulang halaman.</p>';
        }
    }
}

const dashboard = new DashboardApp();
dashboard.init();
