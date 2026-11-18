# 1. Membuat list berisi 5 data mahasiswa
mahasiswa = [
    {
        "nama": "Budi01",
        "nim": "123140001",
        "nilai_uts": 85,
        "nilai_uas": 90,
        "nilai_tugas": 88
    },
    {
        "nama": "SantosoTzy",
        "nim": "123140002",
        "nilai_uts": 70,
        "nilai_uas": 75,
        "nilai_tugas": 80
    },
    {
        "nama": "CrzyKiler",
        "nim": "123140003",
        "nilai_uts": 90,
        "nilai_uas": 95,
        "nilai_tugas": 92
    },
    {
        "nama": "HotmanParis",
        "nim": "123140004",
        "nilai_uts": 60,
        "nilai_uas": 65,
        "nilai_tugas": 70
    },
    {
        "nama": "Eko sawit",
        "nim": "123140005",
        "nilai_uts": 45,
        "nilai_uas": 50,
        "nilai_tugas": 40
    }
]

# 2. Menghitung nilai akhir dan menentukan grade
for mhs in mahasiswa:

    nilai_akhir = (
        0.30 * mhs["nilai_uts"]
        + 0.40 * mhs["nilai_uas"]
        + 0.30 * mhs["nilai_tugas"]
    )

    mhs["nilai_akhir"] = nilai_akhir

    if nilai_akhir >= 80:
        mhs["grade"] = "A"
    elif nilai_akhir >= 70:
        mhs["grade"] = "B"
    elif nilai_akhir >= 60:
        mhs["grade"] = "C"
    elif nilai_akhir >= 50:
        mhs["grade"] = "D"
    else:
        mhs["grade"] = "E"

# 3. Menampilkan tabel data mahasiswa
print("=" * 75)
print("              DAFTAR NILAI MAHASISWA")
print("=" * 75)

print(
    f"{'Nama':<12}"
    f"{'NIM':<15}"
    f"{'UTS':<8}"
    f"{'UAS':<8}"
    f"{'Tugas':<8}"
    f"{'Akhir':<10}"
    f"{'Grade':<8}"
)

print("-" * 75)

for mhs in mahasiswa:
    print(
        f"{mhs['nama']:<12}"
        f"{mhs['nim']:<15}"
        f"{mhs['nilai_uts']:<8}"
        f"{mhs['nilai_uas']:<8}"
        f"{mhs['nilai_tugas']:<8}"
        f"{mhs['nilai_akhir']:<10.2f}"
        f"{mhs['grade']:<8}"
    )

print("=" * 75)

# 4. Mencari nilai tertinggi dan terendah
nilai_tertinggi = max(
    mahasiswa,
    key=lambda mhs: mhs["nilai_akhir"]
)

nilai_terendah = min(
    mahasiswa,
    key=lambda mhs: mhs["nilai_akhir"]
)

# 5. Menampilkan hasil nilai tertinggi dan terendah
print("\n===== HASIL ANALISIS NILAI =====")

print(
    f"Nilai Tertinggi : {nilai_tertinggi['nama']} "
    f"({nilai_tertinggi['nilai_akhir']:.2f})"
)

print(
    f"Nilai Terendah  : {nilai_terendah['nama']} "
    f"({nilai_terendah['nilai_akhir']:.2f})"
)