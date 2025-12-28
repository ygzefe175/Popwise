# ConversionMaster Sistem

Bu proje, ziyaretçi davranış analizi yaparak akıllı pop-uplar sunan ve satın alma kararlarını hızlandıran bir SaaS prototipidir.

## Özellikler

- **Davranış Analizi**: Ziyaretçinin mouse hareketleri, scroll hızı ve sayfada kalma süresine göre "Kararsız", "Fiyat Odaklı", "Aceleci" veya "Güven Arayan" olarak etiketlenmesi.
- **Akıllı Pop-up**: Etikete göre değişen dinamik metinler.
- **Kapanmayan Satış**: Pop-up kapatıldığında ekranın köşesine küçülerek "fırsat devam ediyor" hissi yaratır.
- **Karar Destek Dashboard**: Site sahibi için analizler ve yapay zeka önerileri.

## Kurulum ve Çalıştırma

1. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```

2. Geliştirme sunucusunu başlatın:
   ```bash
   npm run dev
   ```

3. `http://localhost:3000` adresine gidin.

## Teknoloji

- Next.js (App Router)
- Tailwind CSS
- Lucide React Icons
- Typescript
