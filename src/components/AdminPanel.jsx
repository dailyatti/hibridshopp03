import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { 
  Settings, 
  Users, 
  Image, 
  Calendar, 
  Phone, 
  Mail, 
  Instagram, 
  Save, 
  Plus, 
  Trash2, 
  Edit, 
  Eye,
  LogOut,
  Home,
  Images,
  Dog,
  Contact,
  Menu,
  X,
  Clock
} from 'lucide-react'

import DogsManagement from './admin/DogsManagement.jsx'
import GalleryManagement from './admin/GalleryManagement.jsx'
import BookingsManagement from './admin/BookingsManagement.jsx'
import ContactManagement from './admin/ContactManagement.jsx'
import MenuManagement from './admin/MenuManagement.jsx'

function AdminPanel({ 
  dogs, 
  setDogs, 
  galleryImages, 
  setGalleryImages, 
  bookings, 
  setBookings, 
  contactInfo, 
  setContactInfo, 
  menuItems, 
  setMenuItems, 
  onClose 
}) {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
    // Data states - use props instead of local state

  const [editingDog, setEditingDog] = useState(null)
  const [editingImage, setEditingImage] = useState(null)
  const [editingBooking, setEditingBooking] = useState(null)
  const [showAddDog, setShowAddDog] = useState(false)
  const [showAddImage, setShowAddImage] = useState(false)
  const [showAddBooking, setShowAddBooking] = useState(false)

  // Authentication
  const handleLogin = () => {
    if (password === 'HibridShopp2024!@#') {
      setIsAuthenticated(true)
      localStorage.setItem('adminAuthenticated', 'true')
    } else {
      alert('Hibás jelszó!')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('adminAuthenticated')
  }

  useEffect(() => {
    const auth = localStorage.getItem('adminAuthenticated')
    if (auth === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  // Save functions
  const saveData = () => {
    localStorage.setItem('adminDogs', JSON.stringify(dogs))
    localStorage.setItem('adminGallery', JSON.stringify(galleryImages))
    localStorage.setItem('adminBookings', JSON.stringify(bookings))
    localStorage.setItem('adminContact', JSON.stringify(contactInfo))
    localStorage.setItem('adminMenu', JSON.stringify(menuItems))
    alert('Adatok sikeresen mentve!')
  }

  const publishData = () => {
    // Itt küldenénk az adatokat a szerverre
    saveData()
    alert('Adatok sikeresen közzétéve!')
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-amber-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white/95 backdrop-blur-md border border-gray-200/50 rounded-3xl shadow-2xl">
          <CardHeader className="text-center p-8">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Settings className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800">Admin Panel</CardTitle>
            <CardDescription className="text-gray-600">
              Jelentkezzen be a rendszerbe
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-0">
            <div className="space-y-4">
              <Input
                type="password"
                placeholder="Admin jelszó"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                className="rounded-xl"
              />
              <Button 
                onClick={handleLogin}
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl"
              >
                Bejelentkezés
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-amber-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md shadow-2xl border-b border-orange-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-amber-500 rounded-2xl flex items-center justify-center">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                  Admin Panel
                </h1>
                <p className="text-sm text-gray-600">Hibrid Shopp Kezelőfelület</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button 
                onClick={saveData}
                className="bg-green-500 hover:bg-green-600 text-white rounded-xl"
              >
                <Save className="w-4 h-4 mr-2" />
                Mentés
              </Button>
              <Button 
                onClick={publishData}
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl"
              >
                Közzététel
              </Button>
              <Button 
                onClick={handleLogout}
                variant="outline"
                className="rounded-xl"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Kilépés
              </Button>
              <Button 
                onClick={onClose}
                variant="outline"
                className="rounded-xl"
              >
                <X className="w-4 h-4 mr-2" />
                Bezárás
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-white/95 backdrop-blur-md border border-gray-200/50 rounded-3xl shadow-xl">
              <CardContent className="p-6">
                <nav className="space-y-2">
                  {[
                    { id: 'dashboard', label: 'Vezérlőpult', icon: Home },
                    { id: 'dogs', label: 'Kutyák Kezelése', icon: Dog },
                    { id: 'gallery', label: 'Galéria', icon: Images },
                    { id: 'bookings', label: 'Időpontok', icon: Calendar },
                    { id: 'contact', label: 'Kapcsolat', icon: Contact },
                    { id: 'menu', label: 'Menü Beállítások', icon: Menu }
                  ].map((item) => (
                    <button
                      key={item.id}
                      data-tab={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 ${
                        activeTab === item.id
                          ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg'
                          : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'dashboard' && (
              <Dashboard dogs={dogs} bookings={bookings} />
            )}
            
            {activeTab === 'dogs' && (
              <DogsManagement 
                dogs={dogs} 
                setDogs={setDogs}
                editingDog={editingDog}
                setEditingDog={setEditingDog}
                showAddDog={showAddDog}
                setShowAddDog={setShowAddDog}
              />
            )}
            
            {activeTab === 'gallery' && (
              <GalleryManagement 
                galleryImages={galleryImages}
                setGalleryImages={setGalleryImages}
                editingImage={editingImage}
                setEditingImage={setEditingImage}
                showAddImage={showAddImage}
                setShowAddImage={setShowAddImage}
              />
            )}
            
            {activeTab === 'bookings' && (
              <BookingsManagement 
                bookings={bookings}
                setBookings={setBookings}
                editingBooking={editingBooking}
                setEditingBooking={setEditingBooking}
              />
            )}
            
            {activeTab === 'contact' && (
              <ContactManagement 
                contactInfo={contactInfo}
                setContactInfo={setContactInfo}
              />
            )}
            
            {activeTab === 'menu' && (
              <MenuManagement 
                menuItems={menuItems}
                setMenuItems={setMenuItems}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Dashboard Component
function Dashboard({ dogs, bookings }) {
  const availableDogs = dogs.filter(dog => dog.isAvailable)
  const pendingBookings = bookings.filter(booking => booking.status === 'pending')
  const totalBookings = bookings.length

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Vezérlőpult</h2>
      
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-white/95 backdrop-blur-md border border-gray-200/50 rounded-3xl shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                <Dog className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Eladó Kutyák</p>
                <p className="text-2xl font-bold text-gray-800">{availableDogs.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/95 backdrop-blur-md border border-gray-200/50 rounded-3xl shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Összes Foglalás</p>
                <p className="text-2xl font-bold text-gray-800">{totalBookings}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/95 backdrop-blur-md border border-gray-200/50 rounded-3xl shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Függő Foglalások</p>
                <p className="text-2xl font-bold text-gray-800">{pendingBookings.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-white/95 backdrop-blur-md border border-gray-200/50 rounded-3xl shadow-xl">
          <CardHeader>
            <CardTitle>Legutóbbi Foglalások</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {bookings.slice(0, 5).map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-medium text-gray-800">{booking.name}</p>
                    <p className="text-sm text-gray-600">{booking.dog_name}</p>
                  </div>
                  <Badge variant={booking.status === 'pending' ? 'secondary' : 'default'}>
                    {booking.status === 'pending' ? 'Függő' : 'Megerősített'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/95 backdrop-blur-md border border-gray-200/50 rounded-3xl shadow-xl">
          <CardHeader>
            <CardTitle>Eladó Kutyák</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {availableDogs.slice(0, 5).map((dog) => (
                <div key={dog.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                  <img src={dog.image} alt={dog.name} className="w-12 h-12 object-cover rounded-lg" />
                  <div>
                    <p className="font-medium text-gray-800">{dog.name}</p>
                    <p className="text-sm text-gray-600">{dog.breed} • {dog.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AdminPanel 