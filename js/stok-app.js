new Vue({
  el: '#app',

  // ============================
  // DATA
  // ============================
  data: {

    stok: dataBahanAjar.stok.map(item => ({
      ...item,
      edit: false
    })),

    upbjjList: dataBahanAjar.upbjjList,
    kategoriList: dataBahanAjar.kategoriList,

    filterUpbjj: '',
    filterKategori: '',
    onlyWarning: false,
    sortBy: '',

    showForm: false,
    isEdit: false,
    editKode: null,

    form: {
      kode: '',
      judul: '',
      kategori: '',
      upbjj: '',
      lokasiRak: '',
      harga: '',
      qty: '',
      safety: '',
      catatanHTML: ''
    }

  },

  // ============================
  // COMPUTED
  // ============================
  computed: {

    filteredData() {

      let data = [...this.stok];

      if (this.filterUpbjj) {
        data = data.filter(d => d.upbjj === this.filterUpbjj);
      }

      if (this.filterKategori) {
        data = data.filter(d => d.kategori === this.filterKategori);
      }

      if (this.onlyWarning) {
        data = data.filter(d => d.qty < d.safety || d.qty === 0);
      }

      if (this.sortBy) {
        data.sort((a, b) => {
          if (this.sortBy === 'judul') {
            return a.judul.localeCompare(b.judul);
          }
          return a[this.sortBy] - b[this.sortBy];
        });
      }

      return data;
    }

  },

  // ============================
  // METHODS
  // ============================
  methods: {

    // --------------------------
    // KONFIRMASI SIMPAN
    // --------------------------
    konfirmasiSimpan() {

      if (!this.form.kode || !this.form.judul || !this.form.kategori || !this.form.upbjj) {
        Swal.fire({
          icon: 'warning',
          title: 'Data Belum Lengkap',
          text: 'Silakan lengkapi semua field terlebih dahulu',
          confirmButtonColor: '#f39c12'
        });
        return;
      }

      Swal.fire({
        title: this.isEdit ? 'Update Data?' : 'Simpan Data?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: this.isEdit ? 'Update' : 'Simpan',
        cancelButtonText: 'Batal',
        confirmButtonColor: '#3498db',
        cancelButtonColor: '#95a5a6'
      }).then(result => {

        if (result.isConfirmed) {

          if (this.isEdit) {
            this.simpanEdit();
          } else {
            this.tambahData();
          }

          Swal.fire({
            icon: 'success',
            title: this.isEdit ? 'Data Berhasil Diupdate' : 'Data Berhasil Disimpan',
            confirmButtonText: 'Oke',
            confirmButtonColor: '#3085d6'
          });

        }

      });

    },

    // --------------------------
    // OPEN FORM TAMBAH
    // --------------------------
    openTambahForm() {

      this.isEdit = false;
      this.editKode = null;
      this.resetForm();
      this.showForm = true;

    },

    // --------------------------
    // EDIT DATA
    // --------------------------
    editData(item) {

      this.isEdit = true;
      this.editKode = item.kode;

      this.form = {
        kode: item.kode,
        judul: item.judul,
        kategori: item.kategori,
        upbjj: item.upbjj,
        lokasiRak: item.lokasiRak,
        harga: item.harga,
        qty: item.qty,
        safety: item.safety,
        catatanHTML: item.catatanHTML
      };

      this.showForm = true;

    },

    // --------------------------
    // SIMPAN EDIT
    // --------------------------
    simpanEdit() {

      if (!this.form.kode || !this.form.judul || !this.form.kategori || !this.form.upbjj) {
        Swal.fire({
          icon: 'warning',
          title: 'Data Belum Lengkap',
          text: 'Semua field wajib diisi',
          confirmButtonColor: '#f39c12'
        });
        return;
      }

      const index = this.stok.findIndex(item => item.kode === this.editKode);

      if (index !== -1) {
        this.stok.splice(index, 1, { ...this.form, edit: false });
      }

      Swal.fire({
        icon: 'success',
        title: 'Data berhasil diupdate',
        confirmButtonText: 'Oke',
        confirmButtonColor: '#3085d6'
      });

      this.showForm = false;
      this.resetForm();

    },

    // --------------------------
    // TAMBAH DATA
    // --------------------------
    tambahData() {

      if (!this.form.kode || !this.form.judul || !this.form.kategori || !this.form.upbjj) {
        Swal.fire({
          icon: 'warning',
          title: 'Data Belum Lengkap',
          text: 'Semua field wajib diisi',
          confirmButtonColor: '#f39c12'
        });
        return;
      }

      this.stok.push({ ...this.form, edit: false });

      Swal.fire({
        icon: 'success',
        title: 'Data berhasil ditambahkan',
        confirmButtonText: 'Oke',
        confirmButtonColor: '#3085d6'
      });

      this.showForm = false;
      this.resetForm();

    },

    // --------------------------
    // HAPUS DATA
    // --------------------------
    hapusData(index) {

      Swal.fire({
        title: 'Hapus Data?',
        text: 'Data yang dihapus tidak dapat dikembalikan',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya, Hapus',
        cancelButtonText: 'Batal',
        confirmButtonColor: '#e74c3c',
        cancelButtonColor: '#95a5a6'
      }).then(result => {

        if (result.isConfirmed) {

          this.stok.splice(index, 1);

          Swal.fire({
            icon: 'success',
            title: 'Data berhasil dihapus',
            confirmButtonText: 'Oke',
            confirmButtonColor: '#3085d6'
          });

        }

      });

    },

    // --------------------------
    // RESET FILTER
    // --------------------------
    resetFilter() {

      this.filterUpbjj = '';
      this.filterKategori = '';
      this.onlyWarning = false;
      this.sortBy = '';

    },

    // --------------------------
    // RESET FORM
    // --------------------------
    resetForm() {

      this.isEdit = false;
      this.editKode = null;

      this.form = {
        kode: '',
        judul: '',
        kategori: '',
        upbjj: '',
        lokasiRak: '',
        harga: '',
        qty: '',
        safety: '',
        catatanHTML: ''
      };

    },

    // --------------------------
    // GET STATUS TEXT
    // --------------------------
    getStatusText(item) {

      if (item.qty === 0) return '❌ Kosong';
      if (item.qty < item.safety) return '⚠️ Menipis';
      return '✅ Aman';

    },

    // --------------------------
    // GET STATUS CLASS
    // --------------------------
    getStatusClass(item) {

      if (item.qty === 0) return 'danger';
      if (item.qty < item.safety) return 'warning';
      return 'aman';

    }

  }

});