# Cara import pertama: mengimpor seluruh modul
import math_operations
# Cara import kedua: mengimpor fungsi tertentu
from math_operations import (
    luas_persegi,
    keliling_persegi,
    celsius_ke_fahrenheit,
    celsius_ke_kelvin
)
# 1. Menghitung Persegi
sisi = 5
print("\nPERSEGI")
print(f"Sisi             : {sisi}")
print(f"Luas             : {luas_persegi(sisi)}")
print(f"Keliling         : {keliling_persegi(sisi)}")
# 2. Menghitung Persegi Panjang
panjang = 8
lebar = 4
print("\nPERSEGI PANJANG")
print(f"Panjang          : {panjang}")
print(f"Lebar            : {lebar}")
print(
    f"Luas             : "
    f"{math_operations.luas_persegi_panjang(panjang, lebar)}"
)
print(
    f"Keliling         : "
    f"{math_operations.keliling_persegi_panjang(panjang, lebar)}"
)
# 3. Menghitung Lingkaran
jari_jari = 7
print("\nLINGKARAN")
print(f"Jari-jari        : {jari_jari}")
print(
    f"Luas             : "
    f"{math_operations.luas_lingkaran(jari_jari):.2f}"
)
print(
    f"Keliling         : "
    f"{math_operations.keliling_lingkaran(jari_jari):.2f}"
)
# 4. Konversi Suhu
celsius = 30
print("\nKONVERSI SUHU")
print(f"Celsius          : {celsius} C")
print(f"Fahrenheit       : {celsius_ke_fahrenheit(celsius):.2f} F")
print(f"Kelvin           : {celsius_ke_kelvin(celsius):.2f} K")

print("\nPROGRAM SELESAI")