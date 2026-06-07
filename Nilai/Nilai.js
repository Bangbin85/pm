// =================================================================
// BANGBIN SPA MODUL: INPUT NILAI MATA PELAJARAN (100% Termigrasi)
// =================================================================

let isNilaiEventsInitialized = false;

function memuatModulNilai() {
    if (!isNilaiEventsInitialized) {
        setupEventNilai();
        isNilaiEventsInitialized = true;
    }
}

function setupEventNilai() {
    document.getElementById('pilihMapelSection').addEventListener('change', (e) => {
        const mapelId = e.target.value;
        const wadah = document.getElementById('lembarPenilaianMapel');
        if (!mapelId) {
            wadah.style.display = 'none';
            wadah.innerHTML = '';
            return;
        }
        wadah.style.display = 'block';
        renderTabelNilaiPelajaran(mapelId);
    });
}

function renderTabelNilaiPelajaran(mapelId) {
    const dataRapor = loadData();
    const kelasAktif = dataRapor.infoDasar?.kelasAktif || 'kelas-1';
    let dataSiswa = dataRapor.dataSiswa || []; 
    
    // Filter Agama
    const mapelIni = (dataRapor.mataPelajaran || []).find(m => m.id === mapelId);
    const namaMapelIni = mapelIni ? mapelIni.nama : 'Tidak Diketahui';
    const agamaMapelIni = mapelIni ? mapelIni.agama : null;
    
    if (agamaMapelIni) {
        dataSiswa = dataSiswa.filter(siswa => siswa.agama === agamaMapelIni);
    }

    let tujuanPembelajaran = dataRapor.tujuanPembelajaran?.[kelasAktif]?.[mapelId] || 
                             (typeof TP_DEFAULT_MASTER !== 'undefined' ? TP_DEFAULT_MASTER[kelasAktif]?.[mapelId] : []) || [];

    const wadah = document.getElementById('lembarPenilaianMapel');
    
    if (tujuanPembelajaran.length === 0) {
        wadah.innerHTML = '<div style="padding: 15px; color: #d9534f; background: #fdf7f7; border: 1px solid #d9534f; border-radius: 8px;">Belum ada data TP yang disimpan untuk mapel ini. Silakan atur di menu <b>Kelola TP</b> terlebih dahulu.</div>';
        return;
    }
    
    if (dataSiswa.length === 0) {
        wadah.innerHTML = '<div style="padding: 15px; color: #f0ad4e; background: #fcf8e3; border: 1px solid #f0ad4e; border-radius: 8px;">Tidak ada data siswa untuk kelas atau agama ini.</div>';
        return;
    }

    const pembobotanMapel = dataRapor.pembobotan?.[kelasAktif]?.[mapelId] || {};
    const bobotRRValue = pembobotanMapel.rr ?? 1;
    const bobotPASValue = pembobotanMapel.pas ?? 1;

    // 1. STRUKTUR TOOLBAR (Filter, Simpan, Excel, Predikat)
    let html = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; flex-wrap: wrap; gap: 10px; background: #f8faff; padding: 15px; border-radius: 10px; border: 1px solid #e2e8f0;">
            <div style="position: relative; flex-grow: 1; max-width: 300px;">
                <input type="text" id="filterNamaSiswaSPA" placeholder="Cari nama siswa..." style="width: 100%; padding: 10px 10px 10px 35px; border-radius: 8px; border: 1px solid #cbd5e1; font-family: 'Poppins', sans-serif;">
                <i class="fa-solid fa-magnifying-glass" style="position: absolute; left: 12px; top: 12px; color: #94a3b8;"></i>
            </div>
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                <button id="btnPredikatSpa" class="btn-save kompak" style="background: #64748b; color: white;"><i class="fa-solid fa-sliders"></i> Predikat</button>
                <button id="btnExcelExportSpa" class="btn-save kompak" style="background: #10b981; color: white;"><i class="fa-solid fa-file-arrow-down"></i> Template</button>
                <button id="btnExcelImportSpa" class="btn-save kompak" style="background: #f59e0b; color: white;"><i class="fa-solid fa-file-arrow-up"></i> Impor</button>
                <button id="btnSimpanNilaiSpa" class="btn-save kompak"><i class="fa-solid fa-save"></i> Simpan Nilai</button>
                <input type="file" id="fileImportExcelSpa" accept=".xlsx, .xls" style="display: none;">
            </div>
        </div>

        <div style="overflow-x: auto; max-height: 55vh; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.02);">
            <table style="width: 100%; border-collapse: collapse; min-width: 1000px; font-size: 0.85rem;">
                <thead style="background: var(--primary-color); color: white; position: sticky; top: 0; z-index: 5;">
                    <tr>
                        <th style="padding: 10px; border: 1px solid #ddd; width: 4%;">No</th>
                        <th style="padding: 10px; border: 1px solid #ddd; text-align: left; width: 15%;">Nama Siswa</th>`;
    
    // 2. HEADER TABEL DINAMIS
    tujuanPembelajaran.forEach((tp, index) => {
        const bobotTPValue = pembobotanMapel.tp?.[tp.id] ?? 1;
        html += `<th style="padding: 10px; border: 1px solid #ddd; width: 7%;" title="${tp.deskripsi}">
                    TP ${index + 1}<br>
                    <input type="number" class="header-input-tp" data-tp-id="${tp.id}" value="${bobotTPValue}" style="width: 40px; text-align: center; margin-top: 5px; color: #333; font-weight: bold; border-radius:4px; border:none; padding: 2px;" title="Bobot TP ${index + 1}">
                 </th>`;
    });

    html += `           <th style="padding: 10px; border: 1px solid #ddd; width: 5%; background: rgba(0,0,0,0.1);">(RR)<br><input type="number" id="bobotRR_SPA" value="${bobotRRValue}" style="width: 40px; text-align: center; margin-top: 5px; color: #333; font-weight: bold; border-radius:4px; border:none; padding: 2px;" title="Bobot Rata-rata"></th>
                        <th style="padding: 10px; border: 1px solid #ddd; width: 6%;">PAS<br><input type="number" id="bobotPAS_SPA" value="${bobotPASValue}" style="width: 40px; text-align: center; margin-top: 5px; color: #333; font-weight: bold; border-radius:4px; border:none; padding: 2px;" title="Bobot PAS"></th>
                        <th style="padding: 10px; border: 1px solid #ddd; width: 5%; background: rgba(0,0,0,0.2);">R</th>
                        <th style="padding: 10px; border: 1px solid #ddd; text-align: left; width: 18%;">Capaian MAX</th>
                        <th style="padding: 10px; border: 1px solid #ddd; text-align: left; width: 18%;">Capaian MIN</th>
                    </tr>
                </thead>
                <tbody id="bodyTabelNilaiSpa" style="background: white;">`;

    // 3. BARIS DATA SISWA
    dataSiswa.forEach((siswa, index) => {
        html += `<tr class="baris-siswa-spa" data-nama="${siswa.nama.toLowerCase()}" data-nis="${siswa.nis}">
                    <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${index + 1}</td>
                    <td style="padding: 8px; border: 1px solid #ddd; font-weight: 500;">${siswa.nama}</td>`;
        
        tujuanPembelajaran.forEach(tp => {
            const nilaiTersimpan = dataRapor.nilai?.[siswa.id]?.[kelasAktif]?.[mapelId]?.[tp.id] || '';
            html += `<td style="padding: 0; border: 1px solid #ddd; text-align: center; background-color: #f8faff;">
                        <input type="number" min="0" max="100" value="${nilaiTersimpan}" data-siswa-id="${siswa.id}" data-tp-id="${tp.id}" class="nilai-tp-spa" style="width: 100%; height: 100%; min-height: 35px; text-align: center; border: none; background: transparent; padding: 5px; font-family: inherit;">
                     </td>`;
        });
        
        const nilaiPasTersimpan = dataRapor.nilai?.[siswa.id]?.[kelasAktif]?.[mapelId]?.['pas'] || '';
        html += `   <td id="rata-rata-${siswa.id}" style="padding: 8px; border: 1px solid #ddd; text-align: center; font-weight: 600; color: #64748b; background: #f1f5f9;"></td>
                    <td style="padding: 0; border: 1px solid #ddd; text-align: center; background-color: #fef9c3;">
                        <input type="number" min="0" max="100" value="${nilaiPasTersimpan}" data-siswa-id="${siswa.id}" class="nilai-pas-spa" style="width: 100%; height: 100%; min-height: 35px; text-align: center; border: none; background: transparent; padding: 5px; font-family: inherit;">
                    </td>
                    <td id="r-${siswa.id}" style="padding: 8px; border: 1px solid #ddd; text-align: center; font-weight: bold; font-size: 1rem; color: var(--primary-color); background: #e0f2fe;"></td>
                    <td id="max-${siswa.id}" style="padding: 8px; border: 1px solid #ddd; font-size: 0.75rem; color: #0f5132; line-height: 1.3;"></td>
                    <td id="min-${siswa.id}" style="padding: 8px; border: 1px solid #ddd; font-size: 0.75rem; color: #842029; line-height: 1.3;"></td>
                </tr>`;
    });

    html += `   </tbody></table></div>
                
                <div id="modalPredikatSpaContainer"></div>
                
                <style>
                    .nilai-tp-spa:focus, .nilai-pas-spa:focus { outline: 2px solid var(--primary-color); background: white; border-radius: 2px; }
                </style>`;
    
    wadah.innerHTML = html;

    // ==========================================
    // LOGIKA FITUR (MIGRASI PENUH)
    // ==========================================

    // A. FITUR PENCARIAN / FILTER
    document.getElementById('filterNamaSiswaSPA').addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        document.querySelectorAll('.baris-siswa-spa').forEach(row => {
            const nama = row.getAttribute('data-nama');
            row.style.display = nama.includes(query) ? '' : 'none';
        });
    });

    // B. LOGIKA PERHITUNGAN REAL-TIME
    const updateTampilan = (siswaId) => {
        const hitung = hitungStatistikUntukSiswaSPA(siswaId, mapelId, loadData(), tujuanPembelajaran);
        document.getElementById(`rata-rata-${siswaId}`).innerText = hitung.rataRata;
        document.getElementById(`r-${siswaId}`).innerText = hitung.nilaiR;
        document.getElementById(`max-${siswaId}`).innerText = hitung.deskripsiMax;
        document.getElementById(`min-${siswaId}`).innerText = hitung.deskripsiMin;
    };
    const hitungUlangSemua = () => dataSiswa.forEach(s => updateTampilan(s.id));

    wadah.querySelectorAll('.nilai-tp-spa, .nilai-pas-spa').forEach(inp => {
        inp.addEventListener('input', (e) => updateTampilan(e.target.dataset.siswaId));
    });
    wadah.querySelector('#bobotRR_SPA').addEventListener('input', hitungUlangSemua);
    wadah.querySelector('#bobotPAS_SPA').addEventListener('input', hitungUlangSemua);
    wadah.querySelectorAll('.header-input-tp').forEach(inp => inp.addEventListener('input', hitungUlangSemua));
    hitungUlangSemua(); // Inisialisasi awal

    // C. FITUR SIMPAN
    document.getElementById('btnSimpanNilaiSpa').addEventListener('click', async () => {
        const btn = document.getElementById('btnSimpanNilaiSpa');
        const oriHtml = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Menyimpan...';
        btn.disabled = true;

        const dRapor = loadData();
        if (!dRapor.nilai) dRapor.nilai = {};
        
        dataSiswa.forEach(siswa => {
            const siswaId = siswa.id;
            if (!dRapor.nilai[siswaId]) dRapor.nilai[siswaId] = {};
            if (!dRapor.nilai[siswaId][kelasAktif]) dRapor.nilai[siswaId][kelasAktif] = {};
            if (!dRapor.nilai[siswaId][kelasAktif][mapelId]) dRapor.nilai[siswaId][kelasAktif][mapelId] = {};
            
            wadah.querySelectorAll(`.nilai-tp-spa[data-siswa-id="${siswaId}"]`).forEach(input => {
                const tpId = input.dataset.tpId;
                const nilai = input.value.trim();
                if (nilai !== '') dRapor.nilai[siswaId][kelasAktif][mapelId][tpId] = parseInt(nilai, 10);
                else delete dRapor.nilai[siswaId][kelasAktif][mapelId][tpId];
            });
            
            const pasInput = wadah.querySelector(`.nilai-pas-spa[data-siswa-id="${siswaId}"]`);
            const nilaiPAS = pasInput.value.trim();
            if (nilaiPAS !== '') dRapor.nilai[siswaId][kelasAktif][mapelId]['pas'] = parseInt(nilaiPAS, 10);
            else delete dRapor.nilai[siswaId][kelasAktif][mapelId]['pas'];
            
            const statistik = hitungStatistikUntukSiswaSPA(siswaId, mapelId, dRapor, tujuanPembelajaran);
            if (statistik.nilaiR !== '-' && !isNaN(statistik.nilaiR)) {
                dRapor.nilai[siswaId][kelasAktif][mapelId]['nilaiAkhir'] = statistik.nilaiR;
            } else {
                delete dRapor.nilai[siswaId][kelasAktif][mapelId]['nilaiAkhir'];
            }
        });

        if (!dRapor.pembobotan) dRapor.pembobotan = {};
        if (!dRapor.pembobotan[kelasAktif]) dRapor.pembobotan[kelasAktif] = {};
        const pembobotanToSave = {
            rr: parseFloat(wadah.querySelector('#bobotRR_SPA').value) || 1,
            pas: parseFloat(wadah.querySelector('#bobotPAS_SPA').value) || 1,
            tp: {}
        };
        wadah.querySelectorAll('.header-input-tp').forEach(input => {
            pembobotanToSave.tp[input.dataset.tpId] = parseFloat(input.value) || 1;
        });
        dRapor.pembobotan[kelasAktif][mapelId] = pembobotanToSave;

        saveData(dRapor);
        btn.innerHTML = oriHtml;
        btn.disabled = false;
        
        if (typeof showModal === 'function') {
            showModal({ title: 'Tersimpan', message: 'Seluruh nilai dan pembobotan mapel telah berhasil disimpan.', type: 'success' });
        }
    });

    // D. FITUR EKSPOR EXCEL (Template)
    document.getElementById('btnExcelExportSpa').addEventListener('click', () => {
        if (typeof XLSX === 'undefined') { alert("Library XLSX belum dimuat!"); return; }
        
        const excelHeader = ['NIS', 'Nama Siswa'];
        tujuanPembelajaran.forEach((tp, index) => excelHeader.push(`TP ${index + 1}`));
        excelHeader.push('PAS');
        
        const excelData = [excelHeader];
        dataSiswa.forEach(siswa => {
            const row = [siswa.nis, siswa.nama];
            tujuanPembelajaran.forEach(() => row.push('')); // Kosongkan untuk diisi guru
            row.push('');
            excelData.push(row);
        });
        
        const worksheet = XLSX.utils.aoa_to_sheet(excelData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Bangbin Nilai');
        
        const kelasDisplay = kelasAktif.replace('kelas-', 'Kelas_');
        const fileName = `Template_Nilai_${namaMapelIni}_${kelasDisplay}.xlsx`.replace(/[\/\\?%*:|"<> ]/g, '_');
        XLSX.writeFile(workbook, fileName);
    });

    // E. FITUR IMPOR EXCEL
    const fileInputExcel = document.getElementById('fileImportExcelSpa');
    document.getElementById('btnExcelImportSpa').addEventListener('click', () => fileInputExcel.click());
    
    fileInputExcel.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];
                
                // Tambahkan defval agar kolom kosong tetap terbaca aman
                const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "", raw: false });
                
                let updatedCount = 0;
                jsonData.forEach(row => {
                    const nis = row['NIS'] ? String(row['NIS']).trim() : '';
                    const siswaTr = wadah.querySelector(`tr[data-nis="${nis}"]`);
                    
                    if (siswaTr) {
                        tujuanPembelajaran.forEach((tp, index) => {
                            const tpHeader = `TP ${index + 1}`;
                            const nilaiTp = row[tpHeader];
                            if (nilaiTp !== undefined && nilaiTp !== null && nilaiTp !== '') {
                                const tpInput = siswaTr.querySelector(`input[data-tp-id="${tp.id}"]`);
                                if (tpInput) tpInput.value = parseInt(nilaiTp, 10);
                            }
                        });
                        const nilaiPas = row['PAS'];
                        if (nilaiPas !== undefined && nilaiPas !== null && nilaiPas !== '') {
                            const pasInput = siswaTr.querySelector('.nilai-pas-spa');
                            if (pasInput) pasInput.value = parseInt(nilaiPas, 10);
                        }
                        updatedCount++;
                    }
                });
                
                hitungUlangSemua();
                if (typeof showModal === 'function') {
                    showModal({ title: 'Impor Berhasil', message: `${updatedCount} baris data siswa berhasil dibaca dari Excel. <b>Jangan lupa klik Simpan.</b>`, type: 'success' });
                }
            } catch (error) { 
                alert('Gagal memproses file Excel: ' + error.message); 
            } finally {
                event.target.value = ''; // DIPINDAHKAN KE SINI AGAR BROWSER TIDAK CRASH
            }
        };
        reader.readAsArrayBuffer(file);
    });

    // F. FITUR ATUR PREDIKAT MAPEL
    document.getElementById('btnPredikatSpa').addEventListener('click', () => {
        const currentData = loadData();
        // Fallback default jika tidak ada di bangbin_uhuuyy
        const defaultPredikatLocal = [
            { dari: 90, sampai: 100, predikat: 'Sangat Baik' }, { dari: 71, sampai: 89, predikat: 'Baik' },
            { dari: 61, sampai: 70, predikat: 'Cukup' }, { dari: 0, sampai: 60, predikat: 'Perlu Bimbingan' }
        ];
        const predikatAktif = currentData.predikat?.[mapelId] || (typeof DEFAULT_PREDIKAT !== 'undefined' ? DEFAULT_PREDIKAT : defaultPredikatLocal);

        let predikatHtml = `
            <div id="modalKustomPredikat" class="modal-backdrop show">
                <div class="modal-content" style="max-width: 500px;">
                    <div class="modal-header">
                        <h3 style="margin:0; font-size:1.2rem;"><i class="fa-solid fa-sliders"></i> Rentang Predikat</h3>
                        <button type="button" class="close-button" onclick="document.getElementById('modalKustomPredikat').remove()">×</button>
                    </div>
                    <div class="modal-body" style="padding: 15px 20px;">
                        <p style="font-size: 0.85rem; color: #64748b; margin-top: 0;">Sesuaikan rentang nilai dan deskripsi predikat untuk <b>${namaMapelIni}</b>.</p>
                        <form id="formKustomPredikat">
                            <div id="predikatListContainer">`;
        
        predikatAktif.forEach((p, idx) => {
            predikatHtml += `
                                <div class="predikat-row" style="display: grid; grid-template-columns: 1fr 1fr 2fr; gap: 10px; margin-bottom: 10px; align-items: center;">
                                    <input type="number" class="form-control kompak p-dari" value="${p.dari}" required placeholder="Min">
                                    <input type="number" class="form-control kompak p-sampai" value="${p.sampai}" required placeholder="Max">
                                    <input type="text" class="form-control kompak p-teks" value="${p.predikat}" required placeholder="Misal: Sangat Baik">
                                </div>`;
        });

        predikatHtml += `       </div>
                            <div class="modal-footer" style="padding: 15px 0 0 0;">
                                <button type="button" class="action-button secondary" onclick="document.getElementById('modalKustomPredikat').remove()">Batal</button>
                                <button type="submit" class="action-button primary">Simpan Predikat</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>`;
        
        document.getElementById('modalPredikatSpaContainer').innerHTML = predikatHtml;

        // Tangkap Submit Predikat
        document.getElementById('formKustomPredikat').addEventListener('submit', (e) => {
            e.preventDefault();
            const newPredikat = [];
            document.querySelectorAll('#modalKustomPredikat .predikat-row').forEach(row => {
                newPredikat.push({
                    dari: parseInt(row.querySelector('.p-dari').value, 10),
                    sampai: parseInt(row.querySelector('.p-sampai').value, 10),
                    predikat: row.querySelector('.p-teks').value.trim()
                });
            });

            const dRapor = loadData();
            if (!dRapor.predikat) dRapor.predikat = {};
            dRapor.predikat[mapelId] = newPredikat;
            saveData(dRapor);
            
            document.getElementById('modalKustomPredikat').remove();
            hitungUlangSemua(); // Update deskripsi Max/Min otomatis di tabel
            
            if (typeof showModal === 'function') {
                showModal({ title: 'Berhasil', message: 'Predikat mapel berhasil diperbarui.', type: 'success' });
            }
        });
    });
}

// Helper Kalkulator Statistik Internal
function hitungStatistikUntukSiswaSPA(siswaId, mapelId, dataRapor, tujuanPembelajaran) {
    const wadah = document.getElementById('lembarPenilaianMapel');
    const bobotRR = parseFloat(wadah.querySelector('#bobotRR_SPA').value) || 0;
    const bobotPAS = parseFloat(wadah.querySelector('#bobotPAS_SPA').value) || 0;
    
    const nilaiSiswaTP = {};
    tujuanPembelajaran.forEach(tp => {
        const input = wadah.querySelector(`.nilai-tp-spa[data-siswa-id="${siswaId}"][data-tp-id="${tp.id}"]`);
        if (input && input.value !== '') nilaiSiswaTP[tp.id] = parseInt(input.value, 10);
    });

    let rataRataTP = null, totalNilaiBerbobotTP = 0, totalBobotTP = 0;
    for (const tpId in nilaiSiswaTP) {
        const nilai = nilaiSiswaTP[tpId];
        const bobotInput = wadah.querySelector(`.header-input-tp[data-tp-id="${tpId}"]`);
        const bobot = bobotInput ? (parseFloat(bobotInput.value) || 0) : 0;
        if (bobot > 0) {
            totalNilaiBerbobotTP += nilai * bobot;
            totalBobotTP += bobot;
        }
    }
    
    if (totalBobotTP > 0) rataRataTP = totalNilaiBerbobotTP / totalBobotTP;
    
    let nilaiMax = -1, nilaiMin = 101, idTpMax = null, idTpMin = null;
    const nilaiTPAsliArray = Object.values(nilaiSiswaTP).filter(v => !isNaN(v));
    if (nilaiTPAsliArray.length > 0) {
        for (const tpId in nilaiSiswaTP) {
            const nilai = nilaiSiswaTP[tpId];
            if (nilai > nilaiMax) { nilaiMax = nilai; idTpMax = tpId; }
            if (nilai < nilaiMin) { nilaiMin = nilai; idTpMin = tpId; }
        }
    }

    const pasInput = wadah.querySelector(`.nilai-pas-spa[data-siswa-id="${siswaId}"]`);
    const nilaiPAS = (pasInput && pasInput.value !== '') ? parseInt(pasInput.value, 10) : null;
    
    let nilaiR = '-';
    if (rataRataTP !== null) {
        if (bobotPAS === 0 || nilaiPAS === null) {
            nilaiR = Math.round(rataRataTP);
        } else {
            const totalNilai = (rataRataTP * bobotRR) + (nilaiPAS * bobotPAS);
            const totalBobot = bobotRR + bobotPAS;
            if (totalBobot > 0) nilaiR = Math.round(totalNilai / totalBobot);
            else nilaiR = Math.round(rataRataTP);
        }
    }

    const tampilanRataRataTP = (rataRataTP !== null) ? Math.round(rataRataTP) : '-';
    const tpMax = tujuanPembelajaran.find(tp => tp.id === idTpMax);
    const tpMin = tujuanPembelajaran.find(tp => tp.id === idTpMin);
    
    const predikatMax = (typeof getPredikatForNilai === 'function') ? getPredikatForNilai(mapelId, nilaiMax, dataRapor) : '';
    const predikatMin = (typeof getPredikatForNilai === 'function') ? getPredikatForNilai(mapelId, nilaiMin, dataRapor) : '';
    
    const deskripsiMax = tpMax ? (predikatMax ? `${predikatMax} dalam ${tpMax.deskripsi}` : tpMax.deskripsi) : '-';
    const deskripsiMin = tpMin ? (predikatMin ? `${predikatMin} dalam ${tpMin.deskripsi}` : tpMin.deskripsi) : '-';
    
    return { rataRata: tampilanRataRataTP, nilaiR, deskripsiMax, deskripsiMin };
}