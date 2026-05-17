// ============================
// LOGIN
// ============================
function login() {

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const notif = document.getElementById('notif');

  const user = dataPengguna.find(u => u.email === email && u.password === password);

  if (!user) {
    notif.style.display = 'block';
    notif.className = 'notif error';
    notif.innerText = 'Email atau password yang anda masukan salah';
    return false;
  }

  localStorage.setItem('isLogin', 'true');
  localStorage.setItem('nama', user.nama);
  localStorage.setItem('role', user.role);

  notif.style.display = 'block';
  notif.className = 'notif success';
  notif.innerText = 'Login berhasil!';

  setTimeout(() => {
    window.location.href = 'dashboard.html';
  }, 1500);

  return false;

}

function togglePass() {
  const input = document.getElementById("password");
  const icon = document.getElementById("togglePassword");

  if (input.type === "password") {
    input.type = "text";
    icon.classList.remove("fa-eye");
    icon.classList.add("fa-eye-slash");
  } else {
    input.type = "password";
    icon.classList.remove("fa-eye-slash");
    icon.classList.add("fa-eye");
  }
}

document.getElementById("password").addEventListener("input", function () {
  const icon = document.getElementById("togglePassword");
  if (this.value.length > 0) {
    icon.style.display = "block";
  } else {
    icon.style.display = "none";
    this.type = "password";
    icon.classList.remove("fa-eye-slash");
    icon.classList.add("fa-eye");
  }
});

// ============================
// LOGOUT
// ============================
function logout() {
  document.getElementById('logoutModal').style.display = 'flex';
}

function closeLogoutModal() {
  document.getElementById('logoutModal').style.display = 'none';
}

function confirmLogout() {
  localStorage.removeItem('loginUser');
  window.location.href = 'index.html';
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
  }).then(result => {
    if (result.isConfirmed) {
      confirmLogout();
    }
  });

}

// ============================
// CEK LOGIN & ROLE
// ============================
function checkLogin() {
  if (!localStorage.getItem('nama')) {
    window.location.href = 'index.html';
  }
}

function cekRole() {

  const formCard = document.getElementById('formTambahData');
  const role = localStorage.getItem('role');

  formCard.style.display = role === 'Administrator' ? 'block' : 'none';

}

// ============================
// GREETING
// ============================
function greeting() {

  const jam = new Date().getHours();
  const nama = localStorage.getItem('nama');

  let waktu = '';

  if (jam < 10) {
    waktu = 'Pagi';        // 00.00 - 09.59
  } else if (jam < 15) {
    waktu = 'Siang';       // 10.00 - 14.59
  } else if (jam < 19) {
    waktu = 'Sore';        // 15.00 - 18.59
  } else {
    waktu = 'Malam';       // 19.00 - 23.59
  }

  document.getElementById('greet').innerText = `Selamat ${waktu}, ${nama}`;

}

// ============================
// MODAL
// ============================
function showModal(type) {

  if (type === 'lupa') {
    Swal.fire({
      icon: 'warning',
      title: 'Lupa Password',
      text: 'Silakan hubungi admin untuk reset password.',
      confirmButtonText: 'Oke',
      confirmButtonColor: '#f39c12'
    });
  } else {
    Swal.fire({
      icon: 'info',
      title: 'Daftar Akun',
      text: 'Silakan hubungi admin untuk pendaftaran akun.',
      confirmButtonText: 'Oke',
      confirmButtonColor: '#3498db'
    });
  }

}

function closeModal() {
  document.getElementById('modal').style.display = 'none';
}

// ============================
// TRACKING
// ============================
function cariTracking() {

  const nomorDO = document.getElementById('nomorDO').value;
  const data = dataTracking[nomorDO];
  const hasil = document.getElementById('hasil');

  if (!data) {
    hasil.innerHTML = '<div class="card" style="color:red;">Data tidak ditemukan</div>';
    return;
  }

  // Status class dinamis
  let statusClass = 'kirim';
  if (data.status.toLowerCase().includes('perjalanan')) statusClass = 'proses';
  if (data.status.toLowerCase().includes('selesai')) statusClass = 'selesai';

  // Timeline
  let timelineHTML = '';
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
      <p><b>Status:</b> <span class="status ${statusClass}">${data.status}</span></p>
      <p><b>Ekspedisi:</b> ${data.ekspedisi}</p>
      <p><b>Tanggal:</b> ${data.tanggalKirim}</p>
      <p><b>Paket:</b> ${data.paket}</p>
      <p><b>Total:</b> ${data.total}</p>
      <h4>Riwayat Perjalanan</h4>
      <div class="timeline">${timelineHTML}</div>
    </div>
  `;

}

// ============================
// STOK
// ============================
function tambahStok() {

  const cover = document.getElementById('Cover').value;
  const kodeLokasi = document.getElementById('Kode Lokasi').value;
  const kodeBarang = document.getElementById('Kode Barang').value;
  const namaBarang = document.getElementById('Nama Barang').value;
  const jenisBarang = document.getElementById('Jenis Barang').value;
  const edisi = document.getElementById('Edisi').value;
  const stok = document.getElementById('Stok').value;

  dataBahanAjar.push({ cover, kodeBarang, namaBarang, jenisBarang, edisi, stok });

  tampilStok();

}

// ============================
// PREVIEW COVER
// ============================
document.getElementById('cover').addEventListener('change', function (event) {

  const file = event.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = function (e) {
    const preview = document.getElementById('previewCover');
    preview.src = e.target.result;
    preview.style.display = 'block';
  };

  reader.readAsDataURL(file);

});