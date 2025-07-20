// GitHub API Service
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN
const REPO_OWNER = import.meta.env.VITE_GITHUB_REPO_OWNER || 'your-username'
const REPO_NAME = import.meta.env.VITE_GITHUB_REPO_NAME || 'hibrid-shopp-data'
const BRANCH = import.meta.env.VITE_GITHUB_BRANCH || 'main'

class GitHubService {
  constructor() {
    this.baseURL = 'https://api.github.com'
    this.headers = {
      'Authorization': `token ${GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json'
    }
  }

  // Adatok betöltése
  async loadData(fileName) {
    try {
      const response = await fetch(
        `${this.baseURL}/repos/${REPO_OWNER}/${REPO_NAME}/contents/data/${fileName}.json`,
        {
          headers: this.headers
        }
      )
      
      if (response.status === 404) {
        // Fájl nem létezik, üres adatok visszaadása
        return this.getDefaultData(fileName)
      }
      
      if (!response.ok) {
        throw new Error(`GitHub API hiba: ${response.status}`)
      }
      
      const data = await response.json()
      const content = JSON.parse(atob(data.content))
      return content
    } catch (error) {
      console.error('Adatok betöltése sikertelen:', error)
      return this.getDefaultData(fileName)
    }
  }

  // Adatok mentése
  async saveData(fileName, data) {
    try {
      // Először lekérjük a jelenlegi fájl SHA-ját
      const currentFile = await this.getFileInfo(fileName)
      
      const content = JSON.stringify(data, null, 2)
      const encodedContent = btoa(unescape(encodeURIComponent(content)))
      
      const response = await fetch(
        `${this.baseURL}/repos/${REPO_OWNER}/${REPO_NAME}/contents/data/${fileName}.json`,
        {
          method: 'PUT',
          headers: this.headers,
          body: JSON.stringify({
            message: `Update ${fileName} data`,
            content: encodedContent,
            sha: currentFile?.sha,
            branch: BRANCH
          })
        }
      )
      
      if (!response.ok) {
        throw new Error(`GitHub API hiba: ${response.status}`)
      }
      
      return true
    } catch (error) {
      console.error('Adatok mentése sikertelen:', error)
      return false
    }
  }

  // Fájl információk lekérése
  async getFileInfo(fileName) {
    try {
      const response = await fetch(
        `${this.baseURL}/repos/${REPO_OWNER}/${REPO_NAME}/contents/data/${fileName}.json`,
        {
          headers: this.headers
        }
      )
      
      if (response.status === 404) {
        return null
      }
      
      if (!response.ok) {
        throw new Error(`GitHub API hiba: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error('Fájl információk lekérése sikertelen:', error)
      return null
    }
  }

  // Alapértelmezett adatok
  getDefaultData(fileName) {
    switch (fileName) {
      case 'gallery':
        return []
      case 'dogs':
        return []
      case 'bookings':
        return []
      case 'contact':
        return {
          phone: '00 36 70 217 885',
          phoneRaw: '3670217885',
          email: 'shoppdogg583@gmail.com',
          instagram: '@hibridshopp',
          tiktok: '@maltipoo.kecskemt',
          workingHours: 'Hétfő-Vasárnap: 9:00 - 22:00',
          address: 'Kecskemét, Magyarország'
        }
      case 'menu':
        return []
      default:
        return []
    }
  }

  // Kép feltöltése (Base64)
  async uploadImage(imageName, imageData) {
    try {
      const response = await fetch(
        `${this.baseURL}/repos/${REPO_OWNER}/${REPO_NAME}/contents/images/${imageName}`,
        {
          method: 'PUT',
          headers: this.headers,
          body: JSON.stringify({
            message: `Add image: ${imageName}`,
            content: imageData.split(',')[1], // Base64 content
            branch: BRANCH
          })
        }
      )
      
      if (!response.ok) {
        throw new Error(`GitHub API hiba: ${response.status}`)
      }
      
      const result = await response.json()
      return result.content.download_url
    } catch (error) {
      console.error('Kép feltöltése sikertelen:', error)
      return null
    }
  }
}

export const githubService = new GitHubService() 