# Hibrid Shopp - Kutyafarm Weboldal

Professzionális kutyafarm weboldal admin panellel, Netlify kompatibilis formában.

## Funkciók

### Főoldal
- Modern, reszponzív dizájn
- Animált háttér elemek
- Kiemelt kutyák előnézet
- Időpont foglalás gomb

### Admin Panel
- **Vezérlőpult**: Áttekintés a kutyákról és foglalásokról
- **Kutyák Kezelése**: Új kutyák hozzáadása, szerkesztése, törlése
- **Galéria**: Képek kezelése különböző kategóriákban
- **Foglalások**: Időpont foglalások kezelése és státusz módosítása
- **Kapcsolat**: Kapcsolati információk szerkesztése
- **Menü Beállítások**: Navigációs menü testreszabása

### Időpont Foglalás
- Professzionális foglalási űrlap
- Dátum és időpont választás
- Ügyfél adatok megadása
- Admin panelben kezelhető foglalások

### Galéria
- Külön galéria szekció csak képekkel
- Kategóriák szerint rendezett képek
- Hover effektek és animációk

## Technológiai Stack

- **Frontend**: React 19, Vite
- **UI Komponensek**: Radix UI, Tailwind CSS
- **Ikonok**: Lucide React
- **Deployment**: Netlify
- **Adatkezelés**: LocalStorage (admin panel)

## Telepítés és Futtatás

### Előfeltételek
- Node.js 18+
- pnpm (ajánlott) vagy npm

### Telepítés
```bash
# Függőségek telepítése
pnpm install

# Fejlesztői szerver indítása
pnpm dev

# Build létrehozása
pnpm build

# Build előnézet
pnpm preview
```

### Admin Panel Hozzáférés
- Jelszó: `admin123`
- Az admin gomb a header jobb oldalán található

## Netlify Deployment

A projekt automatikusan konfigurálva van Netlify deploymenthez:

1. Csatlakoztassa a GitHub repository-t a Netlify-hez
2. A build beállítások automatikusan be vannak állítva
3. A `netlify.toml` fájl tartalmazza a szükséges konfigurációt

## Projekt Struktúra

```
src/
├── components/
│   ├── ui/                 # Radix UI komponensek
│   ├── admin/             # Admin panel komponensek
│   │   ├── DogsManagement.jsx
│   │   ├── GalleryManagement.jsx
│   │   ├── BookingsManagement.jsx
│   │   ├── ContactManagement.jsx
│   │   └── MenuManagement.jsx
│   └── AdminPanel.jsx     # Fő admin panel komponens
├── assets/                # Képek és egyéb erőforrások
├── App.jsx               # Fő alkalmazás komponens
└── main.jsx              # Alkalmazás belépési pont
```

## Admin Panel Funkciók

### Kutyák Kezelése
- Új kutyák hozzáadása részletes adatokkal
- Meglévő kutyák szerkesztése
- Kutyák törlése
- Különleges tulajdonságok kezelése
- Ár, kor, nem, súly beállítása

### Galéria Kezelése
- Új képek hozzáadása URL alapján
- Képek kategorizálása
- Cím és leírás hozzáadása
- Előnézet funkció
- Képek törlése

### Foglalások Kezelése
- Foglalások listázása
- Státusz módosítása (függő, megerősített, törölt)
- Foglalások szerkesztése
- Ügyfél adatok módosítása

### Kapcsolat Beállítások
- Telefonszám módosítása
- Email cím beállítása
- Social media linkek
- Nyitvatartás és cím

### Menü Beállítások
- Menüpontok hozzáadása/törlése
- Sorrend módosítása
- Láthatóság beállítása
- Előnézet funkció

## Adatmentés

Az admin panelben végzett módosítások automatikusan mentődnek a localStorage-ba. A "Mentés" és "Közzététel" gombok segítségével explicit módon is mentheti az adatokat.

## Reszponzivitás

A weboldal teljesen reszponzív és optimalizált:
- Mobil eszközök
- Tablet eszközök
- Desktop számítógépek
- Nagy képernyők

## Jövőbeli Fejlesztések

- Backend API integráció
- Adatbázis kapcsolat
- Email értesítések
- Fizetési rendszer integráció
- SEO optimalizáció
- Analytics integráció

## Licenc

Ez a projekt privát használatra készült a Hibrid Shopp kutyafarm számára. 