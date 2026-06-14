export const VISITOR_MODES = {
  mahasiswa: {
    id: 'mahasiswa',
    label: 'Mahasiswa',
    shortLabel: 'Mhs',
    description: 'Jadwal, SIA, dan layanan akademik',
    primaryHref: '#applications',
    primaryLabel: 'Pilih layanan',
    highlightId: 'schedules',
  },
  dosen: {
    id: 'dosen',
    label: 'Dosen',
    shortLabel: 'Dosen',
    description: 'Direktori SDM & AcaNova Office',
    primaryHref: '#applications',
    primaryLabel: 'Pilih layanan',
    highlightId: 'lecturers',
  },
}

export const MODE_ORDER = ['mahasiswa', 'dosen']
