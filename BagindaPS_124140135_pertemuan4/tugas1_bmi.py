# Memasukkan data berat dan tinggi badan
berat_badan = float(input("Masukkan berat badan (kg): "))
tinggi_badan = float(input("Masukkan tinggi badan (m): "))

# Menghitung BMI
bmi = berat_badan / (tinggi_badan * tinggi_badan)

# Menentukan kategori BMI
if bmi < 18.5:
    kategori = "Berat badan kurang"
elif bmi < 25:
    kategori = "Berat badan normal"
elif bmi < 30:
    kategori = "Berat badan berlebih"
else:
    kategori = "Obesitas"

# Menampilkan hasil
print("\n===== HASIL PERHITUNGAN BMI =====")
print(f"Berat Badan : {berat_badan} kg")
print(f"Tinggi Badan: {tinggi_badan} m")
print(f"Nilai BMI   : {bmi:.2f}")
print(f"Kategori    : {kategori}")