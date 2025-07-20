import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Button } from '@/components/ui/button.jsx'
import { X, ZoomIn, ChevronLeft, ChevronRight, Play, Pause, Images } from 'lucide-react'

export default function Gallery({ galleryImages, onOpenGalleryPage }) {
  const [selectedImage, setSelectedImage] = useState(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    if (!isPlaying || galleryImages.length === 0) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % galleryImages.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isPlaying, galleryImages.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % galleryImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  return (
    <section id="gallery" className="py-20 px-4 relative">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h3 className="text-5xl font-bold text-gray-800 mb-6">Galéria</h3>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Nézze meg kiskutyáink legszebb pillanatait és a tenyésztőnk mindennapjait
          </p>
          <Button 
            onClick={onOpenGalleryPage}
            className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 rounded-xl py-3 px-6 text-lg"
          >
            <Images className="w-5 h-5 mr-2" />
            Teljes Galéria Megnyitása
          </Button>
        </div>
        
        {/* Slideshow */}
        {galleryImages.length > 0 && (
          <div className="relative max-w-6xl mx-auto mb-16">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-br from-orange-50 to-amber-50">
              <img 
                src={galleryImages[currentSlide].url} 
                alt={galleryImages[currentSlide].title}
                className="w-full h-[600px] object-contain transition-all duration-700 ease-in-out"
              />
              
              {/* Controls */}
              <div className="absolute inset-0 flex items-center justify-between p-4">
                <Button 
                  variant="outline" 
                  onClick={prevSlide}
                  className="bg-white/80 hover:bg-white/90 backdrop-blur-sm rounded-full w-12 h-12 p-0"
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="bg-white/80 hover:bg-white/90 backdrop-blur-sm rounded-full w-12 h-12 p-0"
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={nextSlide}
                  className="bg-white/80 hover:bg-white/90 backdrop-blur-sm rounded-full w-12 h-12 p-0"
                >
                  <ChevronRight className="w-6 h-6" />
                </Button>
              </div>

              {/* Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {galleryImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? 'bg-white scale-125' 
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Image Modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="relative max-w-4xl w-full max-h-[90vh]">
              <Button 
                variant="outline" 
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white rounded-xl"
              >
                <X className="w-5 h-5" />
              </Button>
              <img 
                src={selectedImage.url} 
                alt={selectedImage.title}
                className="w-full h-auto max-h-[80vh] object-contain rounded-2xl"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-sm rounded-xl p-4">
                <h3 className="text-xl font-bold text-white mb-2">{selectedImage.title}</h3>
                {selectedImage.description && (
                  <p className="text-gray-200">{selectedImage.description}</p>
                )}
                {selectedImage.category && (
                  <Badge className="mt-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white">
                    {selectedImage.category}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
} 