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
    showForm: false,

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

    editData(item) {

    item.backup = {
      judul: item.judul,
      qty: item.qty
    };

    item.edit = true;
    },

    simpanEdit(item) {

    item.edit = false;

    alert('Data berhasil diupdate');
    },

    batalEdit(item) {

    item.judul = item.backup.judul;
    item.qty = item.backup.qty;

    item.edit = false;
    },

    hapusData(index) {

    let konfirmasi = confirm(
      'Yakin ingin menghapus data ini?'
    );

    if (konfirmasi) {
      this.stok.splice(index, 1);
    }

    },

    getStatusText(item) {

      if (item.qty === 0) {
        return '❌ Kosong';
      }

      if (item.qty < item.safety) {
        return '⚠️ Menipis';
      }

      return '✅ Aman';
    },

    getStatusClass(item) {

      if (item.qty === 0) {
        return 'danger';
      }

      if (item.qty < item.safety) {
        return 'warning';
      }

      return 'aman';
    },

    resetFilter() {

      this.filterUpbjj = '';
      this.filterKategori = '';
      this.onlyWarning = false;
      this.sortBy = '';
    },

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

      this.stok.push({
        ...this.form,
        edit: false
      });

      alert('Data berhasil ditambahkan');
      this.showForm = false;

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

    }

  }

});