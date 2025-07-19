import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Button } from '@/components/ui/button.jsx'
import { X, ZoomIn, ChevronLeft, ChevronRight, Grid, List, Plus, Edit, Trash2 } from 'lucide-react'

export default function GalleryPage({ galleryImages, onClose, isAdmin = false, onAddImage, onDeleteImage, onEditImage }) {
  const [selectedImage, setSelectedImage] = useState(null)
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Kategóriák kinyerése
  const categories = ['all', ...new Set(galleryImages.map(img => img.category).filter(Boolean))]

  // Szűrt képek
  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory)

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-2xl sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                onClick={onClose}
                className="bg-white/20 hover:bg-white/30 text-white border-white/30 rounded-xl"
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                Vissza
              </Button>
              <div>
                <h1 className="text-3xl font-bold">Galéria</h1>
                <p className="text-orange-100">Kiskutyáink legszebb pillanatai</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Kategória szűrő */}
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-white/20 text-white border-white/30 rounded-xl px-4 py-2 focus:ring-2 focus:ring-white/50"
              >
                {categories.map(category => (
                  <option key={category} value={category} className="text-gray-800">
                    {category === 'all' ? 'Összes kép' : category}
                  </option>
                ))}
              </select>
              
              {/* Nézet mód váltó */}
              <div className="flex bg-white/20 rounded-xl p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  onClick={() => setViewMode('grid')}
                  className={`rounded-lg ${viewMode === 'grid' ? 'bg-white text-orange-600' : 'text-white hover:bg-white/20'}`}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  onClick={() => setViewMode('list')}
                  className={`rounded-lg ${viewMode === 'list' ? 'bg-white text-orange-600' : 'text-white hover:bg-white/20'}`}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>

              {/* Admin gombok */}
              {isAdmin && (
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={onAddImage}
                    className="bg-green-500 hover:bg-green-600 text-white rounded-xl"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Új Kép
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {filteredImages.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ZoomIn className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Nincsenek képek</h3>
            <p className="text-gray-600">A kiválasztott kategóriában még nincsenek képek.</p>
          </div>
        ) : (
          <div className={`${
            viewMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6' 
              : 'space-y-4'
          }`}>
            {filteredImages.map((image) => (
              <Card 
                key={image.id} 
                className={`group overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white/90 backdrop-blur-md border border-gray-200/50 rounded-3xl cursor-pointer ${
                  viewMode === 'list' ? 'flex' : ''
                }`}
                onClick={() => setSelectedImage(image)}
              >
                <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-48 h-32' : ''}`}>
                  <img 
                    src={image.url} 
                    alt={image.title}
                    className={`w-full transition-transform duration-500 group-hover:scale-110 ${
                      viewMode === 'list' ? 'h-32 object-cover' : 'h-64 object-contain'
                    }`}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
                  <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ZoomIn className="w-6 h-6 text-white" />
                  </div>
                  {image.category && (
                    <Badge className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white">
                      {image.category}
                    </Badge>
                  )}
                  
                  {/* Admin gombok */}
                  {isAdmin && (
                    <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={(e) => {
                          e.stopPropagation()
                          onEditImage(image)
                        }}
                        className="bg-white/90 hover:bg-white rounded-lg"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={(e) => {
                          e.stopPropagation()
                          if (confirm('Biztosan törölni szeretné ezt a képet?')) {
                            onDeleteImage(image.id)
                          }
                        }}
                        className="bg-red-500 hover:bg-red-600 text-white rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
                <CardContent className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                  {image.title && (
                    <h4 className="text-lg font-bold text-gray-800 mb-1">{image.title}</h4>
                  )}
                  {image.description && (
                    <p className="text-gray-600 text-sm line-clamp-2">{image.description}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="relative max-w-6xl w-full max-h-[90vh]">
            <Button 
              variant="outline" 
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white rounded-xl"
            >
              <X className="w-5 h-5" />
            </Button>
            
            <div className="flex items-center justify-between absolute top-1/2 transform -translate-y-1/2 w-full px-4 z-10">
              <Button 
                variant="outline" 
                onClick={() => {
                  const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id)
                  const prevIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1
                  setSelectedImage(filteredImages[prevIndex])
                }}
                className="bg-white/80 hover:bg-white/90 backdrop-blur-sm rounded-full w-12 h-12 p-0"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id)
                  const nextIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0
                  setSelectedImage(filteredImages[nextIndex])
                }}
                className="bg-white/80 hover:bg-white/90 backdrop-blur-sm rounded-full w-12 h-12 p-0"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </div>
            
            <img 
              src={selectedImage.url} 
              alt={selectedImage.title}
              className="w-full h-auto max-h-[80vh] object-contain rounded-2xl"
            />
            
            <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-sm rounded-xl p-4">
              {selectedImage.title && (
                <h3 className="text-xl font-bold text-white mb-2">{selectedImage.title}</h3>
              )}
              {selectedImage.description && (
                <p className="text-gray-200">{selectedImage.description}</p>
              )}
              {selectedImage.category && (
                <Badge className="mt-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white">
                  {selectedImage.category}
                </Badge>
              )}
              {!selectedImage.title && !selectedImage.description && !selectedImage.category && (
                <p className="text-gray-300 italic">Csak kép - adatok nélkül</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 