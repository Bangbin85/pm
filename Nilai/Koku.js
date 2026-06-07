// =================================================================
// BANGBIN SPA MODUL: INPUT NILAI KOKURIKULER (P5)
// =================================================================

let isKokuEventsInitialized = false;

function memuatModulKoku() {
    if (!isKokuEventsInitialized) {
        setupEventKoku();
        isKokuEventsInitialized = true;
    }
}

function setupEventKoku() {
    document.getElementById('pilihKokuSection').addEventListener('change', (e) => {
        const kokuId = e.target.value;
        const wadah = document.getElementById('lembarPenilaianKoku');
        if (!kokuId) {
            wadah.style.display = 'none';
            wadah.innerHTML = '';
            return;
        }
        wadah.style.display = 'block';
        renderTabelKokurikuler(kokuId);
    });
}

function getPredikatOptionsKoku(dataRapor, kokuId) {
    const DEFAULT_PREDIKAT_KOKURIKULER = ["Sangat Baik", "Baik", "Cukup", "Perlu Peningkatan"];
    return dataRapor.predikatKokurikuler?.[kokuId] || DEFAULT_PREDIKAT_KOKURIKULER;
}

function renderTabelKokurikuler(kokuId) {
    const dataRapor = loadData();
    const dataSiswa = (dataRapor.dataSiswa || []).filter(s => s.nama && s.nama.trim() !== '');
    const kokuObj = (dataRapor.kokurikuler || []).find(k => k.id === kokuId);
    const kokuNama = kokuObj ? kokuObj.nama : 'Kegiatan Tidak Diketahui';

    const selectedDimensions = dataRapor.tujuanKokurikuler?.[kokuId] || {};
    const dimensionKeys = Object.keys(selectedDimensions).filter(key => selectedDimensions[key] && selectedDimensions[key].length > 0);

    const wadah = document.getElementById('lembarPenilaianKoku');

    if (dimensionKeys.length === 0) {
        wadah.innerHTML = `<div style="padding: 15px; color: #d9534f; background: #fdf7f7; border: 1px solid #d9534f; border-radius: 8px;">Belum ada Dimensi P5 yang dipilih untuk kegiatan ini. Silakan atur di menu <b>Tujuan Pembelajaran</b> terlebih dahulu.</div>`;
        return;
    }
    
    if (dataSiswa.length === 0) {
        wadah.innerHTML = '<div style="padding: 15px; color: #f0ad4e; background: #fcf8e3; border: 1px solid #f0ad4e; border-radius: 8px;">Tidak ada data siswa.</div>';
        return;
    }

    const currentPredikatOptions = getPredikatOptionsKoku(dataRapor, kokuId);

    // 1. STRUKTUR TOOLBAR (Filter, Simpan, PDF, Predikat)
    let html = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; flex-wrap: wrap; gap: 10px; background: #f8faff; padding: 15px; border-radius: 10px; border: 1px solid #e2e8f0;">
            <div style="position: relative; flex-grow: 1; max-width: 300px;">
                <input type="text" id="filterNamaSiswaKoku" placeholder="Cari nama siswa..." style="width: 100%; padding: 10px 10px 10px 35px; border-radius: 8px; border: 1px solid #cbd5e1; font-family: 'Poppins', sans-serif;">
                <i class="fa-solid fa-magnifying-glass" style="position: absolute; left: 12px; top: 12px; color: #94a3b8;"></i>
            </div>
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                <button id="btnTutorialKokuSpa" class="btn-save kompak" style="background: #0ea5e9; color: white; border-radius: 50%; width: 40px; padding: 0; display: flex; justify-content: center; align-items: center;" title="Panduan"><i class="fa-solid fa-question"></i></button>
                <button id="btnPredikatKokuSpa" class="btn-save kompak" style="background: #64748b; color: white;"><i class="fa-solid fa-sliders"></i> Predikat</button>
                <button id="btnPdfKokuSpa" class="btn-save kompak" style="background: #ef4444; color: white;"><i class="fa-solid fa-file-pdf"></i> Download PDF</button>
                <button id="btnSimpanKokuSpa" class="btn-save kompak"><i class="fa-solid fa-save"></i> Simpan Nilai</button>
            </div>
        </div>

        <div style="overflow-x: auto; max-height: 60vh; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.02);">
            <table style="width: 100%; border-collapse: collapse; min-width: 1000px; font-size: 0.85rem;">
                <thead style="background: var(--primary-color); color: white; position: sticky; top: 0; z-index: 5;">
                    <tr>
                        <th style="padding: 10px; border: 1px solid #ddd; width: 4%;">No</th>
                        <th style="padding: 10px; border: 1px solid #ddd; text-align: left; width: 15%;">Nama Siswa</th>`;
    
    // Header Dimensi Dinamis
    dimensionKeys.forEach(key => {
        let optionsHtml = '<option value="">☀️ Set Semua</option>';
        currentPredikatOptions.forEach(opt => optionsHtml += `<option value="${opt}">${opt}</option>`);
        
        const namaDimensi = dataRapor.dimensiKokurikuler[key]?.nama || key;
        html += `<th style="padding: 10px; border: 1px solid #ddd; width: 15%;">
                    <div style="display:flex; flex-direction:column; align-items:center; gap:5px;">
                        <span style="font-weight: 600; line-height:1.2;">${namaDimensi}</span>
                        <select class="bulk-update-koku form-control kompak" data-dimensi-key="${key}" style="width: 110px; padding: 4px; font-size: 0.8rem;">${optionsHtml}</select>
                    </div>
                 </th>`;
    });

    html += `           <th style="padding: 10px; border: 1px solid #ddd; text-align: left; width: 35%;">Deskripsi Capaian Otomatis</th>
                    </tr>
                </thead>
                <tbody id="bodyTabelKokuSpa" style="background: white;">`;

    // Baris Data Siswa
    dataSiswa.forEach((siswa, index) => {
        html += `<tr class="baris-siswa-koku" data-nama="${siswa.nama.toLowerCase()}">
                    <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${index + 1}</td>
                    <td style="padding: 8px; border: 1px solid #ddd; font-weight: 500;">${siswa.nama}</td>`;
        
        dimensionKeys.forEach(key => {
            const savedPredikat = dataRapor.nilaiKokurikuler?.[siswa.id]?.[kokuId]?.[key] || '';
            let optionsHtml = '<option value="">-- Pilih --</option>';
            currentPredikatOptions.forEach(opt => {
                optionsHtml += `<option value="${opt}" ${savedPredikat === opt ? 'selected' : ''}>${opt}</option>`;
            });
            html += `<td style="padding: 0; border: 1px solid #ddd; background: #f8faff;">
                        <select class="predikat-siswa-koku" data-siswa-id="${siswa.id}" data-dimensi-key="${key}" style="width: 100%; height: 100%; min-height: 40px; padding: 5px; border: none; background: transparent; text-align: center; cursor: pointer; outline: none;">
                            ${optionsHtml}
                        </select>
                     </td>`;
        });
        
        const savedDeskripsi = dataRapor.deskripsiKokurikuler?.[siswa.id]?.[kokuId] || '';
        html += `   <td id="desc-koku-${siswa.id}" style="padding: 10px; border: 1px solid #ddd; font-size: 0.8rem; line-height: 1.4; color: #334155; text-align: left; background: #fef9c3;">${savedDeskripsi}</td>
                </tr>`;
    });

    html += `   </tbody></table></div>
                <div id="modalPredikatKokuContainer"></div>
                <style> .predikat-siswa-koku:focus { background: white; outline: 2px solid var(--primary-color); border-radius: 4px; } </style>`;
    
    wadah.innerHTML = html;

    // ==========================================
    // LOGIKA & EVENT LISTENER KOKU
    // ==========================================

    const updateDeskripsiSemuaSiswa = () => {
        const dRapor = loadData();
        dataSiswa.forEach(siswa => updateDeskripsiSiswaKoku(siswa.id, siswa.nama, kokuId, dRapor));
    };

    // A. Filter Pencarian
    document.getElementById('filterNamaSiswaKoku').addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        document.querySelectorAll('.baris-siswa-koku').forEach(row => {
            row.style.display = row.dataset.nama.includes(query) ? '' : 'none';
        });
    });

    // B. Perubahan Predikat Individu
    wadah.querySelectorAll('.predikat-siswa-koku').forEach(select => {
        select.addEventListener('change', (e) => {
            const siswaId = e.target.dataset.siswaId;
            const siswa = dataSiswa.find(s => s.id === siswaId);
            updateDeskripsiSiswaKoku(siswaId, siswa.nama, kokuId, loadData());
        });
    });

    // C. Bulk Update (Set Semua)
    wadah.querySelectorAll('.bulk-update-koku').forEach(select => {
        select.addEventListener('change', (e) => {
            const dimensiKey = e.target.dataset.dimensiKey;
            const value = e.target.value;
            if (!value) return;
            
            wadah.querySelectorAll(`.predikat-siswa-koku[data-dimensi-key="${dimensiKey}"]`).forEach(studentSelect => {
                studentSelect.value = value;
            });
            updateDeskripsiSemuaSiswa();
            e.target.value = ""; // Reset
        });
    });

    // Eksekusi pembaruan deskripsi saat pertama kali dirender
    updateDeskripsiSemuaSiswa();

    // D. Fitur Simpan
    document.getElementById('btnSimpanKokuSpa').addEventListener('click', async () => {
        const btn = document.getElementById('btnSimpanKokuSpa');
        const oriHtml = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Menyimpan...';
        btn.disabled = true;

        const dRapor = loadData();
        if (!dRapor.nilaiKokurikuler) dRapor.nilaiKokurikuler = {};
        if (!dRapor.deskripsiKokurikuler) dRapor.deskripsiKokurikuler = {};
        
        dataSiswa.forEach(siswa => {
            const siswaId = siswa.id;
            if (!dRapor.nilaiKokurikuler[siswaId]) dRapor.nilaiKokurikuler[siswaId] = {};
            if (!dRapor.nilaiKokurikuler[siswaId][kokuId]) dRapor.nilaiKokurikuler[siswaId][kokuId] = {};
            
            wadah.querySelectorAll(`select.predikat-siswa-koku[data-siswa-id="${siswaId}"]`).forEach(select => {
                const dimKey = select.dataset.dimensiKey;
                if(select.value) {
                    dRapor.nilaiKokurikuler[siswaId][kokuId][dimKey] = select.value;
                } else {
                    delete dRapor.nilaiKokurikuler[siswaId][kokuId][dimKey];
                }
            });
            
            const deskripsi = document.getElementById(`desc-koku-${siswaId}`).textContent;
            if (!dRapor.deskripsiKokurikuler[siswaId]) dRapor.deskripsiKokurikuler[siswaId] = {};
            dRapor.deskripsiKokurikuler[siswaId][kokuId] = deskripsi;
        });

        saveData(dRapor);
        btn.innerHTML = oriHtml;
        btn.disabled = false;
        
        if (typeof showModal === 'function') {
            showModal({ title: 'Tersimpan', message: 'Nilai dan Deskripsi P5 berhasil disimpan.', type: 'success' });
        }
    });

    // E. Fitur PDF
    document.getElementById('btnPdfKokuSpa').addEventListener('click', () => {
        if (typeof pdfMake === 'undefined') {
            alert('Library PDFMake belum dimuat. Pastikan Anda terkoneksi internet.'); return;
        }
        generatePdfKokurikuler(dataRapor, dataSiswa, kokuId, kokuNama, dimensionKeys, selectedDimensions);
    });

    // F. Modal Sesuaikan Predikat
    document.getElementById('btnPredikatKokuSpa').addEventListener('click', () => {
        let predikatHtml = `
            <div id="modalKustomPredikatKoku" class="modal-backdrop show">
                <div class="modal-content" style="max-width: 400px;">
                    <div class="modal-header">
                        <h3 style="margin:0; font-size:1.2rem;"><i class="fa-solid fa-sliders"></i> Predikat P5</h3>
                        <button type="button" class="close-button" onclick="document.getElementById('modalKustomPredikatKoku').remove()">×</button>
                    </div>
                    <div class="modal-body" style="padding: 15px 20px;">
                        <p style="font-size: 0.85rem; color: #64748b; margin-top: 0;">Atur istilah predikat untuk kegiatan <b>${kokuNama}</b>.</p>
                        <div id="listInputPredikatKoku">`;
        
        currentPredikatOptions.forEach(p => {
            predikatHtml += `
                <div class="koku-pred-row" style="display:flex; gap:10px; margin-bottom:10px;">
                    <input type="text" class="form-control kompak koku-p-teks" value="${p}" required style="flex-grow:1;">
                    <button type="button" class="btn-save kompak" style="background:#ef4444; color:white; padding: 8px 12px;" onclick="this.parentElement.remove()"><i class="fa-solid fa-trash"></i></button>
                </div>`;
        });

        predikatHtml += `       </div>
                        <button type="button" id="btnTambahPredKoku" class="btn-save kompak" style="width:100%; margin-top:10px; background:#f1f5f9; color:#334155; border: 1px dashed #cbd5e1;"><i class="fa-solid fa-plus"></i> Tambah Predikat Baru</button>
                    </div>
                    <div class="modal-footer" style="padding: 15px 20px;">
                        <button type="button" class="action-button secondary" onclick="document.getElementById('modalKustomPredikatKoku').remove()">Batal</button>
                        <button type="button" id="btnSimpanPredikatKoku" class="action-button primary">Simpan</button>
                    </div>
                </div>
            </div>`;
        
        document.getElementById('modalPredikatKokuContainer').innerHTML = predikatHtml;

        document.getElementById('btnTambahPredKoku').addEventListener('click', () => {
            const wadahList = document.getElementById('listInputPredikatKoku');
            wadahList.insertAdjacentHTML('beforeend', `
                <div class="koku-pred-row" style="display:flex; gap:10px; margin-bottom:10px;">
                    <input type="text" class="form-control kompak koku-p-teks" placeholder="Ketik predikat..." required style="flex-grow:1;">
                    <button type="button" class="btn-save kompak" style="background:#ef4444; color:white; padding: 8px 12px;" onclick="this.parentElement.remove()"><i class="fa-solid fa-trash"></i></button>
                </div>
            `);
        });

        document.getElementById('btnSimpanPredikatKoku').addEventListener('click', () => {
            const newPredikats = Array.from(document.querySelectorAll('#modalKustomPredikatKoku .koku-p-teks'))
                                      .map(input => input.value.trim()).filter(val => val !== '');
            
            const dRapor = loadData();
            if (newPredikats.length === 0) {
                if(dRapor.predikatKokurikuler) delete dRapor.predikatKokurikuler[kokuId];
            } else {
                if (!dRapor.predikatKokurikuler) dRapor.predikatKokurikuler = {};
                dRapor.predikatKokurikuler[kokuId] = newPredikats;
            }
            saveData(dRapor);
            document.getElementById('modalKustomPredikatKoku').remove();
            
            // Re-render UI
            renderTabelKokurikuler(kokuId);
        });
    });

    // G. Panduan
    document.getElementById('btnTutorialKokuSpa').addEventListener('click', () => {
        if(typeof showModal === 'function'){
            showModal({
                title: 'Panduan Nilai Kokurikuler (P5)',
                message: `<div style="text-align:left; font-size:0.9rem; line-height:1.5;">
                    1. Pilih predikat capaian siswa pada setiap dimensi.<br>
                    2. <b>Deskripsi akan terbuat otomatis</b> berdasarkan predikat dan dimensi yang dipilih.<br>
                    3. Gunakan fitur <b>☀️ Set Semua</b> di judul kolom untuk pengisian cepat.<br>
                    4. Klik tombol <b>Download PDF</b> untuk mencetak rekap laporan siap lapor.<br>
                    5. Wajib klik <b>Simpan Nilai</b> setelah selesai!
                </div>`,
                type: 'info'
            });
        }
    });
}

// Helper: Mesin Pembuat Deskripsi Otomatis
function updateDeskripsiSiswaKoku(siswaId, siswaNama, kokuId, dataRapor) {
    const kokuObj = (dataRapor.kokurikuler || []).find(k => k.id === kokuId);
    const kokuNama = kokuObj ? kokuObj.nama : 'Kegiatan';
    
    const formatDimensionList = (list) => {
        if (list.length === 0) return '';
        if (list.length === 1) return list[0];
        if (list.length === 2) return list.join(' dan ');
        return list.slice(0, -1).join(', ') + ', dan ' + list.slice(-1);
    };

    const descriptionCell = document.getElementById(`desc-koku-${siswaId}`);
    if (!descriptionCell) return;

    const predicateDropdowns = document.querySelectorAll(`select.predikat-siswa-koku[data-siswa-id="${siswaId}"]`);
    const currentPredikats = getPredikatOptionsKoku(dataRapor, kokuId);

    const groupedByPredicate = {};
    predicateDropdowns.forEach(dropdown => {
        const predicateValue = dropdown.value;
        if (predicateValue) {
            const dimensiKey = dropdown.dataset.dimensiKey;
            const dimensiNama = dataRapor.dimensiKokurikuler[dimensiKey]?.nama || dimensiKey;
            if (!groupedByPredicate[predicateValue]) groupedByPredicate[predicateValue] = [];
            groupedByPredicate[predicateValue].push(dimensiNama);
        }
    });

    const sentenceParts = [];
    currentPredikats.forEach(predicate => {
        if (groupedByPredicate[predicate] && groupedByPredicate[predicate].length > 0) {
            const dimensionNames = formatDimensionList(groupedByPredicate[predicate]);
            sentenceParts.push(`${predicate} dalam ${dimensionNames}`);
        }
    });

    let finalDescription = '';
    if (sentenceParts.length > 0) {
        finalDescription = `Ananda ${siswaNama} menunjukkan capaian ${sentenceParts.join(', ')} pada kegiatan "${kokuNama}".`;
    }
    descriptionCell.textContent = finalDescription;
}

// Helper: Ekspor ke PDF via pdfMake
function generatePdfKokurikuler(dataRapor, dataSiswa, kokuId, kokuNama, dimensionKeys, selectedDimensions) {
    const formatDate = (dateString) => {
        if (!dateString) return new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? '...........................' : date.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });
    };

    const tujuanListContent = dimensionKeys.flatMap(key => ([
        { text: `${dataRapor.dimensiKokurikuler[key]?.nama}:`, style: 'label' },
        { ul: selectedDimensions[key], fontSize: 10, margin: [10, 2, 0, 8] }
    ]));

    const tableBody = [[{ text: 'Nama Siswa', style: 'tableHeader' }, { text: 'Deskripsi Capaian', style: 'tableHeader' }]];
    dataSiswa.forEach(siswa => {
        const el = document.getElementById(`desc-koku-${siswa.id}`);
        const deskripsi = el ? el.textContent.trim() : '';
        if (deskripsi) {
            tableBody.push([{ text: siswa.nama, style: 'cellStyle' }, { text: deskripsi, style: 'cellStyle', alignment: 'justify' }]);
        }
    });

    const info = dataRapor.infoDasar || {};
    const docDefinition = {
        content: [
            { text: 'Laporan Kegiatan Kokurikuler (P5)', style: 'header' },
            {
                style: 'headerGrid',
                table: {
                    widths: ['50%', '50%'],
                    body: [
                        [
                            [
                                { text: 'Identitas Sekolah', style: 'gridHeader' },
                                {
                                    table: {
                                        widths: ['auto', '*'],
                                        body: [
                                            [{ text: 'Nama Sekolah', style: 'label' }, `: ${info.namaSekolah || '-'}`],
                                            [{ text: 'Kelas', style: 'label' }, `: ${info.kelas || '-'}`],
                                            [{ text: 'Tahun Ajaran', style: 'label' }, `: ${info.tahunAjaran || '-'}`]
                                        ]
                                    },
                                    layout: 'noBorders'
                                }
                            ],
                            [
                                { text: 'Tema Kegiatan', style: 'gridHeader' },
                                { text: kokuNama, bold: true, fontSize: 11, margin: [0, 0, 0, 10] },
                                ...tujuanListContent
                            ]
                        ]
                    ]
                },
                layout: 'noBorders'
            },
            { text: 'Capaian Siswa:', style: 'subheader', margin: [0, 15, 0, 5] },
            {
                style: 'tableStyle',
                table: {
                    widths: ['30%', '70%'],
                    body: tableBody,
                    headerRows: 1
                },
                layout: {
                    hLineWidth: (i, node) => (i === 0 || i === node.table.body.length) ? 1 : (i === 1) ? 1 : 0.5,
                    vLineWidth: () => 0,
                    hLineColor: (i) => (i === 0 || i === 1) ? 'black' : 'gray',
                }
            },
            {
                margin: [0, 40, 0, 0],
                table: {
                    widths: ['50%', '50%'],
                    body: [
                        [
                            {
                                stack: [
                                    { text: 'Mengetahui,' }, { text: 'Kepala Sekolah,' },
                                    { text: ' ', margin: [0, 60, 0, 0] },
                                    { text: info.kepalaSekolah || '___________________', bold: true, decoration: 'underline' },
                                    { text: `NIP. ${info.nipKepsek || '-'}` }
                                ], alignment: 'center', border: [false, false, false, false]
                            },
                            {
                                stack: [
                                    { text: `${info.kabupatenKota || 'Jakarta'}, ${formatDate(info.tanggalRaporNilai)}` },
                                    { text: 'Wali Kelas,' },
                                    { text: ' ', margin: [0, 60, 0, 0] },
                                    { text: info.namaGuru || '___________________', bold: true, decoration: 'underline' },
                                    { text: `NIP. ${info.nipGuru || '-'}` }
                                ], alignment: 'center', border: [false, false, false, false]
                            }
                        ]
                    ]
                },
                layout: 'noBorders'
            }
        ],
        styles: {
            header: { fontSize: 16, bold: true, margin: [0, 0, 0, 15], alignment: 'center' },
            subheader: { fontSize: 12, bold: true, margin: [0, 10, 0, 5] },
            headerGrid: { margin: [0, 0, 0, 20] },
            gridHeader: { fontSize: 12, bold: true, margin: [0, 0, 0, 8], color: '#333333' },
            label: { bold: true, fontSize: 10 },
            tableStyle: { margin: [0, 5, 0, 15] },
            tableHeader: { bold: true, fontSize: 11, color: 'black', fillColor: '#eeeeee', alignment: 'center', margin: [5, 5, 5, 5] },
            cellStyle: { margin: [5, 5, 5, 5], fontSize: 10 }
        },
        defaultStyle: { fontSize: 10, color: '#111' }
    };
    pdfMake.createPdf(docDefinition).download(`Laporan_Koku_${kokuNama.replace(/\s+/g, '_')}.pdf`);
}