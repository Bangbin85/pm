const Database = (() => {
    // Kunci unik untuk data aplikasi di localStorage
    const DB_KEY = 'dataPembelajaran';


    const defaultCurriculum = {
        // --- KELAS 1 (FASE A) --- (DIPERBARUI DENGAN TUJUAN PEMBELAJARAN)
        'kelas_1': {
            'Pendidikan Pancasila': {
                headers: ['Belum Terlihat', 'Mulai Terlihat', 'Berkembang', 'Sesuai Harapan', 'Sangat Berkembang', ''],
                rows: [{
                    capaian: 'Pancasila\nMengenal bendera negara, lagu kebangsaan, simbol dan sila-sila Pancasila dalam lambang negara Garuda Pancasila dan simbol Pancasila beserta sila-sila Pancasila; menerapkan nilai-nilai Pancasila di lingkungan keluarga.',
                    tujuanList: [{
                        tujuan: 'Menyebutkan 5 simbol sila Pancasila.',
                        materi: 'Simbol Sila Pancasila',
                        kriteria: ['0-50', '51-70', '71-80', '81-90', '91-100', ''],
                        highlightIndex: 3
                    }, {
                        tujuan: 'Memasangkan simbol dengan bunyi sila Pancasila yang sesuai.',
                        materi: 'Simbol dan Bunyi Sila',
                        kriteria: ['0-50', '51-70', '71-80', '81-90', '91-100', ''],
                        highlightIndex: 3
                    }]
                }, {
                    capaian: 'UUD Negara Republik Indonesia Tahun 1945\nMengenal aturan di lingkungan keluarga; menunjukkan dan menceritakan mematuhi aturan di lingkungan keluarga.',
                    tujuanList: [{
                        tujuan: 'Memberikan contoh aturan yang ada di rumah.',
                        materi: 'Aturan di Rumah',
                        kriteria: ['0-50', '51-70', '71-80', '81-90', '91-100', ''],
                        highlightIndex: 3
                    }, {
                        tujuan: 'Menjelaskan akibat jika tidak mematuhi aturan di rumah.',
                        materi: 'Konsekuensi Aturan',
                        kriteria: ['0-50', '51-70', '71-80', '81-90', '91-100', ''],
                        highlightIndex: 3
                    }]
                }, {
                    capaian: 'Bhinneka Tunggal Ika\nMengenal semboyan Bhinneka Tunggal Ika; mengidentifikasi dan menghargai identitas dirinya sesuai dengan jenis kelamin, hobi, bahasa, serta agama dan kepercayaan di lingkungan sekitar.',
                    tujuanList: [{
                        tujuan: 'Menjelaskan arti semboyan Bhinneka Tunggal Ika.',
                        materi: 'Semboyan Negara',
                        kriteria: ['0-50', '51-70', '71-80', '81-90', '91-100', ''],
                        highlightIndex: 3
                    }, {
                        tujuan: 'Menyebutkan contoh keragaman teman di kelas (misal: agama, hobi).',
                        materi: 'Keragaman Teman',
                        kriteria: ['0-50', '51-70', '71-80', '81-90', '91-100', ''],
                        highlightIndex: 3
                    }]
                }, {
                    capaian: 'Negara Kesatuan Republik Indonesia\nMengenal lingkungan tempat tinggal (RT, RW, desa atau kelurahan, dan kecamatan) sebagai bagian dari wilayah Negara Kesatuan Republik Indonesia; menunjukkan perilaku bekerja sama di lingkungan sekitar.',
                    tujuanList: [{
                        tujuan: 'Menyebutkan nama RT dan RW di lingkungan tempat tinggalnya.',
                        materi: 'Lingkungan Sekitar',
                        kriteria: ['0-50', '51-70', '71-80', '81-90', '91-100', ''],
                        highlightIndex: 3
                    }, {
                        tujuan: 'Memberikan contoh kegiatan kerja bakti di lingkungan rumah.',
                        materi: 'Kerja Sama',
                        kriteria: ['0-50', '51-70', '71-80', '81-90', '91-100', ''],
                        highlightIndex: 3
                    }]
                }]
            },
            'Bahasa Indonesia': {
                headers: ['Belum Terlihat', 'Mulai Terlihat', 'Berkembang', 'Sesuai Harapan', 'Sangat Berkembang', ''],
                rows: [{
                    capaian: 'Menyimak\nMemahami ide pokok suatu informasi dari teks nonsastra berbentuk teks aural (teks yang dibacakan dan/atau didengarkan); dan memahami isi teks sastra berbentuk teks aural.',
                    tujuanList: [{
                        tujuan: 'Menjawab pertanyaan sederhana (apa, siapa, di mana) berdasarkan teks yang didengarkan.',
                        materi: 'Informasi dari Teks Lisan',
                        kriteria: ['0-50', '51-70', '71-80', '81-90', '91-100', ''],
                        highlightIndex: 3
                    }, {
                        tujuan: 'Menyebutkan kembali tokoh utama dalam cerita yang didengarkan.',
                        materi: 'Identifikasi Tokoh',
                        kriteria: ['0-50', '51-70', '71-80', '81-90', '91-100', ''],
                        highlightIndex: 3
                    }]
                }, {
                    capaian: 'Membaca dan Memirsa\nMembaca kata-kata baru dengan fasih dari bacaan dan/atau tayangan yang dipirsa; dan memahami ide pokok, ide pendukung, pesan, dan informasi dalam teks sastra dan nonsastra berbentuk cetak dan/atau elektronik.',
                    tujuanList: [{
                        tujuan: 'Membaca suku kata dan kata sederhana dengan lancar.',
                        materi: 'Membaca Lancar',
                        kriteria: ['0-50', '51-70', '71-80', '81-90', '91-100', ''],
                        highlightIndex: 3
                    }, {
                        tujuan: 'Menemukan informasi penting dari sebuah gambar atau tayangan video pendek.',
                        materi: 'Pemahaman Visual',
                        kriteria: ['0-50', '51-70', '71-80', '81-90', '91-100', ''],
                        highlightIndex: 3
                    }]
                }, {
                    capaian: 'Berbicara dan Mempresentasikan\nMenyajikan pendapat dengan pilihan kata dan sikap tubuh/gestur yang sesuai, menggunakan volume dan intonasi yang tepat sesuai konteks; menanggapi diskusi sesuai tata cara; dan menceritakan kembali isi dan/atau informasi dari berbagai tipe teks yang dibaca, dipirsa, atau didengar.',
                    tujuanList: [{
                        tujuan: 'Memperkenalkan diri dengan menyebutkan nama lengkap dan panggilan.',
                        materi: 'Perkenalan Diri',
                        kriteria: ['0-50', '51-70', '71-80', '81-90', '91-100', ''],
                        highlightIndex: 3
                    }, {
                        tujuan: 'Bertanya tentang sesuatu menggunakan kata tanya "apa".',
                        materi: 'Kalimat Tanya',
                        kriteria: ['0-50', '51-70', '71-80', '81-90', '91-100', ''],
                        highlightIndex: 3
                    }]
                }, {
                    capaian: 'Menulis\nMenulis berbagai tipe teks sederhana dengan rangkaian kalimat yang beragam; dan menggunakan kaidah kebahasaan dan kosakata baru yang memiliki makna denotatif untuk menulis teks sesuai dengan konteks.',
                    tujuanList: [{
                        tujuan: 'Menulis namanya sendiri dengan benar.',
                        materi: 'Menulis Nama',
                        kriteria: ['0-50', '51-70', '71-80', '81-90', '91-100', ''],
                        highlightIndex: 3
                    }, {
                        tujuan: 'Menyalin kalimat sederhana dengan rapi.',
                        materi: 'Menulis Rapi',
                        kriteria: ['0-50', '51-70', '71-80', '81-90', '91-100', ''],
                        highlightIndex: 3
                    }]
                }]
            },
            'Matematika': {
                headers: ['Belum Terlihat', 'Mulai Terlihat', 'Berkembang', 'Sesuai Harapan', 'Sangat Berkembang', ''],
                rows: [{
                    capaian: 'Bilangan\nMemiliki pemahaman dan intuisi bilangan (number sense) pada bilangan cacah sampai 100; membaca, menulis, membandingkan, dan mengurutkan bilangan; menentukan dan menggunakan nilai tempat; melakukan komposisi dan dekomposisi bilangan cacah sampai 100.\nMelakukan dan menyelesaikan masalah operasi bilangan penjumlahan dan pengurangan bilangan cacah sampai 20 menggunakan benda-benda konkret dan gambar.',
                    tujuanList: [{
                        tujuan: 'Membaca dan menulis bilangan cacah sampai dengan 100',
                        materi: 'Membaca dan menulis bilangan cacah',
                        kriteria: ['0-50', '51-70', '71-80', '81-90', '91-100', ''],
                        highlightIndex: 3
                    }, {
                        tujuan: 'Menyelesaikan soal penjumlahan dan pengurangan sampai dengan 20.',
                        materi: 'Penjumlahan dan Pengurangan',
                        kriteria: ['0-50', '51-70', '71-80', '81-90', '91-100', ''],
                        highlightIndex: 3
                    }]
                }, {
                    capaian: 'Pengukuran\nMengukur, membandingkan, dan mengurutkan panjang, berat, dan durasi waktu menggunakan satuan tidak baku.',
                    tujuanList: [{
                        tujuan: 'Membandingkan panjang benda menggunakan istilah "lebih panjang" dan "lebih pendek".',
                        materi: 'Perbandingan Panjang',
                        kriteria: ['0-50', '51-70', '71-80', '81-90', '91-100', ''],
                        highlightIndex: 3
                    }, {
                        tujuan: 'Mengurutkan benda dari yang paling ringan ke paling berat.',
                        materi: 'Perbandingan Berat',
                        kriteria: ['0-50', '51-70', '71-80', '81-90', '91-100', ''],
                        highlightIndex: 3
                    }]
                }, {
                    capaian: 'Geometri\nMengenal dan mendeskripsikan ciri-ciri berbagai bentuk bangun datar (segiempat, segitiga, segienam, dan lingkaran); dan menyusun pengubinan dari berbagai bentuk bangun datar.',
                    tujuanList: [{
                        tujuan: 'Menyebutkan nama-nama bangun datar (persegi, segitiga, lingkaran).',
                        materi: 'Bangun Datar',
                        kriteria: ['0-50', '51-70', '71-80', '81-90', '91-100', ''],
                        highlightIndex: 3
                    }, {
                        tujuan: 'Mengelompokkan benda berdasarkan bentuk bangun datarnya.',
                        materi: 'Klasifikasi Bangun Datar',
                        kriteria: ['0-50', '51-70', '71-80', '81-90', '91-100', ''],
                        highlightIndex: 3
                    }]
                }, {
                    capaian: 'Analisis Data dan Peluang\nMengurutkan, membandingkan, dan menyajikan data dari banyak benda dengan menggunakan turus dan piktogram.',
                    tujuanList: [{
                        tujuan: 'Membaca data sederhana dalam bentuk gambar (piktogram).',
                        materi: 'Membaca Piktogram',
                        kriteria: ['0-50', '51-70', '71-80', '81-90', '91-100', ''],
                        highlightIndex: 3
                    }, {
                        tujuan: 'Membuat turus berdasarkan jumlah benda.',
                        materi: 'Menggunakan Turus',
                        kriteria: ['0-50', '51-70', '71-80', '81-90', '91-100', ''],
                        highlightIndex: 3
                    }]
                }]
            }
        },
        // --- KELAS 2 (FASE A) --- (DIPERBARUI DENGAN TUJUAN PEMBELAJARAN)
        'kelas_2': {
            'Pendidikan Pancasila': {
                headers: ['Belum Terlihat', 'Mulai Terlihat', 'Berkembang', 'Sesuai Harapan', 'Sangat Berkembang', ''],
                rows: [{
                    capaian: 'Pancasila\nMenjelaskan makna sila-sila Pancasila dan menceritakan contoh penerapan sila Pancasila di lingkungan keluarga dan sekolah.',
                    tujuanList: [{
                        tujuan: 'Menjelaskan makna simbol sila pertama Pancasila.',
                        materi: 'Makna Sila Pancasila',
                        kriteria: ['0-50', '51-70', '71-80', '81-90', '91-100', ''],
                        highlightIndex: 3
                    }, {
                        tujuan: 'Memberikan contoh penerapan sila kedua Pancasila di sekolah.',
                        materi: 'Penerapan Sila Pancasila',
                        kriteria: ['0-50', '51-70', '71-80', '81-90', '91-100', ''],
                        highlightIndex: 3
                    }]
                }, {
                    capaian: 'UUD Negara Republik Indonesia Tahun 1945\nMengidentifikasi aturan di lingkungan keluarga dan sekolah; menceritakan contoh sikap mematuhi dan tidak mematuhi aturan di lingkungan keluarga dan sekolah.',
                    tujuanList: [{
                        tujuan: 'Mengidentifikasi aturan yang berlaku di sekolah.',
                        materi: 'Aturan di Sekolah',
                        kriteria: ['0-50', '51-70', '71-80', '81-90', '91-100', ''],
                        highlightIndex: 3
                    }, {
                        tujuan: 'Membedakan contoh sikap yang mematuhi dan tidak mematuhi aturan.',
                        materi: 'Sikap Terhadap Aturan',
                        kriteria: ['0-50', '51-70', '71-80', '81-90', '91-100', ''],
                        highlightIndex: 3
                    }]
                }, {
                    capaian: 'Bhinneka Tunggal Ika\nMemberikan contoh dan menceritakan perilaku yang menghargai keberagaman suku bangsa, sosial, dan budaya di lingkungan sekitar.',
                    tujuanList: [{
                        tujuan: 'Menyebutkan keragaman suku bangsa teman di kelas.',
                        materi: 'Keragaman Suku Bangsa',
                        kriteria: ['0-50', '51-70', '71-80', '81-90', '91-100', ''],
                        highlightIndex: 3
                    }, {
                        tujuan: 'Menceritakan contoh sikap menghargai teman yang berbeda budaya.',
                        materi: 'Sikap Menghargai Keragaman',
                        kriteria: ['0-50', '51-70', '71-80', '81-90', '91-100', ''],
                        highlightIndex: 3
                    }]
                }, {
                    capaian: 'Negara Kesatuan Republik Indonesia\nMenyebutkan contoh perilaku bekerja sama dalam keberagaman di lingkungan sekitar.',
                    tujuanList: [{
                        tujuan: 'Memberikan contoh kerja sama yang dilakukan di sekolah.',
                        materi: 'Kerja Sama di Sekolah',
                        kriteria: ['0-50', '51-70', '71-80', '81-90', '91-100', ''],
                        highlightIndex: 3
                    }, {
                        tujuan: 'Menjelaskan manfaat dari kegiatan kerja sama.',
                        materi: 'Manfaat Kerja Sama',
                        kriteria: ['0-50', '51-70', '71-80', '81-90', '91-100', ''],
                        highlightIndex: 3
                    }]
                }]
            },
            'Bahasa Indonesia': {
                headers: ['Belum Terlihat', 'Mulai Terlihat', 'Berkembang', 'Sesuai Harapan', 'Sangat Berkembang', ''],
                rows: [{
                    capaian: 'Menyimak\nMemahami ide pokok suatu informasi dari teks nonsastra berbentuk teks aural (teks yang dibacakan dan/atau didengarkan); dan memahami isi teks sastra berbentuk teks aural.',
                    tujuanList: [{
                        tujuan: 'Menyebutkan tokoh-tokoh dalam cerita yang didengarkan.',
                        materi: 'Tokoh Cerita',
                        kriteria: ['0-50', '51-70', '71-80', '81-90', '91-100', ''],
                        highlightIndex: 3
                    }, {
                        tujuan: 'Menemukan ide pokok pada paragraf sederhana yang didengarkan.',
                        materi: 'Ide Pokok Lisan',
                        kriteria: ['0-50', '51-70', '71-80', '81-90', '91-100', ''],
                        highlightIndex: 3
                    }]
                }, {
                    capaian: 'Membaca dan Memirsa\nMembaca kata-kata baru dengan fasih dari bacaan dan/atau tayangan yang dipirsa; dan memahami ide pokok, ide pendukung, pesan, dan informasi dalam teks sastra dan nonsastra berbentuk cetak dan/atau elektronik.',
                    tujuanList: [{
                        tujuan: 'Menjelaskan makna dari kata baru yang ditemukan dalam bacaan.',
                        materi: 'Kosakata Baru',
                        kriteria: ['0-50', '51-70', '71-80', '81-90', '91-100', ''],
                        highlightIndex: 3
                    }, {
                        tujuan: 'Menentukan pesan moral dari sebuah dongeng yang dibaca.',
                        materi: 'Pesan Moral Dongeng',
                        kriteria: ['0-50', '51-70', '71-80', '81-90', '91-100', ''],
                        highlightIndex: 3
                    }]
                }, {
                    capaian: 'Berbicara dan Mempresentasikan\nMenyajikan pendapat dengan pilihan kata dan sikap tubuh/gestur yang sesuai, menggunakan volume dan intonasi yang tepat sesuai konteks; menanggapi diskusi sesuai tata cara; dan menceritakan kembali isi dan/atau informasi dari berbagai tipe teks yang dibaca, dipirsa, atau didengar.',
                    tujuanList: [{
                        tujuan: 'Menceritakan kembali isi dongeng yang dibaca dengan kalimat sederhana.',
                        materi: 'Menceritakan Kembali',
                        kriteria: ['0-50', '51-70', '71-80', '81-90', '91-100', ''],
                        highlightIndex: 3
                    }, {
                        tujuan: 'Memberikan pendapat sederhana tentang suatu topik dengan intonasi yang jelas.',
                        materi: 'Memberi Pendapat',
                        kriteria: ['0-50', '51-70', '71-80', '81-90', '91-100', ''],
                        highlightIndex: 3
                    }]
                }, {
                    capaian: 'Menulis\nMenulis berbagai tipe teks sederhana dengan rangkaian kalimat yang beragam; dan menggunakan kaidah kebahasaan dan kosakata baru yang memiliki makna denotatif untuk menulis teks sesuai dengan konteks.',
                    tujuanList: [{
                        tujuan: 'Menulis kalimat sederhana menggunakan huruf kapital dan tanda titik.',
                        materi: 'Penggunaan Ejaan',
                        kriteria: ['0-50', '51-70', '71-80', '81-90', '91-100', ''],
                        highlightIndex: 3
                    }, {
                        tujuan: 'Membuat sebuah paragraf pendek berdasarkan gambar.',
                        materi: 'Menulis Paragraf',
                        kriteria: ['0-50', '51-70', '71-80', '81-90', '91-100', ''],
                        highlightIndex: 3
                    }]
                }]
            },
            'Matematika': {
                headers: ['Belum Terlihat', 'Mulai Terlihat', 'Berkembang', 'Sesuai Harapan', 'Sangat Berkembang', ''],
                rows: [{
                    capaian: 'Bilangan\nMemiliki pemahaman dan intuisi bilangan (number sense) pada bilangan cacah sampai 1.000; membaca, menulis, membandingkan, dan mengurutkan bilangan; menentukan dan menggunakan nilai tempat; melakukan komposisi dan dekomposisi bilangan cacah sampai 1.000.\nMelakukan dan menyelesaikan masalah operasi bilangan penjumlahan dan pengurangan bilangan cacah sampai 100; melakukan dan menyelesaikan masalah operasi perkalian dan pembagian bilangan cacah yang hasilnya sampai 100.',
                    tujuanList: [{
                        tujuan: 'Menentukan nilai tempat (satuan, puluhan, ratusan) pada bilangan.',
                        materi: 'Nilai Tempat',
                        kriteria: ['0-50', '51-70', '71-80', '81-90', '91-100', ''],
                        highlightIndex: 3
                    }, {
                        tujuan: 'Menyelesaikan soal perkalian dan pembagian bilangan sampai 100.',
                        materi: 'Perkalian dan Pembagian',
                        kriteria: ['0-50', '51-70', '71-80', '81-90', '91-100', ''],
                        highlightIndex: 3
                    }]
                }, {
                    capaian: 'Pengukuran\nMengukur, membandingkan, dan mengurutkan panjang, berat, dan durasi waktu menggunakan satuan baku (cm, m, kg, g, jam, menit).',
                    tujuanList: [{
                        tujuan: 'Mengukur panjang benda dengan satuan baku sentimeter (cm).',
                        materi: 'Pengukuran Panjang',
                        kriteria: ['0-50', '51-70', '71-80', '81-90', '91-100', ''],
                        highlightIndex: 3
                    }, {
                        tujuan: 'Membaca jam analog dan digital yang menunjukkan waktu tepat (jarum panjang di angka 12).',
                        materi: 'Membaca Jam',
                        kriteria: ['0-50', '51-70', '71-80', '81-90', '91-100', ''],
                        highlightIndex: 3
                    }]
                }, {
                    capaian: 'Geometri\nMengenal dan mendeskripsikan ciri-ciri berbagai bentuk bangun datar (segiempat, segitiga, segienam, dan lingkaran) dan bangun ruang (balok, kubus, kerucut, dan bola); dan menyusun pengubinan dari berbagai bentuk bangun datar.',
                    tujuanList: [{
                        tujuan: 'Menyebutkan ciri-ciri bangun ruang kubus dan balok.',
                        materi: 'Ciri-ciri Bangun Ruang',
                        kriteria: ['0-50', '51-70', '71-80', '81-90', '91-100', ''],
                        highlightIndex: 3
                    }, {
                        tujuan: 'Menghitung jumlah sisi, sudut, dan titik sudut pada bangun datar.',
                        materi: 'Unsur Bangun Datar',
                        kriteria: ['0-50', '51-70', '71-80', '81-90', '91-100', ''],
                        highlightIndex: 3
                    }]
                }, {
                    capaian: 'Analisis Data dan Peluang\nMengurutkan, membandingkan, menyajikan, dan menganalisis data dari banyak benda dengan menggunakan turus, piktogram, dan diagram batang (skala satu satuan).',
                    tujuanList: [{
                        tujuan: 'Membaca data pada diagram batang sederhana.',
                        materi: 'Diagram Batang',
                        kriteria: ['0-50', '51-70', '71-80', '81-90', '91-100', ''],
                        highlightIndex: 3
                    }, {
                        tujuan: 'Menyajikan data dalam bentuk piktogram.',
                        materi: 'Membuat Piktogram',
                        kriteria: ['0-50', '51-70', '71-80', '81-90', '91-100', ''],
                        highlightIndex: 3
                    }]
                }]
            }
        },
        // --- KELAS 3 (FASE B) --- (DATA ASLI)
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
        // --- KELAS 4 (FASE B) --- (DATA ASLI)
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
            'Pendidikan Agama Islam dan Budi Pekerti': {
                headers: ['Perlu Bimbingan', 'Cukup', 'Baik', 'Sangat Baik', 'Istimewa', ''],
                rows: [
                    {
                        capaian: 'Peserta didik memahami definisi iman kepada rasul-rasul Allah, mengenal nama-nama rasul ulul azmi, dan meneladani sifat-sifat utama mereka dalam kehidupan sehari-hari.',
                        tujuanList: [
                            {
                                tujuan: 'Menyebutkan nama-nama rasul ulul azmi.',
                                materi: 'Iman Kepada Rasul Allah',
                                kriteria: [
                                    'Belum mampu menyebutkan satu pun nama rasul ulul azmi.',
                                    'Mampu menyebutkan 1-2 nama rasul ulul azmi dengan bimbingan.',
                                    'Mampu menyebutkan 3-4 nama rasul ulul azmi secara acak.',
                                    'Mampu menyebutkan 5 nama rasul ulul azmi secara urut dan benar.',
                                    'Mampu menyebutkan 5 nama rasul ulul azmi beserta satu mukjizat utamanya.',
                                    ''
                                ],
                                highlightIndex: 2
                            },
                             {
                                tujuan: 'Menjelaskan sifat wajib rasul (siddiq, amanah, tabligh, fathanah).',
                                materi: 'Sifat-sifat Rasul',
                                kriteria: [
                                    'Belum mengenal sifat-sifat wajib rasul.',
                                    'Dapat menyebutkan 1-2 sifat wajib rasul, tetapi belum memahami artinya.',
                                    'Dapat menyebutkan 4 sifat wajib rasul, namun kesulitan menjelaskan artinya.',
                                    'Dapat menyebutkan dan menjelaskan arti dari 4 sifat wajib rasul dengan benar.',
                                    'Dapat menyebutkan, menjelaskan, dan memberikan contoh penerapan sifat rasul dalam kehidupan sehari-hari.',
                                    ''
                                ],
                                highlightIndex: 3
                            }
                        ]
                    },
                    {
                        capaian: 'Peserta didik dapat mempraktikkan tata cara wudu dan salat fardu dengan benar, memahami bacaan-bacaan pokok dalam salat, serta membiasakan sikap disiplin dan khusyuk.',
                        tujuanList: [
                            {
                                tujuan: 'Mempraktikkan gerakan wudu secara tertib.',
                                materi: 'Tata Cara Wudu',
                                kriteria: [
                                    'Belum hafal urutan gerakan wudu.',
                                    'Mampu mempraktikkan sebagian besar gerakan wudu, namun urutannya masih terbolak-balik.',
                                    'Mampu mempraktikkan gerakan wudu secara tertib, namun ada 1-2 gerakan yang terlewat.',
                                    'Mampu mempraktikkan seluruh gerakan wudu dengan tertib dan benar.',
                                    'Mampu mempraktikkan wudu dengan sempurna dan memahami sunah-sunahnya.',
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
                        capaian: 'Bilangan: Memiliki pemahaman dan intuisi bilangan (number sense) pada bilangan cacah sampai 10.000; membaca, menulis, membandingkan, dan mengurutkan bilangan; menentukan dan menggunakan nilai tempat; melakukan komposisi dan dekomposisi bilangan cacah sampai 10.000. Murid dapat melakukan dan menyelesaikan masalah operasi bilangan penjumlahan dan pengurangan bilangan cacah sampai 1.000; melakukan dan menyelesaikan masalah operasi perkalian dan pembagian bilangan cacah dengan bilangan satu angka atau dua angka; melakukan dan menyelesaikan masalah operasi hitung campuran bilangan cacah yang hasilnya sampai 1000; melakukan dan menyelesaikan masalah terkait kelipatan, faktor, kelipatan persekutuan terkecil (KPK) dan faktor persekutuan terbesar (FPB). Murid dapat memahami dan membandingkan pecahan; melakukan dan menyelesaikan masalah operasi penjumlahan dan pengurangan pecahan dengan penyebut yang sama.',
                        tujuanList: [
                            {
                                tujuan: 'Membaca dan menulis bilangan cacah sampai 10.000.',
                                materi: 'Bilangan Cacah 10.000',
                                kriteria: [
                                    'Masih kesulitan membaca bilangan ratusan.',
                                    'Mampu membaca dan menulis bilangan sampai 1.000.',
                                    'Mampu membaca dan menulis bilangan sampai 10.000, kadang masih terjadi kesalahan nilai tempat.',
                                    'Mampu membaca dan menulis bilangan cacah sampai 10.000 dengan benar dan lancar.',
                                    'Mampu membaca, menulis, dan menguraikan bilangan sampai 10.000 berdasarkan nilai tempatnya.',
                                    ''
                                ],
                                highlightIndex: 2
                            },
                            {
                                tujuan: 'Menyelesaikan operasi perkalian dengan bilangan satu angka.',
                                materi: 'Operasi Perkalian',
                                kriteria: [
                                    'Belum memahami konsep perkalian sebagai penjumlahan berulang.',
                                    'Mampu menyelesaikan perkalian dengan bantuan benda konkret atau gambar.',
                                    'Mampu menyelesaikan perkalian dengan cara penjumlahan berulang.',
                                    'Mampu menyelesaikan perkalian dengan cara bersusun pendek dengan benar.',
                                    'Hafal perkalian 1-10 dan mampu menggunakannya untuk menyelesaikan soal cerita.',
                                    ''
                                ],
                                highlightIndex: 2
                            },
                            {
                                tujuan: 'Menentukan KPK dan FPB dari dua bilangan.',
                                materi: 'KPK dan FPB',
                                kriteria: [
                                    'Belum memahami konsep kelipatan dan faktor.',
                                    'Mampu menentukan kelipatan dan faktor dari satu bilangan.',
                                    'Mampu menentukan KPK atau FPB dari dua bilangan, tetapi belum keduanya.',
                                    'Mampu menentukan KPK dan FPB dari dua bilangan menggunakan pohon faktor.',
                                    'Mampu menyelesaikan soal cerita yang berkaitan dengan KPK dan FPB.',
                                    ''
                                ],
                                highlightIndex: 2
                            },
                            {
                                tujuan: 'Menyelesaikan penjumlahan pecahan berpenyebut sama.',
                                materi: 'Penjumlahan Pecahan',
                                kriteria: [
                                    'Belum mengenal konsep pecahan.',
                                    'Mengenal bentuk pecahan, tetapi belum bisa melakukan operasi hitung.',
                                    'Mampu menjumlahkan pecahan berpenyebut sama dengan bantuan gambar.',
                                    'Mampu menjumlahkan pecahan berpenyebut sama tanpa alat bantu.',
                                    'Mampu menjumlahkan dan menyederhanakan hasil penjumlahan pecahan.',
                                    ''
                                ],
                                highlightIndex: 2
                            }
                        ]
                    },
                    { 
                        capaian: 'Pengukuran: Mengukur, membandingkan, dan mengestimasi panjang, berat, luas, dan volume menggunakan satuan baku.',
                        tujuanList: [
                            {
                                tujuan: 'Mengukur panjang benda menggunakan penggaris (satuan cm).',
                                materi: 'Pengukuran Panjang',
                                kriteria: [
                                    'Belum bisa menggunakan penggaris.',
                                    'Dapat meletakkan benda di penggaris, tetapi salah membaca skala.',
                                    'Dapat mengukur panjang benda, tetapi titik awal tidak selalu tepat di angka 0.',
                                    'Dapat mengukur panjang benda menggunakan penggaris dengan benar.',
                                    'Dapat mengukur dan membandingkan panjang beberapa benda dengan tepat.',
                                    ''
                                ],
                                highlightIndex: 2
                            },
                            {
                                tujuan: 'Menentukan luas persegi dan persegi panjang menggunakan petak satuan.',
                                materi: 'Pengukuran Luas',
                                kriteria: [
                                    'Belum memahami konsep luas.',
                                    'Menghitung luas dengan membilang satu per satu petak satuan dengan bimbingan.',
                                    'Menghitung luas dengan membilang satu per satu petak satuan secara mandiri.',
                                    'Mampu menghitung luas persegi dan persegi panjang dengan mengalikan panjang sisinya.',
                                    'Mampu menyelesaikan soal cerita yang berkaitan dengan luas bangun datar.',
                                    ''
                                ],
                                highlightIndex: 2
                            }
                        ]
                    },
                    { 
                        capaian: 'Geometri: Membandingkan karakteristik antar bangun datar (segiempat, segitiga, segibanyak); mengidentifikasi dan menggambar sudut (siku-siku, lancip, tumpul).',
                        tujuanList: [
                            {
                                tujuan: 'Mengidentifikasi jenis-jenis sudut (siku-siku, lancip, tumpul).',
                                materi: 'Jenis-jenis Sudut',
                                kriteria: [
                                    'Belum mengenal istilah sudut.',
                                    'Dapat menunjukkan sudut siku-siku pada benda di sekitar.',
                                    'Dapat membedakan sudut siku-siku, lancip, dan tumpul dengan bantuan gambar.',
                                    'Dapat mengidentifikasi dan menamai jenis-jenis sudut dengan benar.',
                                    'Dapat menggambar ketiga jenis sudut dengan menggunakan busur derajat.',
                                    ''
                                ],
                                highlightIndex: 2
                            },
                            {
                                tujuan: 'Menyebutkan sifat-sifat persegi dan persegi panjang.',
                                materi: 'Sifat Bangun Datar',
                                kriteria: [
                                    'Belum dapat membedakan persegi dan persegi panjang.',
                                    'Dapat menyebutkan 1-2 sifat dari persegi atau persegi panjang.',
                                    'Dapat menyebutkan beberapa sifat dari persegi dan persegi panjang.',
                                    'Dapat membedakan sifat-sifat persegi dan persegi panjang dengan jelas.',
                                    'Dapat membandingkan sifat-sifat beberapa bangun segiempat (persegi, persegi panjang, jajargenjang).',
                                    ''
                                ],
                                highlightIndex: 2
                            }
                        ]
                    },
                    { 
                        capaian: 'Analisis Data dan Peluang: Mengurutkan, membandingkan, menyajikan, dan menganalisis data dalam bentuk tabel, diagram gambar, piktogram, dan diagram batang (skala satu satuan).',
                        tujuanList: [
                            {
                                tujuan: 'Membaca data yang disajikan dalam bentuk diagram batang.',
                                materi: 'Diagram Batang',
                                kriteria: [
                                    'Belum bisa membaca diagram batang.',
                                    'Mampu membaca judul dan label sumbu pada diagram batang.',
                                    'Mampu membaca tinggi batang untuk menemukan frekuensi data tertentu.',
                                    'Mampu membaca dan membandingkan data yang disajikan dalam diagram batang.',
                                    'Mampu menyimpulkan informasi dari diagram batang (misal: data tertinggi, terendah).',
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
                        capaian: 'Makhluk hidup dan lingkungannya: Mendeskripsikan bagian tubuh dan fungsi dari makhluk hidup; mengidentifikasi kebutuhan makhluk hidup untuk dapat bertahan hidup; mendeskripsikan perubahan wujud benda (padat, cair, dan gas); mengidentifikasi sumber dan bentuk energi serta manfaatnya dalam kehidupan sehari-hari.',
                        tujuanList: [
                            {
                                tujuan: 'Menjelaskan fungsi akar, batang, dan daun pada tumbuhan.',
                                materi: 'Bagian Tubuh Tumbuhan',
                                kriteria: [
                                    'Belum dapat menyebutkan bagian tubuh tumbuhan.',
                                    'Dapat menyebutkan bagian tubuh tumbuhan, tetapi belum tahu fungsinya.',
                                    'Dapat menyebutkan fungsi dari satu atau dua bagian tumbuhan.',
                                    'Dapat menjelaskan fungsi akar, batang, dan daun dengan benar.',
                                    'Dapat menjelaskan hubungan antara bentuk dan fungsi pada bagian tubuh tumbuhan.',
                                    ''
                                ],
                                highlightIndex: 2
                            },
                            {
                                tujuan: 'Mengidentifikasi sumber-sumber energi alternatif.',
                                materi: 'Sumber Energi',
                                kriteria: [
                                    'Belum mengenal konsep energi.',
                                    'Dapat menyebutkan contoh sumber energi (misal: matahari, listrik).',
                                    'Dapat menyebutkan contoh sumber energi alternatif dengan bimbingan.',
                                    'Dapat menyebutkan beberapa contoh sumber energi alternatif (angin, air, matahari).',
                                    'Dapat menjelaskan keuntungan menggunakan sumber energi alternatif.',
                                    ''
                                ],
                                highlightIndex: 2
                            }
                        ]
                    },
                    { 
                        capaian: 'Zat dan perubahannya: Mendeskripsikan perubahan wujud benda (padat, cair, dan gas).',
                        tujuanList: [
                            {
                                tujuan: 'Memberikan contoh peristiwa mencair dan membeku dalam kehidupan sehari-hari.',
                                materi: 'Perubahan Wujud Benda',
                                kriteria: [
                                    'Belum memahami konsep perubahan wujud.',
                                    'Dapat memberikan 1 contoh peristiwa mencair atau membeku.',
                                    'Dapat memberikan contoh peristiwa mencair dan membeku.',
                                    'Dapat menjelaskan proses terjadinya mencair dan membeku.',
                                    'Dapat memberikan contoh dan menjelaskan proses perubahan wujud lainnya (menguap, mengembun).',
                                    ''
                                ],
                                highlightIndex: 2
                            }
                        ]
                    },
                    { 
                        capaian: 'Bumi dan antariksa: Mendeskripsikan terjadinya siklus air dan mengaitkannya dengan pentingnya menjaga ketersediaan air; mendeskripsikan kenampakan permukaan bumi (daratan dan perairan).',
                        tujuanList: [
                            {
                                tujuan: 'Menggambarkan skema siklus air sederhana.',
                                materi: 'Siklus Air',
                                kriteria: [
                                    'Belum memahami dari mana datangnya hujan.',
                                    'Dapat menyebutkan salah satu tahapan siklus air (misal: penguapan).',
                                    'Dapat menyebutkan beberapa tahapan siklus air, tetapi belum urut.',
                                    'Dapat menggambarkan dan menjelaskan tahapan siklus air (penguapan, pengembunan, presipitasi) secara sederhana.',
                                    'Dapat mengaitkan kegiatan manusia (misal: penebangan hutan) dengan terganggunya siklus air.',
                                    ''
                                ],
                                highlightIndex: 2
                            }
                        ]
                    },
                    { 
                        capaian: 'Keruangan dan konektivitas: Menjelaskan posisi dan perannya sebagai bagian dari keluarga, sekolah, dan lingkungan sekitar; mengidentifikasi dan mendeskripsikan keragaman sosial, ekonomi, budaya, dan suku bangsa yang ada di lingkungan sekitar; mengenal sejarah perkembangan wilayahnya dan menceritakan potensi sumber daya alam yang ada di wilayahnya serta kaitannya dengan kebutuhan hidup masyarakatnya.',
                        tujuanList: [
                            {
                                tujuan: 'Mengidentifikasi keragaman budaya (misal: tarian, pakaian adat) di Indonesia.',
                                materi: 'Keragaman Budaya',
                                kriteria: [
                                    'Belum mengetahui adanya keragaman budaya di Indonesia.',
                                    'Dapat menyebutkan 1-2 contoh tarian atau pakaian adat.',
                                    'Dapat menyebutkan beberapa contoh keragaman budaya dari berbagai provinsi.',
                                    'Dapat menyebutkan nama budaya beserta daerah asalnya dengan benar.',
                                    'Dapat menjelaskan pentingnya melestarikan keragaman budaya sebagai kekayaan bangsa.',
                                    ''
                                ],
                                highlightIndex: 2
                            },
                            {
                                tujuan: 'Menjelaskan kegiatan ekonomi masyarakat berdasarkan sumber daya alam di wilayahnya.',
                                materi: 'Kegiatan Ekonomi',
                                kriteria: [
                                    'Belum memahami hubungan antara SDA dan kegiatan ekonomi.',
                                    'Dapat menyebutkan contoh kegiatan ekonomi (misal: bertani, nelayan).',
                                    'Dapat menyebutkan contoh SDA di wilayahnya.',
                                    'Dapat menghubungkan jenis SDA dengan kegiatan ekonomi masyarakat sekitar (misal: laut -> nelayan).',
                                    'Dapat menganalisis potensi SDA dan memprediksi kegiatan ekonomi yang sesuai.',
                                    ''
                                ],
                                highlightIndex: 2
                            }
                        ]
                    }
                ]
            }
        },
        // --- KELAS 5 (FASE C) --- (DATA ASLI)
        'kelas_5': {
            'Matematika': {
                headers: ['Perlu Bimbingan', 'Cukup', 'Baik', 'Sangat Baik', 'Istimewa', ''],
                rows: [{
                    capaian: 'Peserta didik dapat melakukan operasi penjumlahan, pengurangan, perkalian, dan pembagian bilangan desimal, serta menggunakannya untuk menyelesaikan masalah.',
                    tujuanList: [{
                        tujuan: 'Menyelesaikan soal perkalian bilangan desimal (satu angka di belakang koma).',
                        materi: 'Perkalian Desimal',
                        kriteria: [
                            'Belum memahami konsep bilangan desimal.',
                            'Mampu melakukan perkalian bilangan cacah, tetapi bingung meletakkan koma.',
                            'Mampu menyelesaikan perkalian desimal dengan cara bersusun, kadang masih salah meletakkan koma.',
                            'Mampu menyelesaikan perkalian bilangan desimal dengan benar dan tepat.',
                            'Mampu menyelesaikan soal cerita yang melibatkan perkalian desimal.',
                            ''
                        ],
                        highlightIndex: 3
                    }]
                }]
            },
            'Bahasa Indonesia': {
                headers: ['Perlu Bimbingan', 'Cukup', 'Baik', 'Sangat Baik', 'Istimewa', ''],
                rows: [{
                    capaian: 'Peserta didik mampu menganalisis informasi berupa fakta, prosedur dengan mengidentifikasi ciri objek dan urutan proses kejadian, serta nilai-nilai dari teks narasi.',
                    tujuanList: [{
                        tujuan: 'Menentukan watak tokoh dan latar cerita dari teks narasi yang dibaca.',
                        materi: 'Unsur Intrinsik Teks Narasi',
                        kriteria: [
                            'Kesulitan memahami isi cerita.',
                            'Mampu menyebutkan nama tokoh, tetapi belum bisa menentukan wataknya.',
                            'Mampu menentukan watak tokoh atau latar cerita, tetapi belum keduanya.',
                            'Mampu menentukan watak tokoh dan latar (tempat, waktu) cerita dengan tepat.',
                            'Mampu menganalisis hubungan antara watak tokoh dengan alur cerita.',
                            ''
                        ],
                        highlightIndex: 3
                    }]
                }]
            },
            'Ilmu Pengetahuan Alam dan Sosial': {
                headers: ['Perlu Bimbingan', 'Cukup', 'Baik', 'Sangat Baik', 'Istimewa', ''],
                rows: [{
                    capaian: 'Peserta didik dapat mendeskripsikan cara perkembangbiakan pada tumbuhan dan hewan, serta mengaitkannya dengan upaya pelestarian.',
                    tujuanList: [{
                        tujuan: 'Membedakan cara perkembangbiakan generatif dan vegetatif pada tumbuhan.',
                        materi: 'Perkembangbiakan Tumbuhan',
                        kriteria: [
                            'Belum memahami cara tumbuhan berkembang biak.',
                            'Dapat memberikan contoh tumbuhan yang berkembang biak dengan biji.',
                            'Dapat menjelaskan salah satu cara perkembangbiakan (generatif atau vegetatif).',
                            'Dapat menjelaskan dan membedakan perkembangbiakan generatif dan vegetatif beserta contohnya.',
                            'Dapat mengaitkan cara perkembangbiakan dengan upaya-upaya pelestarian tumbuhan langka.',
                            ''
                        ],
                        highlightIndex: 2
                    }]
                }]
            }
        }
    };


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

    /**
     * Mengambil data dari localStorage. Jika tidak ada, buat data default.
     * @returns {object} Data aplikasi.
     */
    const getData = () => {
        let data = localStorage.getItem(DB_KEY);
        if (!data) {
            console.log('Tidak ada data, membuat data default');
            data = getDefaultData();

            // Inisialisasi properti kriteria berdasarkan daftar pelajaran
            data.pelajaran.forEach(namaPelajaran => {
                if (!data.kriteria[namaPelajaran]) {
                    data.kriteria[namaPelajaran] = {};
                }
            });
            simpanData(data); // Simpan struktur awal ke localStorage
            return data;
        }
        return JSON.parse(data);
    };

    /**
     * Menyimpan data ke localStorage.
     * @param {object} data Data yang akan disimpan.
     */
    const simpanData = (data) => {
        localStorage.setItem(DB_KEY, JSON.stringify(data));
    };

    /**
     * Mendapatkan data kurikulum default untuk kelas dan pelajaran tertentu.
     * @param {number} kelas Nomor kelas.
     * @param {string} namaPelajaran Nama mata pelajaran.
     * @returns {object|null} Data kurikulum atau null jika tidak ditemukan.
     */
    const getDefaultCurriculumData = (kelas, namaPelajaran) => {
        const keyKelas = 'kelas_' + kelas;
        if (defaultCurriculum[keyKelas] && defaultCurriculum[keyKelas][namaPelajaran]) {
            return defaultCurriculum[keyKelas][namaPelajaran];
        }
        return null;
    };

    /**
     * Membuat backup data dan mengunduhnya sebagai file JSON.
     * @param {function} showModalCallback Callback untuk menampilkan notifikasi.
     */
    const backup = (showModalCallback) => {
        const data = localStorage.getItem(DB_KEY);
        if (data) {
            const blob = new Blob([data], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            const today = new Date().toISOString().slice(0, 10);
            a.href = url;
            a.download = `backup-kriteria-${today}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            showModalCallback('Backup berhasil diunduh.', 'success');
        } else {
            showModalCallback('Tidak ada data untuk di-backup.', 'danger');
        }
    };

    /**
     * Merestore data dari file JSON yang diunggah.
     * @param {File} file File JSON yang diunggah.
     * @param {function} showModalCallback Callback untuk menampilkan notifikasi.
     */
    const restore = (file, showModalCallback) => {
        if (file && file.type === 'application/json') {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const restoredData = JSON.parse(e.target.result);
                    // Validasi sederhana
                    if (restoredData.info && restoredData.pelajaran && restoredData.kriteria) {
                        simpanData(restoredData);
                        showModalCallback('Restore berhasil! Halaman akan dimuat ulang.', 'success');
                        setTimeout(() => window.location.reload(), 2000);
                    } else {
                        showModalCallback('File backup tidak valid.', 'danger');
                    }
                } catch (error) {
                    showModalCallback('Gagal membaca file. Pastikan file backup tidak rusak.', 'danger');
                }
            };
            reader.readAsText(file);
        } else {
            showModalCallback('Harap pilih file JSON yang benar.', 'warning');
        }
    };

    /**
     * Menghapus semua data dari localStorage.
     * @param {function} showModalCallback Callback untuk menampilkan notifikasi.
     */
    const resetAllData = (showModalCallback) => {
        localStorage.removeItem(DB_KEY);
        showModalCallback('Semua data berhasil direset! Halaman akan dimuat ulang.', 'success');
        setTimeout(() => window.location.reload(), 2000);
    };

    /**
     * Menghapus data untuk satu pelajaran spesifik di kelas tertentu.
     * @param {string} namaPelajaran Nama mata pelajaran.
     * @param {number} kelas Nomor kelas.
     * @returns {boolean} True jika berhasil, false jika gagal.
     */
    const resetPelajaranData = (namaPelajaran, kelas) => {
        const data = getData();
        const keyKelas = 'kelas_' + kelas;
        if (data.kriteria[namaPelajaran] && data.kriteria[namaPelajaran][keyKelas]) {
            delete data.kriteria[namaPelajaran][keyKelas];
            simpanData(data);
            return true;
        }
        return false;
    };


    // Mengekspos fungsi-fungsi yang bisa diakses dari luar modul
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
