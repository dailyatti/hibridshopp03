import { useState, useEffect, useCallback } from 'react'
import { githubService } from '@/services/githubService'

export function useGitHubData(dataType) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [saving, setSaving] = useState(false)

  // Adatok betöltése
  const loadData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await githubService.loadData(dataType)
      setData(result)
    } catch (err) {
      setError(err.message)
      console.error(`${dataType} betöltése sikertelen:`, err)
    } finally {
      setLoading(false)
    }
  }, [dataType])

  // Adatok mentése
  const saveData = useCallback(async (newData) => {
    try {
      setSaving(true)
      setError(null)
      const success = await githubService.saveData(dataType, newData)
      
      if (success) {
        setData(newData)
        return true
      } else {
        throw new Error('Mentés sikertelen')
      }
    } catch (err) {
      setError(err.message)
      console.error(`${dataType} mentése sikertelen:`, err)
      return false
    } finally {
      setSaving(false)
    }
  }, [dataType])

  // Kép feltöltése
  const uploadImage = useCallback(async (imageName, imageData) => {
    try {
      setError(null)
      const imageUrl = await githubService.uploadImage(imageName, imageData)
      return imageUrl
    } catch (err) {
      setError(err.message)
      console.error('Kép feltöltése sikertelen:', err)
      return null
    }
  }, [])

  // Kezdeti betöltés
  useEffect(() => {
    loadData()
  }, [loadData])

  return {
    data,
    setData,
    loading,
    saving,
    error,
    loadData,
    saveData,
    uploadImage
  }
} 