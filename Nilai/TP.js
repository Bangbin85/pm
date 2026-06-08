// =================================================================
// BANGBIN SPA MODUL: TUJUAN PEMBELAJARAN (TP)
// (UPDATED: Terintegrasi Hierarki Kelas & Sinkronisasi Modul Kokurikuler)
// =================================================================

let isTPEventsInitialized = false;
let arrayTPLokalSaatIni = [];
let currentDimensiKey = null;

function memuatModulTP() {
    const dataRapor = typeof loadData === 'function' ? loadData() : {};
    
    if (!dataRapor.tujuanPembelajaran) dataRapor.tujuanPembelajaran = {};
    if (!dataRapor.tujuanKokurikuler) dataRapor.tujuanKokurikuler = {};

    populasiDropdownTargetTP(dataRapor);

    if (!isTPEventsInitialized) {
        setupEventTP();
        isTPEventsInitialized = true;
    }
}

function populasiDropdownTargetTP(dataRapor) {
    const kategori = document.getElementById('kategoriTP').value;
    const selectTarget = document.getElementById('pilihTargetTP');
    const labelTarget = document.getElementById('labelPilihTargetTP');
    
    selectTarget.innerHTML = '<option value="">-- Pilih Dahulu --</option>';
    document.getElementById('areaEditorTP').style.display = 'none';
    if(document.getElementById('areaKokuTP')) document.getElementById('areaKokuTP').style.display = 'none';

    if (kategori === 'mapel') {
        labelTarget.innerText = 'Pilih Mata Pelajaran:';
        (dataRapor.mataPelajaran || []).forEach(m => selectTarget.add(new Option(m.nama, m.id)));
    } else {
        labelTarget.innerText = 'Pilih Projek Kokurikuler:';
        (dataRapor.kokurikuler || []).forEach(k => selectTarget.add(new Option(k.nama, k.id)));
    }
}

function setupEventTP() {
    document.getElementById('kategoriTP').addEventListener('change', () => {
        const dataRapor = loadData();
        populasiDropdownTargetTP(dataRapor);
    });

    document.getElementById('pilihTargetTP').addEventListener('change', (e) => {
        const targetId = e.target.value;
        const targetNama = e.target.options[e.target.selectedIndex].text;
        const kategori = document.getElementById('kategoriTP').value;

        if (!targetId) {
            document.getElementById('areaEditorTP').style.display = 'none';
            if(document.getElementById('areaKokuTP')) document.getElementById('areaKokuTP').style.display = 'none';
            return;
        }

        if (kategori === 'mapel') {
            document.getElementById('areaKokuTP').style.display = 'none';
            document.getElementById('areaEditorTP').style.display = 'block';
            document.getElementById('judulEditorTP').innerText = `Daftar TP: ${targetNama}`;
            memuatDataTPLokal(targetId);
        } else {
            document.getElementById('areaEditorTP').style.display = 'none';
            document.getElementById('areaKokuTP').style.display = 'block';
            document.getElementById('judulKokuTP').innerText = `Pilih Dimensi Profil Pelajar Pancasila: ${targetNama}`;
            renderDimensiKoku(targetId);
        }
    });

    const btnTutorial = document.getElementById('btnTutorialTP');
    if (btnTutorial && typeof showModal === 'function') {
        btnTutorial.addEventListener('click', () => {
            showModal({
                title: 'Panduan Kelola TP',
                message: `<div style="text-align: left; font-size: 0.9rem; line-height: 1.5;">
                    <b>Untuk Mata Pelajaran:</b><br>
                    1. Pilih Mapel dari dropdown di sebelah kanan.<br>
                    2. Ketik TP manual atau klik <b>Ambil dari Master</b>.<br>
                    3. Wajib klik tombol <b>Simpan</b>.<br><br>
                    <b>Untuk Kokurikuler (P5):</b><br>
                    1. Pilih Projek Kokurikuler dari dropdown.<br>
                    2. Klik <b>Pilih & Kelola</b> pada setiap dimensi yang relevan dengan tema projek.<br>
                    3. Centang tujuan dimensi yang diinginkan, lalu klik <b>Simpan Pilihan Dimensi</b>.
                </div>`,
                type: 'info'
            });
        });
    }

    const addTpForm = document.getElementById('addTpForm');
    if (addTpForm) {
        addTpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const newTpInput = document.getElementById('newTpInput');
            const newVal = newTpInput.value.trim();
            if (newVal && currentDimensiKey) {
                const dataRapor = loadData();
                if (!dataRapor.dimensiKokurikuler[currentDimensiKey].tujuan.includes(newVal)) {
                    dataRapor.dimensiKokurikuler[currentDimensiKey].tujuan.push(newVal);
                    saveData(dataRapor);
                    newTpInput.value = '';
                    
                    const currentKokuId = document.getElementById('pilihTargetTP').value;
                    const storedSelection = dataRapor.tujuanKokurikuler?.[currentKokuId]?.[currentDimensiKey] || [];
                    const checkedNodes = document.querySelectorAll('.chk-koku-tp:checked');
                    const currentActiveSelections = Array.from(checkedNodes).map(n => n.value);
                    const mergedSelections = [...new Set([...storedSelection, ...currentActiveSelections])];
                    
                    renderIsiModalDimensi(dataRapor.dimensiKokurikuler[currentDimensiKey].tujuan, mergedSelections);
                }
            }
        });
    }
}

// ==========================================
// AREA: LOGIKA MATA PELAJARAN
// ==========================================
function memuatDataTPLokal(targetId) {
    const dataRapor = loadData();
    const kelasAktif = dataRapor.infoDasar?.kelasAktif || 'kelas-1';
    arrayTPLokalSaatIni = JSON.parse(JSON.stringify(dataRapor.tujuanPembelajaran?.[kelasAktif]?.[targetId] || []));
    renderDaftarInputTP();
}

function renderDaftarInputTP() {
    const listContainer = document.getElementById('listInputTP');
    listContainer.innerHTML = '';

    if (arrayTPLokalSaatIni.length === 0) {
        listContainer.innerHTML = `<li style="padding: 15px; text-align: center; color: #64748b; font-size: 0.85rem; font-style: italic;">Belum ada tujuan pembelajaran. Silakan tambah manual atau ambil dari master.</li>`;
        return;
    }

    arrayTPLokalSaatIni.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'tp-item';
        li.innerHTML = `
            <div class="tp-number">${index + 1}.</div>
            <textarea class="tp-textarea" placeholder="Ketik deskripsi tujuan pembelajaran di sini..." oninput="updateNilaiTPLokal(${index}, this.value)">${item.deskripsi || ''}</textarea>
            <button class="btn-tp-action btn-tp-delete" onclick="hapusBarisTPLokal(${index})" title="Hapus"><i class="fa-solid fa-xmark"></i></button>
        `;
        listContainer.appendChild(li);
    });
}

function updateNilaiTPLokal(index, text) { if (arrayTPLokalSaatIni[index]) arrayTPLokalSaatIni[index].deskripsi = text; }
function tambahBarisTPBaru() {
    arrayTPLokalSaatIni.push({ id: 'tp-' + Date.now() + Math.random().toString(16).slice(2), deskripsi: '' });
    renderDaftarInputTP();
    const container = document.getElementById('listInputTP').parentElement;
    container.scrollTop = container.scrollHeight;
}
function hapusBarisTPLokal(index) { arrayTPLokalSaatIni.splice(index, 1); renderDaftarInputTP(); }

async function simpanDataTPLokal() {
    const targetId = document.getElementById('pilihTargetTP').value;
    if (!targetId) return;

    const tpBersih = arrayTPLokalSaatIni.filter(tp => tp.deskripsi.trim() !== '');
    const btnSimpan = document.getElementById('btnSimpanTP');
    const oriHTML = btnSimpan.innerHTML;
    btnSimpan.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Menyimpan...';
    btnSimpan.disabled = true;

    const dataRapor = loadData();
    const kelasAktif = dataRapor.infoDasar?.kelasAktif || 'kelas-1';

    if (!dataRapor.tujuanPembelajaran) dataRapor.tujuanPembelajaran = {};
    if (!dataRapor.tujuanPembelajaran[kelasAktif]) dataRapor.tujuanPembelajaran[kelasAktif] = {};
    dataRapor.tujuanPembelajaran[kelasAktif][targetId] = tpBersih;

    saveData(dataRapor);
    arrayTPLokalSaatIni = tpBersih;
    renderDaftarInputTP();

    btnSimpan.innerHTML = oriHTML;
    btnSimpan.disabled = false;

    if (typeof showModal === 'function') {
        await showModal({ title: 'Tersimpan', message: 'Data Tujuan Pembelajaran Mapel berhasil diperbarui.', type: 'success' });
    }
}

// LOGIKA MODAL MASTER MAPEL
function bukaModalMasterTP() {
    const wadah = document.getElementById('wadahListMasterTP');
    wadah.innerHTML = '';
    const dataRapor = loadData();
    const kelasAktif = dataRapor.infoDasar?.kelasAktif || 'kelas-1';
    const targetId = document.getElementById('pilihTargetTP').value;

    let masterDataTersedia = [];
    if (typeof TP_DEFAULT_MASTER !== 'undefined') {
        masterDataTersedia = TP_DEFAULT_MASTER[kelasAktif]?.[targetId] || [];
    }

    if (masterDataTersedia.length === 0) {
        wadah.innerHTML = '<div style="padding:15px; text-align:center; font-size:0.85rem; color:#666;">Master data TP tidak tersedia untuk mata pelajaran ini di kelas yang dipilih.</div>';
    } else {
        masterDataTersedia.forEach(item => {
            wadah.innerHTML += `
                <div class="master-tp-item">
                    <input type="checkbox" class="chk-master-tp" value="${item.deskripsi}" id="chk-${item.id}">
                    <label class="master-tp-label" for="chk-${item.id}">${item.deskripsi}</label>
                </div>`;
        });
    }
    document.getElementById('modalMasterTP').style.display = 'flex';
}

function tutupModalMasterTP() { document.getElementById('modalMasterTP').style.display = 'none'; }

function masukkanTPTerpilih() {
    const checkboxes = document.querySelectorAll('.chk-master-tp:checked');
    let jumlahDitambah = 0;
    checkboxes.forEach(chk => {
        arrayTPLokalSaatIni.push({ id: 'tp-' + Date.now() + Math.random().toString(16).slice(2), deskripsi: chk.value });
        jumlahDitambah++;
    });

    if (jumlahDitambah > 0) {
        renderDaftarInputTP();
        tutupModalMasterTP();
        const container = document.getElementById('listInputTP').parentElement;
        container.scrollTop = container.scrollHeight;
    } else {
        if (typeof showModal === 'function') showModal({ title: 'Peringatan', message: 'Tidak ada TP yang dicentang.', type: 'error' });
    }
}

// ==========================================
// AREA: LOGIKA KOKURIKULER (DIMENSI)
// ==========================================
function renderDimensiKoku(kokuId) {
    const dataRapor = loadData();
    const wrapper = document.getElementById('dimensiInputsWrapper');
    wrapper.innerHTML = '';
    
    const storedSelection = dataRapor.tujuanKokurikuler?.[kokuId] || {};

    for (const [key, val] of Object.entries(dataRapor.dimensiKokurikuler)) {
        const selectedCount = storedSelection[key] ? storedSelection[key].length : 0;
        const totalCount = val.tujuan.length;
        
        const html = `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 15px; background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                <div>
                    <div style="font-weight: 600; font-size: 1rem; color: var(--text-main);">${val.nama}</div>
                    <div style="font-size: 0.85rem; color: var(--secondary-color); margin-top: 5px;" id="summary-${key}">
                        <i class="fa-solid fa-check-double" style="color: #10b981;"></i> ${selectedCount} dari ${totalCount} tujuan terpilih
                    </div>
                </div>
                <button class="btn-save" style="background: #0ea5e9;" onclick="bukaModalDimensi('${key}')">
                    <i class="fa-solid fa-pen-to-square"></i> Pilih & Kelola
                </button>
            </div>
        `;
        wrapper.insertAdjacentHTML('beforeend', html);
    }
}

function bukaModalDimensi(key) {
    currentDimensiKey = key;
    const dataRapor = loadData();
    const dimData = dataRapor.dimensiKokurikuler[key];
    const currentKokuId = document.getElementById('pilihTargetTP').value;
    const storedSelection = dataRapor.tujuanKokurikuler?.[currentKokuId]?.[key] || [];
    
    document.getElementById('dimensiModalTitle').innerHTML = `<i class="fa-solid fa-list-check" style="color: #10b981;"></i> Kelola: ${dimData.nama}`;
    renderIsiModalDimensi(dimData.tujuan, storedSelection);
    document.getElementById('dimensiModal').style.display = 'flex';
}

function renderIsiModalDimensi(masterList, selectedList) {
    const checkWrapper = document.getElementById('selectionCheckboxes');
    const manageWrapper = document.getElementById('managementList');
    
    checkWrapper.innerHTML = '';
    manageWrapper.innerHTML = '';

    if (masterList.length === 0) {
        checkWrapper.innerHTML = '<p style="color: #94a3b8; font-size: 0.85rem; font-style: italic;">Belum ada tujuan di master data.</p>';
    }

    masterList.forEach((tp, idx) => {
        const isChecked = selectedList.includes(tp) ? 'checked' : '';
        const idChk = `chk-koku-${idx}`;
        
        checkWrapper.insertAdjacentHTML('beforeend', `
            <div style="display: flex; align-items: flex-start; gap: 10px; margin-bottom: 8px; padding: 8px; background: #f8fafc; border-radius: 6px; border: 1px solid #e2e8f0;">
                <input type="checkbox" class="chk-koku-tp" value="${tp}" id="${idChk}" ${isChecked} style="margin-top: 4px; transform: scale(1.2);">
                <label for="${idChk}" style="font-size: 0.9rem; cursor: pointer; color: var(--text-main); line-height: 1.4; margin: 0;">${tp}</label>
            </div>
        `);
        
        manageWrapper.insertAdjacentHTML('beforeend', `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px dashed #cbd5e1;">
                <p style="margin: 0; font-size: 0.85rem; color: var(--text-main); flex-grow: 1; padding-right: 15px;">${tp}</p>
                <div style="display: flex; gap: 5px;">
                    <button type="button" class="btn-save kompak" style="background: #f59e0b; padding: 5px 10px;" onclick="editMasterKokuTp(${idx})" title="Edit"><i class="fa-solid fa-pen"></i></button>
                    <button type="button" class="btn-save kompak" style="background: #ef4444; padding: 5px 10px;" onclick="hapusMasterKokuTp(${idx})" title="Hapus"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
        `);
    });
}

function editMasterKokuTp(idx) {
    const dataRapor = loadData();
    const masterList = dataRapor.dimensiKokurikuler[currentDimensiKey].tujuan;
    const oldVal = masterList[idx];
    document.getElementById('editKokuTpIdx').value = idx;
    document.getElementById('editKokuTpVal').value = oldVal;
    document.getElementById('modalEditKokuTP').style.display = 'flex';
}

function simpanEditMasterKokuTp() {
    const idx = document.getElementById('editKokuTpIdx').value;
    const newVal = document.getElementById('editKokuTpVal').value.trim();
    const dataRapor = loadData();
    const masterList = dataRapor.dimensiKokurikuler[currentDimensiKey].tujuan;
    
    if (newVal && newVal !== masterList[idx]) {
        masterList[idx] = newVal;
        saveData(dataRapor);
        
        const checkedNodes = document.querySelectorAll('.chk-koku-tp:checked');
        const currentSelection = Array.from(checkedNodes).map(n => n.value);
        renderIsiModalDimensi(masterList, currentSelection);
    }
    document.getElementById('modalEditKokuTP').style.display = 'none';
}

async function hapusMasterKokuTp(idx) {
    if (typeof showModal === 'function') {
        const confirmed = await showModal({
            title: 'Hapus Tujuan Master',
            message: 'Yakin ingin menghapus tujuan ini dari master data secara permanen?',
            type: 'error',
            confirmText: 'Ya, Hapus',
            showCancelButton: true
        });
        if (!confirmed) return;
    }

    const dataRapor = loadData();
    dataRapor.dimensiKokurikuler[currentDimensiKey].tujuan.splice(idx, 1);
    saveData(dataRapor);
    
    const masterList = dataRapor.dimensiKokurikuler[currentDimensiKey].tujuan;
    const checkedNodes = document.querySelectorAll('.chk-koku-tp:checked');
    const currentSelection = Array.from(checkedNodes).map(n => n.value);
    renderIsiModalDimensi(masterList, currentSelection);
}

function tutupDimensiModal() { document.getElementById('dimensiModal').style.display = 'none'; }

async function simpanPilihanDimensi() {
    const checkedNodes = document.querySelectorAll('.chk-koku-tp:checked');
    const selected = Array.from(checkedNodes).map(n => n.value);
    const currentKokuId = document.getElementById('pilihTargetTP').value;
    
    const dataRapor = loadData();
    if (!dataRapor.tujuanKokurikuler) dataRapor.tujuanKokurikuler = {};
    if (!dataRapor.tujuanKokurikuler[currentKokuId]) dataRapor.tujuanKokurikuler[currentKokuId] = {};
    
    dataRapor.tujuanKokurikuler[currentKokuId][currentDimensiKey] = selected;
    saveData(dataRapor);
    
    const total = dataRapor.dimensiKokurikuler[currentDimensiKey].tujuan.length;
    document.getElementById(`summary-${currentDimensiKey}`).innerHTML = `<i class="fa-solid fa-check-double" style="color: #10b981;"></i> ${selected.length} dari ${total} tujuan terpilih`;

    tutupDimensiModal();
    if (typeof showModal === 'function') {
        await showModal({ title: 'Tersimpan', message: 'Tujuan Dimensi berhasil disimpan untuk kegiatan ini.', type: 'success' });
    }
}
