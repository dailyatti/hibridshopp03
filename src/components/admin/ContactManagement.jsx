import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { 
  Save,
  Phone,
  Mail,
  Instagram,
  Clock,
  MapPin,
  Globe
} from 'lucide-react'

export default function ContactManagement({ 
  contactInfo, 
  setContactInfo 
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [tempContactInfo, setTempContactInfo] = useState(contactInfo)

  const handleSave = () => {
    setContactInfo(tempContactInfo)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setTempContactInfo(contactInfo)
    setIsEditing(false)
  }

  const handleChange = (field, value) => {
    let updatedInfo = {
      ...tempContactInfo,
      [field]: value
    }
    
    // Automatikusan generáljuk a phoneRaw mezőt a telefonszámból
    if (field === 'phone') {
      const phoneRaw = value.replace(/\D/g, '') // Csak számokat tartunk meg
      updatedInfo.phoneRaw = phoneRaw
    }
    
    setTempContactInfo(updatedInfo)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800">Kapcsolat Beállítások</h2>
        <div className="flex space-x-2">
          {isEditing ? (
            <>
              <Button 
                variant="outline" 
                onClick={handleCancel}
                className="rounded-xl"
              >
                Mégse
              </Button>
              <Button 
                onClick={handleSave}
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl"
              >
                <Save className="w-4 h-4 mr-2" />
                Mentés
              </Button>
            </>
          ) : (
            <Button 
              onClick={() => setIsEditing(true)}
              className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl"
            >
              Szerkesztés
            </Button>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Contact Information */}
        <Card className="bg-white/95 backdrop-blur-md border border-gray-200/50 rounded-3xl shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800">Kapcsolati Adatok</CardTitle>
            <CardDescription>Alapvető kapcsolati információk</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                Telefonszám
              </label>
              {isEditing ? (
                <Input
                  value={tempContactInfo.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="+36 70 217 885"
                  className="rounded-xl"
                />
              ) : (
                <div className="p-3 bg-gray-50 rounded-xl space-y-2">
                  <div className="text-gray-700">{contactInfo.phone}</div>
                  <div className="flex space-x-2 text-sm">
                    <a 
                      href={`tel:+${contactInfo.phoneRaw || '3670217885'}`}
                      className="text-blue-600 hover:text-blue-700 transition-colors duration-300"
                    >
                      📞 Hívás
                    </a>
                    <a 
                      href={`https://wa.me/${contactInfo.phoneRaw || '3670217885'}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-700 transition-colors duration-300"
                    >
                      📱 WhatsApp
                    </a>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                Email cím
              </label>
              {isEditing ? (
                <Input
                  value={tempContactInfo.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="shoppdogg583@gmail.com"
                  className="rounded-xl"
                />
              ) : (
                <div className="p-3 bg-gray-50 rounded-xl space-y-2">
                  <div className="text-gray-700">{contactInfo.email}</div>
                  <a 
                    href={`mailto:${contactInfo.email}`}
                    className="text-blue-600 hover:text-blue-700 transition-colors duration-300 text-sm"
                  >
                    📧 Email küldése
                  </a>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 flex items-center">
                <Instagram className="w-4 h-4 mr-2" />
                Instagram
              </label>
              {isEditing ? (
                <Input
                  value={tempContactInfo.instagram}
                  onChange={(e) => handleChange('instagram', e.target.value)}
                  placeholder="@hibridshopp"
                  className="rounded-xl"
                />
              ) : (
                <div className="p-3 bg-gray-50 rounded-xl space-y-2">
                  <div className="text-gray-700">{contactInfo.instagram}</div>
                  <a 
                    href={`https://www.instagram.com/${contactInfo.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-600 hover:text-pink-700 transition-colors duration-300 text-sm"
                  >
                    📷 Instagram megtekintése
                  </a>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 flex items-center">
                <Globe className="w-4 h-4 mr-2" />
                TikTok
              </label>
              {isEditing ? (
                <Input
                  value={tempContactInfo.tiktok}
                  onChange={(e) => handleChange('tiktok', e.target.value)}
                  placeholder="@maltipoo.kecskemt"
                  className="rounded-xl"
                />
              ) : (
                <div className="p-3 bg-gray-50 rounded-xl space-y-2">
                  <div className="text-gray-700">{contactInfo.tiktok}</div>
                  <a 
                    href={`https://www.tiktok.com/${contactInfo.tiktok}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-700 transition-colors duration-300 text-sm"
                  >
                    🎵 TikTok megtekintése
                  </a>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Business Information */}
        <Card className="bg-white/95 backdrop-blur-md border border-gray-200/50 rounded-3xl shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800">Üzleti Információk</CardTitle>
            <CardDescription>Nyitvatartás és cím</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                Nyitvatartás
              </label>
              {isEditing ? (
                <Input
                  value={tempContactInfo.workingHours}
                  onChange={(e) => handleChange('workingHours', e.target.value)}
                  placeholder="Hétfő-Péntek: 8:00 - 22:00"
                  className="rounded-xl"
                />
              ) : (
                <div className="p-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-700">{contactInfo.workingHours}</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                Cím
              </label>
              {isEditing ? (
                <Input
                  value={tempContactInfo.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  placeholder="Kecskemét, Magyarország"
                  className="rounded-xl"
                />
              ) : (
                <div className="p-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-700">{contactInfo.address}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Preview */}
      <Card className="bg-white/95 backdrop-blur-md border border-gray-200/50 rounded-3xl shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-800">Előnézet</CardTitle>
          <CardDescription>Hogyan jelenik meg a kapcsolat oldalon</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-gray-800">Elérhetőségek</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-gray-700 text-lg font-medium">{tempContactInfo.phone}</span>
                </div>
                
                <div className="flex items-center space-x-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-gray-700 text-lg font-medium">{tempContactInfo.email}</span>
                </div>
                
                <div className="flex items-center space-x-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300">
                    <Instagram className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-gray-700 text-lg font-medium">{tempContactInfo.instagram}</span>
                </div>
                
                <div className="flex items-center space-x-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-gray-700 to-gray-900 flex items-center justify-center shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-gray-700 text-lg font-medium">{tempContactInfo.tiktok}</span>
                </div>
                
                <div className="flex items-center space-x-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-gray-700 text-lg font-medium">{tempContactInfo.workingHours}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Időpont Foglalás Űrlap</h4>
              <Card className="bg-white/90 backdrop-blur-md border border-gray-200/50 rounded-3xl shadow-xl overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-orange-500 to-amber-500"></div>
                <CardHeader className="p-6">
                  <CardTitle className="text-xl font-bold text-gray-800">Időpont Foglalás</CardTitle>
                  <CardDescription className="text-gray-600">
                    Foglaljon időpontot, hogy megismerje imádnivaló kiskutyáinkat
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="space-y-4">
                    <div className="p-3 bg-gray-50 rounded-xl">
                      <p className="text-sm text-gray-600">Kívánt Dátum</p>
                      <p className="text-gray-800 font-medium">2025-01-15</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-xl">
                      <p className="text-sm text-gray-600">Kívánt Időpont</p>
                      <p className="text-gray-800 font-medium">14:00</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-xl">
                      <p className="text-sm text-gray-600">Név</p>
                      <p className="text-gray-800 font-medium">Kovács Anna</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-xl">
                      <p className="text-sm text-gray-600">Telefonszám</p>
                      <p className="text-gray-800 font-medium">{tempContactInfo.phone}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 