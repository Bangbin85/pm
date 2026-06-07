// =================================================================
// BANGBIN SPA MODUL: TUJUAN PEMBELAJARAN (TP)
// (UPDATED: Terintegrasi dengan hierarki Kelas & Master Data)
// =================================================================

let isTPEventsInitialized = false;
let arrayTPLokalSaatIni = [];

function memuatModulTP() {
    const dataRapor = typeof loadData === 'function' ? loadData() : {};
    
    // Inisialisasi struktur jika belum ada menggunakan format asli
    if (!dataRapor.tujuanPembelajaran) dataRapor.tujuanPembelajaran = {};
    if (!dataRapor.tujuanKokurikuler) dataRapor.tujuanKokurikuler = {};

    populasiDropdownTargetTP(dataRapor);

    if (!isTPEventsInitialized) {
        setupEventTP();
        isTPEventsInitialized = true;
    }
}

// Mengisi Dropdown berdasarkan Pilihan (Mapel / Koku)
function populasiDropdownTargetTP(dataRapor) {
    const kategori = document.getElementById('kategoriTP').value;
    const selectTarget = document.getElementById('pilihTargetTP');
    const labelTarget = document.getElementById('labelPilihTargetTP');
    
    selectTarget.innerHTML = '<option value="">-- Pilih Dahulu --</option>';
    document.getElementById('areaEditorTP').style.display = 'none';

    if (kategori === 'mapel') {
        labelTarget.innerText = 'Pilih Mata Pelajaran:';
        (dataRapor.mataPelajaran || []).forEach(m => selectTarget.add(new Option(m.nama, m.id)));
    } else {
        labelTarget.innerText = 'Pilih Projek Kokurikuler:';
        (dataRapor.kokurikuler || []).forEach(k => selectTarget.add(new Option(k.nama, k.id)));
    }
}

// Mengaitkan Event Listener Utama
function setupEventTP() {
    document.getElementById('kategoriTP').addEventListener('change', () => {
        const dataRapor = loadData();
        populasiDropdownTargetTP(dataRapor);
    });

    document.getElementById('pilihTargetTP').addEventListener('change', (e) => {
        const targetId = e.target.value;
        const targetNama = e.target.options[e.target.selectedIndex].text;
        if (!targetId) {
            document.getElementById('areaEditorTP').style.display = 'none';
            return;
        }

        document.getElementById('areaEditorTP').style.display = 'block';
        document.getElementById('judulEditorTP').innerText = `Daftar TP: ${targetNama}`;
        
        memuatDataTPLokal(targetId);
    });

    const btnTutorial = document.getElementById('btnTutorialTP');
    if (btnTutorial && typeof showModal === 'function') {
        btnTutorial.addEventListener('click', () => {
            showModal({
                title: 'Panduan Kelola TP',
                message: `<div style="text-align: left; font-size: 0.9rem; line-height: 1.5;">
                    1. Pilih Kategori (Mapel atau Kokurikuler).<br>
                    2. Pilih spesifik Mapel/Projek dari dropdown sebelah kanannya.<br>
                    3. Klik <b>Tambah Baris Manual</b> untuk mengetik TP sendiri.<br>
                    4. Klik <b>Ambil dari Master</b> untuk menyalin TP baku dari aplikasi.<br>
                    5. Wajib klik tombol <b>Simpan</b> biru di bawah setelah selesai mengedit!
                </div>`,
                type: 'info'
            });
        });
    }
}

// Menarik data TP dari Storage ke Array Lokal sementara berdasarkan Kelas
function memuatDataTPLokal(targetId) {
    const dataRapor = loadData();
    const kelasAktif = dataRapor.infoDasar?.kelasAktif || 'kelas-1';
    const kategori = document.getElementById('kategoriTP').value;
    
    if (kategori === 'mapel') {
        // Hierarki: tujuanPembelajaran -> kelasAktif -> mapelId
        arrayTPLokalSaatIni = JSON.parse(JSON.stringify(dataRapor.tujuanPembelajaran?.[kelasAktif]?.[targetId] || []));
    } else {
        arrayTPLokalSaatIni = JSON.parse(JSON.stringify(dataRapor.tujuanKokurikuler?.[targetId] || []));
    }
    
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

function updateNilaiTPLokal(index, text) {
    if (arrayTPLokalSaatIni[index]) {
        arrayTPLokalSaatIni[index].deskripsi = text;
    }
}

function tambahBarisTPBaru() {
    arrayTPLokalSaatIni.push({
        id: 'tp-' + Date.now() + Math.random().toString(16).slice(2),
        deskripsi: ''
    });
    renderDaftarInputTP();
    const container = document.getElementById('listInputTP').parentElement;
    container.scrollTop = container.scrollHeight;
}

function hapusBarisTPLokal(index) {
    arrayTPLokalSaatIni.splice(index, 1);
    renderDaftarInputTP();
}

// Menyimpan array lokal kembali ke LocalStorage
async function simpanDataTPLokal() {
    const targetId = document.getElementById('pilihTargetTP').value;
    const kategori = document.getElementById('kategoriTP').value;
    
    if (!targetId) return;

    const tpBersih = arrayTPLokalSaatIni.filter(tp => tp.deskripsi.trim() !== '');

    const btnSimpan = document.getElementById('btnSimpanTP');
    const oriHTML = btnSimpan.innerHTML;
    btnSimpan.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Menyimpan...';
    btnSimpan.disabled = true;

    const dataRapor = loadData();
    const kelasAktif = dataRapor.infoDasar?.kelasAktif || 'kelas-1';

    if (kategori === 'mapel') {
        if (!dataRapor.tujuanPembelajaran) dataRapor.tujuanPembelajaran = {};
        if (!dataRapor.tujuanPembelajaran[kelasAktif]) dataRapor.tujuanPembelajaran[kelasAktif] = {};
        dataRapor.tujuanPembelajaran[kelasAktif][targetId] = tpBersih;
    } else {
        if (!dataRapor.tujuanKokurikuler) dataRapor.tujuanKokurikuler = {};
        dataRapor.tujuanKokurikuler[targetId] = tpBersih;
    }

    saveData(dataRapor);
    
    arrayTPLokalSaatIni = tpBersih;
    renderDaftarInputTP();

    btnSimpan.innerHTML = oriHTML;
    btnSimpan.disabled = false;

    if (typeof showModal === 'function') {
        await showModal({ title: 'Tersimpan', message: `Data Tujuan Pembelajaran berhasil diperbarui.`, type: 'success' });
    }
}

// ==========================================
// LOGIKA MODAL MASTER TP
// ==========================================
function bukaModalMasterTP() {
    const wadah = document.getElementById('wadahListMasterTP');
    wadah.innerHTML = '';

    const dataRapor = loadData();
    const kelasAktif = dataRapor.infoDasar?.kelasAktif || 'kelas-1';
    const targetId = document.getElementById('pilihTargetTP').value;
    const kategori = document.getElementById('kategoriTP').value;

    let masterDataTersedia = [];
    
    // Hubungkan spesifik ke variabel global Master jika Kategori adalah Mapel
    if (kategori === 'mapel' && typeof TP_DEFAULT_MASTER !== 'undefined') {
        masterDataTersedia = TP_DEFAULT_MASTER[kelasAktif]?.[targetId] || [];
    } else if (kategori === 'koku') {
        masterDataTersedia = [{ id: 'm-koku', deskripsi: 'Pilih Dimensi Profil Pelajar Pancasila sesuai kegiatan Projek.' }];
    }

    if (masterDataTersedia.length === 0) {
        wadah.innerHTML = '<div style="padding:15px; text-align:center; font-size:0.85rem; color:#666;">Master data TP tidak tersedia untuk mata pelajaran ini di kelas yang dipilih.</div>';
    } else {
        masterDataTersedia.forEach(item => {
            wadah.innerHTML += `
                <div class="master-tp-item">
                    <input type="checkbox" class="chk-master-tp" value="${item.deskripsi}" id="chk-${item.id}">
                    <label class="master-tp-label" for="chk-${item.id}">${item.deskripsi}</label>
                </div>
            `;
        });
    }

    document.getElementById('modalMasterTP').style.display = 'flex';
}

function tutupModalMasterTP() {
    document.getElementById('modalMasterTP').style.display = 'none';
}

function masukkanTPTerpilih() {
    const checkboxes = document.querySelectorAll('.chk-master-tp:checked');
    let jumlahDitambah = 0;

    checkboxes.forEach(chk => {
        arrayTPLokalSaatIni.push({
            id: 'tp-' + Date.now() + Math.random().toString(16).slice(2),
            deskripsi: chk.value
        });
        jumlahDitambah++;
    });

    if (jumlahDitambah > 0) {
        renderDaftarInputTP();
        tutupModalMasterTP();
        const container = document.getElementById('listInputTP').parentElement;
        container.scrollTop = container.scrollHeight;
    } else {
        alert('Tidak ada TP yang dicentang.');
    }
}