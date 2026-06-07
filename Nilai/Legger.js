// =================================================================
// BANGBIN SPA MODUL: HASIL - LEGGER NILAI
// =================================================================

let isLeggerInitialized = false;

function memuatModulLegger() {
    renderTabelLeggerSPA();
    if (!isLeggerInitialized) {
        setupEventLeggerSPA();
        isLeggerInitialized = true;
    }
}

function renderTabelLeggerSPA() {
    const dataRapor = loadData();
    const { infoDasar, dataSiswa, mataPelajaran, ekstrakurikuler, kokurikuler, nilai, pelengkap, nilaiKokurikuler } = dataRapor;
    const kelasAktif = infoDasar.kelasAktif || 'kelas-1';

    document.getElementById('judulLeggerSPA').textContent = `Legger Nilai Kelas ${infoDasar.kelas || '-'} - Semester ${infoDasar.semester || '-'} T.A ${infoDasar.tahunAjaran || '-'}`;

    const isSemester2 = infoDasar.semester === '2';
    const labelNaik = (infoDasar.kelas && (infoDasar.kelas.includes('6') || infoDasar.kelas.toUpperCase().includes('VI'))) ? 'Lulus' : 'Naik Kelas';

    const simpanBtn = document.getElementById('simpanStatusLeggerBtn');
    simpanBtn.style.display = isSemester2 ? 'inline-flex' : 'none';

    const predikatMap = { "Sangat Baik": "SB", "Baik": "B", "Cukup": "C", "Perlu Peningkatan": "K", "Perlu Bimbingan": "K" };
    
    const mapelUmum = (mataPelajaran || []).filter(m => !m.nama.includes('Pendidikan Agama'));

    const buildHeader = () => {
        let headerRow1 = `<tr>
            <th rowspan="2" class="col-no">No</th>
            <th rowspan="2" class="col-nama">Nama Siswa</th>
            <th colspan="${mapelUmum.length + 3}">NILAI AKADEMIK</th>
            <th colspan="4">ABSENSI</th>`;
        if (kokurikuler && kokurikuler.length > 0) headerRow1 += `<th colspan="${kokurikuler.length}">KEGIATAN KOKURIKULER</th>`;
        if (ekstrakurikuler && ekstrakurikuler.length > 0) headerRow1 += `<th colspan="${ekstrakurikuler.length}">KEGIATAN EKSTRAKURIKULER</th>`;
        if (isSemester2) headerRow1 += `<th rowspan="2">${labelNaik.toUpperCase()}</th>`;
        
        headerRow1 += `<th rowspan="2" id="headerKeteranganSPA">
                        <select id="pilihanKeteranganSPA" class="form-control kompak" style="width: auto; margin:0 auto; padding: 4px; font-weight: bold; background: white; color: black; border-radius: 4px;">
                            <option value="manual">KETERANGAN</option>
                            <option value="peringkat">PERINGKAT</option>
                        </select>
                       </th></tr>`;

        let headerRow2 = `<tr><th title="Pendidikan Agama">Agama</th>`;
        mapelUmum.forEach(mapel => { headerRow2 += `<th title="${mapel.nama}">${mapel.singkat || '??'}</th>`; });
        headerRow2 += `<th class="col-total" title="Jumlah Nilai">JML</th><th class="col-total" title="Rata-Rata Rapor">RR</th>`;
        headerRow2 += `<th>S</th><th>I</th><th>A</th><th>JL</th>`;
        (kokurikuler || []).forEach(koku => { headerRow2 += `<th>${koku.nama}</th>`; });
        (ekstrakurikuler || []).forEach(eskul => { headerRow2 += `<th>${eskul.nama}</th>`; });
        headerRow2 += `</tr>`;

        document.getElementById('leggerHeadSPA').innerHTML = headerRow1 + headerRow2;
    };

    const buildBody = () => {
        const siswaAktif = (dataSiswa || []).filter(s => s.nama && s.nama.trim() !== '');
        let bodyHTML = '';

        siswaAktif.forEach((siswa, index) => {
            let rowHTML = `<tr data-siswa-id="${siswa.id}"><td class="col-no">${index + 1}</td><td class="col-nama" style="text-align:left;">${siswa.nama}</td>`;
            let totalNilai = 0, jumlahMapelDgnNilai = 0;

            const getNilaiDanProses = (mapelId) => {
                const nilaiSiswaMapel = nilai?.[siswa.id]?.[kelasAktif]?.[mapelId];
                if (nilaiSiswaMapel && typeof nilaiSiswaMapel.nilaiAkhir === 'number') {
                    totalNilai += nilaiSiswaMapel.nilaiAkhir;
                    jumlahMapelDgnNilai++;
                    return nilaiSiswaMapel.nilaiAkhir;
                }
                return '-';
            };

            const mapelAgamaSiswa = (mataPelajaran || []).find(m => m.nama.includes(siswa.agama));
            rowHTML += `<td>${mapelAgamaSiswa ? getNilaiDanProses(mapelAgamaSiswa.id) : '-'}</td>`;
            mapelUmum.forEach(mapel => { rowHTML += `<td>${getNilaiDanProses(mapel.id)}</td>`; });

            const rataRataRapor = jumlahMapelDgnNilai > 0 ? Math.round(totalNilai / jumlahMapelDgnNilai) : 0;
            rowHTML += `<td class="col-total">${totalNilai}</td><td class="col-total">${rataRataRapor}</td>`;
            
            const absensi = pelengkap?.absensi?.[siswa.id] || { sakit: 0, izin: 0, alpha: 0 };
            const jumlahAbsen = parseInt(absensi.sakit || 0) + parseInt(absensi.izin || 0) + parseInt(absensi.alpha || 0);
            rowHTML += `<td>${absensi.sakit || 0}</td><td>${absensi.izin || 0}</td><td>${absensi.alpha || 0}</td><td>${jumlahAbsen}</td>`;
            
            (kokurikuler || []).forEach(koku => {
                const nilaiKokuSiswa = nilaiKokurikuler?.[siswa.id]?.[koku.id] || {};
                const predikats = Object.values(nilaiKokuSiswa).map(p => predikatMap[p] || p.charAt(0)).join('/');
                rowHTML += `<td>${predikats || '-'}</td>`;
            });
            (ekstrakurikuler || []).forEach(eskul => {
                const predikat = pelengkap?.ekstrakurikuler?.[siswa.id]?.[eskul.id]?.predikat || '-';
                rowHTML += `<td>${predikatMap[predikat] || '-'}</td>`;
            });

            if (isSemester2) {
                const status = pelengkap?.kenaikanKelas?.[siswa.id] || '';
                rowHTML += `<td><input type="checkbox" class="chk-status-legger" data-siswa-id="${siswa.id}" ${status === labelNaik ? 'checked' : ''} style="transform: scale(1.2);"></td>`;
            }
            rowHTML += `<td class="cell-keterangan" contenteditable="true" style="background:#fef9c3;"></td></tr>`;
            bodyHTML += rowHTML;
        });
        document.getElementById('leggerBodySPA').innerHTML = bodyHTML;
    };

    buildHeader();
    buildBody();
}

function setupEventLeggerSPA() {
    document.getElementById('simpanStatusLeggerBtn').addEventListener('click', async () => {
        const dataRapor = loadData();
        const infoDasar = dataRapor.infoDasar;
        const isKelas6 = infoDasar.kelas && (infoDasar.kelas.includes('6') || infoDasar.kelas.toUpperCase().includes('VI'));
        const labelNaik = isKelas6 ? 'Lulus' : 'Naik Kelas';
        const labelTidakNaik = isKelas6 ? 'Mengulang' : 'Tidak Naik Kelas';

        if (!dataRapor.pelengkap) dataRapor.pelengkap = {};
        if (!dataRapor.pelengkap.kenaikanKelas) dataRapor.pelengkap.kenaikanKelas = {};

        document.querySelectorAll('.chk-status-legger').forEach(cb => {
            dataRapor.pelengkap.kenaikanKelas[cb.dataset.siswaId] = cb.checked ? labelNaik : labelTidakNaik;
        });

        saveData(dataRapor);
        if (typeof showModal === 'function') {
            showModal({ title: 'Tersimpan', message: 'Status akhir tahun siswa telah berhasil disimpan.', type: 'success' });
        }
    });

    document.getElementById('cetakLeggerBtn').addEventListener('click', () => {
        const tableClone = document.getElementById('tabelLeggerSPA').cloneNode(true);
        const selectInClone = tableClone.querySelector('#pilihanKeteranganSPA');
        if (selectInClone) {
            const headerCell = selectInClone.parentElement;
            headerCell.textContent = selectInClone.options[selectInClone.selectedIndex].text;
        }

        const title = document.getElementById('judulLeggerSPA').textContent;
        const printWindow = window.open('', '', 'height=800,width=1200');
        printWindow.document.write('<html><head><title>Cetak Legger</title>');
        printWindow.document.write('<style>body{font-family: Arial, sans-serif; font-size: 10pt;} h2{text-align:center;} table{border-collapse:collapse; width:100%;} th,td{border:1px solid #333; padding:5px; text-align:center; vertical-align:middle;} th{background-color:#f2f2f2; font-weight:bold;} .col-nama{text-align:left; white-space:normal;} .col-total{font-weight:bold; background:#e0f2fe;}</style>');
        printWindow.document.write('</head><body>');
        printWindow.document.write(`<h2>${title}</h2>`);
        printWindow.document.write(tableClone.outerHTML);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => printWindow.print(), 500);
    });

    document.getElementById('leggerHeadSPA').addEventListener('change', (e) => {
        if (e.target.id === 'pilihanKeteranganSPA') {
            const mode = e.target.value;
            const rows = document.querySelectorAll('#leggerBodySPA tr');
            
            if (mode === 'peringkat') {
                const siswaSkor = [];
                const predikatSkor = { "Sangat Baik": 4, "Baik": 3, "Cukup": 2, "Perlu Peningkatan": 1, "Perlu Bimbingan": 1 };
                const dataRapor = loadData();

                rows.forEach(row => {
                    const siswaId = row.dataset.siswaId;
                    const jmlNilaiCell = row.querySelectorAll('.col-total')[0];
                    let skorTotal = parseFloat(jmlNilaiCell.textContent) || 0;

                    (dataRapor.kokurikuler || []).forEach(koku => {
                        Object.values(dataRapor.nilaiKokurikuler?.[siswaId]?.[koku.id] || {}).forEach(p => skorTotal += (predikatSkor[p] || 0));
                    });
                    (dataRapor.ekstrakurikuler || []).forEach(eskul => {
                        const p = dataRapor.pelengkap?.ekstrakurikuler?.[siswaId]?.[eskul.id]?.predikat;
                        if (p) skorTotal += (predikatSkor[p] || 0);
                    });

                    siswaSkor.push({ siswaId, skor: skorTotal });
                });

                siswaSkor.sort((a, b) => b.skor - a.skor);
                const peringkatMap = new Map();
                siswaSkor.forEach((item, index) => peringkatMap.set(item.siswaId, index + 1));

                rows.forEach(row => {
                    const cell = row.querySelector('.cell-keterangan');
                    if (cell) {
                        cell.textContent = peringkatMap.get(row.dataset.siswaId);
                        cell.setAttribute('contenteditable', 'false');
                        cell.style.fontWeight = 'bold';
                        cell.style.background = '#e0f2fe';
                    }
                });
            } else {
                rows.forEach(row => {
                    const cell = row.querySelector('.cell-keterangan');
                    if (cell) {
                        cell.textContent = '';
                        cell.setAttribute('contenteditable', 'true');
                        cell.style.fontWeight = 'normal';
                        cell.style.background = '#fef9c3';
                    }
                });
            }
        }
    });
}