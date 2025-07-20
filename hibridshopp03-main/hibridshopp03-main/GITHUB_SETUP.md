# 🚀 GitHub Token Beállítás

## 📋 **Előfeltételek:**

1. **GitHub fiók** - Regisztrálj GitHub-ra
2. **Repository létrehozása** - Adatok tárolásához
3. **Personal Access Token** - API hozzáféréshez

## 🔧 **1. GitHub Repository Létrehozása:**

```bash
# Új repository létrehozása
Repository név: hibrid-shopp-data
Description: Hibrid Shopp adatok
Public/Private: Public (ingyenes)
README: Igen
```

### **Repository struktúra:**
```
hibrid-shopp-data/
├── data/
│   ├── gallery.json
│   ├── dogs.json
│   ├── bookings.json
│   ├── contact.json
│   └── menu.json
└── images/
    └── (feltöltött képek)
```

## 🔑 **2. Personal Access Token Létrehozása:**

### **Lépések:**
1. **GitHub.com** → Settings → Developer settings
2. **Personal access tokens** → Tokens (classic)
3. **Generate new token** → Generate new token (classic)

### **Token beállítások:**
- **Note:** `hibrid-shopp-api`
- **Expiration:** `No expiration` (vagy 90 nap)
- **Scopes:**
  - ✅ `repo` (teljes repository hozzáférés)
  - ✅ `workflow` (GitHub Actions)

### **Token mentése:**
```
ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## ⚙️ **3. Environment Beállítás:**

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

## 🚀 **4. Netlify Beállítás:**

### **Environment Variables:**
1. **Netlify Dashboard** → Site settings → Environment variables
2. **Add variable** minden egyes változóhoz:
   - `VITE_GITHUB_TOKEN`
   - `VITE_GITHUB_REPO_OWNER`
   - `VITE_GITHUB_REPO_NAME`
   - `VITE_GITHUB_BRANCH`

## 📁 **5. Repository Struktúra Létrehozása:**

### **GitHub webes felületen:**
1. **Add file** → Create new file
2. **data/gallery.json:**
```json
[]
```

3. **data/dogs.json:**
```json
[]
```

4. **data/bookings.json:**
```json
[]
```

5. **data/contact.json:**
```json
{
  "phone": "+36 30 123 4567",
  "email": "info@hibridshopp.hu",
  "address": "Budapest, Magyarország",
  "facebook": "https://facebook.com/hibridshopp",
  "instagram": "https://instagram.com/hibridshopp"
}
```

6. **data/menu.json:**
```json
[]
```

## 🔄 **6. Automatikus Deploy (Opcionális):**

### **GitHub Actions workflow:**
```yaml
# .github/workflows/deploy.yml
name: Deploy to Netlify
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Netlify
        uses: nwtgck/actions-netlify@v1.2
        with:
          publish-dir: './dist'
          production-branch: main
          github-token: ${{ secrets.GITHUB_TOKEN }}
          deploy-message: "Deploy from GitHub Actions"
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

## ✅ **7. Tesztelés:**

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
- Repository → data/ mappa
- JSON fájlok frissülnek
- Commit üzenetek láthatók

## 🔒 **8. Biztonság:**

### **Token biztonság:**
- ❌ **Ne oszd meg** a tokent
- ❌ **Ne commitold** .env fájlt
- ✅ **Használj** environment változókat
- ✅ **Korlátozd** a token jogosultságokat

### **Repository biztonság:**
- ✅ **Public repository** - Adatok olvashatóak
- ✅ **Token védett** - Csak írási hozzáférés

## 🎯 **Előnyök:**

### **✅ Ingyenes:**
- GitHub repository: Ingyenes
- Netlify hosting: Ingyenes
- GitHub Actions: Ingyenes

### **✅ Verziókezelés:**
- Minden változás követhető
- Visszaállítás lehetséges
- Commit történet

### **✅ Automatizálás:**
- GitHub Actions deploy
- Webhook értesítések
- CI/CD pipeline

### **✅ Skálázhatóság:**
- Több felhasználó
- Több admin
- Több weboldal

## 🚨 **Hibaelhárítás:**

### **Token hiba:**
```javascript
// Console hiba
GitHub API hiba: 401
```
**Megoldás:** Token újragenerálása

### **Repository hiba:**
```javascript
// Console hiba
GitHub API hiba: 404
```
**Megoldás:** Repository név ellenőrzése

### **Permission hiba:**
```javascript
// Console hiba
GitHub API hiba: 403
```
**Megoldás:** Token jogosultságok ellenőrzése

## 📞 **Támogatás:**

Ha problémák vannak:
1. **Console hibaüzenetek** ellenőrzése
2. **Network tab** megnyitása
3. **GitHub API** dokumentáció
4. **Token újragenerálása**

---

**🎉 Gratulálok! A GitHub token megoldás készen áll!** 