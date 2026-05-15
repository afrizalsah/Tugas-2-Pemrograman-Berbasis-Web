const { createApp } = Vue;

const app = createApp({
    data() {
        return {
            upbjjList: dataBahanAjar.upbjjList,
            pengirimanList: dataBahanAjar.pengirimanList,
            paketList: dataBahanAjar.paket,
            trackingList: dataBahanAjar.tracking,

            newDO: {
                nomorDO: "",
                nim: "",
                nama: "",
                ekspedisi: "",
                paket: "",
                tanggalKirim: "",
                total: 0
            }
        };
    },
    computed: {
        // paket terpilih
        selectedPaket() {
            return this.paketList.find(p => p.kode === this.newDO.paket);
        },

        // auto-generate nomor DO berikutnya
        nextNomorDO() {
            const tahun = new Date().getFullYear();
            const existing = Object.keys(this.trackingList);
            const nextSeq = existing.length + 1;
            const nomor = String(nextSeq).padStart(4, "0");
            return `DO${tahun}-${nomor}`;
        }
    },
    watch: {
        selectedPaket(newVal) {
            if (newVal) {
                this.newDO.total = newVal.harga;
            } else {
                this.newDO.total = 0;
            }
        }
    },
    methods: {

         showPerjalanan(item) {

        let isi = `
            <div style="text-align:left">
        `;

        item.perjalanan.forEach((p, i) => {
            isi += `
                <div style="
                    margin-bottom:15px;
                    padding:12px;
                    border-radius:8px;
                    background:#f4f6f9;
                    border-left:5px solid #3498db;
                ">
                    <div style="font-weight:bold;">
                        Step ${i + 1}
                    </div>

                    <div style="
                        font-size:12px;
                        color:#666;
                        margin:4px 0;
                    ">
                        ${p.waktu}
                    </div>

                    <div>
                        ${p.keterangan}
                    </div>
                </div>
            `;
        });

        isi += `</div>`;

        Swal.fire({
            title: `Tracking ${item.paket}`,
            html: isi,
            width: 600,
            confirmButtonText: "Tutup",
            confirmButtonColor: "#3085d6"
        });
     },
        submitDO() {
            //validasi buat kelengkapan data
            if (!this.newDO.nim || !this.newDO.nama || !this.newDO.ekspedisi || !this.newDO.paket) {
                Swal.fire({
                    icon: "warning",
                    title: "Data Belum Lengkap",
                    text: "Silakan lengkapi semua field terlebih dahulu",
                    confirmButtonColor: "#f39c12"
                });
                return;
            }

            // auto-generate nomor DO ketika submit
            const nomor = this.nextNomorDO;
            this.newDO.nomorDO = nomor;

            const newData = {
                nim: this.newDO.nim,
                nama: this.newDO.nama,
                status: "Dalam Proses",
                ekspedisi: this.newDO.ekspedisi,
                tanggalKirim:
                    this.newDO.tanggalKirim || new Date().toISOString().split("T")[0],
                paket: this.newDO.paket,
                total: this.newDO.total,
                perjalanan: [
                    {
                        waktu: new Date().toLocaleString("id-ID"),
                        keterangan: "Data DO dibuat dan menunggu pengiriman"
                    }
                ]
            };

            // tambahkan ke trackingList
            this.trackingList[nomor] = newData;

            Swal.fire({
                icon: "success",
                title: "Data Berhasil Disimpan",
                html: `
                        <p>Nomor DO: <b>${nomor}</b></p>
                        <p>Nama: <b>${this.newDO.nama}</b></p>
                        <p>Paket: <b>${this.newDO.paket}</b></p>
                    `,
                confirmButtonText: "Oke",
                confirmButtonColor: "#3085d6",
            });


            // reset form
            this.newDO = {
                nomorDO: this.nextNomorDO,
                nim: "",
                nama: "",
                ekspedisi: "",
                paket: "",
                tanggalKirim: "",
                total: 0
            };
        }
    },
    mounted() {
        // set nomor DO awal saat load
        this.newDO.nomorDO = this.nextNomorDO;
    }
});

app.mount('#trackingApp');