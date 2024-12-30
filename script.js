// Inisialisasi Variabel
let namaPemain1, namaPemain2, angkaRandom, giliran, kesempatan1, kesempatan2, batasAtas;

// Ambil Elemen DOM
const formPemain = document.getElementById("form-pemain");
const gameArea = document.getElementById("game-area");
const restartButton = document.getElementById("restart");
const namaGiliran = document.getElementById("namaGiliran");
const feedback = document.getElementById("feedback");
const tebakanInput = document.getElementById("tebakan");
const submitButton = document.getElementById("submit");

// Fungsi untuk Mulai Game
document.getElementById("mulai").addEventListener("click", () => {
    namaPemain1 = document.getElementById("namaPemain1").value || "Player 1";
    namaPemain2 = document.getElementById("namaPemain2").value || "Player 2";

    formPemain.style.display = "none";
    gameArea.style.display = "block";
});

// Pilih Level Kesulitan
document.querySelectorAll(".level").forEach(button => {
    button.addEventListener("click", (e) => {
        const level = parseInt(e.target.getAttribute("data-level"));
        if (level === 1) {
            batasAtas = 10;
            kesempatan1 = 3;
            kesempatan2 = 3;
        } else if (level === 2) {
            batasAtas = 20;
            kesempatan1 = 5;
            kesempatan2 = 5;
        } else if (level === 3) {
            batasAtas = 50;
            kesempatan1 = 7;
            kesempatan2 = 7;
        }

        angkaRandom = Math.floor(Math.random() * batasAtas) + 1;
        giliran = 1; // Mulai dengan Player 1

        document.getElementById("info-level").style.display = "none";
        namaGiliran.textContent = namaPemain1;
        document.getElementById("giliran").style.display = "block";
        tebakanInput.style.display = "inline";
        submitButton.style.display = "inline";
    });
});

// Submit Tebakan
submitButton.addEventListener("click", () => {
    const tebakan = parseInt(tebakanInput.value);

    if (isNaN(tebakan) || tebakan < 1 || tebakan > batasAtas) {
        feedback.textContent = `Input tidak valid! Masukkan angka 1 - ${batasAtas}.`;
        feedback.style.color = "red";
        return;
    }

    if (tebakan === angkaRandom) {
        feedback.textContent = `Selamat, ${giliran === 1 ? namaPemain1 : namaPemain2}! Kamu menang! Angka benar adalah ${angkaRandom}.`;
        feedback.style.color = "green";
        submitButton.disabled = true;
        restartButton.style.display = "block";
    } else {
        if (giliran === 1) {
            kesempatan1--;
            feedback.textContent = `Salah! Kesempatan ${namaPemain1} tersisa: ${kesempatan1}`;
        } else {
            kesempatan2--;
            feedback.textContent = `Salah! Kesempatan ${namaPemain2} tersisa: ${kesempatan2}`;
        }

        if (kesempatan1 === 0 && kesempatan2 === 0) {
            feedback.textContent = `Game over! Angka yang benar adalah ${angkaRandom}.`;
            submitButton.disabled = true;
            restartButton.style.display = "block";
        } else {
            giliran = giliran === 1 ? 2 : 1;
            namaGiliran.textContent = giliran === 1 ? namaPemain1 : namaPemain2;
        }
    }

    tebakanInput.value = "";
});

// Restart Game
restartButton.addEventListener("click", () => {
    location.reload(); // Reload halaman untuk reset game
});
