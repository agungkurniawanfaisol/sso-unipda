GALERI UNIPDA PORTAL
====================

Cara menambah / mengubah foto:

1. Upload foto ke folder:
   frontend/public/gallery/images/

   Format disarankan: JPG atau WebP (800px+ lebar).
   Contoh nama file: wisuda-2025.jpg, lab-saintek.jpg

2. Edit data di:
   frontend/public/gallery/gallery.json

   Tambah item baru di array "items":
   {
     "id": "wisuda-2025",
     "title": "Wisuda 2025",
     "caption": "Deskripsi singkat foto.",
     "category": "kegiatan",
     "image": "/gallery/images/wisuda-2025.jpg",
     "featured": false
   }

   Kategori yang tersedia: kampus, kegiatan, akademik
   (atau tambah kategori baru di array "categories")

3. Refresh halaman — tidak perlu restart server dev.

Catatan:
- Path "image" selalu diawali /gallery/images/
- "featured": true = foto tampil lebih besar di grid
- File dummy saat ini berformat .svg — ganti dengan foto asli kapan saja
