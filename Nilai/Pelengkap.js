// =================================================================
// BANGBIN SPA MODUL: DATA PELENGKAP RAPOR
// =================================================================

let isPelengkapInitialized = false;

function memuatModulPelengkap() {
    renderKerangkaPelengkap();
    renderSemuaDataPelengkap();
    
    if (!isPelengkapInitialized) {
        setupEventPelengkap();
        isPelengkapInitialized = true;
    }
}

// 1. MEMBUAT KERANGKA UI SECARA DINAMIS
function renderKerangkaPelengkap() {
    const section = document.getElementById('data-pelengkap');
    
    // Mencegah duplikasi render jika sudah ada
    if (document.getElementById('wrapperModulPelengkap')) return;

    section.innerHTML = `
        <div id="wrapperModulPelengkap">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid var(--primary-color); padding-bottom: 10px; margin-bottom: 20px;">
                <h2 style="margin: 0; color: var(--primary-color);"><i class="fa-solid fa-clipboard-list"></i> Data Pelengkap Rapor</h2>
                <div style="display: flex; gap: 10px;">
                    <button id="btnImporPelengkapSpa" class="btn-save kompak" style="background: #f59e0b; color: white;"><i class="fa-solid fa-file-arrow-up"></i> Impor Excel</button>
                    <button id="btnSimpanPelengkapSpa" class="btn-save kompak"><i class="fa-solid fa-save"></i> Simpan Semua</button>
                </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <!-- KOTAK ABSENSI -->
                <div class="card-section kompak" style="margin-bottom: 0;">
                    <div class="form-section-title kompak"><i class="fa-solid fa-calendar-xmark"></i> <span>Rekap Absensi</span></div>
                    <div style="overflow-x: auto; max-height: 50vh; border: 1px solid #e2e8f0; border-radius: 8px;">
                        <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem; text-align: center;">
                            <thead style="background: var(--primary-color); color: white; position: sticky; top: 0;">
                                <tr>
                                    <th style="padding: 10px; border: 1px solid #ddd; width: 5%;">No</th>
                                    <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Nama Siswa</th>
                                    <th style="padding: 10px; border: 1px solid #ddd; width: 15%;">Sakit</th>
                                    <th style="padding: 10px; border: 1px solid #ddd; width: 15%;">Izin</th>
                                    <th style="padding: 10px; border: 1px solid #ddd; width: 15%;">Alpha</th>
                                </tr>
                            </thead>
                            <tbody id="bodyAbsensiSpa"></tbody>
                        </table>
                    </div>
                </div>

                <!-- KOTAK CATATAN WALI KELAS -->
                <div class="card-section kompak" style="margin-bottom: 0;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                        <div class="form-section-title kompak" style="margin-bottom: 0;"><i class="fa-solid fa-comment-dots"></i> <span>Catatan Wali Kelas</span></div>
                        <button id="btnInspirasiCatatanSpa" class="btn-save kompak" style="background: #10b981; color: white; padding: 5px 10px; font-size: 0.8rem;"><i class="fa-solid fa-book"></i> Inspirasi</button>
                    </div>
                    <div style="overflow-x: auto; max-height: 50vh; border: 1px solid #e2e8f0; border-radius: 8px;">
                        <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem; text-align: center;">
                            <thead style="background: var(--primary-color); color: white; position: sticky; top: 0;">
                                <tr>
                                    <th style="padding: 10px; border: 1px solid #ddd; width: 5%;">No</th>
                                    <th style="padding: 10px; border: 1px solid #ddd; text-align: left; width: 25%;">Nama Siswa</th>
                                    <th style="padding: 10px; border: 1px solid #ddd;">Catatan</th>
                                </tr>
                            </thead>
                            <tbody id="bodyCatatanSpa"></tbody>
                        </table>
                    </div>
                </div>

                <!-- KOTAK PRESTASI SISWA -->
                <div class="card-section kompak" style="grid-column: 1 / -1;">
                    <div class="form-section-title kompak"><i class="fa-solid fa-trophy"></i> <span>Prestasi Kelas</span></div>
                    <form id="formPrestasiSpa" style="display: flex; gap: 10px; align-items: flex-end; margin-bottom: 15px; background: #f8faff; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0;">
                        <div class="input-wrapper kompak" style="flex-grow: 1;">
                            <label>Jenis Prestasi</label>
                            <input type="text" id="inputJenisPrestasi" class="form-control kompak" placeholder="Cth: Akademik, Olahraga" required>
                        </div>
                        <div class="input-wrapper kompak" style="flex-grow: 2;">
                            <label>Keterangan</label>
                            <input type="text" id="inputKetPrestasi" class="form-control kompak" placeholder="Cth: Juara 1 Lomba Cerdas Cermat" required>
                        </div>
                        <button type="submit" class="btn-save kompak"><i class="fa-solid fa-plus"></i> Tambah</button>
                    </form>
                    <div style="overflow-x: auto; max-height: 30vh; border: 1px solid #e2e8f0; border-radius: 8px;">
                        <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem; text-align: center;">
                            <thead style="background: #cbd5e1; color: #334155; position: sticky; top: 0;">
                                <tr>
                                    <th style="padding: 10px; border: 1px solid #ddd; text-align: left; width: 30%;">Jenis Prestasi</th>
                                    <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Keterangan</th>
                                    <th style="padding: 10px; border: 1px solid #ddd; width: 10%;">Aksi</th>
                                </tr>
                            </thead>
                            <tbody id="bodyPrestasiSpa"></tbody>
                        </table>
                    </div>
                </div>

                <!-- KOTAK STATUS AKHIR TAHUN (Hanya muncul jika Semester 2) -->
                <div id="sectionStatusAkhirSpa" class="card-section kompak" style="grid-column: 1 / -1; display: none;">
                    <div class="form-section-title kompak"><i class="fa-solid fa-graduation-cap"></i> <span id="judulStatusAkhirSpa">Status Akhir Tahun</span></div>
                    <div style="overflow-x: auto; max-height: 40vh; border: 1px solid #e2e8f0; border-radius: 8px;">
                        <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem; text-align: center;">
                            <thead id="headStatusSpa" style="background: var(--primary-color); color: white; position: sticky; top: 0;"></thead>
                            <tbody id="bodyStatusSpa"></tbody>
                        </table>
                    </div>
                </div>
            </div>
            
            <!-- CONTAINER UNTUK MODAL -->
            <div id="modalPelengkapContainer"></div>
            
            <style>
                .input-pelengkap-spa { width: 100%; padding: 6px; border: 1px solid transparent; text-align: center; background: transparent; font-family: inherit; }
                .input-pelengkap-spa:focus { outline: 2px solid var(--primary-color); background: white; border-radius: 4px; }
                .textarea-pelengkap-spa { width: 100%; padding: 6px; border: 1px solid transparent; background: transparent; font-family: inherit; resize: vertical; min-height: 40px; }
                .textarea-pelengkap-spa:focus { outline: 2px solid var(--primary-color); background: white; border-radius: 4px; }
            </style>
        </div>
    `;
}

// 2. MEMUAT & MERENDER DATA
function renderSemuaDataPelengkap() {
    const dataRapor = loadData();
    const dataSiswa = (dataRapor.dataSiswa || []).filter(s => s.nama && s.nama.trim() !== '');

    // Pastikan struktur objek ada
    if (!dataRapor.pelengkap) dataRapor.pelengkap = {};
    if (!dataRapor.pelengkap.absensi) dataRapor.pelengkap.absensi = {};
    if (!dataRapor.pelengkap.catatanWaliKelas) dataRapor.pelengkap.catatanWaliKelas = {};
    if (!dataRapor.pelengkap.prestasi) dataRapor.pelengkap.prestasi = [];
    if (!dataRapor.pelengkap.kenaikanKelas) dataRapor.pelengkap.kenaikanKelas = {};

    // A. Render Absensi
    const tbodyAbsen = document.getElementById('bodyAbsensiSpa');
    tbodyAbsen.innerHTML = '';
    dataSiswa.forEach((siswa, i) => {
        const absen = dataRapor.pelengkap.absensi[siswa.id] || { sakit: '', izin: '', alpha: '' };
        tbodyAbsen.innerHTML += `
            <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 8px;">${i + 1}</td>
                <td style="padding: 8px; text-align: left; font-weight: 500;">${siswa.nama}</td>
                <td style="padding: 0; background: #f8faff;"><input type="number" min="0" class="input-pelengkap-spa" data-siswa-id="${siswa.id}" data-type="sakit" value="${absen.sakit}"></td>
                <td style="padding: 0; background: #f8faff;"><input type="number" min="0" class="input-pelengkap-spa" data-siswa-id="${siswa.id}" data-type="izin" value="${absen.izin}"></td>
                <td style="padding: 0; background: #f8faff;"><input type="number" min="0" class="input-pelengkap-spa" data-siswa-id="${siswa.id}" data-type="alpha" value="${absen.alpha}"></td>
            </tr>`;
    });

    // B. Render Catatan
    const tbodyCatatan = document.getElementById('bodyCatatanSpa');
    tbodyCatatan.innerHTML = '';
    dataSiswa.forEach((siswa, i) => {
        const catatan = dataRapor.pelengkap.catatanWaliKelas[siswa.id] || '';
        tbodyCatatan.innerHTML += `
            <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 8px;">${i + 1}</td>
                <td style="padding: 8px; text-align: left; font-weight: 500;">${siswa.nama}</td>
                <td style="padding: 0; background: #f8faff;"><textarea class="textarea-pelengkap-spa" data-siswa-id="${siswa.id}">${catatan}</textarea></td>
            </tr>`;
    });

    // C. Render Prestasi
    renderPrestasiSPA(dataRapor);

    // D. Render Status Akhir (Hanya Semester 2)
    const sectionStatus = document.getElementById('sectionStatusAkhirSpa');
    if (dataRapor.infoDasar?.semester === '2') {
        const kelas = dataRapor.infoDasar.kelas || '';
        const isKelas6 = kelas.includes('6') || kelas.toUpperCase().includes('VI');
        const labelNaik = isKelas6 ? 'Lulus' : 'Naik Kelas';
        const labelTidakNaik = isKelas6 ? 'Mengulang' : 'Tidak Naik Kelas';

        document.getElementById('judulStatusAkhirSpa').textContent = `Status Akhir Tahun Ajaran ${dataRapor.infoDasar.tahunAjaran || ''}`;
        
        document.getElementById('headStatusSpa').innerHTML = `
            <tr>
                <th style="padding: 10px; border: 1px solid #ddd; width: 5%;">No</th>
                <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Nama Siswa</th>
                <th style="padding: 10px; border: 1px solid #ddd; width: 20%;">${labelNaik}<br><input type="checkbox" id="chkAllNaikSpa" style="cursor:pointer; transform: scale(1.2); margin-top: 5px;"></th>
                <th style="padding: 10px; border: 1px solid #ddd; width: 20%;">${labelTidakNaik}<br><input type="checkbox" id="chkAllTidakNaikSpa" style="cursor:pointer; transform: scale(1.2); margin-top: 5px;"></th>
            </tr>`;

        const tbodyStatus = document.getElementById('bodyStatusSpa');
        tbodyStatus.innerHTML = '';
        dataSiswa.forEach((siswa, i) => {
            const status = dataRapor.pelengkap.kenaikanKelas[siswa.id] || '';
            tbodyStatus.innerHTML += `
                <tr style="border-bottom: 1px solid #ddd;">
                    <td style="padding: 8px;">${i + 1}</td>
                    <td style="padding: 8px; text-align: left; font-weight: 500;">${siswa.nama}</td>
                    <td style="padding: 8px; background: #f8faff;"><input type="radio" name="status-${siswa.id}" value="${labelNaik}" ${status === labelNaik ? 'checked' : ''} data-siswa-id="${siswa.id}" style="transform: scale(1.2); cursor:pointer;"></td>
                    <td style="padding: 8px; background: #fdf7f7;"><input type="radio" name="status-${siswa.id}" value="${labelTidakNaik}" ${status === labelTidakNaik ? 'checked' : ''} data-siswa-id="${siswa.id}" style="transform: scale(1.2); cursor:pointer;"></td>
                </tr>`;
        });
        sectionStatus.style.display = 'block';
        
        // Logika Check All Status
        document.getElementById('chkAllNaikSpa').addEventListener('change', (e) => {
            if (e.target.checked) {
                document.querySelectorAll(`#bodyStatusSpa input[type="radio"][value="${labelNaik}"]`).forEach(r => r.checked = true);
                document.getElementById('chkAllTidakNaikSpa').checked = false;
            }
        });
        document.getElementById('chkAllTidakNaikSpa').addEventListener('change', (e) => {
            if (e.target.checked) {
                document.querySelectorAll(`#bodyStatusSpa input[type="radio"][value="${labelTidakNaik}"]`).forEach(r => r.checked = true);
                document.getElementById('chkAllNaikSpa').checked = false;
            }
        });
    } else {
        sectionStatus.style.display = 'none';
    }
}

function renderPrestasiSPA(dataRapor) {
    const tbody = document.getElementById('bodyPrestasiSpa');
    tbody.innerHTML = '';
    const daftarPrestasi = dataRapor.pelengkap?.prestasi || [];
    
    if (daftarPrestasi.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3" style="padding: 15px; font-style: italic; color: #64748b;">Belum ada data prestasi.</td></tr>';
        return;
    }
    
    daftarPrestasi.forEach((p, idx) => {
        tbody.innerHTML += `
            <tr style="border-bottom: 1px solid #ddd; background: white;">
                <td style="padding: 8px; text-align: left;">${p.jenis}</td>
                <td style="padding: 8px; text-align: left;">${p.keterangan}</td>
                <td style="padding: 8px;"><button class="btn-save kompak btn-hapus-prestasi" data-index="${idx}" style="background: #ef4444; color: white; padding: 4px 8px; font-size: 0.8rem;"><i class="fa-solid fa-trash"></i></button></td>
            </tr>`;
    });
}

// 3. LOGIKA & EVENT LISTENER
function setupEventPelengkap() {
    
    // A. Simpan Semua Data
    document.getElementById('btnSimpanPelengkapSpa').addEventListener('click', async () => {
        const btn = document.getElementById('btnSimpanPelengkapSpa');
        const oriHTML = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Menyimpan...';
        btn.disabled = true;

        const dataRapor = loadData();
        if (!dataRapor.pelengkap) dataRapor.pelengkap = {};
        if (!dataRapor.pelengkap.absensi) dataRapor.pelengkap.absensi = {};
        if (!dataRapor.pelengkap.catatanWaliKelas) dataRapor.pelengkap.catatanWaliKelas = {};
        if (!dataRapor.pelengkap.kenaikanKelas) dataRapor.pelengkap.kenaikanKelas = {};

        // Ambil Absensi
        document.querySelectorAll('#bodyAbsensiSpa input').forEach(input => {
            const { siswaId, type } = input.dataset;
            if (!dataRapor.pelengkap.absensi[siswaId]) dataRapor.pelengkap.absensi[siswaId] = {};
            dataRapor.pelengkap.absensi[siswaId][type] = input.value;
        });

        // Ambil Catatan
        document.querySelectorAll('#bodyCatatanSpa textarea').forEach(txt => {
            dataRapor.pelengkap.catatanWaliKelas[txt.dataset.siswaId] = txt.value;
        });

        // Ambil Status Akhir
        if (dataRapor.infoDasar?.semester === '2') {
            document.querySelectorAll('#bodyStatusSpa input[type="radio"]:checked').forEach(radio => {
                dataRapor.pelengkap.kenaikanKelas[radio.dataset.siswaId] = radio.value;
            });
        }

        saveData(dataRapor);
        btn.innerHTML = oriHTML;
        btn.disabled = false;

        if (typeof showModal === 'function') {
            showModal({ title: 'Tersimpan', message: 'Semua data pelengkap berhasil disimpan.', type: 'success' });
        }
    });

    // B. Tambah Prestasi
    document.getElementById('formPrestasiSpa').addEventListener('submit', (e) => {
        e.preventDefault();
        const jenis = document.getElementById('inputJenisPrestasi').value.trim();
        const ket = document.getElementById('inputKetPrestasi').value.trim();
        
        const dataRapor = loadData();
        if (!dataRapor.pelengkap) dataRapor.pelengkap = {};
        if (!dataRapor.pelengkap.prestasi) dataRapor.pelengkap.prestasi = [];
        
        dataRapor.pelengkap.prestasi.push({ jenis: jenis, keterangan: ket });
        saveData(dataRapor);
        
        document.getElementById('inputJenisPrestasi').value = '';
        document.getElementById('inputKetPrestasi').value = '';
        renderPrestasiSPA(dataRapor);
    });

    // C. Hapus Prestasi (Event Delegation)
    document.getElementById('bodyPrestasiSpa').addEventListener('click', async (e) => {
        const btn = e.target.closest('.btn-hapus-prestasi');
        if (!btn) return;
        
        const idx = btn.dataset.index;
        let confirmed = true;
        if(typeof showModal === 'function') {
            confirmed = await showModal({ title: 'Hapus Prestasi', message: 'Yakin ingin menghapus?', type: 'error', showCancelButton: true });
        } else {
            confirmed = confirm('Yakin ingin menghapus?');
        }

        if (confirmed) {
            const dataRapor = loadData();
            dataRapor.pelengkap.prestasi.splice(idx, 1);
            saveData(dataRapor);
            renderPrestasiSPA(dataRapor);
        }
    });

    // D. Modal Inspirasi Catatan
    document.getElementById('btnInspirasiCatatanSpa').addEventListener('click', () => {
        const inspirasi = [
            "Kemampuan Ananda dalam memahami dan menganalisis bacaan sangat luar biasa. Teruslah membaca buku-buku yang menantang.",
            "Ananda memiliki bakat alami dalam matematika. Teruslah berlatih memecahkan soal-soal kompleks.",
            "Tulisan Ananda sangat rapi dan terstruktur. Teruslah berlatih menulis dengan berbagai gaya.",
            "Ananda sangat teliti dalam mengerjakan soal hitungan. Pertahankan ketelitian tersebut.",
            "Ananda adalah teman yang baik dan selalu siap membantu. Teruslah tebarkan kebaikan.",
            "Kemampuan Ananda dalam bekerja sama dalam kelompok sangat luar biasa. Kembangkan jiwa kepemimpinanmu.",
            "Ananda sangat berani dalam mengambil risiko dan tidak takut gagal. Jangan pernah menyerah."
        ];

        let html = `
            <div id="modalInspirasiSpa" class="modal-backdrop show">
                <div class="modal-content" style="max-width: 600px;">
                    <div class="modal-header">
                        <h3 style="margin:0; font-size:1.2rem;"><i class="fa-solid fa-book"></i> Inspirasi Catatan Wali Kelas</h3>
                        <button type="button" class="close-button" onclick="document.getElementById('modalInspirasiSpa').remove()">×</button>
                    </div>
                    <div class="modal-body" style="padding: 10px 20px; max-height: 400px; overflow-y: auto;">
                        <p style="font-size: 0.85rem; color: #64748b; margin-top: 0;">Klik "Salin" lalu paste (*Ctrl+V*) pada kolom catatan siswa.</p>
                        <div id="listInspirasiContainer">`;
        
        inspirasi.forEach(teks => {
            html += `
                <div style="display: flex; gap: 10px; align-items: center; padding: 10px; border-bottom: 1px solid #e2e8f0;">
                    <p style="margin: 0; font-size: 0.9rem; flex-grow: 1;">${teks}</p>
                    <button class="btn-save kompak btn-salin-spa" data-teks="${teks}" style="background: var(--primary-color); color: white; padding: 5px 10px; font-size: 0.8rem; flex-shrink: 0;"><i class="fa-solid fa-copy"></i> Salin</button>
                </div>`;
        });

        html += `       </div>
                    </div>
                </div>
            </div>`;
        
        document.getElementById('modalPelengkapContainer').innerHTML = html;

        // Logika Salin Text
        document.querySelectorAll('.btn-salin-spa').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const text = e.target.closest('.btn-salin-spa').dataset.teks;
                navigator.clipboard.writeText(text).then(() => {
                    const originalHTML = btn.innerHTML;
                    btn.innerHTML = '<i class="fa-solid fa-check"></i> Disalin!';
                    btn.style.background = '#10b981';
                    setTimeout(() => {
                        btn.innerHTML = originalHTML;
                        btn.style.background = 'var(--primary-color)';
                    }, 1500);
                });
            });
        });
    });

    // E. Modal Impor Excel (Template + Impor)
    document.getElementById('btnImporPelengkapSpa').addEventListener('click', () => {
        let html = `
            <div id="modalImporPelengkapSpa" class="modal-backdrop show">
                <div class="modal-content" style="max-width: 450px;">
                    <div class="modal-header">
                        <h3 style="margin:0; font-size:1.2rem;"><i class="fa-solid fa-file-excel"></i> Impor Data Excel</h3>
                        <button type="button" class="close-button" onclick="document.getElementById('modalImporPelengkapSpa').remove()">×</button>
                    </div>
                    <div class="modal-body" style="padding: 10px 20px;">
                        <div style="background: #f8faff; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 15px;">
                            <h4 style="margin: 0 0 5px 0; color: #0ea5e9;">Langkah 1: Unduh Template</h4>
                            <p style="font-size: 0.85rem; color: #64748b; margin-top: 0;">Unduh format dan isi absen/catatan luring.</p>
                            <button id="btnDownloadTemplatePelengkap" class="btn-save kompak" style="width: 100%; justify-content: center; background: #10b981; color: white;"><i class="fa-solid fa-download"></i> Unduh Format Excel</button>
                        </div>
                        <div style="background: #fdf8f6; padding: 15px; border-radius: 8px; border: 1px solid #fce7f3;">
                            <h4 style="margin: 0 0 5px 0; color: #f43f5e;">Langkah 2: Unggah File</h4>
                            <p style="font-size: 0.85rem; color: #64748b; margin-top: 0;">Pilih file Excel yang sudah diisi.</p>
                            <input type="file" id="fileInputPelengkapSpa" accept=".xlsx, .xls" style="width: 100%; padding: 10px; border: 1px dashed #cbd5e1; border-radius: 6px; background: white;">
                        </div>
                    </div>
                    <div class="modal-footer" style="padding: 15px 20px;">
                        <button type="button" class="action-button secondary" onclick="document.getElementById('modalImporPelengkapSpa').remove()">Tutup</button>
                        <button type="button" id="btnProsesImporPelengkap" class="action-button primary"><i class="fa-solid fa-upload"></i> Proses Impor</button>
                    </div>
                </div>
            </div>`;
        
        document.getElementById('modalPelengkapContainer').innerHTML = html;

        // Eksekusi Unduh Template
        document.getElementById('btnDownloadTemplatePelengkap').addEventListener('click', () => {
            if (typeof XLSX === 'undefined') { alert("Library XLSX belum dimuat!"); return; }
            const dataRapor = loadData();
            const dataSiswa = (dataRapor.dataSiswa || []).filter(s => s.nama && s.nama.trim() !== '');

            const absensiHeader = [['id_siswa', 'nama_siswa', 'sakit', 'izin', 'alpha']];
            const catatanHeader = [['id_siswa', 'nama_siswa', 'catatan']];
            
            dataSiswa.forEach(siswa => {
                absensiHeader.push([siswa.id, siswa.nama, '', '', '']);
                catatanHeader.push([siswa.id, siswa.nama, '']);
            });

            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(absensiHeader), "Absensi");
            XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(catatanHeader), "Catatan Wali Kelas");

            const kelas = dataRapor.infoDasar?.kelas || 'Kelas';
            XLSX.writeFile(wb, `Template_Pelengkap_${kelas.replace(/\s/g, '_')}.xlsx`);
        });

        // Eksekusi Impor File
        // Eksekusi Impor File
        document.getElementById('btnProsesImporPelengkap').addEventListener('click', () => {
            const fileInput = document.getElementById('fileInputPelengkapSpa');
            if (!fileInput.files || fileInput.files.length === 0) {
                alert('Silakan pilih file Excel terlebih dahulu.'); return;
            }
            
            const file = fileInput.files[0];
            const reader = new FileReader();

            reader.onload = async (e) => {
                try {
                    const data = new Uint8Array(e.target.result);
                    const workbook = XLSX.read(data, { type: 'array' });
                    const dataRapor = loadData();
                    const dataSiswa = dataRapor.dataSiswa || [];
                    let importedDataCount = 0;

                    if (!dataRapor.pelengkap) dataRapor.pelengkap = {};
                    if (!dataRapor.pelengkap.absensi) dataRapor.pelengkap.absensi = {};
                    if (!dataRapor.pelengkap.catatanWaliKelas) dataRapor.pelengkap.catatanWaliKelas = {};

                    // Proses Sheet Absensi
                    if (workbook.Sheets["Absensi"]) {
                        const absensiData = XLSX.utils.sheet_to_json(workbook.Sheets["Absensi"]);
                        absensiData.forEach(row => {
                            const siswaId = String(row.id_siswa);
                            if (siswaId && dataSiswa.some(s => s.id === siswaId)) {
                                dataRapor.pelengkap.absensi[siswaId] = {
                                    sakit: row.sakit || 0,
                                    izin: row.izin || 0,
                                    alpha: row.alpha || 0
                                };
                                importedDataCount++;
                            }
                        });
                    }

                    // Proses Sheet Catatan
                    if (workbook.Sheets["Catatan Wali Kelas"]) {
                        const catatanData = XLSX.utils.sheet_to_json(workbook.Sheets["Catatan Wali Kelas"]);
                        catatanData.forEach(row => {
                            const siswaId = String(row.id_siswa);
                            if (siswaId && dataSiswa.some(s => s.id === siswaId)) {
                                dataRapor.pelengkap.catatanWaliKelas[siswaId] = row.catatan || '';
                                importedDataCount++;
                            }
                        });
                    }
                    
                    if (importedDataCount > 0) {
                        saveData(dataRapor);
                        renderSemuaDataPelengkap(); // Render Ulang
                        document.getElementById('modalImporPelengkapSpa').remove();
                        if (typeof showModal === 'function') {
                            showModal({ title: 'Berhasil', message: 'Data Absensi dan Catatan berhasil diimpor.', type: 'success' });
                        }
                    } else {
                        alert('Tidak ada data yang cocok untuk diimpor. Pastikan ID Siswa valid.');
                    }
                } catch (error) {
                    alert('Gagal memproses file. Pastikan format file sesuai template. Detail: ' + error.message);
                } finally {
                    fileInput.value = ''; // TAMBAHAN WAJIB
                }
            };
            reader.readAsArrayBuffer(file);
        });
    });
}