import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { 
  Plus, 
  Trash2, 
  Edit, 
  Eye,
  X,
  Save,
  Upload,
  Image as ImageIcon,
  FileText
} from 'lucide-react'

export default function GalleryManagement({ 
  galleryImages, 
  setGalleryImages, 
  editingImage, 
  setEditingImage, 
  showAddImage, 
  setShowAddImage 
}) {
  const [newImage, setNewImage] = useState({
    url: '',
    title: '',
    description: '',
    category: ''
  })
  const [imageOnlyMode, setImageOnlyMode] = useState(false)

  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [isDragOver, setIsDragOver] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      processImageFile(file)
    }
  }

  const processImageFile = (file) => {
    // Ellenőrizzük a fájl típusát
    if (!file.type.startsWith('image/')) {
      alert('Kérjük csak képeket töltsön fel!')
      return
    }
    
    // Ellenőrizzük a fájl méretét (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('A kép mérete nem lehet nagyobb 5MB-nál!')
      return
    }
    
    setIsUploading(true)
    setImageFile(file)
    const reader = new FileReader()
    reader.onload = (e) => {
      setImagePreview(e.target.result)
      setNewImage({...newImage, url: e.target.result})
      setIsUploading(false)
    }
    reader.onerror = () => {
      alert('Hiba történt a kép feltöltése során!')
      setIsUploading(false)
    }
    reader.readAsDataURL(file)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragOver(false)
    const files = e.dataTransfer.files
    if (files.length > 0) {
      processImageFile(files[0])
    }
  }

  const handleAddImage = () => {
    if (newImage.url || imagePreview) {
      const image = {
        ...newImage,
        id: Date.now(),
        url: newImage.url || imagePreview,
        title: imageOnlyMode ? '' : newImage.title,
        description: imageOnlyMode ? '' : newImage.description,
        category: imageOnlyMode ? '' : newImage.category
      }
      setGalleryImages([...galleryImages, image])
      setNewImage({
        url: '',
        title: '',
        description: '',
        category: ''
      })
      setImageFile(null)
      setImagePreview('')
      setIsDragOver(false)
      setImageOnlyMode(false)
      setIsUploading(false)
      setShowAddImage(false)
    } else {
      alert('Kérjük válasszon ki egy képet!')
    }
  }

  const handleEditImage = (image) => {
    setEditingImage(image)
  }

  const handleSaveEdit = () => {
    if (editingImage.url && editingImage.title) {
      setGalleryImages(galleryImages.map(img => img.id === editingImage.id ? editingImage : img))
      setEditingImage(null)
    } else {
      alert('Kérjük töltse ki az összes kötelező mezőt!')
    }
  }

  const handleDeleteImage = (id) => {
    if (confirm('Biztosan törölni szeretné ezt a képet?')) {
      setGalleryImages(galleryImages.filter(img => img.id !== id))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">Galéria Kezelése</h2>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <Button 
            variant="outline"
            onClick={() => {
              // Itt visszaváltunk a galéria oldalra
              window.dispatchEvent(new CustomEvent('openGalleryPage'))
            }}
            className="border-orange-200 text-orange-600 hover:bg-orange-50 rounded-xl order-1 sm:order-none"
          >
            <Eye className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Galéria Megtekintése</span>
            <span className="sm:hidden">Megtekintés</span>
          </Button>
          <div className="flex bg-gray-100 rounded-xl p-1 order-3 sm:order-none">
            <Button
              variant={!imageOnlyMode ? 'default' : 'ghost'}
              onClick={() => setImageOnlyMode(false)}
              className={`rounded-lg text-xs sm:text-sm ${!imageOnlyMode ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-600 hover:text-orange-600'}`}
            >
              <FileText className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Adatokkal</span>
              <span className="sm:hidden">Adatok</span>
            </Button>
            <Button
              variant={imageOnlyMode ? 'default' : 'ghost'}
              onClick={() => setImageOnlyMode(true)}
              className={`rounded-lg text-xs sm:text-sm ${imageOnlyMode ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-600 hover:text-orange-600'}`}
            >
              <ImageIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Csak Kép</span>
              <span className="sm:hidden">Kép</span>
            </Button>
          </div>
          <Button 
            onClick={() => setShowAddImage(true)}
            className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl order-2 sm:order-none"
          >
            <Plus className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Új Kép Hozzáadása</span>
            <span className="sm:hidden">Új Kép</span>
          </Button>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {galleryImages.map((image) => (
          <Card key={image.id} className="bg-white/95 backdrop-blur-md border border-gray-200/50 rounded-3xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="relative">
              <img 
                src={image.url} 
                alt={image.title}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
              <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => handleEditImage(image)}
                  className="bg-white/90 hover:bg-white rounded-lg"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDeleteImage(image.id)}
                  className="bg-red-500 hover:bg-red-600 text-white rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              {image.category && (
                <Badge className="absolute top-2 left-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white">
                  {image.category}
                </Badge>
              )}
            </div>
            <CardContent className="p-4">
              {image.title && (
                <h3 className="text-lg font-bold text-gray-800 mb-1">{image.title}</h3>
              )}
              {image.description && (
                <p className="text-gray-600 text-sm line-clamp-2">{image.description}</p>
              )}
              {!image.title && !image.description && (
                <p className="text-gray-400 text-sm italic">Csak kép - adatok nélkül</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Image Modal */}
      {showAddImage && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50">
          <Card className="w-full max-w-lg mx-4 bg-white/95 backdrop-blur-md border border-gray-200/50 rounded-2xl sm:rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="p-4 sm:p-6">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl sm:text-2xl font-bold text-gray-800">Új Kép Hozzáadása</CardTitle>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowAddImage(false)
                    setImageFile(null)
                    setImagePreview('')
                    setImageOnlyMode(false)
                    setIsUploading(false)
                    setNewImage({
                      url: '',
                      title: '',
                      description: '',
                      category: ''
                    })
                  }}
                  className="rounded-xl p-2 sm:p-3"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="space-y-4">
                {!imageOnlyMode && (
                  <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-xl">
                    <p className="text-blue-800 text-xs sm:text-sm">
                      📝 <strong>Adatokkal mód:</strong> Kép címe, leírása és kategóriája megadása kötelező
                    </p>
                  </div>
                )}
                {imageOnlyMode && (
                  <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl">
                    <p className="text-green-800 text-xs sm:text-sm">
                      🖼️ <strong>Csak kép mód:</strong> Csak a képet kell feltölteni, adatok nélkül
                    </p>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Kép feltöltése *</label>
                  <div className="space-y-3">
                    <div 
                      className={`border-2 border-dashed rounded-xl p-4 sm:p-6 text-center transition-all duration-300 ${
                        isDragOver 
                          ? 'border-orange-400 bg-orange-50' 
                          : 'border-gray-300 hover:border-orange-400'
                      }`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label htmlFor="image-upload" className={`cursor-pointer block ${isUploading ? 'pointer-events-none' : ''}`}>
                        <div className="space-y-2">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto">
                            {isUploading ? (
                              <div className="animate-spin rounded-full h-5 w-5 sm:h-6 sm:w-6 border-2 border-orange-600 border-t-transparent"></div>
                            ) : (
                              <ImageIcon className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
                            )}
                          </div>
                          <div>
                            {isUploading ? (
                              <p className="text-xs sm:text-sm font-medium text-orange-600">Kép feltöltése...</p>
                            ) : (
                              <>
                                <p className="text-xs sm:text-sm font-medium text-gray-700">Kattintson a kép kiválasztásához</p>
                                <p className="text-xs text-gray-500">vagy húzza ide a képet</p>
                              </>
                            )}
                          </div>
                        </div>
                      </label>
                    </div>
                    {isUploading && (
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-orange-500 to-amber-500 h-2 rounded-full animate-pulse"></div>
                      </div>
                    )}
                    <div className="text-center">
                      <p className="text-xs text-gray-500 mb-2">Vagy adjon meg egy URL címet:</p>
                      <Input
                        value={newImage.url}
                        onChange={(e) => setNewImage({...newImage, url: e.target.value})}
                        placeholder="https://example.com/image.jpg"
                        className="rounded-xl text-sm"
                        disabled={isUploading}
                      />
                    </div>
                  </div>
                </div>
                {!imageOnlyMode && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">Cím *</label>
                      <Input
                        value={newImage.title}
                        onChange={(e) => setNewImage({...newImage, title: e.target.value})}
                        placeholder="Kép címe"
                        className="rounded-xl text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">Leírás</label>
                      <Textarea
                        value={newImage.description}
                        onChange={(e) => setNewImage({...newImage, description: e.target.value})}
                        placeholder="Kép leírása"
                        className="rounded-xl text-sm"
                        rows={3}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">Kategória</label>
                      <Select value={newImage.category} onValueChange={(value) => setNewImage({...newImage, category: value})}>
                        <SelectTrigger className="rounded-xl text-sm">
                          <SelectValue placeholder="Válasszon kategóriát" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="maltipoo">Maltipoo</SelectItem>
                          <SelectItem value="cavapoo">Cavapoo</SelectItem>
                          <SelectItem value="goldendoodle">Goldendoodle</SelectItem>
                          <SelectItem value="uszkár">Uszkár</SelectItem>
                          <SelectItem value="kölykök">Kölykök</SelectItem>
                          <SelectItem value="felnőttek">Felnőttek</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}
                {newImage.url && (
                  <div className="mt-4">
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Előnézet</label>
                    <div className="relative">
                      <img 
                        src={newImage.url} 
                        alt="Előnézet"
                        className="w-full h-32 sm:h-48 object-cover rounded-xl border border-gray-200"
                        onError={(e) => {
                          e.target.style.display = 'none'
                          e.target.nextSibling.style.display = 'flex'
                        }}
                      />
                      <div className="hidden w-full h-32 sm:h-48 bg-gray-100 rounded-xl border border-gray-200 items-center justify-center">
                        <div className="text-center text-gray-500">
                          <ImageIcon className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-2" />
                          <p className="text-xs sm:text-sm">Kép nem betölthető</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 mt-6">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowAddImage(false)
                    setImageFile(null)
                    setImagePreview('')
                    setIsDragOver(false)
                    setImageOnlyMode(false)
                    setIsUploading(false)
                    setNewImage({
                      url: '',
                      title: '',
                      description: '',
                      category: ''
                    })
                  }}
                  className="rounded-xl order-2 sm:order-1"
                >
                  Mégse
                </Button>
                <Button 
                  onClick={handleAddImage}
                  className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl order-1 sm:order-2"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Hozzáadás
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Edit Image Modal */}
      {editingImage && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50">
          <Card className="w-full max-w-lg mx-4 bg-white/95 backdrop-blur-md border border-gray-200/50 rounded-2xl sm:rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="p-4 sm:p-6">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl sm:text-2xl font-bold text-gray-800">Kép Szerkesztése</CardTitle>
                <Button 
                  variant="outline" 
                  onClick={() => setEditingImage(null)}
                  className="rounded-xl p-2 sm:p-3"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Kép URL *</label>
                  <Input
                    value={editingImage.url}
                    onChange={(e) => setEditingImage({...editingImage, url: e.target.value})}
                    placeholder="Kép URL címe"
                    className="rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Cím *</label>
                  <Input
                    value={editingImage.title}
                    onChange={(e) => setEditingImage({...editingImage, title: e.target.value})}
                    placeholder="Kép címe"
                    className="rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Leírás</label>
                  <Textarea
                    value={editingImage.description}
                    onChange={(e) => setEditingImage({...editingImage, description: e.target.value})}
                    placeholder="Kép leírása"
                    className="rounded-xl text-sm"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Kategória</label>
                  <Select value={editingImage.category} onValueChange={(value) => setEditingImage({...editingImage, category: value})}>
                    <SelectTrigger className="rounded-xl text-sm">
                      <SelectValue placeholder="Válasszon kategóriát" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="maltipoo">Maltipoo</SelectItem>
                      <SelectItem value="cavapoo">Cavapoo</SelectItem>
                      <SelectItem value="goldendoodle">Goldendoodle</SelectItem>
                      <SelectItem value="uszkár">Uszkár</SelectItem>
                      <SelectItem value="kölykök">Kölykök</SelectItem>
                      <SelectItem value="felnőttek">Felnőttek</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {editingImage.url && (
                  <div className="mt-4">
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Előnézet</label>
                    <div className="relative">
                      <img 
                        src={editingImage.url} 
                        alt="Előnézet"
                        className="w-full h-32 sm:h-48 object-cover rounded-xl border border-gray-200"
                        onError={(e) => {
                          e.target.style.display = 'none'
                          e.target.nextSibling.style.display = 'flex'
                        }}
                      />
                      <div className="hidden w-full h-32 sm:h-48 bg-gray-100 rounded-xl border border-gray-200 items-center justify-center">
                        <div className="text-center text-gray-500">
                          <ImageIcon className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-2" />
                          <p className="text-xs sm:text-sm">Kép nem betölthető</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 mt-6">
                <Button 
                  variant="outline" 
                  onClick={() => setEditingImage(null)}
                  className="rounded-xl order-2 sm:order-1"
                >
                  Mégse
                </Button>
                <Button 
                  onClick={handleSaveEdit}
                  className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl order-1 sm:order-2"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Mentés
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
} 