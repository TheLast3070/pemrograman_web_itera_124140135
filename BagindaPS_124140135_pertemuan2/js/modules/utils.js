export const simpanData = (nama, data) => {
    localStorage.setItem(nama, JSON.stringify(data));
};

export const ambilData = (nama) => {
    const data = localStorage.getItem(nama);

    return data ? JSON.parse(data) : null;
};
