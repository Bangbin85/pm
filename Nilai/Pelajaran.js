// =================================================================
// BANGBIN SPA MODUL: MATA PELAJARAN, EKSTRA & KOKURIKULER
// =================================================================

let isPelajaranEventsInitialized = false;

function memuatModulPelajaran() {
    renderSemuaDaftar();
    
    if (!isPelajaranEventsInitialized) {
        setupEventPelajaran();
        isPelajaranEventsInitialized = true;
    }
}

function renderSemuaDaftar() {
    const dataRapor = typeof loadData === 'function' ? loadData() : {};
    
    // 1. Render Mata Pelajaran
    const bodyMapel = document.getElementById('bodyMapel');
    if (bodyMapel) {
        bodyMapel.innerHTML = '';
        (dataRapor.mataPelajaran || []).forEach(item => {
            const isAgama = item.agama ? `<span class="badge badge-agama">Agama ${item.agama}</span>` : `<span class="badge badge-umum">Umum</span>`;
            bodyMapel.innerHTML += `
                <li class="list-group-item">
                    <div>
                        <div style="font-weight: 500; font-size: 1.05rem;">${item.nama} <span style="font-size: 0.85em; color: #666; font-weight: normal;">(${item.singkat})</span></div>
                        <div style="margin-top: 5px;">${isAgama}</div>
                    </div>
                    <div class="item-actions">
                        <button class="btn-edit" onclick="bukaModalEditItem('mapel', '${item.id}')" title="Edit"><i class="fa-solid fa-pen"></i></button>
                        <button class="btn-delete" onclick="hapusItemData('mataPelajaran', '${item.id}')" title="Hapus"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </li>`;
        });
    }

    // 2. Render Ekstrakurikuler
    const bodyEkstra = document.getElementById('bodyEkstra');
    if (bodyEkstra) {
        bodyEkstra.innerHTML = '';
        (dataRapor.ekstrakurikuler || []).forEach(item => {
            bodyEkstra.innerHTML += `
                <li class="list-group-item">
                    <span style="font-weight: 500; font-size: 1.05rem;">${item.nama}</span>
                    <div class="item-actions">
                        <button class="btn-edit" onclick="bukaModalEditItem('ekstra', '${item.id}')" title="Edit"><i class="fa-solid fa-pen"></i></button>
                        <button class="btn-delete" onclick="hapusItemData('ekstrakurikuler', '${item.id}')" title="Hapus"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </li>`;
        });
    }

    // 3. Render Kokurikuler (P5)
    const bodyKoku = document.getElementById('bodyKoku');
    if (bodyKoku) {
        bodyKoku.innerHTML = '';
        (dataRapor.kokurikuler || []).forEach(item => {
            bodyKoku.innerHTML += `
                <li class="list-group-item">
                    <span style="font-weight: 500; font-size: 1.05rem;">${item.nama}</span>
                    <div class="item-actions">
                        <button class="btn-edit" onclick="bukaModalEditItem('koku', '${item.id}')" title="Edit"><i class="fa-solid fa-pen"></i></button>
                        <button class="btn-delete" onclick="hapusItemData('kokurikuler', '${item.id}')" title="Hapus"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </li>`;
        });
    }
}

// FUNGSI AKSI: TAMBAH DATA & NAVIGASI DROPDOWN
function setupEventPelajaran() {

    // === LOGIKA NAVIGASI DROPDOWN KATEGORI ===
    const selectKategori = document.getElementById('pilihKategoriPelajaran');
    if (selectKategori) {
        selectKategori.addEventListener('change', (e) => {
            const kategoriPilihan = e.target.value;
            
            // Sembunyikan semua container
            document.querySelectorAll('.kategori-container').forEach(el => {
                el.classList.remove('active');
            });
            
            // Tampilkan container yang dipilih
            if (kategoriPilihan === 'mapel') document.getElementById('containerMapel').classList.add('active');
            if (kategoriPilihan === 'ekstra') document.getElementById('containerEkstra').classList.add('active');
            if (kategoriPilihan === 'koku') document.getElementById('containerKoku').classList.add('active');
        });
    }

    // Tampilan dinamis dropdown Agama di form tambah
    const isAgamaSelect = document.getElementById('isAgama');
    const pilihAgamaWrapper = document.getElementById('pilihAgamaWrapper');
    if (isAgamaSelect) {
        isAgamaSelect.addEventListener('change', (e) => {
            pilihAgamaWrapper.style.display = e.target.value === 'agama' ? 'block' : 'none';
        });
    }

    // Form Tambah Mapel
    const formMapel = document.getElementById('formMapel');
    if (formMapel) {
        formMapel.addEventListener('submit', async (e) => {
            e.preventDefault();
            const dataRapor = loadData();
            if (!dataRapor.mataPelajaran) dataRapor.mataPelajaran = [];
            
            const isAgama = document.getElementById('isAgama').value === 'agama';
            dataRapor.mataPelajaran.push({
                id: 'mapel-' + Date.now(),
                nama: document.getElementById('namaMapel').value.trim(),
                singkat: document.getElementById('singkatMapel').value.trim(),
                agama: isAgama ? document.getElementById('jenisAgama').value : null
            });
            
            saveData(dataRapor);
            formMapel.reset();
            pilihAgamaWrapper.style.display = 'none';
            renderSemuaDaftar();
            perbaruiDropdownSidebar(dataRapor); // Update menu dropdown di sidebar
        });
    }

    // Form Tambah Ekstra
    const formEkstra = document.getElementById('formEkstra');
    if (formEkstra) {
        formEkstra.addEventListener('submit', async (e) => {
            e.preventDefault();
            const dataRapor = loadData();
            if (!dataRapor.ekstrakurikuler) dataRapor.ekstrakurikuler = [];
            
            dataRapor.ekstrakurikuler.push({
                id: 'eskul-' + Date.now(),
                nama: document.getElementById('namaEkstra').value.trim()
            });
            
            saveData(dataRapor);
            formEkstra.reset();
            renderSemuaDaftar();
        });
    }

    // Form Tambah Kokurikuler
    const formKoku = document.getElementById('formKoku');
    if (formKoku) {
        formKoku.addEventListener('submit', async (e) => {
            e.preventDefault();
            const dataRapor = loadData();
            if (!dataRapor.kokurikuler) dataRapor.kokurikuler = [];
            
            dataRapor.kokurikuler.push({
                id: 'koku-' + Date.now(),
                nama: document.getElementById('namaKoku').value.trim()
            });
            
            saveData(dataRapor);
            formKoku.reset();
            renderSemuaDaftar();
            perbaruiDropdownSidebar(dataRapor); // Update menu dropdown di sidebar
        });
    }

    // Form Edit Submit
    const formEditItem = document.getElementById('formEditItem');
    if (formEditItem) {
        formEditItem.addEventListener('submit', async (e) => {
            e.preventDefault();
            const dataRapor = loadData();
            const type = document.getElementById('editItemType').value;
            const id = document.getElementById('editItemId').value;
            const newName = document.getElementById('editItemNama').value.trim();

            if (type === 'mapel') {
                const mapel = dataRapor.mataPelajaran.find(m => m.id === id);
                if (mapel) {
                    mapel.nama = newName;
                    mapel.singkat = document.getElementById('editItemSingkat').value.trim();
                    const isAgamaEdit = document.getElementById('editIsAgama').value === 'agama';
                    mapel.agama = isAgamaEdit ? document.getElementById('editJenisAgama').value : null;
                }
            } else if (type === 'ekstra') {
                const ekstra = dataRapor.ekstrakurikuler.find(e => e.id === id);
                if (ekstra) ekstra.nama = newName;
            } else if (type === 'koku') {
                const koku = dataRapor.kokurikuler.find(k => k.id === id);
                if (koku) koku.nama = newName;
            }

            saveData(dataRapor);
            tutupModalEditItem();
            renderSemuaDaftar();
            perbaruiDropdownSidebar(dataRapor);
            
            if (typeof showModal === 'function') {
                showModal({ title: 'Tersimpan', message: 'Perubahan berhasil disimpan.', type: 'success' });
            }
        });
    }
    
    // Tampilan dinamis dropdown edit agama
    document.getElementById('editIsAgama').addEventListener('change', (e) => {
        document.getElementById('editPilihAgamaWrapper').style.display = e.target.value === 'agama' ? 'block' : 'none';
    });
}

// FUNGSI AKSI: HAPUS DATA
async function hapusItemData(kategoriArray, id) {
    if (typeof showModal === 'function') {
        const confirmed = await showModal({
            title: 'Hapus Data',
            message: 'Yakin ingin menghapus item ini?',
            type: 'error',
            confirmText: 'Ya, Hapus',
            showCancelButton: true
        });
        if (!confirmed) return;
    } else {
        if (!confirm('Yakin ingin menghapus item ini?')) return;
    }

    const dataRapor = loadData();
    if (dataRapor[kategoriArray]) {
        dataRapor[kategoriArray] = dataRapor[kategoriArray].filter(item => item.id !== id);
        saveData(dataRapor);
        renderSemuaDaftar();
        perbaruiDropdownSidebar(dataRapor);
    }
}

// FUNGSI MODAL EDIT
function bukaModalEditItem(type, id) {
    const dataRapor = loadData();
    document.getElementById('editItemType').value = type;
    document.getElementById('editItemId').value = id;
    const extraFields = document.getElementById('editMapelExtraFields');

    let item;
    if (type === 'mapel') {
        item = (dataRapor.mataPelajaran || []).find(m => m.id === id);
        extraFields.style.display = 'block';
        if (item) {
            document.getElementById('editItemSingkat').value = item.singkat || '';
            const isAgamaSelect = document.getElementById('editIsAgama');
            const pilihAgamaWrapper = document.getElementById('editPilihAgamaWrapper');
            if (item.agama) {
                isAgamaSelect.value = 'agama';
                pilihAgamaWrapper.style.display = 'block';
                document.getElementById('editJenisAgama').value = item.agama;
            } else {
                isAgamaSelect.value = 'umum';
                pilihAgamaWrapper.style.display = 'none';
            }
        }
    } else {
        extraFields.style.display = 'none';
        if (type === 'ekstra') item = (dataRapor.ekstrakurikuler || []).find(e => e.id === id);
        if (type === 'koku') item = (dataRapor.kokurikuler || []).find(k => k.id === id);
    }

    if (item) {
        document.getElementById('editItemNama').value = item.nama;
        document.getElementById('editItemModal').style.display = 'flex';
    }
}

function tutupModalEditItem() {
    document.getElementById('editItemModal').style.display = 'none';
    document.getElementById('formEditItem').reset();
}

// Memperbarui dropdown di Input Nilai secara real-time
function perbaruiDropdownSidebar(dataRapor) {
    const selectMapel = document.getElementById('pilihMapelSection');
    const selectKoku = document.getElementById('pilihKokuSection');
    
    if (selectMapel) {
        selectMapel.innerHTML = '<option value="">-- Pilih Mata Pelajaran --</option>';
        (dataRapor.mataPelajaran || []).forEach(m => selectMapel.add(new Option(m.nama, m.id)));
    }
    if (selectKoku) {
        selectKoku.innerHTML = '<option value="">-- Pilih Kegiatan Projek --</option>';
        (dataRapor.kokurikuler || []).forEach(k => selectKoku.add(new Option(k.nama, k.id)));
    }
}