# Konstanta
PI = 3.14159
# 1. Persegi
def luas_persegi(sisi):
    """Menghitung luas persegi."""
    return sisi * sisi
def keliling_persegi(sisi):
    """Menghitung keliling persegi."""
    return 4 * sisi
# 2. Persegi Panjang
def luas_persegi_panjang(panjang, lebar):
    """Menghitung luas persegi panjang."""
    return panjang * lebar
def keliling_persegi_panjang(panjang, lebar):
    """Menghitung keliling persegi panjang."""
    return 2 * (panjang + lebar)
# 3. Lingkaran
def luas_lingkaran(jari_jari):
    """Menghitung luas lingkaran."""
    return PI * jari_jari * jari_jari
def keliling_lingkaran(jari_jari):
    """Menghitung keliling lingkaran."""
    return 2 * PI * jari_jari
# 4. Konversi Suhu
def celsius_ke_fahrenheit(celsius):
    """Mengubah suhu Celsius menjadi Fahrenheit."""
    return (celsius * 9 / 5) + 32
def celsius_ke_kelvin(celsius):
    """Mengubah suhu Celsius menjadi Kelvin."""
    return celsius + 273.15