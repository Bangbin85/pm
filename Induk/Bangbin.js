////Buku Induk Bangbin\\\
const getDb = () => JSON.parse(localStorage.getItem('bukuIndukDb')) || null;
const saveDb = (db) => localStorage.setItem('bukuIndukDb', JSON.stringify(db));
const setDefaultData = () => {
    const defaultYear = '2024/2025';
    const nextYear = '2025/2026';
    const db = {
        activeYear: defaultYear,
        schoolInfo: { 
            nama: 'SDN Bangbin Merdeka', 
            npsn: '20123456', 
            alamat: 'Jl. Merdeka No. 1, Jakarta',
            telpon: '021-12345678',
            logoUrl: 'https://lh3.googleusercontent.com/d/16rll5zsRdwTbR3nF_NmPKwY51tg4tnOn',
            noHpAdmin: '6281310051985', 
            tempat: 'Jakarta'      
        },
        masterSiswa: [
            {
                id: 1,
                s_nama: "Budi Santoso",
                s_nipd: 1234567,
                s_nisn: 9988776655,
                s_jk: "L",
                s_tempatLahir: "Jakarta",
                s_tanggalLahir: "2018-05-10",
                s_agama: "Islam",
                s_alamat: "Jl. Sudirman No. 2",
                s_rt: "01",
                s_rw: "02",
                s_dusun: "",
                s_kelurahan: "Cilandak",
                s_kecamatan: "Cilandak",
                s_kodePos: "12345",
                s_hp: "081234567890",
                d_ayah_nama: "Wicaksono",
                d_ayah_pekerjaan: "PNS",
                d_ibu_nama: "Siti Aminah",
                d_ibu_pekerjaan: "Ibu Rumah Tangga",
                grades: {
                    '2024/2025': {
                        semester1: {
                            subjects: { Pancasila: 90, 'B. Indo': 85, MTK: 88 },
                            extracurriculars: { Pramuka: 'Baik' },
                            absences: { sakit: 0, izin: 0, alpha: 0 },
                            prestasi: [] // BARU: Data Prestasi
                        },
                        semester2: {
                            subjects: { Pancasila: 92, 'B. Indo': 88, MTK: 90 },
                            extracurriculars: { Pramuka: 'Baik' },
                            absences: { sakit: 1, izin: 0, alpha: 0 },
                            prestasi: [] // BARU: Data Prestasi
                        },
                        promotion: { status: null, note: '' } // BARU: Data Kenaikan Kelas
                    }
                }
            },
            {
                id: 2,
                s_nama: "Dewi Kurnia",
                s_nipd: 1234568,
                s_nisn: 9988776656,
                s_jk: "P",
                s_tempatLahir: "Bandung",
                s_tanggalLahir: "2018-03-22",
                s_agama: "Kristen Protestan",
                s_alamat: "Jl. Asia Afrika No. 10",
                s_rt: "03",
                s_rw: "01",
                s_dusun: "",
                s_kelurahan: "Braga",
                s_kecamatan: "Sumur Bandung",
                s_kodePos: "40111",
                s_hp: "081234567891",
                d_ayah_nama: "Agus Prasetyo",
                d_ayah_pekerjaan: "Swasta",
                d_ibu_nama: "Maria Gunawan",
                d_ibu_pekerjaan: "Karyawan Swasta",
                grades: {
                    '2024/2025': {
                        semester1: {
                            subjects: { Pancasila: 88, 'B. Indo': 90, MTK: 91 },
                            extracurriculars: { Pramuka: 'Baik', 'Seni Tari': 'Sangat Baik' },
                            absences: { sakit: 0, izin: 1, alpha: 0 },
                            prestasi: []
                        },
                        semester2: {
                            subjects: { Pancasila: 89, 'B. Indo': 91, MTK: 92 },
                            extracurriculars: { Pramuka: 'Baik', 'Seni Tari': 'Sangat Baik' },
                            absences: { sakit: 0, izin: 0, alpha: 1 },
                            prestasi: []
                        },
                        promotion: { status: null, note: '' }
                    }
                }
            },
            {
                id: 3,
                s_nama: "Citra Lestari",
                s_nipd: 1234569,
                s_nisn: 9988776657,
                s_jk: "P",
                s_tempatLahir: "Surabaya",
                s_tanggalLahir: "2018-11-15",
                s_agama: "Hindu",
                s_alamat: "Jl. Pahlawan No. 5",
                s_rt: "05",
                s_rw: "03",
                s_dusun: "",
                s_kelurahan: "Sawahan",
                s_kecamatan: "Sawahan",
                s_kodePos: "60251",
                s_hp: "081234567892",
                d_ayah_nama: "Joko Pranowo",
                d_ayah_pekerjaan: "Wirasswasta",
                d_ibu_nama: "Kartika Sari",
                d_ibu_pekerjaan: "Ibu Rumah Tangga",
            }
        ],
        academicYears: {
            [defaultYear]: {
                users: [
                    { id: 1, nama: 'Bangbin', username: 'Bangbin', password: 'Bangbin123', role: 'Admin' },
                    { id: 2, nama: 'Tono Santoso', username: 'tono', password: 'tono123', role: 'Guru', rombelAjar: "1A" },
                    { id: 3, nama: 'Susanti', username: 'susanti', password: 'susanti123', role: 'Guru', rombelAjar: "1B" }
                ],
                enrollment: [
                    { studentId: 1, kelas: "1", rombel: "1A", status: "Aktif" },
                    { studentId: 2, kelas: "1", rombel: "1A", status: "Aktif" },
                    { studentId: 3, kelas: "1", rombel: "1B", status: "Aktif" }
                ],
                subjects: [
                    { id: 1, fullName: "Pendidikan Pancasila", shortName: "Pancasila" },
                    { id: 2, fullName: "Bahasa Indonesia", shortName: "B. Indo" },
                    { id: 3, fullName: "Matematika", shortName: "MTK" }
                ],
                extracurriculars: [
                    { id: 1, name: "Pramuka" },
                    { id: 2, name: "Seni Tari" }
                ],
                curriculumName: "Kurikulum Merdeka",
                characterGradeOptions: ["Sangat Baik", "Baik", "Cukup", "Perlu Peningkatan"],
                characterValues: [
                    {
                        id: 1,
                        name: "Profil Pelajar Pancasila",
                        subValues: [
                            { id: 101, name: "Beriman, bertakwa kepada Tuhan YME, dan berakhlak mulia" },
                            { id: 102, name: "Berkebinekaan global" },
                            { id: 103, name: "Bergotong royong" }
                        ]
                    }
                ],
                kepalaSekolah: {
                    nama: "Drs. Budi Setiawan",
                    nip: "197001012000011001"
                }
            },
            [nextYear]: {
                 users: [
                    { id: 1, nama: 'Bangbin', username: 'Bangbin', password: 'Bangbin123', role: 'Admin' },
                    { id: 2, nama: 'Tono Santoso', username: 'tono', password: 'tono123', role: 'Guru', rombelAjar: "2A" },
                    { id: 3, nama: 'Susanti', username: 'susanti', password: 'susanti123', role: 'Guru', rombelAjar: "2B" }
                 ],
                 enrollment: [
                    { studentId: 1, kelas: "2", rombel: "2A", status: "Aktif" },
                    { studentId: 2, kelas: "2", rombel: "2A", status: "Aktif" },
                    { studentId: 3, kelas: "2", rombel: "2B", status: "Aktif" }
                 ],
                 subjects: [
                    { id: 1, fullName: "Pendidikan Pancasila", shortName: "Pancasila" },
                    { id: 2, fullName: "Bahasa Indonesia", shortName: "B. Indo" },
                    { id: 3, fullName: "Matematika", shortName: "MTK" }
                 ],
                 extracurriculars: [
                    { id: 1, name: "Pramuka" },
                    { id: 2, name: "Seni Tari" }
                 ],
                 curriculumName: "Kurikulum Merdeka",
                 characterGradeOptions: ["Sangat Baik", "Baik", "Cukup", "Perlu Peningkatan"],
                 characterValues: [],
                 kepalaSekolah: {
                    nama: "",
                    nip: ""
                 }
            }
        }
    };
    saveDb(db);
    return db;
};
