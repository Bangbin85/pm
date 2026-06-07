// =================================================================
// BANGBIN SPA MODUL: MANAJEMEN DATA SISWA
// =================================================================

const agamaOptionsSiswa = ["Islam", "Kristen", "Katholik", "Hindu", "Budha", "Konghucu"];
const kelaminOptionsSiswa = ["Laki-laki", "Perempuan"];
const fieldsSiswa = [
    'nis', 'nisn', 'nama', 'kelamin', 'ttl', 'agama', 'alamatJalan', 'kelurahan', 'kecamatan', 'kota', 'provinsi',
    'namaAyah', 'pendidikanAyah', 'pekerjaanAyah', 'namaIbu', 'pendidikanIbu', 'pekerjaanIbu',
    'namaWali', 'pendidikanWali', 'pekerjaanWali', 'pendidikanSebelumnya', 'tanggalMasuk',
    'golonganDarah', 'tinggiBadan', 'beratBadan'
];

function memuatModulSiswa() {
    renderSiswaTabel();
}

function createDropdownCellSiswa(options, selectedValue, fieldName) {
    const cell = document.createElement('td');
    const select = document.createElement('select');
    select.dataset.field = fieldName;
    
    const defaultOption = document.createElement('option');
    defaultOption.value = "";
    defaultOption.textContent = "-- Pilih --";
    defaultOption.disabled = true;
    if (!selectedValue) defaultOption.selected = true;
    select.appendChild(defaultOption);
    
    options.forEach(opt => {
        const option = document.createElement('option');
        option.value = opt;
        option.textContent = opt;
        if (opt === selectedValue) {
            option.selected = true;
        }
        select.appendChild(option);
    });
    cell.appendChild(select);
    return cell;
}

function renderSiswaTabel() {
    const dataRapor = typeof loadData === 'function' ? loadData() : { dataSiswa: [] };
    const tabelBody = document.getElementById('tabelSiswaBody');
    if (!tabelBody) return;
    
    tabelBody.innerHTML = '';
    const dataSiswa = dataRapor.dataSiswa || [];
    const rowCount = Math.max(32, dataSiswa.length);
    
    for (let i = 0; i < rowCount; i++) {
        const siswa = dataSiswa[i] || {};
        const row = document.createElement('tr');
        row.dataset.index = i;
        row.innerHTML = `<td style="text-align:center;">${i + 1}</td>`;
        
        fieldsSiswa.forEach(field => {
            const value = siswa[field] || '';
            if (field === 'kelamin') {
                row.appendChild(createDropdownCellSiswa(kelaminOptionsSiswa, value, field));
            } else if (field === 'agama') {
                row.appendChild(createDropdownCellSiswa(agamaOptionsSiswa, value, field));
            } else {
                const cell = document.createElement('td');
                cell.setAttribute('contenteditable', 'true');
                cell.dataset.field = field;
                cell.textContent = value;
                row.appendChild(cell);
            }
        });
        tabelBody.appendChild(row);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const saveButton = document.getElementById('saveButton');
    const importButton = document.getElementById('importButton');
    const templateButton = document.getElementById('templateButton');
    const importFileInput = document.getElementById('importFile');
    const searchInput = document.getElementById('searchInput');
    const tutorialButton = document.getElementById('tutorialSiswaButton');

    if (saveButton) {
        saveButton.addEventListener('click', async () => {
            const originalHTML = saveButton.innerHTML;
            saveButton.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
            
            const dataRapor = typeof loadData === 'function' ? loadData() : { dataSiswa: [] };
            let dataSiswaBaru = [];
            const tabelBody = document.getElementById('tabelSiswaBody');
            const rows = tabelBody.querySelectorAll('tr');
            
            rows.forEach((row, index) => {
                const idSiswa = (dataRapor.dataSiswa && dataRapor.dataSiswa[index] && dataRapor.dataSiswa[index].id) 
                    ? dataRapor.dataSiswa[index].id 
                    : 'siswa-' + Date.now() + Math.random().toString(36).substring(2,8);
                
                const siswa = { id: idSiswa };
                let isEmpty = true;
                
                fieldsSiswa.forEach(field => {
                    const cell = row.querySelector(`[data-field="${field}"]`);
                    let value = '';
                    if(cell) {
                        if (cell.tagName === 'SELECT') {
                            value = cell.value;
                        } else if (cell.hasAttribute('contenteditable')) {
                            value = cell.textContent.trim();
                        }
                    }
                    siswa[field] = value;
                    if (field === 'nama' && value !== '') {
                        isEmpty = false;
                    }
                });
                
                if (!isEmpty) {
                    dataSiswaBaru.push(siswa);
                }
            });
            
            dataRapor.dataSiswa = dataSiswaBaru;
            if (typeof saveData === 'function') saveData(dataRapor);
            
            saveButton.innerHTML = originalHTML;
            if (typeof showModal === 'function') {
                await showModal({ title: 'Tersimpan', message: 'Perubahan data siswa berhasil disimpan!', type: 'success' });
            }
            renderSiswaTabel();
        });
    }

    if (templateButton) {
        templateButton.addEventListener('click', () => {
            const templateHeaders = {
                "NIS": "", "NISN": "", "NAMA SISWA": "", "L/P": "Laki-laki / Perempuan", "Tempat/Tgl Lahir": "Contoh: Jakarta, 17-08-2015", "Agama": "Pilih dari: Islam, Kristen, dll.", "Alamat Jalan": "",
                "Kelurahan": "", "Kecamatan": "", "Kota": "", "Provinsi": "", "Nama Ayah": "",
                "Pendidikan Ayah": "", "Pekerjaan Ayah": "", "Nama Ibu": "", "Pendidikan Ibu": "",
                "Pekerjaan Ibu": "", "Nama Wali": "", "Pendidikan Wali": "", "Pekerjaan Wali": "",
                "Pendidikan Sebelumnya": "", "Tgl Masuk": "DD-MM-YYYY", "Gol. Darah": "", "Tinggi (cm)": "", "Berat (kg)": ""
            };
            const worksheet = XLSX.utils.json_to_sheet([templateHeaders]);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "DataSiswa");
            XLSX.writeFile(workbook, "Template_Data_Siswa.xlsx");
        });
    }

    if (importButton && importFileInput) {
        importButton.addEventListener('click', () => importFileInput.click());
        
        importFileInput.addEventListener('change', async (event) => {
            const file = event.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = async (e) => {
                try {
                    const data = new Uint8Array(e.target.result);
                    const workbook = XLSX.read(data, { type: 'array' });
                    const sheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[sheetName];
                    
                    const json = XLSX.utils.sheet_to_json(worksheet, { defval: "", raw: false });

                    if (json.length === 0) {
                        if (typeof showModal === 'function') await showModal({ title: 'Error', message: 'File Excel kosong.', type: 'error' });
                        return;
                    }

                    if (typeof showModal === 'function') {
                        const confirmed = await showModal({
                            title: 'Konfirmasi Impor',
                            message: `Ditemukan ${json.length} baris data. Seluruh data di tabel saat ini akan DITIMPA secara keseluruhan oleh file Excel. Lanjutkan?`,
                            type: 'confirm',
                            showCancelButton: true,
                            confirmText: 'Ya, Lanjutkan'
                        });
                        if (!confirmed) {
                            importFileInput.value = '';
                            return;
                        }
                    }

                    const dataRapor = typeof loadData === 'function' ? loadData() : { dataSiswa: [] };
                    const existingStudents = dataRapor.dataSiswa || [];
                    
                    const mapConfig = {
                        "nis": "nis", "nisn": "nisn",
                        "nama siswa": "nama", "nama": "nama",
                        "l/p": "kelamin", "jenis kelamin": "kelamin",
                        "tempat/tgl lahir": "ttl", "ttl": "ttl",
                        "agama": "agama",
                        "alamat jalan": "alamatJalan", "alamat": "alamatJalan",
                        "kelurahan": "kelurahan", "kecamatan": "kecamatan", "kota": "kota", "kabupaten": "kota", "provinsi": "provinsi",
                        "nama ayah": "namaAyah", "pendidikan ayah": "pendidikanAyah", "pekerjaan ayah": "pekerjaanAyah",
                        "nama ibu": "namaIbu", "pendidikan ibu": "pendidikanIbu", "pekerjaan ibu": "pekerjaanIbu",
                        "nama wali": "namaWali", "pendidikan wali": "pendidikanWali", "pekerjaan wali": "pekerjaanWali",
                        "pendidikan sebelumnya": "pendidikanSebelumnya",
                        "tgl masuk": "tanggalMasuk",
                        "gol. darah": "golonganDarah", "gol darah": "golonganDarah",
                        "tinggi (cm)": "tinggiBadan", "tinggi": "tinggiBadan",
                        "berat (kg)": "beratBadan", "berat": "beratBadan"
                    };

                    const importedSiswa = [];

                    json.forEach(row => {
                        const normalizedRow = {};
                        Object.keys(row).forEach(key => { 
                            normalizedRow[key.toString().trim().toLowerCase()] = row[key]; 
                        });

                        const namaSiswa = normalizedRow['nama siswa'] || normalizedRow['nama'];
                        if (!namaSiswa || namaSiswa.toString().includes("Contoh") || namaSiswa.trim() === "") return;

                        let nis = normalizedRow['nis'] ? String(normalizedRow['nis']).trim() : '';
                        let nisn = normalizedRow['nisn'] ? String(normalizedRow['nisn']).trim() : '';

                        const existingSiswa = existingStudents.find(s => 
                            (nis !== '' && s.nis === nis) || 
                            (nisn !== '' && s.nisn === nisn)
                        );
                        
                        const idSiswa = existingSiswa ? existingSiswa.id : 'siswa-' + Date.now() + Math.random().toString(36).substr(2, 9);
                        const newSiswa = { id: idSiswa };

                        for (const [excelKey, dbField] of Object.entries(mapConfig)) {
                            if (normalizedRow.hasOwnProperty(excelKey)) {
                                newSiswa[dbField] = String(normalizedRow[excelKey]).trim();
                            } else if (!newSiswa[dbField]) {
                                newSiswa[dbField] = '';
                            }
                        }

                        importedSiswa.push(newSiswa);
                    });

                    if (importedSiswa.length === 0) {
                        if (typeof showModal === 'function') await showModal({ title: 'Peringatan', message: 'Tidak ada data siswa valid yang ditemukan.', type: 'error' });
                        return;
                    }

                    dataRapor.dataSiswa = importedSiswa;
                    if (typeof saveData === 'function') saveData(dataRapor);
                    
                    if (typeof showModal === 'function') await showModal({ title: 'Berhasil', message: `Berhasil mengimpor ${importedSiswa.length} data siswa!`, type: 'success' });
                    
                    renderSiswaTabel();
                    
                } catch (error) {
                    console.error(error);
                    if (typeof showModal === 'function') await showModal({ title: "Error", message: "Terjadi kesalahan saat impor: " + error.message, type: 'error' });
                } finally {
                    importFileInput.value = '';
                }
            };
            reader.readAsArrayBuffer(file);
        });
    }

    if (searchInput) {
        searchInput.addEventListener('keyup', () => {
            const query = searchInput.value.toLowerCase();
            const tabelBody = document.getElementById('tabelSiswaBody');
            if(!tabelBody) return;
            const rows = tabelBody.querySelectorAll('tr');
            rows.forEach(row => {
                const nameCell = row.querySelector('[data-field="nama"]');
                if (nameCell) {
                    const isVisible = nameCell.textContent.toLowerCase().includes(query);
                    row.style.display = isVisible ? '' : 'none';
                }
            });
        });
    }

    if (tutorialButton) {
        tutorialButton.addEventListener('click', () => {
            if (typeof showModal === 'function') {
                showModal({
                    title: 'Panduan Halaman Data Siswa',
                    message: `<div style="text-align: left; line-height: 1.6; font-size: 0.95rem;">
                        <p>1. <b>Ketik Langsung:</b> Klik pada sel tabel (berwarna kuning muda) lalu ketik datanya.<br>
                        2. <b>Impor Excel:</b> Unduh "Template Excel", isi, lalu unggah melalui tombol "Excel".</p>
                        <p style="background: #fff3cd; padding: 10px; border-radius: 8px; color: #856404; margin-top: 10px;"><b>PENTING:</b> Wajib klik tombol <b>"Simpan"</b> setelah mengubah data di tabel.</p>
                    </div>`,
                    type: 'confirm'
                });
            }
        });
    }
});