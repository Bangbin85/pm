// =================================================================
// BANGBIN SPA MODUL: HASIL - CETAK & PDF RAPOR
// =================================================================

let isCetakInitialized = false;
let currentDownloadActionSPA = null;
const DEFAULT_LOGO_URL_SPA = 'https://www.kemendikdasmen.go.id/web/image/website/21/favicon?unique=c3563e4';

function memuatModulCetak() {
    injectCetakModals(); // Menyuntikkan DOM & CSS Khusus Cetak
    renderDaftarCetakSiswa();
    if (!isCetakInitialized) {
        setupEventCetakSPA();
        isCetakInitialized = true;
    }
}

function getStatusKeputusanText(status, info) {
    if (!status) return 'BELUM DITENTUKAN';
    const kelasAktif = info.kelasAktif || '';
    const match = kelasAktif.match(/kelas-(\d+)/);
    if (!match) return status.toUpperCase();
    
    const currentNum = parseInt(match[1]);
    const isKelasAkhir = [6, 9, 12].includes(currentNum);
    const romawi = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
    
    if (isKelasAkhir) {
        if (status.toLowerCase().includes('lulus') && !status.toLowerCase().includes('tidak')) {
            return 'LULUS DARI SATUAN PENDIDIKAN';
        } else {
            return 'TIDAK LULUS DARI SATUAN PENDIDIKAN';
        }
    } else {
        if (status.toLowerCase().includes('naik') && !status.toLowerCase().includes('tidak')) {
            const nextNum = currentNum + 1;
            let textKelasBaru = `Kelas ${nextNum}`;
            if (nextNum <= 12) {
                textKelasBaru = romawi[nextNum];
            }
            return `NAIK KELAS KE ${textKelasBaru}`;
        } else {
            let textKelasTinggal = `Kelas ${currentNum}`;
            if (currentNum <= 12) {
                textKelasTinggal = romawi[currentNum];
            }
            return `TIDAK NAIK KELAS (MENGULANG DI KELAS ${textKelasTinggal})`;
        }
    }
}

function renderDaftarCetakSiswa() {
    const dataRapor = loadData();
    const siswaValid = (dataRapor.dataSiswa || []).filter(s => s.nama && s.nama.trim() !== '');
    const tabelBody = document.getElementById('bodyTabelCetakSPA');
    
    tabelBody.innerHTML = '';
    if (siswaValid.length > 0) {
        siswaValid.forEach((siswa) => {
            tabelBody.innerHTML += `
                <tr style="border-bottom: 1px solid #e2e8f0;">
                    <td style="padding: 12px; font-weight: 500; text-align: left;">${siswa.nama}</td>
                    <td style="padding: 12px; text-align: center;"><button class="btn-action btn-nilai" onclick="window.showNilaiModal('${siswa.id}')"><i class="fa-solid fa-graduation-cap"></i> Nilai</button></td>
                    <td style="padding: 12px; text-align: center;"><button class="btn-action btn-data" onclick="window.showDataModal('${siswa.id}')"><i class="fa-solid fa-user"></i> Data</button></td>
                    <td style="padding: 12px; text-align: center;"><button class="btn-action btn-mutasi" onclick="window.showMutasiModal('${siswa.id}')"><i class="fa-solid fa-right-from-bracket"></i> Mutasi</button></td>
                </tr>`;
        });
    } else {
        tabelBody.innerHTML = '<tr><td colspan="4" style="text-align:center; padding: 20px; font-style: italic; color: #64748b;">Data siswa tidak ditemukan.</td></tr>';
    }
}

function injectCetakModals() {
    if (document.getElementById('modalCetakContainer')) return;
    
    // Injecting CSS khusus print dan style modal Cetak
    const style = document.createElement('style');
    style.innerHTML = `
        .btn-action { border: none; border-radius: 8px; padding: 8px 15px; font-size: 0.9em; font-weight: 600; cursor: pointer; transition: all 0.1s; display: inline-flex; align-items: center; justify-content: center; gap: 8px; min-width: 100px; color: white;}
        .btn-action:active { transform: translateY(3px); }
        .btn-nilai { background-color: #3b82f6; box-shadow: 0 4px 0 #004494; }
        .btn-data { background-color: #f59e0b; box-shadow: 0 4px 0 #cc8a00; }
        .btn-mutasi { background-color: #ef4444; box-shadow: 0 4px 0 #a71d2a; }
        
        .print-button { background-color: #28a745; color: white; padding: 8px 16px; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; margin-right: 10px; }
        .pdf-button { background-color: #dc3545; color: white; padding: 8px 16px; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; }
        
        .cetak-modal-wrapper { background: white; border-radius: 12px; width: 90%; max-width: 800px; max-height: 90vh; display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.3); transform: scale(0.95); transition: transform 0.3s; }
        .modal-backdrop.show .cetak-modal-wrapper { transform: scale(1); }
        
        .cetak-modal-body { padding: 25px; overflow-y: auto; font-family: 'Arial', sans-serif; font-size: 11pt; }
        .cetak-modal-body table { border-collapse: collapse; width: 100%; }
        .cetak-modal-body th, .cetak-modal-body td { border: 1px solid black; padding: 6px; }
        
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0 4rem; margin-bottom: 1rem; }
        .info-item { display: grid; grid-template-columns: 100px 10px auto; text-align: left; padding: 2px 0; }
        .rapor-footer-grid { display: grid; grid-template-columns: 40% 1fr; gap: 1rem; margin-top: 1rem; width: 100%; }
        .info-box { border: 1px solid black; }
        .info-box-header { background-color: #007bff; padding: 6px 10px; font-weight: bold; border-bottom: 1px solid rgb(238, 230, 230); text-align: center; color: #ffffff; }
        .absensi-table td { border: none; padding: 2px 0; vertical-align: top; }
        
        .pdf-layout-table { width: 100%; border-collapse: collapse; font-size: 11pt; }
        .pdf-layout-table td { padding: 4px; vertical-align: top; border: none; }
        .cover-page { text-align: center; padding: 20px; }
        .section-divider { border: 0; height: 1px; background-image: linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,0.75), rgba(0,0,0,0)); margin: 40px 0; }
        .footer-container { display: flex; justify-content: space-between; align-items: flex-end; margin-top: 40px; }
        .photo-box { width: 80px; height: 100px; border: 1px solid #333; display: flex; justify-content: center; align-items: center; font-size: 10pt; color: #aaa; flex-shrink: 0; margin-right: 50px;}
        .signature-block { text-align: left; margin-right: 150px; min-height: 70px;}
        
        #mutasiModalSPA .cetak-modal-wrapper { max-width: 850px; }
        .mutasi-table-bordered { width: 100%; border: 2px solid black; border-collapse: collapse; margin-bottom: 20px; }
        .mutasi-table-bordered th, .mutasi-table-bordered td { border: 1px solid black; padding: 6px; text-align: center; vertical-align: top; font-size: 11pt; }
        .mutasi-table-noborder { width: 100%; border-collapse: collapse; }
        .mutasi-table-noborder td { border: none; padding: 2px; vertical-align: top; text-align: left; }
        .mutasi-input { width: 100%; box-sizing: border-box; border: 1px solid transparent; background: transparent; border-radius: 4px; padding: 4px; font-family: 'Times New Roman', Times, serif; font-size: 11pt; }
        .mutasi-input:focus { border: 1px solid #999; background: #fff; }
        
        @media print {
            body > *:not(.printing) { display: none !important; }
            .printing { display: block !important; position: absolute; top: 0; left: 0; width: 100%; height: auto; background-color: white; box-shadow: none; justify-content: flex-start; align-items: flex-start; overflow: visible; }
            .printing .cetak-modal-wrapper { max-height: none; box-shadow: none; border: none; border-radius: 0; width: 100%; max-width: 100%; transform: none; }
            .printing .cetak-modal-body { overflow-y: visible; padding: 0; }
            .printing .modal-header, .printing .modal-close, .printing .print-button, .printing .pdf-button { display: none !important; }
            #dataModalSPA.printing .section-divider, #mutasiModalSPA.printing .section-divider { page-break-after: always; }
            #mutasiModalSPA .mutasi-input { border-color: transparent !important; background: #fff !important; box-shadow: none !important; -webkit-appearance: none; appearance: none; }
        }
    `;
    document.head.appendChild(style);

    const container = document.createElement('div');
    container.id = 'modalCetakContainer';
    container.innerHTML = `
        <div id="nilaiModalSPA" class="modal-backdrop">
            <div class="cetak-modal-wrapper">
                <div class="modal-header">
                    <h2 id="modalTitle"><i class="fa-solid fa-book-open"></i> Laporan Hasil Belajar</h2>
                    <div>
                        <button id="downloadPdfBtn" class="pdf-button"><i class="fa-solid fa-file-pdf"></i> PDF</button>
                        <button id="printNilaiBtn" class="print-button"><i class="fa-solid fa-print"></i> Cetak</button>
                        <button onclick="window.tutupSemuaModalCetak('nilaiModalSPA')" class="close-button">×</button>
                    </div>
                </div>
                <div class="cetak-modal-body" id="nilaiModalBody">
                    <h3 style="text-align:center; margin-top:0;">LAPORAN HASIL BELAJAR (RAPOR)</h3>
                    <div class="info-grid">
                        <div>
                            <div class="info-item"><span>Nama Murid</span><span>:</span><span id="modalNamaMurid"></span></div>
                            <div class="info-item"><span>NIS / NISN</span><span>:</span><span id="modalNisn"></span></div>
                            <div class="info-item"><span>Sekolah</span><span>:</span><span id="modalSekolah"></span></div>
                            <div class="info-item"><span>Alamat</span><span>:</span><span id="modalAlamat"></span></div>
                        </div>
                        <div>
                            <div class="info-item"><span>Kelas</span><span>:</span><span id="modalKelas"></span></div>
                            <div class="info-item"><span>Fase</span><span>:</span><span id="modalFase"></span></div>
                            <div class="info-item"><span>Semester</span><span>:</span><span id="modalSemester"></span></div>
                            <div class="info-item"><span>Tahun Ajaran</span><span>:</span><span id="modalTahunAjaran"></span></div>
                        </div>
                    </div>
                    <table>
                        <thead><tr><th style="width:5%; text-align:center;">No.</th><th style="text-align:center;">Mata Pelajaran</th><th style="width:15%; text-align:center;">Nilai Akhir</th><th style="text-align:center;">Capaian Kompetensi</th></tr></thead>
                        <tbody id="modalNilaiBodyTable"></tbody>
                    </table>
                    <p style="font-weight:bold; margin-top:15px; margin-bottom:5px;">Kokurikuler</p>
                    <div id="modalKokurikuler" style="border: 1px solid black; padding: 10px; min-height: 40px; text-align:justify; white-space:normal; text-indent: 20px;"></div>
                    <br>
                    <table>
                        <thead><tr><th style="width:5%; text-align:center;">No.</th><th style="text-align:center;">Ekstrakurikuler</th><th style="text-align:center;">Keterangan</th></tr></thead>
                        <tbody id="modalEkstraBody"></tbody>
                    </table>
                    <br>
                    <div class="rapor-footer-grid">
                        <div class="info-box"><div class="info-box-header">Ketidakhadiran</div>
                            <div class="info-box-content" style="min-height: auto; padding: 8px;">
                                <table class="absensi-table">
                                    <tbody>
                                        <tr><td>Sakit</td><td style="width: 10px;">:</td><td id="modalAbsenSakit" style="text-align:left;">... hari</td></tr>
                                        <tr><td>Izin</td><td style="width: 10px;">:</td><td id="modalAbsenIzin" style="text-align:left;">... hari</td></tr>
                                        <tr><td>Tanpa Keterangan</td><td style="width: 10px;">:</td><td id="modalAbsenAlpha" style="text-align:left;">... hari</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="info-box"><div class="info-box-header">Catatan Wali Kelas</div><div id="modalCatatanWali" class="info-box-content" style="white-space:normal; text-align:center;"></div></div>
                        
                        <div class="info-box" id="modalKeputusanBox" style="display:none; grid-column: 1 / 3;">
                            <div class="info-box-header">Keputusan</div>
                            <div class="info-box-content" id="modalKeputusan" style="padding: 15px; text-align:center; font-weight:bold;"></div>
                        </div>

                        <div class="info-box" style="grid-column: 1 / 3;"><div class="info-box-header">Tanggapan Orang Tua/ Wali Murid</div><div class="info-box-content" style="min-height: 50px;"></div></div>
                    </div>
                    <div style="margin-top: 40px; font-size: 11pt;">
                        <div style="display: flex; justify-content: space-between; text-align: center;">
                            <div style="width: 45%;">Orang Tua Murid<br><br><br><br><br>(.....................)</div>
                            <div style="width: 45%;"><span id="modalTanggalRapor"></span><br>Wali Kelas<br><br><br><br><strong id="modalNamaGuru" style="text-decoration: underline;"></strong><br><span>NIP. <span id="modalNipGuru"></span></span></div>
                        </div>
                        <div style="margin-top: 40px; text-align: center;">Kepala Sekolah<br><br><br><br><br><strong id="modalNamaKepsek" style="text-decoration: underline;"></strong><br><span>NIP. <span id="modalNipKepsek"></span></span></div>
                    </div>
                </div>
            </div>
        </div>

        <div id="dataModalSPA" class="modal-backdrop">
            <div class="cetak-modal-wrapper">
                <div class="modal-header">
                    <h2><i class="fa-solid fa-id-card"></i> Detail Data Siswa</h2>
                    <div>
                        <button id="downloadDataPdfBtn" class="pdf-button"><i class="fa-solid fa-file-pdf"></i> PDF</button>
                        <button id="printDataBtn" class="print-button"><i class="fa-solid fa-print"></i> Cetak</button>
                        <button onclick="window.tutupSemuaModalCetak('dataModalSPA')" class="close-button">×</button>
                    </div>
                </div>
                <div class="cetak-modal-body" id="dataModalBody">
                    <div class="cover-page">
                        <br><br><br>
                        <img id="dataModalLogo" src="https://via.placeholder.com/150" alt="Logo Sekolah" style="width:150px; height:150px; object-fit:contain;">
                        <h3 style="font-size: 1.5rem; margin-top:20px;">RAPOR PESERTA DIDIK</h3>
                        <h4 id="coverJenjangPendidikan" style="font-size: 1.5rem;"></h4>
                        <h4 id="coverNamaSekolah" style="font-size: 1.5rem;">nama sekolah</h4>
                        <div class="cover-student-info">
                            <br><br><br>
                            <p>Nama Peserta Didik:</p>
                            <h4 id="dataModalNamaSiswaCover" style="font-size: 2rem;">NAMA</h4>
                            <p>NIS / NISN:</p>
                            <h4 id="dataModalNisNisnCover" style="font-size: 1.2rem;">NIS</h4>
                        </div>
                        <br><br><br>
                        <div class="cover-footer">KEMENTERIAN PENDIDIKAN DASAR DAN MENENGAH<br>REPUBLIK INDONESIA</div>
                    </div>    
                    <hr class="section-divider">
                    <h3 style="text-align:center;">RAPOR PESERTA DIDIK</h3>
                    <div id="detailSekolahContainer"></div>
                    <hr class="section-divider">
                    <h3 style="text-align:center;">IDENTITAS PESERTA DIDIK</h3>
                    <div id="detailSiswaContainer"></div>
                </div>
            </div>
        </div>

        <div id="mutasiModalSPA" class="modal-backdrop">
            <div class="cetak-modal-wrapper">
                <div class="modal-header">
                    <h2><i class="fa-solid fa-right-left"></i> Keterangan Pindah Sekolah</h2>
                    <div>
                        <button id="printMutasiBtn" class="print-button"><i class="fa-solid fa-print"></i> Cetak</button>
                        <button onclick="window.tutupSemuaModalCetak('mutasiModalSPA')" class="close-button">×</button>
                    </div>
                </div>
                <div class="cetak-modal-body" id="mutasiContent"></div>
            </div>
        </div>

        <div id="confirmDownloadModalSPA" class="modal-backdrop">
            <div class="cetak-modal-wrapper" style="max-width: 450px;">
                <div class="modal-header">
                    <h2>Konfirmasi Unduh</h2>
                    <button onclick="window.tutupSemuaModalCetak('confirmDownloadModalSPA')" class="close-button">×</button>
                </div>
                <div class="cetak-modal-body" style="text-align:center;">
                    <i class="fa-solid fa-cloud-arrow-down fa-3x" style="color: var(--primary-color); margin-bottom: 15px;"></i>
                    <h3 id="confirmMessage">Apakah Anda yakin?</h3>
                    <p>Proses ini memakan waktu beberapa saat.</p>
                </div>
                <div class="modal-footer" style="justify-content:center;">
                    <button onclick="window.tutupSemuaModalCetak('confirmDownloadModalSPA')" class="action-button secondary">Batalkan</button>
                    <button id="startDownloadBtn" class="action-button primary">Unduh Sekarang</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(container);
}

function setupEventCetakSPA() {
    document.getElementById('searchInputCetak').addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const rows = document.querySelectorAll('#bodyTabelCetakSPA tr');
        rows.forEach(row => { row.style.display = row.cells[0].textContent.toLowerCase().includes(query) ? '' : 'none'; });
    });

    const handlePrint = (modalId) => {
        const modal = document.getElementById(modalId);
        modal.classList.add('printing');
        window.print();
    };
    
    document.getElementById('printNilaiBtn').addEventListener('click', () => handlePrint('nilaiModalSPA'));
    document.getElementById('printDataBtn').addEventListener('click', () => handlePrint('dataModalSPA'));
    document.getElementById('printMutasiBtn').addEventListener('click', () => handlePrint('mutasiModalSPA'));
    
    window.addEventListener('afterprint', () => {
        document.querySelectorAll('.modal-backdrop.printing').forEach(m => m.classList.remove('printing'));
    });

    document.getElementById('downloadAllNilaiBtn').addEventListener('click', () => {
        document.getElementById('confirmMessage').textContent = "Apakah Anda yakin untuk mengunduh SEMUA rapor nilai siswa?";
        currentDownloadActionSPA = downloadAllNilaiAsPdf;
        document.getElementById('confirmDownloadModalSPA').classList.add('show');
    });

    document.getElementById('downloadAllDataBtn').addEventListener('click', () => {
        document.getElementById('confirmMessage').textContent = "Apakah Anda yakin untuk mengunduh SEMUA detail data siswa?";
        currentDownloadActionSPA = downloadAllDataAsPdf;
        document.getElementById('confirmDownloadModalSPA').classList.add('show');
    });

    document.getElementById('startDownloadBtn').addEventListener('click', () => {
        if (typeof currentDownloadActionSPA === 'function') currentDownloadActionSPA();
    });
}

// Global functions for HTML onClick
window.tutupSemuaModalCetak = function(id) { document.getElementById(id).classList.remove('show'); };

window.showNilaiModal = function(siswaId) {
    const dataRapor = loadData();
    const siswa = dataRapor.dataSiswa.find(s => s.id === siswaId);
    const info = dataRapor.infoDasar;
    const pelengkap = dataRapor.pelengkap;
    const kelasAktif = info.kelasAktif || 'kelas-1';
    const semester = info.semester || '1';
    
    if(!siswa) return;

    document.getElementById('modalNamaMurid').textContent = siswa.nama;
    document.getElementById('modalNisn').textContent = `${siswa.nis || '-'} / ${siswa.nisn || '-'}`;
    document.getElementById('modalSekolah').textContent = info.namaSekolah || '-';
    document.getElementById('modalAlamat').textContent = [info.alamat, info.desaKelurahan, info.kabupatenKota, info.provinsi].filter(Boolean).join(', ');
    document.getElementById('modalKelas').textContent = info.kelas || '-';
    document.getElementById('modalFase').textContent = info.fase || '-';
    document.getElementById('modalSemester').textContent = info.semester ? `${info.semester} (${info.semester === '1' ? 'Ganjil' : 'Genap'})` : '-';
    document.getElementById('modalTahunAjaran').textContent = info.tahunAjaran || '-';

    // RENDER NILAI
    const modalNilaiBody = document.getElementById('modalNilaiBodyTable');
    let mapelRowsHTML = '';
    const mapelAgamaSiswa = dataRapor.mataPelajaran.find(m => siswa.agama && m.nama.includes(siswa.agama));
    const mapelUmum = dataRapor.mataPelajaran.filter(m => !m.nama.includes('Pendidikan Agama'));
    const daftarMapelSiswa = [mapelAgamaSiswa, ...mapelUmum].filter(Boolean);
    
    daftarMapelSiswa.forEach((mapel, index) => {
        const nilaiMapelSiswa = dataRapor.nilai?.[siswa.id]?.[kelasAktif]?.[mapel.id] || {};
        const tpMapel = dataRapor.tujuanPembelajaran?.[kelasAktif]?.[mapel.id] || (typeof TP_DEFAULT_MASTER !== 'undefined' ? TP_DEFAULT_MASTER[kelasAktif]?.[mapel.id] : []);
        const nilaiAkhir = (typeof nilaiMapelSiswa.nilaiAkhir === 'number') ? nilaiMapelSiswa.nilaiAkhir : '-';

        let deskripsi = '-';
        const nilaiArray = Object.values(nilaiMapelSiswa).filter(v => typeof v === 'number');
        if (tpMapel && tpMapel.length > 0 && nilaiArray.length > 0) {
            let capTertinggi = { nilai: -1, desk: null }, capTerendah = { nilai: 101, desk: null };
            tpMapel.forEach(tp => {
                const n = nilaiMapelSiswa[tp.id];
                if (typeof n === 'number') {
                    if (n > capTertinggi.nilai) capTertinggi = { nilai: n, desk: tp.deskripsi };
                    if (n < capTerendah.nilai) capTerendah = { nilai: n, desk: tp.deskripsi };
                }
            });
            if (capTertinggi.desk) {
                const pTinggi = getPredikatForNilai(mapel.id, capTertinggi.nilai, dataRapor);
                deskripsi = `Ananda menunjukkan penguasaan yang <strong>${(pTinggi||'baik').toLowerCase()}</strong> dalam ${capTertinggi.desk}`;
                if (capTerendah.desk && capTerendah.desk !== capTertinggi.desk) {
                    deskripsi += `, namun <strong>perlu bimbingan dan peningkatan</strong> dalam ${capTerendah.desk}.`;
                }
            }
        }
        mapelRowsHTML += `<tr><td style="text-align:center;">${index + 1}</td><td style="text-align:left;">${mapel.nama}</td><td style="text-align:center;">${nilaiAkhir}</td><td style="text-align:left; font-size:10pt;">${deskripsi}</td></tr>`;
    });
    modalNilaiBody.innerHTML = mapelRowsHTML || '<tr><td colspan="4" style="text-align:center;">Belum ada nilai.</td></tr>';

    const kokuSemesterData = dataRapor.deskripsiKokurikuler?.[kelasAktif]?.[semester]?.[siswa.id] || {};
    // Perubahan: join dengan spasi agar menjadi satu paragraf rapi
    document.getElementById('modalKokurikuler').innerHTML = Object.values(kokuSemesterData).filter(Boolean).join(' ') || '-';

    const modalEkstraBody = document.getElementById('modalEkstraBody');
    let ekstraRowsHTML = '';
    const ekstraSiswa = pelengkap?.ekstrakurikuler?.[siswa.id] || {};
    Object.keys(ekstraSiswa).forEach((eskulId, i) => {
        const eskulData = dataRapor.ekstrakurikuler.find(e => e.id === eskulId);
        if (eskulData && ekstraSiswa[eskulId].predikat) {
            ekstraRowsHTML += `<tr><td style="text-align:center;">${i+1}</td><td>${eskulData.nama}</td><td style="text-align:left;"><strong>${ekstraSiswa[eskulId].predikat}</strong></td></tr>`;
        }
    });
    modalEkstraBody.innerHTML = ekstraRowsHTML || '<tr><td colspan="3" style="text-align:center;">Tidak mengikuti ekstrakurikuler.</td></tr>';

    const absensi = pelengkap?.absensi?.[siswa.id] || {};
    document.getElementById('modalAbsenSakit').textContent = `${absensi.sakit || 0} hari`;
    document.getElementById('modalAbsenIzin').textContent = `${absensi.izin || 0} hari`;
    document.getElementById('modalAbsenAlpha').textContent = `${absensi.alpha || 0} hari`;
    document.getElementById('modalCatatanWali').textContent = pelengkap?.catatanWaliKelas?.[siswa.id] || '-';
    
    // Tampilkan Keputusan Hanya Jika Semester 2
    const isSemester2 = info.semester === '2' || info.semester === 2;
    const modalKeputusanBox = document.getElementById('modalKeputusanBox');
    if (isSemester2) {
        const status = pelengkap?.kenaikanKelas?.[siswa.id] || 'Belum Ditentukan';
        const keputusanTeks = getStatusKeputusanText(status, info);
        document.getElementById('modalKeputusan').innerHTML = `Berdasarkan pencapaian seluruh kompetensi, peserta didik ditetapkan:<br><br><span style="font-size:1.1em; font-weight:bold;">${keputusanTeks}</span>`;
        modalKeputusanBox.style.display = 'block';
    } else {
        modalKeputusanBox.style.display = 'none';
    }
    
    document.getElementById('modalNamaKepsek').textContent = info.kepalaSekolah || '';
    document.getElementById('modalNipKepsek').textContent = info.nipKepsek || '-';
    document.getElementById('modalNamaGuru').textContent = info.namaGuru || '';
    document.getElementById('modalNipGuru').textContent = info.nipGuru || '-';
    const tanggalRapor = new Date(info.tanggalRaporNilai || Date.now()).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });
    document.getElementById('modalTanggalRapor').textContent = `${info.kabupatenKota || 'Tempat'}, ${tanggalRapor}`;

    document.getElementById('downloadPdfBtn').onclick = () => downloadNilaiAsPdf(siswaId);
    document.getElementById('nilaiModalSPA').classList.add('show');
};

window.showDataModal = function(siswaId) {
    const dataRapor = loadData();
    const siswa = dataRapor.dataSiswa.find(s => s.id === siswaId);
    const info = dataRapor.infoDasar;
    if(!siswa || !info) return;

    document.getElementById('dataModalLogo').src = (info.logoSekolah && info.logoSekolah.startsWith('data:image')) ? info.logoSekolah : DEFAULT_LOGO_URL_SPA;
    document.getElementById('coverNamaSekolah').textContent = info.namaSekolah || '-';
    document.getElementById('dataModalNamaSiswaCover').textContent = siswa.nama;
    document.getElementById('dataModalNisNisnCover').textContent = `${siswa.nis || '-'} / ${siswa.nisn || '-'}`;
    document.getElementById('coverJenjangPendidikan').textContent = (info.jenjang || 'SEKOLAH DASAR').toUpperCase();

    document.getElementById('detailSekolahContainer').innerHTML = `
        <table class="pdf-layout-table">
            <tr><td>Nama Sekolah</td><td>:</td><td>${info.namaSekolah}</td></tr>
            <tr><td>NPSN</td><td>:</td><td>${info.npsn}</td></tr>
            <tr><td>Alamat Sekolah</td><td>:</td><td>${info.alamat}</td></tr>
            <tr><td>Kecamatan</td><td>:</td><td>${info.kecamatan}</td></tr>
            <tr><td>Kabupaten/Kota</td><td>:</td><td>${info.kabupatenKota}</td></tr>
            <tr><td>Provinsi</td><td>:</td><td>${info.provinsi}</td></tr>
        </table>`;

    document.getElementById('detailSiswaContainer').innerHTML = `
        <table class="pdf-layout-table">
            <tr><td>Nama Peserta Didik</td><td>:</td><td>${siswa.nama}</td></tr>
            <tr><td>NIS/NISN</td><td>:</td><td>${siswa.nis} / ${siswa.nisn}</td></tr>
            <tr><td>Tempat, Tanggal Lahir</td><td>:</td><td>${siswa.ttl}</td></tr>
            <tr><td>Jenis Kelamin</td><td>:</td><td>${siswa.kelamin}</td></tr>
            <tr><td>Agama</td><td>:</td><td>${siswa.agama}</td></tr>
            <tr><td>Nama Ayah</td><td>:</td><td>${siswa.namaAyah || '-'}</td></tr>
            <tr><td>Nama Ibu</td><td>:</td><td>${siswa.namaIbu || '-'}</td></tr>
        </table>
        <div class="footer-container">
            <div class="signature-block" style="flex-grow: 1;"></div>
            <div class="photo-box">Foto<br>3x4</div>
            <div class="signature-block">
                <span>Kepala Sekolah,</span><br><br><br><br>
                <strong style="text-decoration: underline;">${info.kepalaSekolah}</strong><br>NIP. ${info.nipKepsek}
            </div>
        </div>`;

    document.getElementById('downloadDataPdfBtn').onclick = () => downloadDataAsPdf(siswaId);
    document.getElementById('dataModalSPA').classList.add('show');
};

window.showMutasiModal = function(siswaId) {
    const dataRapor = loadData();
    const siswa = dataRapor.dataSiswa.find(s => s.id === siswaId);
    const info = dataRapor.infoDasar;
    if (!siswa) return;

    let html = `
        <h4 style="text-align: center;">KETERANGAN PINDAH KELUAR</h4>
        <p>Nama Siswa : <strong>${siswa.nama}</strong></p>
        <table class="mutasi-table-bordered">
            <tr><th style="width: 15%;">Tanggal</th><th style="width: 15%;">Kelas Ditinggalkan</th><th style="width: 25%;">Alasan</th><th>Tanda Tangan</th></tr>
            <tr>
                <td><input type="date" class="mutasi-input"></td>
                <td><input type="text" class="mutasi-input" value="${info.kelas}" style="text-align:center;"></td>
                <td><textarea class="mutasi-input"></textarea></td>
                <td style="text-align:left;">Kepala Sekolah<br><br><br><strong>${info.kepalaSekolah}</strong></td>
            </tr>
        </table>`;
    document.getElementById('mutasiContent').innerHTML = html;
    document.getElementById('mutasiModalSPA').classList.add('show');
};

// =======================
// PDF GENERATION LOGIC
// =======================

function getValidImage(url) {
    return new Promise((resolve) => {
        const source = url || DEFAULT_LOGO_URL_SPA;
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = () => {
            try {
                const canvas = document.createElement('canvas');
                canvas.width = img.width; canvas.height = img.height;
                canvas.getContext('2d').drawImage(img, 0, 0);
                resolve(canvas.toDataURL('image/png'));
            } catch (e) { resolve(source.startsWith('data:') ? source : null); }
        };
        img.onerror = () => resolve(null);
        img.src = source;
    });
}

function cleanHtml(html) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || '';
}

function getNilaiPdfContent(siswaId) {
    const dataRapor = loadData();
    const siswa = dataRapor.dataSiswa.find(s => s.id === siswaId);
    const info = dataRapor.infoDasar;
    const pelengkap = dataRapor.pelengkap;
    const kelasAktif = info.kelasAktif || 'kelas-1';
    const semester = info.semester || '1';
    
    if (!siswa) return null;

    // 1. Setup Tabel Nilai
    const tableBody = [[
        { text: 'No.', style: 'tableHeader' }, 
        { text: 'Mata Pelajaran', style: 'tableHeader' }, 
        { text: 'Nilai Akhir', style: 'tableHeader' }, 
        { text: 'Capaian Kompetensi', style: 'tableHeader' }
    ]];
    
    const mapelAgamaSiswa = dataRapor.mataPelajaran.find(m => siswa.agama && m.nama.includes(siswa.agama));
    const mapelUmum = dataRapor.mataPelajaran.filter(m => !m.nama.includes('Pendidikan Agama'));
    
    [mapelAgamaSiswa, ...mapelUmum].filter(Boolean).forEach((mapel, index) => {
        const nSiswa = dataRapor.nilai?.[siswa.id]?.[kelasAktif]?.[mapel.id] || {};
        const tpMapel = dataRapor.tujuanPembelajaran?.[kelasAktif]?.[mapel.id] || (typeof TP_DEFAULT_MASTER !== 'undefined' ? TP_DEFAULT_MASTER[kelasAktif]?.[mapel.id] : []);
        const nAkhir = typeof nSiswa.nilaiAkhir === 'number' ? nSiswa.nilaiAkhir : '-';
        let desk = '-';
        
        if (tpMapel && tpMapel.length > 0) {
            let maxN = -1, minN = 101, maxD = null, minD = null;
            tpMapel.forEach(tp => {
                if (typeof nSiswa[tp.id] === 'number') {
                    if (nSiswa[tp.id] > maxN) { maxN = nSiswa[tp.id]; maxD = tp.deskripsi; }
                    if (nSiswa[tp.id] < minN) { minN = nSiswa[tp.id]; minD = tp.deskripsi; }
                }
            });
            if (maxD) {
                desk = cleanHtml(`Menunjukkan penguasaan baik dalam ${maxD}` + (minD && minD !== maxD ? `. Perlu peningkatan dalam ${minD}` : ''));
            }
        }
        tableBody.push([
            { text: index + 1, style: 'tableCell' }, 
            { text: mapel.nama, style: 'tableCell', alignment: 'left' }, 
            { text: nAkhir, style: 'tableCell' }, 
            { text: desk, style: 'tableCell', alignment: 'justify' }
        ]);
    });

    // 2. Setup Kokurikuler
    const kokuSemesterDataPdf = dataRapor.deskripsiKokurikuler?.[kelasAktif]?.[semester]?.[siswa.id] || {};
    // Perubahan: join dengan spasi agar menjadi satu paragraf rapi
    const kokuText = Object.values(kokuSemesterDataPdf).filter(Boolean).join(' ') || '-';

    // 3. Setup Ekstrakurikuler
    const ekstraBody = [[
        { text: 'No.', style: 'tableHeader' }, 
        { text: 'Ekstrakurikuler', style: 'tableHeader' }, 
        { text: 'Keterangan', style: 'tableHeader' }
    ]];
    const ekstraSiswa = pelengkap?.ekstrakurikuler?.[siswa.id] || {};
    let adaEkstra = false;
    
    Object.keys(ekstraSiswa).forEach((eskulId, i) => {
        const eskulData = dataRapor.ekstrakurikuler.find(e => e.id === eskulId);
        if (eskulData && ekstraSiswa[eskulId].predikat) {
            adaEkstra = true;
            ekstraBody.push([
                { text: i + 1, alignment: 'center' },
                { text: eskulData.nama },
                { text: ekstraSiswa[eskulId].predikat, bold: true }
            ]);
        }
    });
    
    if (!adaEkstra) {
        ekstraBody.push([{ text: 'Tidak mengikuti ekstrakurikuler.', colSpan: 3, alignment: 'center' }, {}, {}]);
    }

    // 4. Data Pendukung
    const absen = pelengkap?.absensi?.[siswa.id] || {};
    const catatan = pelengkap?.catatanWaliKelas?.[siswa.id] || '-';
    const tanggalRapor = new Date(info.tanggalRaporNilai || Date.now()).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });
    const alamatSekolah = [info.alamat, info.desaKelurahan, info.kabupatenKota, info.provinsi].filter(Boolean).join(', ');

    // 5. Susunan Final PDF
    const susunanPdf = [
        { text: 'LAPORAN HASIL BELAJAR (RAPOR)', style: 'header', alignment: 'center', margin: [0, 0, 0, 15] },
        
        // Header Identitas
        {
            unbreakable: true,
            fontSize: 10,
            columns: [
                { 
                    width: '60%', 
                    table: { 
                        widths: [80, 10, '*'], 
                        body: [
                            ['Nama Murid', ':', siswa.nama],
                            ['NIS / NISN', ':', `${siswa.nis || '-'} / ${siswa.nisn || '-'}`],
                            ['Sekolah', ':', info.namaSekolah || '-'],
                            ['Alamat', ':', alamatSekolah]
                        ]
                    }, 
                    layout: 'noBorders'
                },
                { 
                    width: '40%', 
                    table: { 
                        widths: [80, 10, '*'], 
                        body: [
                            ['Kelas', ':', info.kelas || '-'],
                            ['Fase', ':', info.fase || '-'],
                            ['Semester', ':', info.semester ? `${info.semester} (${info.semester === '1' ? 'Ganjil' : 'Genap'})` : '-'],
                            ['Tahun Ajaran', ':', info.tahunAjaran || '-']
                        ]
                    }, 
                    layout: 'noBorders'
                }
            ],
            margin: [0, 0, 0, 15]
        },

        // Tabel Nilai Utama
        { 
            fontSize: 10,
            table: { 
                headerRows: 1, 
                dontBreakRows: true, 
                widths: ['auto', '25%', 'auto', '*'], 
                body: tableBody 
            }, 
            margin: [0, 0, 0, 15] 
        },

        // Kokurikuler
        { 
            unbreakable: true,
            fontSize: 10,
            stack: [
                { text: 'Kokurikuler', bold: true, margin: [0, 5, 0, 5] },
                { table: { widths: ['*'], body: [[{ text: kokuText, alignment: 'justify', margin: [5, 5, 5, 5] }]] }, margin: [0, 0, 0, 15] }
            ]
        },

        // Ekstrakurikuler
        { 
            unbreakable: true,
            fontSize: 10,
            stack: [
                { text: 'Ekstrakurikuler', bold: true, margin: [0, 5, 0, 5] },
                { 
                    table: { 
                        headerRows: 1, 
                        dontBreakRows: true, 
                        widths: ['auto', '40%', '*'], 
                        body: ekstraBody 
                    }, 
                    margin: [0, 0, 0, 15] 
                }
            ]
        },

        // Ketidakhadiran & Catatan Wali Kelas (Digabung dalam 1 Tabel)
        {
            unbreakable: true,
            fontSize: 10,
            table: {
                widths: ['40%', '60%'], // Pembagian rasio kolom
                body: [
                    [
                        { text: 'Ketidakhadiran', style: 'tableHeader' },
                        { text: 'Catatan Wali Kelas', style: 'tableHeader' }
                    ],
                    [
                        {
                            table: {
                                widths: ['auto', 10, '*'],
                                body: [
                                    ['Sakit', ':', `${absen.sakit || 0} hari`],
                                    ['Izin', ':', `${absen.izin || 0} hari`],
                                    ['Tanpa Keterangan', ':', `${absen.alpha || 0} hari`]
                                ]
                            },
                            layout: 'noBorders',
                            margin: [5, 5, 5, 5]
                        },
                        { 
                            text: catatan, 
                            margin: [5, 5, 5, 5], 
                            alignment: 'center' 
                        }
                    ]
                ]
            },
            margin: [0, 0, 0, 15]
        }
    ];

    // Sisipkan Keputusan (Hanya Apabila Semester 2)
    const isSemester2 = info.semester === '2' || info.semester === 2;
    if (isSemester2) {
        const status = pelengkap?.kenaikanKelas?.[siswa.id] || 'Belum Ditentukan';
        const keputusanTeks = getStatusKeputusanText(status, info);
        susunanPdf.push({
            unbreakable: true,
            fontSize: 10,
            table: {
                widths: ['*'],
                body: [
                    [{ text: 'Keputusan', style: 'tableHeader' }],
                    [{ text: [
                        'Berdasarkan pencapaian seluruh kompetensi, peserta didik ditetapkan:\n\n',
                        { text: keputusanTeks, fontSize: 11, bold: true }
                    ], margin: [5, 10, 5, 10], alignment: 'center' }]
                ]
            },
            margin: [0, 0, 0, 15]
        });
    }

    // Tanggapan Orang Tua / Wali Murid
    susunanPdf.push({ 
        unbreakable: true,
        fontSize: 10,
        table: { 
            widths: ['*'], 
            heights: [20, 60], // Baris judul: 20, Baris isi: minimal tinggi 60
            body: [
                [{ text: 'Tanggapan Orang Tua/Wali Murid', style: 'tableHeader' }],
                [{ text: '' }]
            ] 
        }, 
        margin: [0, 0, 0, 20] 
    });

    // Blok Tanda Tangan
    susunanPdf.push({
        unbreakable: true,
        pageBreak: 'after',
        fontSize: 10,
        stack: [
            {
                columns: [
                    { width: '45%', alignment: 'center', stack: ['\nOrang Tua Murid\n\n\n\n\n', `( ......................................... )`] },
                    { width: '10%', text: '' },
                    { 
                        width: '45%', 
                        alignment: 'center', 
                        stack: [
                            `${info.kabupatenKota || 'Tempat'}, ${tanggalRapor}`, 
                            'Wali Kelas\n\n\n\n\n', 
                            { text: info.namaGuru, bold: true, decoration: 'underline' }, 
                            `NIP. ${info.nipGuru || '-'}`
                        ] 
                    }
                ],
                margin: [0, 0, 0, 20]
            },
            {
                alignment: 'center',
                stack: [
                    'Kepala Sekolah\n\n\n\n\n',
                    { text: info.kepalaSekolah, bold: true, decoration: 'underline' },
                    `NIP. ${info.nipKepsek || '-'}`
                ]
            }
        ]
    });

    return susunanPdf;
}

async function getDataPdfContent(siswaId) {
    const dataRapor = loadData();
    const siswa = dataRapor.dataSiswa.find(s => s.id === siswaId);
    const info = dataRapor.infoDasar;
    
    if (!siswa) return null;
    
    const logoBase64 = await getValidImage(info.logoSekolah);
    let logoImage = logoBase64 ? { image: logoBase64, width: 120, alignment: 'center', margin: [0, 40, 0, 40] } : { text: '(Logo Sekolah)', alignment: 'center', margin: [0, 40, 0, 40] };

    return [
        // HALAMAN 1: COVER
        {
            stack: [
                logoImage,
                { text: 'RAPOR PESERTA DIDIK', style: 'coverHeader', margin: [0, 20, 0, 10] },
                { text: (info.jenjang || 'SEKOLAH DASAR').toUpperCase(), fontSize: 18, bold: true, margin: [0, 0, 0, 10] },
                { text: (info.namaSekolah || '').toUpperCase(), fontSize: 18, bold: true, margin: [0, 0, 0, 60] },

                { text: 'Nama Peserta Didik:', fontSize: 14, margin: [0, 0, 0, 10] },
                { text: siswa.nama.toUpperCase(), fontSize: 24, bold: true, margin: [0, 0, 0, 30] },

                { text: 'NIS / NISN:', fontSize: 14, margin: [0, 0, 0, 5] },
                { text: `${siswa.nis || '-'} / ${siswa.nisn || '-'}`, fontSize: 16, margin: [0, 0, 0, 80] },

                { text: 'KEMENTERIAN PENDIDIKAN DASAR DAN MENENGAH\nREPUBLIK INDONESIA', alignment: 'center', bold: true, fontSize: 12 }
            ],
            alignment: 'center',
            pageBreak: 'after'
        },
        
        // HALAMAN 2: IDENTITAS SEKOLAH
        { text: 'RAPOR PESERTA DIDIK', style: 'pageHeader', alignment: 'center', margin: [0, 0, 0, 30] },
        {
            table: {
                widths: [150, 10, '*'],
                body: [
                    ['Nama Sekolah', ':', info.namaSekolah || '-'],
                    ['NPSN', ':', info.npsn || '-'],
                    ['Alamat Sekolah', ':', info.alamat || '-'],
                    ['Kecamatan', ':', info.kecamatan || '-'],
                    ['Kabupaten/Kota', ':', info.kabupatenKota || '-'],
                    ['Provinsi', ':', info.provinsi || '-']
                ]
            },
            layout: 'noBorders',
            margin: [40, 0, 40, 40],
            pageBreak: 'after'
        },
        
        // HALAMAN 3: IDENTITAS SISWA
        { text: 'IDENTITAS PESERTA DIDIK', style: 'pageHeader', alignment: 'center', margin: [0, 0, 0, 30] },
        {
            table: {
                widths: [150, 10, '*'],
                body: [
                    ['Nama Peserta Didik', ':', siswa.nama || '-'],
                    ['NIS / NISN', ':', `${siswa.nis || '-'} / ${siswa.nisn || '-'}`],
                    ['Tempat, Tanggal Lahir', ':', siswa.ttl || '-'],
                    ['Jenis Kelamin', ':', siswa.kelamin || '-'],
                    ['Agama', ':', siswa.agama || '-'],
                    ['Nama Ayah', ':', siswa.namaAyah || '-'],
                    ['Nama Ibu', ':', siswa.namaIbu || '-']
                ]
            },
            layout: 'noBorders',
            margin: [40, 0, 40, 60]
        },
        {
            columns: [
                { width: '*', text: '' },
                {
                    width: 'auto',
                    table: { 
                        widths: [80], 
                        body: [[{ text: 'Foto\n3x4', alignment: 'center', margin: [0, 30, 0, 30] }]] 
                    }
                },
                { width: 40, text: '' },
                {
                    width: 'auto',
                    stack: [
                        `Kepala Sekolah,\n\n\n\n\n`,
                        { text: info.kepalaSekolah || '-', bold: true, decoration: 'underline' },
                        `NIP. ${info.nipKepsek || '-'}`
                    ]
                }
            ],
            pageBreak: 'after'
        }
    ];
}

function executePdfMake(docDefinition, filename) {
    try { pdfMake.createPdf(docDefinition).download(filename); } 
    catch (e) { console.error(e); alert("Gagal membuat PDF."); }
}

function downloadNilaiAsPdf(siswaId) {
    const dataRapor = loadData();
    const content = getNilaiPdfContent(siswaId);
    if (!content) return;
    delete content[content.length - 1].pageBreak;
    executePdfMake({ pageSize: 'A4', pageMargins: [40,40,40,60], content, styles: { header: { fontSize: 16, bold: true }, tableHeader: { bold: true, fillColor: '#E8E8E8', alignment: 'center' }, tableCell: { alignment: 'center' } } }, `Rapor-${siswaId}.pdf`);
}

async function downloadDataAsPdf(siswaId) {
    const content = await getDataPdfContent(siswaId);
    if (!content) return;
    delete content[content.length - 1].pageBreak;
    executePdfMake({ pageSize: 'A4', pageMargins: [70,60,70,120], content, styles: { coverHeader: { fontSize: 16, bold: true }, pageHeader: { fontSize: 14, bold: true } } }, `Data-${siswaId}.pdf`);
}

function downloadAllNilaiAsPdf() {
    const dataRapor = loadData();
    const siswaList = (dataRapor.dataSiswa || []).filter(s => s.nama);
    let allContent = [];
    siswaList.forEach(s => { const c = getNilaiPdfContent(s.id); if (c) allContent.push(...c); });
    if (allContent.length > 0) delete allContent[allContent.length - 1].pageBreak;
    executePdfMake({ pageSize: 'A4', pageMargins: [40,40,40,60], content: allContent, styles: { header: { fontSize: 16, bold: true }, tableHeader: { bold: true, fillColor: '#E8E8E8', alignment: 'center' }, tableCell: { alignment: 'center' } } }, `Semua-Rapor-Nilai.pdf`);
    window.tutupSemuaModalCetak('confirmDownloadModalSPA');
}

async function downloadAllDataAsPdf() {
    const dataRapor = loadData();
    const siswaList = (dataRapor.dataSiswa || []).filter(s => s.nama);
    let allContent = [];
    for (const s of siswaList) { const c = await getDataPdfContent(s.id); if (c) allContent.push(...c); }
    if (allContent.length > 0) delete allContent[allContent.length - 1].pageBreak;
    executePdfMake({ pageSize: 'A4', pageMargins: [70,60,70,120], content: allContent, styles: { coverHeader: { fontSize: 16, bold: true }, pageHeader: { fontSize: 14, bold: true } } }, `Semua-Data-Siswa.pdf`);
    window.tutupSemuaModalCetak('confirmDownloadModalSPA');
}
