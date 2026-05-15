new Vue({
  el: '#app',

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

    // MODAL
    showForm: false,

    // MODE EDIT
    isEdit: false,

    // INDEX DATA YANG DIEDIT
    editKode: null,

    // FORM
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

  computed: {

    filteredData() {

      let data = [...this.stok];

      // FILTER UPBJJ
      if (this.filterUpbjj) {
        data = data.filter(
          d => d.upbjj === this.filterUpbjj
        );
      }

      // FILTER KATEGORI
      if (this.filterKategori) {
        data = data.filter(
          d => d.kategori === this.filterKategori
        );
      }

      // FILTER WARNING
      if (this.onlyWarning) {
        data = data.filter(
          d => d.qty < d.safety || d.qty === 0
        );
      }

      // SORT
      if (this.sortBy) {

        data.sort((a,b) => {

          if (this.sortBy === 'judul') {
            return a.judul.localeCompare(b.judul);
          }

          return a[this.sortBy] - b[this.sortBy];

        });

      }

      return data;
    }

  },

  methods: {

    // =========================
    // OPEN FORM TAMBAH
    // =========================
    openTambahForm() {

      // MODE TAMBAH
      this.isEdit = false;

      this.editKode = null;

      // RESET FORM
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

      // TAMPILKAN MODAL
      this.showForm = true;
    },

    // =========================
    // EDIT DATA
    // =========================
    editData(item, index) {

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

    // =========================
    // SIMPAN EDIT
    // =========================
    simpanEdit() {

      // VALIDASI
      if (
        !this.form.kode ||
        !this.form.judul ||
        !this.form.kategori ||
        !this.form.upbjj
      ) {

        alert('Data wajib diisi!');
        return;
      }

        // CARI INDEX BERDASARKAN KODE
      const index = this.stok.findIndex(
      item => item.kode === this.editKode
      );

      // UPDATE DATA
      if (index !== -1) {

    this.stok.splice(index, 1, {
      ...this.form,
      edit: false
    });

  }

      alert('Data berhasil diupdate');

      this.showForm = false;

      this.resetForm();
    },

    // =========================
    // HAPUS DATA
    // =========================
    hapusData(index) {

      let konfirmasi = confirm(
        'Yakin ingin menghapus data ini?'
      );

      if (konfirmasi) {
        this.stok.splice(index, 1);
      }

    },

    // =========================
    // STATUS TEXT
    // =========================
    getStatusText(item) {

      if (item.qty === 0) {
        return '❌ Kosong';
      }

      if (item.qty < item.safety) {
        return '⚠️ Menipis';
      }

      return '✅ Aman';
    },

    // =========================
    // STATUS CLASS
    // =========================
    getStatusClass(item) {

      if (item.qty === 0) {
        return 'danger';
      }

      if (item.qty < item.safety) {
        return 'warning';
      }

      return 'aman';
    },

    // =========================
    // RESET FILTER
    // =========================
    resetFilter() {

      this.filterUpbjj = '';
      this.filterKategori = '';
      this.onlyWarning = false;
      this.sortBy = '';
    },

    // =========================
    // TAMBAH DATA
    // =========================
    tambahData() {

      // VALIDASI
      if (
        !this.form.kode ||
        !this.form.judul ||
        !this.form.kategori ||
        !this.form.upbjj
      ) {

        alert('Data wajib diisi!');
        return;
      }

      // PUSH DATA
      this.stok.push({
        ...this.form,
        edit: false
      });

      alert('Data berhasil ditambahkan');

      this.showForm = false;

      this.resetForm();

    },

    // =========================
    // RESET FORM
    // =========================
    resetForm() {

      this.isEdit = false;

      this.editIndex = null;

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

    }

  }

});