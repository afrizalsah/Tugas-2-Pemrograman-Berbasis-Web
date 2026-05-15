function login() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let notif = document.getElementById("notif");

  let user = dataPengguna.find(u => u.email === email && u.password === password);

  if (!user) {
    notif.style.display = "block";
    notif.className = "notif error";
    notif.innerText = "Email atau password yang anda masukan salah";

    return false;
}

  localStorage.setItem("isLogin", "true");
  localStorage.setItem("nama", user.nama);
  localStorage.setItem("role", user.role);

// SUCCESS
  notif.style.display = "block";
  notif.className = "notif success";
  notif.innerText = "Login berhasil!";

  localStorage.setItem("nama", user.nama);

  setTimeout(() => {
    window.location.href = "dashboard.html";
  }, 1500);

  return false;
}

// MODAL
function showModal(type) {
  let modal = document.getElementById("modal");
  let text = document.getElementById("modalText");

  if (type === "lupa") {
    text.innerHTML = `
      <div style="text-align:center;">
        <div style="font-size:40px;">⚠️</div>
        <h3>Lupa Password</h3>
        <p>Silakan hubungi admin untuk reset password.</p>
      </div>
    `;
  } else {
    text.innerHTML = `
      <div style="text-align:center;">
        <div style="font-size:40px;">📝</div>
        <h3>Daftar Akun</h3>
        <p>Silakan hubungi admin untuk pendaftaran akun.</p>
      </div>
    `;
  }

  modal.style.display = "flex";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

// GREETING
function greeting() {
  let jam = new Date().getHours();
  let nama = localStorage.getItem("nama");

  let waktu = "";

    if (jam >= 0 && jam < 10) {
        waktu = "Pagi";       // 00.00 - 09.59
    } else if (jam >= 10 && jam < 15) {
        waktu = "Siang";      // 10.00 - 14.59
    } else if (jam >= 15 && jam < 19) {
        waktu = "Sore";       // 15.00 - 18.59
    } else {
        waktu = "Malam";      // 19.00 - 23.59
    }

  document.getElementById("greet").innerText = `Selamat ${waktu}, ${nama}`;
}

// TRACKING
function cariTracking() {
  let nomorDO = document.getElementById("nomorDO").value;
  let data = dataTracking [nomorDO];
  let hasil = document.getElementById("hasil");

   if (data) {
    // STATUS STYLE DINAMIS
    let statusClass = "kirim";
    if (data.status.toLowerCase().includes("perjalanan")) statusClass = "proses";
    if (data.status.toLowerCase().includes("selesai")) statusClass = "selesai";

    // TIMELINE
    let timelineHTML = "";
    data.perjalanan.forEach(p => {
      timelineHTML += `
        <div class="timeline-item">
          <div class="timeline-time">${p.waktu}</div>
          <div>${p.keterangan}</div>
        </div>
      `;
    });

    hasil.innerHTML = `
      <div class="card">
        <h3>Detail Pengiriman</h3>

        <p><b>Nama:</b> ${data.nama}</p>
        <p><b>Status:</b> <span style="color:green;">${data.status}</span></p>
        <p><b>Ekspedisi:</b> ${data.ekspedisi}</p>
        <p><b>Tanggal:</b> ${data.tanggalKirim}</p>
        <p><b>Paket:</b> ${data.paket}</p>
        <p><b>Total:</b> ${data.total}</p>

        <h4>Riwayat Perjalanan</h4>
        <div class="timeline">
          ${timelineHTML}
        </div>
      </div>
    `;
  } else {
    hasil.innerHTML = `
     <div class="card" style="color:red;">Data tidak ditemukan</div>
    `;
  }
}

function tambahStok() {
  let cover = document.getElementById("Cover").value;
  let kodeLokasi = document.getElementById("Kode Lokasi").value;
  let kodeBarang = document.getElementById("Kode Barang").value;
  let namaBarang = document.getElementById("Nama Barang").value;
  let jenisBarang = document.getElementById("Jenis Barang").value;
  let edisi = document.getElementById("Edisi").value;
  let stok = document.getElementById("Stok").value;

  dataBahanAjar.push({ cover, kodeBarang, namaBarang, jenisBarang, edisi, stok });

  tampilStok();
}

function cekRole() {
const formCard = document.getElementById('formTambahData');
const role = localStorage.getItem("role");

if (role === "Administrator") {
    formCard.style.display = "block"; // Tampilkan jika Admin
  } else {
    formCard.style.display = "none";  // Tetap sembunyi jika bukan
  }
}

function logout() {
  document.getElementById("logoutModal").style.display = "flex";
}

function checkLogin() {
  if (!localStorage.getItem("nama")) {
    window.location.href = "index.html";
  }
}

function closeLogoutModal() {
  document.getElementById("logoutModal").style.display = "none";
}

function confirmLogout() {
  localStorage.removeItem("loginUser");
  window.location.href = "index.html";
}

function openLogoutModal() {
  Swal.fire({
    icon: 'warning',
    title: 'Konfirmasi Logout',
    text: 'Apakah anda ingin keluar?',
    
    showCancelButton: true,

    confirmButtonText: 'Ya',
    cancelButtonText: 'Tidak',

    confirmButtonColor: '#e74c3c',
    cancelButtonColor: '#95a5a6'

  }).then((result) => {

    if (result.isConfirmed) {
      confirmLogout();
    }

  });
}

document.getElementById("cover").addEventListener("change", function(event) {
    const file = event.target.files[0];

    if(file){
        const reader = new FileReader();

        reader.onload = function(e){
            const preview = document.getElementById("previewCover");

            preview.src = e.target.result;
            preview.style.display = "block";
        }

        reader.readAsDataURL(file);
    }
});