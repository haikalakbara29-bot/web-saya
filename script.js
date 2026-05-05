function tampilkanNama() {
    let nama = document.getElementById("namaInput").value;

    if (nama === "") {
        alert("Nama tidak boleh kosong!");
        return;
    }

    document.getElementById("hasilNama").innerHTML =
        "Haiii " + nama + " Ganteng";
}


// =====================================
// LOCAL STORAGE HOBI
// =====================================

// Ambil data dari localStorage
let daftarHobi =
    JSON.parse(localStorage.getItem("hobi")) || [];


// Tambah Hobi
const tambahHobi = () => {
    let input = document.getElementById("hobiInput");
    let hobi = input.value;

    if (hobi === "") {
        alert("Hobi tidak boleh kosong!");
        return;
    }

    daftarHobi.push(hobi);

    // Simpan ke localStorage
    localStorage.setItem(
        "hobi",
        JSON.stringify(daftarHobi)
    );

    renderHobi();

    input.value = "";
};


// Render Hobi
const renderHobi = () => {
    let list = document.getElementById("listHobi");
    list.innerHTML = "";

    daftarHobi.forEach((item, index) => {
        let li = document.createElement("li");
        li.textContent = item;

        // Klik untuk hapus
        li.onclick = () => {
            daftarHobi.splice(index, 1);

            // Update localStorage
            localStorage.setItem(
                "hobi",
                JSON.stringify(daftarHobi)
            );

            renderHobi();
        };

        list.appendChild(li);
    });
};


// Hapus Semua
const hapusSemua = () => {
    localStorage.removeItem("hobi");
    daftarHobi = [];
    renderHobi();
};


// Tampilkan saat awal load
renderHobi();


// =====================================
// FETCH API DATA USER
// =====================================

const ambilData = async () => {
    try {
        let loading =
            document.getElementById("loading");
        let error =
            document.getElementById("error");
        let list =
            document.getElementById("dataUser");

        loading.style.display = "block";
        error.innerHTML = "";
        list.innerHTML = "";

        let response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        let data = await response.json();

        loading.style.display = "none";

        data.forEach(user => {
            let li = document.createElement("li");
            li.textContent =
                `${user.name} - ${user.email}`;
            list.appendChild(li);
        });

    } catch (err) {
        document.getElementById("loading").style.display = "none";
        document.getElementById("error").innerHTML =
            "Gagal mengambil data!";
    }
};

ambilData();