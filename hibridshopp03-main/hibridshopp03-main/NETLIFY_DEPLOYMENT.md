# 🚀 Netlify + GitHub Token Deployment

## 📋 **Előfeltételek:**

1. ✅ **GitHub fiók** - Regisztrált GitHub felhasználó
2. ✅ **Netlify fiók** - Regisztrált Netlify felhasználó
3. ✅ **GitHub repository** - Kód repository létrehozva
4. ✅ **Data repository** - Adatok tárolásához létrehozva

## 🔧 **1. GitHub Repository Beállítás:**

### **Kód Repository:**
```bash
# Main repository a kódnak
Repository név: hibrid-shopp-website
Description: Hibrid Shopp weboldal
Public/Private: Public
```

### **Adat Repository:**
```bash
# Külön repository az adatoknak
Repository név: hibrid-shopp-data
Description: Hibrid Shopp adatok
Public/Private: Public
```

## 🔑 **2. GitHub Personal Access Token:**

### **Token létrehozása:**
1. **GitHub.com** → Settings → Developer settings
2. **Personal access tokens** → Tokens (classic)
3. **Generate new token** → Generate new token (classic)

### **Token beállítások:**
- **Note:** `hibrid-shopp-netlify-deploy`
- **Expiration:** `No expiration`
- **Scopes:**
  - ✅ `repo` (teljes repository hozzáférés)
  - ✅ `workflow` (GitHub Actions)

### **Token mentése:**
```
ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## 🚀 **3. Netlify Beállítás:**

### **1. Site létrehozása:**
1. **Netlify Dashboard** → New site from Git
2. **GitHub** → hibrid-shopp-website repository kiválasztása
3. **Build settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: `18`

### **2. Environment Variables:**
1. **Site settings** → Environment variables
2. **Add variable** minden egyes változóhoz:

```env
VITE_GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
VITE_GITHUB_REPO_OWNER=your-username
VITE_GITHUB_REPO_NAME=hibrid-shopp-data
VITE_GITHUB_BRANCH=main
```

### **3. Domain beállítás:**
1. **Domain settings** → Custom domains
2. **Add custom domain** (opcionális)
3. **SSL certificate** automatikus

## 🔄 **4. GitHub Actions Beállítás:**

### **Repository Secrets:**
1. **Repository** → Settings → Secrets and variables → Actions
2. **New repository secret** minden egyes változóhoz:

```bash
NETLIFY_AUTH_TOKEN=your_netlify_auth_token
NETLIFY_SITE_ID=your_netlify_site_id
GITHUB_REPO_OWNER=your_github_username
GITHUB_REPO_NAME=hibrid-shopp-data
```

### **Netlify Auth Token:**
1. **Netlify** → User settings → Applications
2. **New access token**
3. **Token mentése**

### **Netlify Site ID:**
1. **Site settings** → General
2. **Site ID** másolása

## 📁 **5. Adat Repository Struktúra:**

### **GitHub webes felületen:**
1. **hibrid-shopp-data** repository
2. **Add file** → Create new file

### **data/gallery.json:**
```json
[]
```

### **data/dogs.json:**
```json
[]
```

### **data/bookings.json:**
```json
[]
```

### **data/contact.json:**
```json
{
  "phone": "00 36 70 217 885",
  "phoneRaw": "3670217885",
  "email": "shoppdogg583@gmail.com",
  "instagram": "@hibridshopp",
  "tiktok": "@maltipoo.kecskemt",
  "workingHours": "Hétfő-Vasárnap: 9:00 - 22:00",
  "address": "Kecskemét, Magyarország"
}
```

### **data/menu.json:**
```json
[
  { "id": "home", "label": "Főoldal", "visible": true, "order": 1 },
  { "id": "breeds", "label": "Fajták", "visible": true, "order": 2 },
  { "id": "available", "label": "Eladó Kutyák", "visible": true, "order": 3 },
  { "id": "gallery", "label": "Galéria", "visible": true, "order": 4 },
  { "id": "contact", "label": "Kapcsolat", "visible": true, "order": 5 }
]
```

## 🔧 **6. Lokális Fejlesztés:**

### **1. .env fájl létrehozása:**
```bash
# Projekt gyökérben
touch .env
```

### **2. .env tartalma:**
```env
VITE_GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
VITE_GITHUB_REPO_OWNER=your-username
VITE_GITHUB_REPO_NAME=hibrid-shopp-data
VITE_GITHUB_BRANCH=main
```

### **3. .gitignore frissítése:**
```gitignore
# Environment fájlok
.env
.env.local
.env.production
```

## 🚀 **7. Deploy Folyamat:**

### **Automatikus Deploy:**
1. **Kód push** → GitHub repository
2. **GitHub Actions** → Automatikus build
3. **Netlify** → Automatikus deploy
4. **Weboldal** → Elérhető online

### **Manuális Deploy:**
1. **Netlify Dashboard** → Deploys
2. **Trigger deploy** → Deploy site
3. **Build log** → Ellenőrzés

## ✅ **8. Tesztelés:**

### **Lokális teszt:**
```bash
npm run dev
```

### **Admin panel teszt:**
1. **Galéria** → Új kép hozzáadása
2. **Kutyák** → Új kutya hozzáadása
3. **Foglalások** → Új foglalás
4. **Kapcsolat** → Adatok módosítása

### **GitHub ellenőrzés:**
- **hibrid-shopp-data** repository
- **data/** mappa frissül
- **Commit üzenetek** láthatók

### **Netlify ellenőrzés:**
- **Deploy log** → Sikeres build
- **Functions** → Nincs hiba
- **Environment** → Változók beállítva

## 🔒 **9. Biztonság:**

### **Token biztonság:**
- ❌ **Ne oszd meg** a tokent
- ❌ **Ne commitold** .env fájlt
- ✅ **Használj** environment változókat
- ✅ **Korlátozd** a token jogosultságokat

### **Repository biztonság:**
- ✅ **Public repository** - Adatok olvashatóak
- ✅ **Token védett** - Csak írási hozzáférés
- ✅ **Branch protection** - Main branch védett

## 🎯 **10. Előnyök:**

### **✅ Automatizálás:**
- **Git push** → Automatikus deploy
- **Kód változás** → Azonnal élőben
- **CI/CD pipeline** - Folyamatos integráció

### **✅ Skálázhatóság:**
- **CDN** - Gyors betöltés világszerte
- **SSL** - Biztonságos kapcsolat
- **Backup** - Automatikus mentés

### **✅ Fejlesztői élmény:**
- **Preview deploy** - Pull request tesztelés
- **Rollback** - Visszaállítás lehetséges
- **Analytics** - Teljesítmény követés

## 🚨 **11. Hibaelhárítás:**

### **Build hiba:**
```bash
# Netlify build log
Build failed: npm run build
```
**Megoldás:** Node.js verzió ellenőrzése

### **Environment hiba:**
```javascript
// Console hiba
VITE_GITHUB_TOKEN is not defined
```
**Megoldás:** Environment változók beállítása

### **API hiba:**
```javascript
// Console hiba
GitHub API hiba: 401
```
**Megoldás:** Token újragenerálása

### **Deploy hiba:**
```bash
# Netlify deploy log
Deploy failed: Timeout
```
**Megoldás:** Build idő növelése

## 📞 **12. Támogatás:**

### **Hibaelhárítás lépések:**
1. **Console hibaüzenetek** ellenőrzése
2. **Network tab** megnyitása
3. **Build log** átnézése
4. **Environment** ellenőrzése

### **Hasznos linkek:**
- [Netlify Docs](https://docs.netlify.com/)
- [GitHub API Docs](https://docs.github.com/en/rest)
- [Vite Docs](https://vitejs.dev/)

---

## 🎉 **Gratulálok!**

A Netlify + GitHub token megoldás készen áll! Most:

1. ✅ **Minden változtatás** automatikusan mentődik GitHub-ra
2. ✅ **Admin panel** valós időben működik
3. ✅ **Adatok** mindenki számára elérhetők
4. ✅ **Deploy** automatikus és gyors

**🚀 Az oldal most professzionális szinten működik!** 