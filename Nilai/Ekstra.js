// =================================================================
// BANGBIN SPA MODUL: INPUT NILAI EKSTRAKURIKULER
// =================================================================

let isEkstraEventsInitialized = false;
const opsiPredikatEkstra = ['Sangat Baik', 'Baik', 'Cukup', 'Perlu Peningkatan'];

function memuatModulEkstra() {
    renderKerangkaEkstra();
    renderTabelEkstra();
    
    if (!isEkstraEventsInitialized) {
        setupEventEkstra();
        isEkstraEventsInitialized = true;
    }
}

// 1. MEMBUAT UI KERANGKA HALAMAN
function renderKerangkaEkstra() {
    const section = document.getElementById('input-nilai-ekstra');
    
    // Cegah render ulang UI ganda
    if (!document.getElementById('wrapperModulEkstra')) {
        section.innerHTML = `
            <div id="wrapperModulEkstra">
                <div style="border-bottom: 2px solid var(--primary-color); padding-bottom: 10px; margin-bottom: 20px;">
                    <h2 style="margin: 0; color: var(--primary-color);"><i class="fa-solid fa-star"></i> Input Nilai Ekstrakurikuler</h2>
                </div>
                <p>Pilih predikat dan berikan deskripsi untuk setiap kegiatan ekstrakurikuler yang diikuti oleh siswa.</p>

                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; flex-wrap: wrap; gap: 10px; background: #f8faff; padding: 15px; border-radius: 10px; border: 1px solid #e2e8f0;">
                    <div style="position: relative; flex-grow: 1; max-width: 300px;">
                        <input type="text" id="filterNamaSiswaEkstra" placeholder="Cari nama siswa..." style="width: 100%; padding: 10px 10px 10px 35px; border-radius: 8px; border: 1px solid #cbd5e1; font-family: 'Poppins', sans-serif;">
                        <i class="fa-solid fa-magnifying-glass" style="position: absolute; left: 12px; top: 12px; color: #94a3b8;"></i>
                    </div>
                    <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                        <button id="btnTutorialEkstra" class="btn-save kompak" style="background: #0ea5e9; color: white; border-radius: 50%; width: 40px; padding: 0; display: flex; justify-content: center; align-items: center;" title="Panduan"><i class="fa-solid fa-question"></i></button>
                        <button id="btnExcelExportEkstra" class="btn-save kompak" style="background: #10b981; color: white;"><i class="fa-solid fa-file-arrow-down"></i> Template Excel</button>
                        <button id="btnExcelImportEkstra" class="btn-save kompak" style="background: #f59e0b; color: white;"><i class="fa-solid fa-file-arrow-up"></i> Impor Excel</button>
                        <button id="btnSimpanEkstraSpa" class="btn-save kompak"><i class="fa-solid fa-save"></i> Simpan Nilai</button>
                        <input type="file" id="fileImportExcelEkstra" accept=".xlsx, .xls" style="display: none;">
                    </div>
                </div>

                <div style="overflow-x: auto; max-height: 60vh; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.02);">
                    <table style="width: 100%; border-collapse: collapse; min-width: 800px; font-size: 0.85rem; white-space: nowrap;">
                        <thead id="headTabelEkstraSpa"></thead>
                        <tbody id="bodyTabelEkstraSpa" style="background: white;"></tbody>
                    </table>
                </div>
            </div>
            
            <style>
                .input-ekstra-spa { width: 100%; padding: 8px; border: 1px solid transparent; background: transparent; font-family: inherit; }
                .input-ekstra-spa:focus { outline: 2px solid var(--primary-color); background: white; border-radius: 4px; }
                .select-ekstra-spa { width: 100%; padding: 8px; border: 1px solid transparent; background: transparent; cursor: pointer; }
                .select-ekstra-spa:focus { outline: 2px solid var(--primary-color); background: white; border-radius: 4px; }
                .header-predikat-bulk { font-size: 0.8em; padding: 2px 4px; margin-left: 8px; border-radius: 4px; cursor: pointer; border: 1px solid #cbd5e1; }
            </style>
        `;
    }
}

// 2. MERENDER TABEL DATA
function renderTabelEkstra() {
    const dataRapor = loadData();
    const dataSiswa = dataRapor.dataSiswa || [];
    const dataEkstra = dataRapor.ekstrakurikuler || [];
    
    const thead = document.getElementById('headTabelEkstraSpa');
    const tbody = document.getElementById('bodyTabelEkstraSpa');
    
    if (!thead || !tbody) return;

    // Header HTML
    let headerRow1 = `<tr><th rowspan="2" style="padding: 10px; border: 1px solid #ddd; background: var(--primary-color); color: white; position: sticky; top: 0; z-index: 5; width: 4%;">No</th>
                          <th rowspan="2" style="padding: 10px; border: 1px solid #ddd; background: var(--primary-color); color: white; position: sticky; top: 0; z-index: 5; text-align: left; width: 15%;">Nama Siswa</th>`;
    let headerRow2 = `<tr style="background: #e0f2fe; color: #0369a1;">`;

    if (dataEkstra.length === 0) {
        headerRow1 += `<th style="padding: 10px; border: 1px solid #ddd; background: var(--primary-color); color: white; position: sticky; top: 0;">Tidak ada data ekstrakurikuler aktif.</th></tr>`;
        thead.innerHTML = headerRow1;
        tbody.innerHTML = `<tr><td colspan="3" style="padding: 20px; text-align: center;">Silakan tambahkan ekstrakurikuler di menu <b>Mapel & Ekstra</b>.</td></tr>`;
        return;
    }

    dataEkstra.forEach(eskul => {
        headerRow1 += `<th colspan="2" style="padding: 10px; border: 1px solid #ddd; background: var(--primary-color); color: white; position: sticky; top: 0; z-index: 5;">${eskul.nama}</th>`;
        
        let bulkOptions = '<option value="">Pilih Semua</option>';
        opsiPredikatEkstra.forEach(p => bulkOptions += `<option value="${p}">${p}</option>`);
        
        headerRow2 += `<th style="padding: 8px; border: 1px solid #ddd; min-width: 150px; position: sticky; top: 41px; z-index: 4;">
                            Predikat <select class="header-predikat-bulk" data-eskul-id="${eskul.id}">${bulkOptions}</select>
                       </th>
                       <th style="padding: 8px; border: 1px solid #ddd; min-width: 250px; position: sticky; top: 41px; z-index: 4;">Deskripsi</th>`;
    });

    headerRow1 += `</tr>`;
    headerRow2 += `</tr>`;
    thead.innerHTML = headerRow1 + headerRow2;

    // Body HTML
    tbody.innerHTML = '';
    if (dataSiswa.length === 0) {
        tbody.innerHTML = `<tr><td colspan="${dataEkstra.length * 2 + 2}" style="padding: 20px; text-align: center;">Belum ada data siswa.</td></tr>`;
        return;
    }

    dataSiswa.forEach((siswa, index) => {
        const tr = document.createElement('tr');
        tr.className = 'baris-siswa-ekstra';
        tr.dataset.nama = siswa.nama.toLowerCase();
        
        let rowHTML = `<td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${index + 1}</td>
                       <td style="padding: 8px; border: 1px solid #ddd; font-weight: 500;">${siswa.nama}</td>`;
        
        dataEkstra.forEach(eskul => {
            const nilaiTersimpan = dataRapor.pelengkap?.ekstrakurikuler?.[siswa.id]?.[eskul.id] || {};
            
            let predikatOptionsHTML = '<option value="">-- Kosong --</option>';
            opsiPredikatEkstra.forEach(opsi => {
                const isSelected = opsi === nilaiTersimpan.predikat ? 'selected' : '';
                predikatOptionsHTML += `<option value="${opsi}" ${isSelected}>${opsi}</option>`;
            });

            rowHTML += `
                <td style="padding: 0; border: 1px solid #ddd; background: #f8faff;">
                    <select class="select-ekstra-spa" data-siswa-id="${siswa.id}" data-eskul-id="${eskul.id}" data-type="predikat">${predikatOptionsHTML}</select>
                </td>
                <td style="padding: 0; border: 1px solid #ddd; background: #f8faff;">
                    <input type="text" class="input-ekstra-spa" placeholder="Capaian kompetensi..." value="${nilaiTersimpan.deskripsi || ''}" data-siswa-id="${siswa.id}" data-eskul-id="${eskul.id}" data-type="deskripsi">
                </td>
            `;
        });
        
        tr.innerHTML = rowHTML;
        tbody.appendChild(tr);
    });

    // Binding Event Bulk Select
    document.querySelectorAll('.header-predikat-bulk').forEach(select => {
        select.addEventListener('change', (e) => {
            const nilaiBaru = e.target.value;
            const eskulId = e.target.dataset.eskulId;
            if (!nilaiBaru) return;
            
            document.querySelectorAll(`select.select-ekstra-spa[data-eskul-id="${eskulId}"][data-type="predikat"]`).forEach(target => {
                target.value = nilaiBaru;
            });
            e.target.value = ''; // Kembalikan ke default
        });
    });
}

// 3. LOGIKA & EVENT LISTENER
function setupEventEkstra() {
    // A. Fitur Pencarian
    document.getElementById('filterNamaSiswaEkstra').addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        document.querySelectorAll('.baris-siswa-ekstra').forEach(row => {
            row.style.display = row.dataset.nama.includes(query) ? '' : 'none';
        });
    });

    // B. Fitur Simpan
    document.getElementById('btnSimpanEkstraSpa').addEventListener('click', async () => {
        const btn = document.getElementById('btnSimpanEkstraSpa');
        const oriHTML = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Menyimpan...';
        btn.disabled = true;

        const dataRapor = loadData();
        if (!dataRapor.pelengkap) dataRapor.pelengkap = {};
        if (!dataRapor.pelengkap.ekstrakurikuler) dataRapor.pelengkap.ekstrakurikuler = {};

        const semuaInput = document.getElementById('bodyTabelEkstraSpa').querySelectorAll('select, input[type="text"]');
        semuaInput.forEach(input => {
            const { siswaId, eskulId, type } = input.dataset;
            if (!dataRapor.pelengkap.ekstrakurikuler[siswaId]) dataRapor.pelengkap.ekstrakurikuler[siswaId] = {};
            if (!dataRapor.pelengkap.ekstrakurikuler[siswaId][eskulId]) dataRapor.pelengkap.ekstrakurikuler[siswaId][eskulId] = { predikat: '', deskripsi: '' };
            
            dataRapor.pelengkap.ekstrakurikuler[siswaId][eskulId][type] = input.value.trim();
            
            const nilaiEskul = dataRapor.pelengkap.ekstrakurikuler[siswaId][eskulId];
            if (!nilaiEskul.predikat && !nilaiEskul.deskripsi) {
                delete dataRapor.pelengkap.ekstrakurikuler[siswaId][eskulId];
                if (Object.keys(dataRapor.pelengkap.ekstrakurikuler[siswaId]).length === 0) {
                    delete dataRapor.pelengkap.ekstrakurikuler[siswaId];
                }
            }
        });

        saveData(dataRapor);
        btn.innerHTML = oriHTML;
        btn.disabled = false;
        
        if (typeof showModal === 'function') {
            showModal({ title: 'Tersimpan', message: 'Data nilai ekstrakurikuler berhasil disimpan.', type: 'success' });
        }
    });

    // C. Fitur Export Template Excel (Via XLSX)
    document.getElementById('btnExcelExportEkstra').addEventListener('click', () => {
        if (typeof XLSX === 'undefined') { alert("Library XLSX belum dimuat!"); return; }
        const dataRapor = loadData();
        const dataSiswa = dataRapor.dataSiswa || [];
        const dataEkstra = dataRapor.ekstrakurikuler || [];
        
        if (dataSiswa.length === 0 || dataEkstra.length === 0) {
            alert('Data siswa atau ekstrakurikuler kosong!'); return;
        }

        const header = ['ID_Siswa', 'Nama Siswa'];
        dataEkstra.forEach(eskul => {
            header.push(`${eskul.nama} | Predikat`);
            header.push(`${eskul.nama} | Deskripsi`);
        });

        const excelData = [header];
        dataSiswa.forEach(siswa => {
            const row = [siswa.id, siswa.nama];
            dataEkstra.forEach(eskul => {
                const nilai = dataRapor.pelengkap?.ekstrakurikuler?.[siswa.id]?.[eskul.id] || {};
                row.push(nilai.predikat || '');
                row.push(nilai.deskripsi || '');
            });
            excelData.push(row);
        });

        const worksheet = XLSX.utils.aoa_to_sheet(excelData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Nilai Ekstrakurikuler');

        const namaKelas = dataRapor.infoDasar?.kelas || 'Kelas';
        const fileName = `Format_Ekstra_${namaKelas.replace(/\s+/g, '_')}.xlsx`;
        XLSX.writeFile(workbook, fileName);
    });

    // D. Fitur Import Excel (Via XLSX)
    const fileInput = document.getElementById('fileImportExcelEkstra');
    document.getElementById('btnExcelImportEkstra').addEventListener('click', () => fileInput.click());
    
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (event) => {
            try {
                const dataRaw = new Uint8Array(event.target.result);
                const workbook = XLSX.read(dataRaw, { type: 'array' });
                const ws = workbook.Sheets[workbook.SheetNames[0]];
                const jsonData = XLSX.utils.sheet_to_json(ws);

                if (jsonData.length === 0) throw new Error("File Excel kosong.");
                
                const dataRapor = loadData();
                const dataSiswa = dataRapor.dataSiswa || [];
                const dataEkstra = dataRapor.ekstrakurikuler || [];
                
                if (!dataRapor.pelengkap) dataRapor.pelengkap = {};
                if (!dataRapor.pelengkap.ekstrakurikuler) dataRapor.pelengkap.ekstrakurikuler = {};

                let updatedCount = 0;
                jsonData.forEach(row => {
                    const siswaId = String(row['ID_Siswa']);
                    if (dataSiswa.find(s => s.id === siswaId)) {
                        dataEkstra.forEach(eskul => {
                            const predikatKey = `${eskul.nama} | Predikat`;
                            const deskripsiKey = `${eskul.nama} | Deskripsi`;

                            if (row[predikatKey] !== undefined || row[deskripsiKey] !== undefined) {
                                if (!dataRapor.pelengkap.ekstrakurikuler[siswaId]) dataRapor.pelengkap.ekstrakurikuler[siswaId] = {};
                                if (!dataRapor.pelengkap.ekstrakurikuler[siswaId][eskul.id]) dataRapor.pelengkap.ekstrakurikuler[siswaId][eskul.id] = { predikat: '', deskripsi: '' };
                                
                                const pVal = row[predikatKey] ? String(row[predikatKey]).trim() : '';
                                const dVal = row[deskripsiKey] ? String(row[deskripsiKey]).trim() : '';

                                if (opsiPredikatEkstra.includes(pVal)) dataRapor.pelengkap.ekstrakurikuler[siswaId][eskul.id].predikat = pVal;
                                dataRapor.pelengkap.ekstrakurikuler[siswaId][eskul.id].deskripsi = dVal;
                                updatedCount++;
                            }
                        });
                    }
                });

                saveData(dataRapor);
                renderTabelEkstra();
                if (typeof showModal === 'function') {
                    showModal({ title: 'Berhasil', message: `Data diimpor. ${updatedCount} entri nilai diproses.`, type: 'success' });
                }
            } catch (error) {
                alert('Gagal memproses file: ' + error.message);
            }
            fileInput.value = ''; // Reset input
        };
        reader.readAsArrayBuffer(file);
    });

    // E. Fitur Panduan
    document.getElementById('btnTutorialEkstra').addEventListener('click', () => {
        const pesan = `
            <div style="text-align: left; line-height: 1.6; font-size: 0.95em;">
                <b>Langkah-langkah Pengisian Ekstrakurikuler:</b>
                <ul style="padding-left: 20px; margin-top: 10px;">
                    <li><b>Isi Manual:</b> Pilih predikat dan ketik deskripsi di baris siswa.</li>
                    <li><b>Ubah Massal:</b> Klik di kolom predikat untuk menyamakan predikat seluruh siswa pada satu ekskul.</li>
                    <li><b>Jalur Excel:</b> Unduh template, isi secara luring, dan unggah kembali melalui tombol 'Impor'.</li>
                </ul>
                <p style="color: #d9534f; margin-bottom: 0;"><b>Jangan lupa klik Simpan Nilai setelah selesai!</b></p>
            </div>
        `;
        if (typeof showModal === 'function') showModal({ title: 'Panduan', message: pesan, type: 'info' });
    });
}
