const Database = (() => {
    // Kunci unik untuk data aplikasi di localStorage
    const DB_KEY = 'dataPembelajaran';


    const defaultCurriculum = {
        // --- KELAS 1 (FASE A) ---
        'kelas_1': {
            'Pendidikan Pancasila': {
                headers: ['Belum Terlihat', 'Mulai Terlihat', 'Berkembang', 'Sesuai Harapan', 'Sangat Berkembang', ''],
                rows: [{
                    capaian: 'Peserta didik dapat mengenal simbol-simbol sila Pancasila dan menceritakan contoh penerapan sila Pancasila dalam kehidupan sehari-hari.',
                    tujuanList: [{
                        tujuan: 'Menyebutkan bunyi 5 sila Pancasila secara urut.',
                        materi: 'Bunyi Sila Pancasila',
                        kriteria: [
                            'Belum mampu menyebutkan bunyi sila Pancasila meskipun dengan bimbingan.',
                            'Mampu menyebutkan 1-2 bunyi sila Pancasila dengan bimbingan penuh.',
                            'Mampu menyebutkan 3-4 bunyi sila Pancasila secara urut dengan sedikit bimbingan.',
                            'Mampu menyebutkan 5 bunyi sila Pancasila secara urut dan lancar tanpa bimbingan.',
                            'Mampu menyebutkan 5 bunyi sila Pancasila secara urut dan acak, serta memasangkan dengan simbolnya.',
                            ''
                        ],
                        highlightIndex: 2
                    }]
                }]
            },
            'Bahasa Indonesia': {
                headers: ['Belum Terlihat', 'Mulai Terlihat', 'Berkembang', 'Sesuai Harapan', 'Sangat Berkembang', ''],
                rows: [{
                    capaian: 'Peserta didik mampu bersikap menjadi pendengar yang penuh perhatian, menunjukkan minat dengan mengidentifikasi dan menyebutkan kembali informasi pada teks lisan sederhana.',
                    tujuanList: [{
                        tujuan: 'Menyebutkan kembali informasi penting dari dongeng yang dibacakan guru.',
                        materi: 'Informasi Teks Lisan',
                        kriteria: [
                            'Belum menunjukkan fokus saat mendengarkan dan tidak dapat menyebutkan informasi apapun.',
                            'Dapat menyebutkan 1 informasi (misal: nama tokoh) dengan bantuan pertanyaan pemantik.',
                            'Dapat menyebutkan beberapa informasi penting (tokoh, tempat) secara mandiri.',
                            'Dapat menyebutkan kembali informasi-informasi penting secara runtut.',
                            'Dapat menceritakan kembali isi dongeng dengan bahasanya sendiri secara lengkap.',
                            ''
                        ],
                        highlightIndex: 3
                    }]
                }]
            },
            'Matematika': {
                headers: ['Belum Terlihat', 'Mulai Terlihat', 'Berkembang', 'Sesuai Harapan', 'Sangat Berkembang', ''],
                rows: [{
                    capaian: 'Peserta didik dapat melakukan operasi penjumlahan dan pengurangan menggunakan benda-benda konkret dan gambar sampai dengan 20.',
                    tujuanList: [{
                        tujuan: 'Menyelesaikan soal penjumlahan bilangan 1 sampai 10.',
                        materi: 'Penjumlahan Bilangan',
                        kriteria: [
                            'Belum dapat melakukan operasi hitung penjumlahan meski dengan benda konkret.',
                            'Dapat menghitung penjumlahan dengan bantuan benda konkret.',
                            'Dapat menghitung penjumlahan dengan bantuan gambar atau garis bilangan.',
                            'Dapat menghitung penjumlahan bilangan 1-10 secara susun pendek tanpa bantuan alat.',
                            'Dapat menghitung penjumlahan secara mental (di luar kepala) dan menyelesaikan soal cerita sederhana.',
                            ''
                        ],
                        highlightIndex: 2
                    }]
                }]
            }
        },
        // --- KELAS 3 (FASE B) ---
        'kelas_3': {
            'Ilmu Pengetahuan Alam dan Sosial': {
                headers: ['Perlu Bimbingan', 'Cukup', 'Baik', 'Sangat Baik', 'Istimewa', ''],
                rows: [{
                    capaian: 'Peserta didik mengidentifikasi wujud zat (padat, cair, dan gas) dan mendemonstrasikan bagaimana perubahan wujud zat terjadi.',
                    tujuanList: [{
                        tujuan: 'Mengidentifikasi 3 wujud zat beserta contohnya di lingkungan sekitar.',
                        materi: 'Wujud Zat',
                        kriteria: [
                            'Hanya dapat menyebutkan 1 wujud zat dengan bimbingan.',
                            'Dapat menyebutkan 2-3 wujud zat, namun kesulitan memberi contoh.',
                            'Dapat menyebutkan 3 wujud zat dan memberikan masing-masing 1 contoh yang benar.',
                            'Dapat menyebutkan 3 wujud zat dan memberikan beberapa contoh untuk setiap wujud.',
                            'Dapat mengklasifikasikan benda-benda di sekitar berdasarkan wujud zatnya dengan tepat.',
                            ''
                        ],
                        highlightIndex: 3
                    }]
                }]
            },
            'Bahasa Inggris': {
                headers: ['Beginner', 'Elementary', 'Intermediate', 'Upper-Intermediate', 'Advanced', ''],
                rows: [{
                    capaian: 'Students can understand and respond to simple questions and instructions related to daily activities in the classroom.',
                    tujuanList: [{
                        tujuan: 'Memperkenalkan diri (menyebutkan nama dan umur) dalam Bahasa Inggris.',
                        materi: 'Introducing Oneself',
                        kriteria: [
                            'Membutuhkan contoh dan bimbingan penuh untuk mengucapkan "My name is...".',
                            'Dapat mengucapkan nama dan umur dengan lafal yang kurang jelas dan perlu perbaikan.',
                            'Dapat memperkenalkan diri dengan struktur kalimat yang benar, namun lafal masih terpengaruh bahasa ibu.',
                            'Dapat memperkenalkan diri dengan lancar, lafal jelas, dan intonasi yang wajar.',
                            'Dapat memperkenalkan diri dan mengajukan pertanyaan balik (e.g., "What is your name?") dengan percaya diri.',
                            ''
                        ],
                        highlightIndex: 2
                    }]
                }]
            },
            'Seni Rupa': {
                headers: ['Perlu Bimbingan', 'Cukup', 'Baik', 'Sangat Baik', 'Istimewa', ''],
                rows: [{
                    capaian: 'Peserta didik mampu mengidentifikasi dan menggunakan unsur-unsur rupa (garis, bentuk, warna) untuk menciptakan karya dekoratif.',
                    tujuanList: [{
                        tujuan: 'Menciptakan karya gambar dekoratif dengan kombinasi warna primer dan sekunder.',
                        materi: 'Gambar Dekoratif & Warna',
                        kriteria: [
                            'Belum mampu membedakan warna primer dan sekunder.',
                            'Mampu menggunakan warna primer, namun belum mencampurkan untuk menghasilkan warna sekunder.',
                            'Mampu menciptakan gambar dekoratif dengan beberapa kombinasi warna primer dan sekunder.',
                            'Mampu menciptakan gambar dekoratif yang harmonis dengan berbagai kombinasi warna.',
                            'Mampu menciptakan karya yang rapi, detail, dan menunjukkan eksperimen pencampuran warna yang kreatif.',
                            ''
                        ],
                        highlightIndex: 3
                    }]
                }]
            }
        },
        // --- KELAS 4 (FASE B) ---
        'kelas_4': {
            'Pendidikan Pancasila': {
                headers: ['Perlu Bimbingan', 'Cukup', 'Baik', 'Sangat Baik', 'Istimewa', ''],
                rows: [
                    { 
                        capaian: 'Mengidentifikasi makna sila-sila Pancasila, dan penerapannya dalam kehidupan sehari-hari; mengenal karakter para perumus Pancasila; menunjukkan sikap bangga menjadi anak Indonesia yang memiliki bahasa Indonesia sebagai bahasa persatuan di lingkungan sekitar.',
                        tujuanList: [
                            {
                                tujuan: 'Menjelaskan makna sila kedua Pancasila dan memberikan contoh penerapannya.',
                                materi: 'Makna dan Penerapan Sila Pancasila',
                                kriteria: [
                                    'Belum mampu menjelaskan makna sila kedua.',
                                    'Mampu menyebutkan bunyi sila kedua, namun belum bisa menjelaskan maknanya.',
                                    'Mampu menjelaskan makna sila kedua dengan bimbingan.',
                                    'Mampu menjelaskan makna sila kedua secara mandiri dan memberikan 1 contoh penerapan.',
                                    'Mampu menjelaskan makna sila kedua secara lancar dan memberikan beberapa contoh penerapan dalam kehidupan sehari-hari.',
                                    ''
                                ],
                                highlightIndex: 2
                            },
                            {
                                tujuan: 'Mengenal karakter dan peran Ir. Soekarno sebagai perumus Pancasila.',
                                materi: 'Tokoh Perumus Pancasila',
                                kriteria: [
                                    '0-50',
                                    '51-70',
                                    '71-80',
                                    '81-90',
                                    '91-100',
                                    ''
                                ],
                                highlightIndex: 3
                            }
                        ]
                    },
                    { 
                        capaian: 'Mengidentifikasi dan melaksanakan aturan di sekolah dan lingkungan tempat tinggal; mengidentifikasi dan menerapkan hak yang didapat dan kewajiban sebagai anggota keluarga dan sebagai warga sekolah.',
                        tujuanList: [
                            {
                                tujuan: 'Menyebutkan contoh hak dan kewajiban sebagai warga sekolah.',
                                materi: 'Hak dan Kewajiban di Sekolah',
                                kriteria: [
                                    'Belum dapat membedakan antara hak dan kewajiban.',
                                    'Dapat menyebutkan 1 contoh hak atau 1 contoh kewajiban dengan bimbingan.',
                                    'Dapat menyebutkan 1 contoh hak dan 1 contoh kewajiban secara mandiri.',
                                    'Dapat menyebutkan beberapa contoh hak dan kewajiban di sekolah dengan benar.',
                                    'Dapat menjelaskan perbedaan hak dan kewajiban serta melaksanakan kewajibannya dengan penuh tanggung jawab.',
                                    ''
                                ],
                                highlightIndex: 2
                            },
                            {
                                tujuan: 'Mengidentifikasi aturan yang berlaku di lingkungan tempat tinggal.',
                                materi: 'Aturan di Lingkungan Masyarakat',
                                kriteria: [
                                    'Tidak mengetahui adanya aturan di lingkungan tempat tinggal.',
                                    'Mengetahui 1 contoh aturan (misal: tamu wajib lapor) dengan diberi tahu.',
                                    'Dapat menyebutkan 1-2 contoh aturan di lingkungan tempat tinggal (misal: jam malam, kerja bakti).',
                                    'Dapat menyebutkan beberapa aturan dan menjelaskan tujuannya.',
                                    'Dapat menjelaskan pentingnya menaati aturan di lingkungan sekitar untuk menciptakan ketertiban.',
                                    ''
                                ],
                                highlightIndex: 3
                            }
                        ]
                    },
                    { 
                        capaian: 'Membedakan dan menghargai identitas, keluarga, dan teman-temannya sesuai budaya, suku bangsa, bahasa, agama dan kepercayaannya di lingkungan sekitar.',
                        tujuanList: [
                            {
                                tujuan: 'Mengidentifikasi keragaman suku bangsa teman-teman di kelas.',
                                materi: 'Keragaman Suku Bangsa',
                                kriteria: [
                                    'Belum menunjukkan sikap menghargai keragaman.',
                                    'Mengetahui ada teman yang berbeda suku, namun belum bisa menyebutkan asalnya.',
                                    'Dapat menyebutkan beberapa suku bangsa teman di kelasnya.',
                                    'Dapat menyebutkan beberapa suku bangsa dan salah satu ciri khasnya (misal: bahasa, pakaian adat).',
                                    'Dapat menceritakan keragaman suku bangsa di kelasnya dan menunjukkan sikap bangga serta menghargai.',
                                    ''
                                ],
                                highlightIndex: 3
                            },
                            {
                                tujuan: 'Menjelaskan cara menghargai teman yang berbeda agama.',
                                materi: 'Toleransi Beragama',
                                kriteria: [
                                    'Masih mengganggu teman yang sedang beribadah.',
                                    'Tidak mengganggu, tetapi belum memahami pentingnya menghargai.',
                                    'Dapat menyebutkan contoh cara menghargai teman yang berbeda agama.',
                                    'Mampu mempraktikkan sikap menghargai (tidak berisik, mempersilakan beribadah).',
                                    'Mampu menjelaskan pentingnya toleransi dan mengajak teman lain untuk saling menghargai.',
                                    ''
                                ],
                                highlightIndex: 2
                            }
                        ]
                    },
                    { 
                        capaian: 'Mengidentifikasi lingkungan tempat tinggal (RT, RW, desa atau kelurahan, dan kecamatan) sebagai bagian dari wilayah Negara Kesatuan Republik Indonesia; menunjukkan perilaku bekerja sama dalam berbagai bentuk keberagaman suku bangsa, sosial, dan budaya di Indonesia yang terikat persatuan dan kesatuan di lingkungan sekitar.',
                        tujuanList: [
                            {
                                tujuan: 'Menyebutkan nama desa/kelurahan dan kecamatan tempat tinggalnya.',
                                materi: 'Wilayah Tempat Tinggal',
                                kriteria: [
                                    'Tidak mengetahui nama desa/kelurahan tempat tinggalnya.',
                                    'Mengetahui nama desa/kelurahan, tetapi dengan bantuan.',
                                    'Dapat menyebutkan nama desa/kelurahan secara mandiri.',
                                    'Dapat menyebutkan nama desa/kelurahan dan kecamatan tempat tinggalnya.',
                                    'Dapat menyebutkan alamat lengkapnya dan mengetahui posisinya sebagai bagian dari NKRI.',
                                    ''
                                ],
                                highlightIndex: 2
                            },
                            {
                                tujuan: 'Memberikan contoh kegiatan kerja sama di lingkungan sekitar.',
                                materi: 'Kerja Sama dalam Keberagaman',
                                kriteria: [
                                    'Belum pernah mengikuti kegiatan kerja sama.',
                                    'Dapat menyebutkan 1 contoh kerja sama (misal: piket kelas) dengan bimbingan.',
                                    'Dapat menyebutkan 1-2 contoh kerja sama di sekolah atau di rumah.',
                                    'Dapat menyebutkan beberapa contoh kerja sama dan menjelaskan manfaatnya.',
                                    'Dapat menceritakan pengalamannya bekerja sama dalam keberagaman dan menjelaskan pentingnya persatuan.',
                                    ''
                                ],
                                highlightIndex: 2
                            }
                        ]
                    }
                ]
            },
            'Bahasa Indonesia': {
                headers: ['Perlu Bimbingan', 'Cukup', 'Baik', 'Sangat Baik', 'Istimewa', ''],
                rows: [
                    { 
                        capaian: 'Menyimak: Memahami ide pokok suatu informasi dari teks nonsastra berbentuk teks aural (teks yang dibacakan dan/atau didengarkan); dan memahami isi teks sastra berbentuk teks aural.',
                        tujuanList: [
                            {
                                tujuan: 'Menentukan ide pokok dari paragraf yang didengarkan.',
                                materi: 'Ide Pokok Paragraf',
                                kriteria: [
                                    'Belum mampu menemukan ide pokok meskipun dengan bimbingan.',
                                    'Mampu menemukan ide pokok dengan bimbingan penuh dari guru.',
                                    'Mampu menemukan ide pokok pada kalimat pertama atau terakhir paragraf sederhana.',
                                    'Mampu menemukan ide pokok dari paragraf yang dibacakan dengan benar.',
                                    'Mampu merangkum beberapa ide pokok menjadi sebuah ringkasan cerita.',
                                    ''
                                ],
                                highlightIndex: 2
                            },
                            {
                                tujuan: 'Menjawab pertanyaan sesuai isi dongeng yang didengarkan.',
                                materi: 'Isi Teks Sastra (Dongeng)',
                                kriteria: [
                                    'Tidak dapat menjawab pertanyaan apapun terkait dongeng.',
                                    'Mampu menjawab pertanyaan literal (siapa, di mana) dengan bantuan.',
                                    'Mampu menjawab pertanyaan literal secara mandiri.',
                                    'Mampu menjawab pertanyaan inferensial sederhana (mengapa, bagaimana).',
                                    'Mampu menyimpulkan sifat tokoh atau pesan moral dari dongeng yang didengar.',
                                    ''
                                ],
                                highlightIndex: 2
                            }
                        ]
                    },
                    { 
                        capaian: 'Membaca dan Memirsa: Membaca kata-kata baru dengan fasih dari bacaan dan/atau tayangan yang dipirsa; dan memahami ide pokok, ide pendukung, pesan, dan informasi dalam teks sastra dan nonsastra berbentuk cetak dan/atau elektronik.',
                        tujuanList: [
                            {
                                tujuan: 'Menemukan arti kata-kata baru dari dalam kamus.',
                                materi: 'Kosakata Baru',
                                kriteria: [
                                    'Belum mampu menggunakan kamus.',
                                    'Mampu menemukan kata dasar dengan bimbingan intensif.',
                                    'Mampu menemukan arti kata sederhana dengan sedikit bimbingan.',
                                    'Mampu menemukan arti kata baru secara mandiri menggunakan kamus.',
                                    'Mampu menemukan arti kata dan membuat kalimat baru menggunakan kata tersebut.',
                                    ''
                                ],
                                highlightIndex: 2
                            },
                            {
                                tujuan: 'Membedakan ide pokok dan ide pendukung dalam sebuah paragraf.',
                                materi: 'Ide Pokok dan Ide Pendukung',
                                kriteria: [
                                    'Belum memahami perbedaan ide pokok dan ide pendukung.',
                                    'Dapat menunjukkan ide pokok, tetapi belum bisa menunjukkan ide pendukung.',
                                    'Dapat menunjukkan ide pokok dan 1 ide pendukung dengan benar.',
                                    'Dapat menunjukkan ide pokok dan beberapa ide pendukung dengan benar.',
                                    'Dapat menjelaskan hubungan antara ide pokok dan ide-ide pendukung dalam paragraf.',
                                    ''
                                ],
                                highlightIndex: 2
                            }
                        ]
                    },
                    { 
                        capaian: 'Berbicara dan Mempresentasikan: Menyajikan pendapat dengan pilihan kata dan sikap tubuh/gestur yang sesuai, menggunakan volume dan intonasi yang tepat sesuai konteks; menanggapi diskusi sesuai tata cara; dan menceritakan kembali isi dan/atau informasi dari berbagai tipe teks yang dibaca, dipirsa, atau didengar.',
                        tujuanList: [
                            {
                                tujuan: 'Menceritakan kembali isi bacaan dengan bahasa sendiri.',
                                materi: 'Menceritakan Kembali',
                                kriteria: [
                                    'Tidak mau atau tidak bisa menceritakan kembali.',
                                    'Menceritakan kembali 1-2 kalimat dengan bimbingan penuh.',
                                    'Menceritakan kembali beberapa bagian penting secara acak.',
                                    'Menceritakan kembali isi bacaan secara runtut dengan kalimat sederhana.',
                                    'Mampu menceritakan kembali secara lengkap, runtut, dan dengan intonasi yang menarik.',
                                    ''
                                ],
                                highlightIndex: 2
                            },
                            {
                                tujuan: 'Memberikan pendapat sederhana tentang suatu masalah.',
                                materi: 'Menyajikan Pendapat',
                                kriteria: [
                                    'Selalu pasif dan tidak pernah berpendapat.',
                                    'Mengungkapkan pendapat (setuju/tidak setuju) jika ditunjuk.',
                                    'Memberikan pendapat singkat tanpa alasan.',
                                    'Memberikan pendapat beserta alasan yang logis dan sederhana.',
                                    'Aktif memberikan pendapat, menggunakan gestur yang sopan, dan menghargai pendapat teman.',
                                    ''
                                ],
                                highlightIndex: 2
                            }
                        ]
                    },
                    { 
                        capaian: 'Menulis: Menulis berbagai tipe teks sederhana dengan rangkaian kalimat yang beragam; dan menggunakan kaidah kebahasaan dan kosakata baru yang memiliki makna denotatif untuk menulis teks sesuai dengan konteks.',
                        tujuanList: [
                            {
                                tujuan: 'Menulis sebuah paragraf sederhana berdasarkan gambar.',
                                materi: 'Menulis Paragraf Deskripsi',
                                kriteria: [
                                    'Belum mampu menulis satu kalimat pun.',
                                    'Mampu menulis 1-2 kalimat lepas yang tidak saling berhubungan.',
                                    'Mampu menulis beberapa kalimat yang berhubungan dengan gambar.',
                                    'Mampu menulis sebuah paragraf pendek (3-4 kalimat) yang padu dan sesuai gambar.',
                                    'Mampu menulis paragraf yang terstruktur dengan baik, menggunakan kosakata beragam dan tanda baca yang tepat.',
                                    ''
                                ],
                                highlightIndex: 2
                            },
                            {
                                tujuan: 'Menggunakan huruf kapital dan tanda titik dengan benar dalam kalimat.',
                                materi: 'Kaidah Kebahasaan (Ejaan)',
                                kriteria: [
                                    'Belum menggunakan huruf kapital dan tanda titik.',
                                    'Menggunakan huruf kapital di awal kalimat, tetapi sering lupa tanda titik.',
                                    'Menggunakan huruf kapital dan tanda titik di akhir kalimat dengan benar.',
                                    'Mampu menggunakan huruf kapital untuk nama orang dan awal kalimat, serta tanda titik.',
                                    'Mampu menggunakan huruf kapital dan tanda baca (titik, koma) dengan sangat baik dan konsisten.',
                                    ''
                                ],
                                highlightIndex: 2
                            }
                        ]
                    }
                ]
            },
            'Matematika': {
                headers: ['Perlu Bimbingan', 'Cukup', 'Baik', 'Sangat Baik', 'Istimewa', ''],
                rows: [
                    { 
                        capaian: 'Bilangan: Memiliki pemahaman dan intuisi bilangan (number sense) pada bilangan cacah sampai 10.000; membaca, menulis, membandingkan, dan mengurutkan bilangan; menentukan dan menggunakan nilai tempat; melakukan komposisi dan dekomposisi bilangan cacah sampai 10.000. Murid dapat melakukan dan menyelesaikan masalah operasi bilangan penjumlahan dan pengurangan bilangan cacah sampai 1.000; melakukan dan menyelesaikan masalah operasi perkalian dan pembagian bilangan cacah sampai 100 dengan bantuan benda konkret, gambar dan simbol; mengenal kelipatan dan faktor. Murid dapat melakukan perbandingan dan pengurutan pecahan dengan pembilang satu dan antar pecahan dengan penyebut yang sama; mengenal dan dapat menerapkan pecahan senilai, memiliki intuisi pecahan dan desimal, serta dapat menentukan pecahan sebagai desimal dan persen.',
                        tujuanList: [
                            {
                                tujuan: 'Menentukan nilai tempat bilangan cacah sampai 10.000.',
                                materi: 'Nilai Tempat',
                                kriteria: [
                                    'Belum memahami konsep nilai tempat.',
                                    'Dapat menentukan nilai tempat satuan dan puluhan.',
                                    'Dapat menentukan nilai tempat sampai ratusan.',
                                    'Dapat menentukan nilai tempat sampai ribuan dengan benar.',
                                    'Dapat menguraikan sebuah bilangan berdasarkan nilai tempatnya (dekomposisi).',
                                    ''
                                ],
                                highlightIndex: 2
                            },
                            {
                                tujuan: 'Menyelesaikan soal pembagian bilangan cacah sampai 100.',
                                materi: 'Operasi Pembagian',
                                kriteria: [
                                    'Belum memahami konsep pembagian sebagai pengurangan berulang.',
                                    'Mampu menyelesaikan soal pembagian dengan bantuan benda konkret.',
                                    'Mampu menyelesaikan soal pembagian dengan cara pengurangan berulang.',
                                    'Mampu menyelesaikan soal pembagian dengan cara porogapit (susun ke bawah).',
                                    'Mampu menyelesaikan soal cerita yang berkaitan dengan pembagian secara tepat.',
                                    ''
                                ],
                                highlightIndex: 2
                            },
                            {
                                tujuan: 'Mengurutkan pecahan berpenyebut sama.',
                                materi: 'Pecahan',
                                kriteria: [
                                    'Belum mengenal konsep pecahan.',
                                    'Dapat membaca lambang pecahan, tetapi belum bisa membandingkan.',
                                    'Dapat membandingkan dua pecahan berpenyebut sama dengan bantuan gambar.',
                                    'Dapat mengurutkan 3-4 pecahan berpenyebut sama dari yang terkecil atau terbesar.',
                                    'Dapat mengurutkan pecahan berpenyebut sama dan meletakkannya pada garis bilangan.',
                                    ''
                                ],
                                highlightIndex: 2
                            }
                        ]
                    },
                    { 
                        capaian: 'Aljabar: Menemukan nilai yang tidak diketahui dalam kalimat matematika yang melibatkan penjumlahan dan pengurangan pada bilangan cacah sampai 100, dengan menggunakan sifat-sifat bilangan dan operasinya. Murid dapat mengidentifikasi, meniru, dan mengembangkan pola gambar atau objek sederhana dan pola bilangan membesar dan mengecil yang dapat melibatkan penjumlahan dan pengurangan pada bilangan cacah sampai 100.',
                        tujuanList: [
                            {
                                tujuan: 'Menemukan bilangan yang tidak diketahui dalam kalimat penjumlahan (contoh: 25 + n = 40).',
                                materi: 'Kalimat Matematika',
                                kriteria: [
                                    'Belum memahami konsep kalimat matematika terbuka.',
                                    'Mencoba-coba angka secara acak.',
                                    'Dapat menemukan bilangan dengan cara menghitung maju.',
                                    'Dapat menemukan bilangan dengan menggunakan operasi hitung invers (pengurangan).',
                                    'Dapat membuat sendiri kalimat matematika dan menyelesaikannya.',
                                    ''
                                ],
                                highlightIndex: 2
                            },
                            {
                                tujuan: 'Mengembangkan pola gambar atau objek sederhana.',
                                materi: 'Pola Gambar',
                                kriteria: [
                                    'Belum dapat mengenali pola gambar.',
                                    'Dapat meniru pola gambar yang ada.',
                                    'Dapat melanjutkan pola gambar untuk 1-2 urutan berikutnya.',
                                    'Dapat melanjutkan pola gambar yang lebih kompleks (misal: melibatkan 2 atribut seperti bentuk dan warna).',
                                    'Dapat menciptakan pola gambar sendiri dan menjelaskan aturannya kepada teman.',
                                    ''
                                ],
                                highlightIndex: 2
                            }
                        ]
                    },
                    { 
                        capaian: 'Pengukuran: Mengukur panjang dan berat benda menggunakan satuan baku; menentukan hubungan antar-satuan baku panjang (cm, m) dan antar-satuan berat (g, kg); serta mengukur dan mengestimasi luas dan volume menggunakan satuan tidak baku dan satuan baku berupa bilangan cacah.',
                        tujuanList: [
                            {
                                tujuan: 'Mengukur panjang benda menggunakan penggaris (satuan cm).',
                                materi: 'Mengukur Panjang',
                                kriteria: [
                                    'Belum bisa menggunakan penggaris.',
                                    'Memegang penggaris dengan benar tetapi memulai pengukuran tidak dari angka 0.',
                                    'Dapat mengukur panjang benda dengan meletakkan ujung benda di angka 0 dengan bimbingan.',
                                    'Dapat mengukur panjang benda dengan penggaris secara mandiri dan akurat.',
                                    'Dapat mengestimasi panjang benda terlebih dahulu sebelum mengukurnya.',
                                    ''
                                ],
                                highlightIndex: 2
                            },
                            {
                                tujuan: 'Mengestimasi luas permukaan benda menggunakan satuan tidak baku (misal: buku, ubin).',
                                materi: 'Mengukur Luas',
                                kriteria: [
                                    'Belum memahami konsep luas.',
                                    'Menutupi permukaan benda dengan satuan tidak baku secara tidak beraturan.',
                                    'Menutupi permukaan benda dengan rapi tetapi belum bisa menghitung jumlahnya.',
                                    'Dapat menutupi dan menghitung luas permukaan benda dengan satuan tidak baku.',
                                    'Dapat membandingkan luas dua benda menggunakan satuan tidak baku yang sama.',
                                    ''
                                ],
                                highlightIndex: 2
                            }
                        ]
                    },
                    { 
                        capaian: 'Geometri: Mendeskripsikan ciri berbagai bentuk bangun datar (segiempat, segitiga, segi banyak); menyusun (komposisi) dan mengurai (dekomposisi) berbagai bangun datar dengan lebih dari satu cara jika memungkinkan.',
                        tujuanList: [
                            {
                                tujuan: 'Menyebutkan ciri-ciri bangun datar segitiga.',
                                materi: 'Ciri-ciri Bangun Datar',
                                kriteria: [
                                    'Belum mengenal bangun segitiga.',
                                    'Dapat menunjuk bangun segitiga di antara bangun lainnya.',
                                    'Dapat menyebutkan bahwa segitiga memiliki 3 sisi.',
                                    'Dapat menyebutkan ciri-cirinya (3 sisi, 3 sudut).',
                                    'Dapat membedakan jenis segitiga berdasarkan panjang sisinya (sama sisi, sama kaki, sembarang).',
                                    ''
                                ],
                                highlightIndex: 2
                            },
                            {
                                tujuan: 'Menyusun sebuah bangun datar baru dari beberapa potongan bangun datar (komposisi).',
                                materi: 'Komposisi Bangun Datar',
                                kriteria: [
                                    'Belum bisa menyusun potongan bangun datar.',
                                    'Dapat menyusun 2 potongan segitiga menjadi persegi dengan bimbingan.',
                                    'Dapat menyusun beberapa potongan bangun datar secara mandiri menjadi bentuk yang tidak beraturan.',
                                    'Dapat menyusun beberapa potongan bangun datar menjadi sebuah bentuk baru yang bermakna (misal: rumah, roket).',
                                    'Dapat merancang dan membuat sebuah gambar utuh dari berbagai potongan bangun datar (tagram).',
                                    ''
                                ],
                                highlightIndex: 2
                            }
                        ]
                    },
                    { 
                        capaian: 'Analisis Data dan Peluang: Mengurutkan, membandingkan, menyajikan, menganalisis dan menginterpretasi data dalam bentuk tabel, diagram gambar, piktogram, dan diagram batang (skala satu satuan).',
                        tujuanList: [
                            {
                                tujuan: 'Menyajikan data dalam bentuk tabel.',
                                materi: 'Menyajikan Data (Tabel)',
                                kriteria: [
                                    'Belum bisa mengelompokkan data.',
                                    'Dapat mengelompokkan data dengan bimbingan (misal: buah apel, buah jeruk).',
                                    'Dapat menghitung (turus/tally) jumlah setiap kelompok data.',
                                    'Dapat menyajikan data dalam tabel sederhana dengan benar.',
                                    'Dapat membuat tabel dari data acak dan memberinya judul yang sesuai.',
                                    ''
                                ],
                                highlightIndex: 2
                            },
                            {
                                tujuan: 'Menentukan data terbanyak dan paling sedikit dari sebuah piktogram.',
                                materi: 'Membaca Piktogram',
                                kriteria: [
                                    'Belum memahami cara membaca piktogram.',
                                    'Memahami bahwa gambar mewakili jumlah, tetapi salah menghitung.',
                                    'Dapat menghitung jumlah data dari piktogram dengan benar.',
                                    'Dapat menentukan data yang paling banyak dan paling sedikit.',
                                    'Dapat mengurutkan data dari yang paling sedikit hingga paling banyak berdasarkan piktogram.',
                                    ''
                                ],
                                highlightIndex: 2
                            }
                        ]
                    }
                ]
            },
            'Ilmu Pengetahuan Alam dan Sosial': {
                headers: ['Perlu Bimbingan', 'Cukup', 'Baik', 'Sangat Baik', 'Istimewa', ''],
                rows: [
                    { 
                        capaian: 'Menjelaskan bentuk dan fungsi pancaindra; menganalisis siklus hidup makhluk hidup dan upaya pelestariannya; menghasilkan solusi untuk masalah yang berkaitan dengan pelestarian sumber daya alam sebagai upaya mitigasi perubahan iklim; menyimpulkan proses perubahan wujud zat; menjelaskan sumber dan bentuk energi, serta proses perubahan bentuk energi dalam kehidupan sehari-hari; membedakan jenis gaya dan pengaruhnya terhadap arah, gerak, dan bentuk benda; menjelaskan peran, tugas, dan tanggung jawab serta interaksi sosial yang terjadi di sekitar tempat tinggal dan sekolah; mengenali letak kabupaten/kota dan provinsi tempat tinggalnya dengan menggunakan peta konvensional/digital; mengklasifikasikan ragam bentang alam dan keterkaitannya dengan profesi masyarakat, ragam budaya melestarikannya; serta upaya menganalisis untuk sejarah masyarakat di lingkungan tempat tinggal; menjelaskan nilai mata uang dan fungsinya, serta cara mengelola keuangan secara bijak.',
                        tujuanList: [
                            {
                                tujuan: 'Menganalisis siklus hidup kupu-kupu.',
                                materi: 'Siklus Hidup Makhluk Hidup',
                                kriteria: [
                                    'Belum mengenal siklus hidup.',
                                    'Dapat menyebutkan 1-2 tahapan siklus hidup kupu-kupu secara acak.',
                                    'Dapat menyebutkan 3-4 tahapan siklus hidup kupu-kupu secara urut dengan bimbingan.',
                                    'Dapat mengurutkan dan menjelaskan setiap tahapan siklus hidup kupu-kupu.',
                                    'Dapat membandingkan siklus hidup kupu-kupu dengan hewan lain.',
                                    ''
                                ],
                                highlightIndex: 2
                            },
                            {
                                tujuan: 'Memberikan contoh perubahan bentuk energi dalam kehidupan sehari-hari.',
                                materi: 'Perubahan Bentuk Energi',
                                kriteria: [
                                    'Belum memahami bahwa energi dapat berubah bentuk.',
                                    'Dapat menyebutkan 1 contoh perubahan energi dengan bantuan (misal: kipas angin).',
                                    'Dapat menyebutkan 1-2 contoh perubahan bentuk energi secara mandiri.',
                                    'Dapat menjelaskan perubahan energi yang terjadi pada beberapa alat elektronik (misal: dari listrik ke gerak, cahaya, atau panas).',
                                    'Dapat membuat bagan sederhana tentang perubahan bentuk energi pada sebuah alat.',
                                    ''
                                ],
                                highlightIndex: 2
                            },
                            {
                                tujuan: 'Mengidentifikasi profesi masyarakat berdasarkan bentang alam tempat tinggalnya.',
                                materi: 'Bentang Alam dan Profesi',
                                kriteria: [
                                    'Belum bisa mengaitkan profesi dengan bentang alam.',
                                    'Dapat menyebutkan 1 profesi di daerah pantai (nelayan) dengan bimbingan.',
                                    'Dapat menyebutkan beberapa profesi di daerah pantai atau pegunungan.',
                                    'Dapat membedakan profesi yang khas di daerah pantai dan pegunungan.',
                                    'Dapat menjelaskan alasan mengapa suatu profesi banyak ditemukan di bentang alam tertentu.',
                                    ''
                                ],
                                highlightIndex: 2
                            }
                        ]
                    }
                ]
            }
        },
        // --- KELAS 5 (FASE C) ---
        'kelas_5': {
            'Matematika': {
                headers: ['Prastruktural', 'Dasar', 'Cakap', 'Mahir', 'Sangat Mahir', ''],
                rows: [{
                    capaian: 'Peserta didik dapat menunjukkan pemahaman mengenai pecahan dan melakukan operasi penjumlahan dan pengurangan antar pecahan dengan penyebut yang berbeda.',
                    tujuanList: [{
                        tujuan: 'Menyelesaikan operasi penjumlahan dua pecahan biasa beda penyebut.',
                        materi: 'Penjumlahan Pecahan',
                        kriteria: [
                            'Belum memahami konsep pecahan dan tidak dapat memulai pengerjaan.',
                            'Memahami konsep pecahan namun belum dapat menyamakan penyebut.',
                            'Dapat menyamakan penyebut dengan mencari KPK, namun sering melakukan kesalahan hitung.',
                            'Dapat menyelesaikan soal penjumlahan pecahan beda penyebut dengan benar dan sistematis.',
                            'Dapat menyelesaikan soal cerita kompleks yang melibatkan penjumlahan pecahan beda penyebut.',
                            ''
                        ],
                        highlightIndex: 2
                    }]
                }]
            },
            'Bahasa Indonesia': {
                headers: ['Prastruktural', 'Dasar', 'Cakap', 'Mahir', 'Sangat Mahir', ''],
                rows: [{
                    capaian: 'Peserta didik mampu menulis teks eksplanasi, melaporkan hasil pengamatan, dan menyajikan informasi menggunakan kosa kata yang efektif dan struktur kalimat yang tepat.',
                    tujuanList: [{
                        tujuan: 'Menulis teks eksplanasi sederhana berdasarkan urutan sebab-akibat.',
                        materi: 'Teks Eksplanasi',
                        kriteria: [
                            'Belum mampu menulis kalimat yang padu.',
                            'Mampu menulis beberapa kalimat, namun belum menunjukkan struktur sebab-akibat.',
                            'Mampu menulis teks dengan struktur awal (pernyataan umum, deretan penjelas) namun belum lengkap.',
                            'Mampu menulis teks eksplanasi dengan struktur yang lengkap dan penggunaan konjungsi kausalitas yang tepat.',
                            'Mampu menulis teks eksplanasi yang informatif, terstruktur, dan menggunakan kosa kata teknis yang relevan.',
                            ''
                        ],
                        highlightIndex: 3
                    }]
                }]
            },
            'Ilmu Pengetahuan Alam dan Sosial': {
                headers: ['Prastruktural', 'Dasar', 'Cakap', 'Mahir', 'Sangat Mahir', ''],
                rows: [
                    {
                        capaian: 'Peserta didik dapat mendeskripsikan cara kerja organ pernapasan manusia dan mengaitkannya dengan pentingnya menjaga kesehatan organ pernapasan.',
                        tujuanList: [{
                            tujuan: 'Mengurutkan alur pernapasan pada manusia dari hidung hingga paru-paru.',
                            materi: 'Sistem Pernapasan Manusia',
                            kriteria: [
                                'Tidak dapat menyebutkan organ pernapasan utama.',
                                'Dapat menyebutkan beberapa organ pernapasan secara acak.',
                                'Dapat menyebutkan organ-organ pernapasan utama namun urutannya belum tepat.',
                                'Dapat mengurutkan alur pernapasan (hidung, faring, laring, trakea, bronkus, paru-paru) dengan benar.',
                                'Dapat mengurutkan dan menjelaskan fungsi dari setiap organ dalam alur pernapasan.',
                                ''
                            ],
                            highlightIndex: 2
                        }]
                    },
                    {
                        capaian: 'Peserta didik mendeskripsikan hubungan antarmakhluk hidup dalam suatu ekosistem (rantai makanan) dan mengaitkannya dengan pentingnya menjaga keseimbangan ekosistem.',
                        tujuanList: [
                            {
                                tujuan: 'Mengidentifikasi peran produsen, konsumen, dan pengurai dalam sebuah rantai makanan.',
                                materi: 'Komponen Rantai Makanan',
                                kriteria: [
                                    'Belum dapat membedakan antara produsen dan konsumen.',
                                    'Dapat memberikan 1 contoh produsen dan 1 contoh konsumen.',
                                    'Dapat mengidentifikasi peran produsen, konsumen, dan pengurai dengan benar.',
                                    'Dapat mengklasifikasikan beberapa makhluk hidup ke dalam peran yang sesuai dalam ekosistem.',
                                    'Dapat menjelaskan perbedaan antara konsumen tingkat I, II, dan seterusnya.',
                                    ''
                                ],
                                highlightIndex: 2
                            },
                            {
                                tujuan: 'Membuat bagan rantai makanan sederhana yang terjadi di ekosistem tertentu (misal: sawah).',
                                materi: 'Bagan Rantai Makanan',
                                kriteria: [
                                    'Belum mampu menggambarkan hubungan makan dan dimakan.',
                                    'Mampu menggambar makhluk hidupnya, namun arah panah (aliran energi) masih salah.',
                                    'Mampu membuat bagan rantai makanan sederhana (3 komponen) dengan arah panah yang benar.',
                                    'Mampu membuat bagan rantai makanan yang lebih kompleks (minimal 4 komponen) dengan benar.',
                                    'Mampu membuat beberapa contoh rantai makanan yang mungkin terjadi dalam satu ekosistem (jaring-jaring makanan).',
                                    ''
                                ],
                                highlightIndex: 2
                            },
                            {
                                tujuan: 'Memprediksi dampak yang terjadi jika salah satu komponen dalam rantai makanan tersebut punah.',
                                materi: 'Keseimbangan Ekosistem',
                                kriteria: [
                                    'Belum dapat menjelaskan dampak apapun yang terjadi.',
                                    'Dapat menjelaskan dampak secara langsung (misal: "ular akan kelaparan jika tikus hilang").',
                                    'Dapat menjelaskan dampak langsung terhadap komponen di atas dan di bawahnya.',
                                    'Dapat menjelaskan dampak tidak langsung yang mungkin terjadi pada komponen lain dalam rantai makanan.',
                                    'Dapat menjelaskan dampak berantai (cascading effect) terhadap keseimbangan seluruh ekosistem.',
                                    ''
                                ],
                                highlightIndex: 2
                            }
                        ]
                    }
                ]
            }
        },
    };
    // ===================================================================================

    const getDefaultData = () => ({
        info: {
            namaSekolah: 'SDN Lubang Buaya 01', kelas: '4', fase: 'B', tahunAjaran: '2025/2026', phone: '628131051985',
            namaKepsek: 'Dr. Bangbin, EdD', nipKepsek: '123456789', namaGuru: 'Bintang Adhi Permana', nipGuru: '6281310051985'
        },
        pelajaran: [
            'Pendidikan Agama Islam dan Budi Pekerti', 'Pendidikan Pancasila', 'Bahasa Indonesia', 'Matematika',
            'Ilmu Pengetahuan Alam dan Sosial', 'Seni dan Budaya', 
			'Pendidikan Jasmani Olahraga dan Kesehatan',
			'Pendidikan Lingkungan dan Budaya Jakarta', 'Bahasa Inggris', 'Koding dan Kecerdasan Artifisaial'
        ],
        kriteria: {}
    });

    const getData = () => {
        let data = localStorage.getItem(DB_KEY);
        if (!data) {
            data = getDefaultData();
            data.pelajaran.forEach(p => { data.kriteria[p] = {}; });
            simpanData(data);
            return data;
        }
        return JSON.parse(data);
    };

    const simpanData = (data) => {
        localStorage.setItem(DB_KEY, JSON.stringify(data));
    };
    
    const getDefaultCurriculumData = (kelas, namaPelajaran) => {
        const kelasKey = `kelas_${kelas}`;
        if (defaultCurriculum[kelasKey] && defaultCurriculum[kelasKey][namaPelajaran]) {
            return defaultCurriculum[kelasKey][namaPelajaran];
        }
        return null;
    };

    const backup = (showModalCallback) => {
        try {
            const data = localStorage.getItem(DB_KEY);
            if (!data) {
                showModalCallback('Tidak ada data untuk di-backup.', false);
                return;
            }
            const blob = new Blob([data], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            const tanggal = new Date().toISOString().slice(0, 10);
            a.download = `backup-kriteria-${tanggal}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            showModalCallback('Backup berhasil diunduh!');
        } catch (error) {
            showModalCallback('Terjadi kesalahan saat backup.', false);
            console.error("Kesalahan Backup:", error);
        }
    };

    const restore = (file, showModalCallback) => {
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const restoredData = JSON.parse(event.target.result);
                if (restoredData.info && restoredData.pelajaran && restoredData.kriteria) {
                    localStorage.setItem(DB_KEY, event.target.result);
                    showModalCallback('Data berhasil di-restore! Halaman akan dimuat ulang.');
                    setTimeout(() => window.location.reload(), 1500);
                } else {
                    showModalCallback('File backup tidak valid.', false);
                }
            } catch (error) {
                showModalCallback('Gagal membaca file backup.', false);
                console.error("Kesalahan Restore:", error);
            }
        };
        reader.readAsText(file);
    };

    const resetAllData = (showModalCallback) => {
        try {
            localStorage.removeItem(DB_KEY);
            showModalCallback('Semua data berhasil direset! Halaman akan dimuat ulang.');
            setTimeout(() => window.location.reload(), 1500);
        } catch (error) {
            showModalCallback('Gagal mereset data.', false);
            console.error("Kesalahan Reset Semua Data:", error);
        }
    };

    const resetPelajaranData = (namaPelajaran, kelas) => {
        const data = getData();
        const kelasKey = `kelas_${kelas}`;

        if (data.kriteria[namaPelajaran] && data.kriteria[namaPelajaran][kelasKey]) {
            delete data.kriteria[namaPelajaran][kelasKey];
            simpanData(data);
            return true;
        }
        return false;
    };

    return {
        getData,
        simpanData,
        getDefaultCurriculumData,
        backup,
        restore,
        resetAllData,
        resetPelajaranData
    };
})();
