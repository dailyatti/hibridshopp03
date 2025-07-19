import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Phone, Mail, Instagram, Clock, MapPin, Heart, Star, Calendar, Award, Shield, Users, ChevronRight, ChevronDown, Menu, X, Settings } from 'lucide-react'
import './App.css'
import AdminPanel from './components/AdminPanel.jsx'
import Gallery from './components/Gallery.jsx'
import GalleryPage from './components/GalleryPage.jsx'
import { useGitHubData } from '@/hooks/useGitHubData.js'

// Import dog images
import dog1 from './assets/371091897_839629824179864_1843142989333076425_n.jpg'
import dog2 from './assets/viber_kep_2025-06-12_17-57-52-976.jpg'
import dog3 from './assets/viber_kep_2025-06-12_17-57-51-752.jpg'
import dog4 from './assets/viber_kep_2025-06-12_17-57-52-245.jpg'
import dog5 from './assets/viber_kep_2025-06-12_17-54-15-104.jpg'
import dog6 from './assets/viber_kep_2025-06-12_17-54-04-740.jpg'

function App() {
  const [selectedDog, setSelectedDog] = useState(null)
  const [showBooking, setShowBooking] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [showAdmin, setShowAdmin] = useState(false)
  const [showGalleryPage, setShowGalleryPage] = useState(false)

  // Available dogs data
  const availableDogs = [
    {
      id: 1,
      name: "Carlos",
      breed: "Maltipoo",
      age: "9 hetes",
      price: "350.000 Ft",
      image: dog1,
      description: "Második generációs Maltipoo, gyönyörű vörös-barna göndör szőrzet, nagyon játékos és szeretetteljes természet. Carlos egy igazi családi kedvenc, aki imádja a gyerekeket és könnyen alkalmazkodik új környezethez.",
      gender: "Fiú",
      vaccinated: true,
      microchipped: true,
      weight: "2.5 kg",
      parents: "Máltai selyemkutya anya × Toy uszkár apa",
      temperament: "Játékos, szeretetteljes, intelligens",
      specialFeatures: ["Hipoallergén szőrzet", "Könnyen tanítható", "Gyerekbarát", "Lakásban tartható"],
      category: "maltipoo"
    },
    {
      id: 2,
      name: "Joker",
      breed: "Maltipoo",
      age: "8 hetes",
      price: "320.000 Ft",
      image: dog2,
      description: "Második generációs Maltipoo, fehér-barna hosszú szőrzet, szelíd és nyugodt természet. Joker tökéletes választás azoknak, akik egy békés, kiegyensúlyozott kutyust keresnek.",
      gender: "Fiú",
      vaccinated: true,
      microchipped: true,
      weight: "2.2 kg",
      parents: "Máltai selyemkutya anya × Toy uszkár apa",
      temperament: "Szelíd, nyugodt, ragaszkodó",
      specialFeatures: ["Hosszú, selymes szőrzet", "Nyugodt természet", "Ideális társkutya", "Könnyen kezelhető"],
      category: "maltipoo"
    },
    {
      id: 3,
      name: "Charlie",
      breed: "Maltipoo",
      age: "9 hetes",
      price: "340.000 Ft",
      image: dog3,
      description: "Krém-barna göndör szőrzet, nagyon intelligens és tanítható. Charlie egy kivételesen okos kölyök, aki gyorsan megtanulja a parancsokat.",
      gender: "Kan",
      vaccinated: true,
      microchipped: true,
      weight: "2.8 kg",
      parents: "Máltai selyemkutya anya × Miniature uszkár apa",
      temperament: "Intelligens, aktív, tanulékony",
      specialFeatures: ["Rendkívül okos", "Gyorsan tanul", "Aktív természet", "Kiváló családi kutya"],
      category: "maltipoo"
    },
    {
      id: 4,
      name: "Fanto",
      breed: "Cavapoo",
      age: "15 hetes",
      price: "200.000 Ft",
      image: dog4,
      description: "Barna göndör szőrzet, imádja a szabadtéri tevékenységeket. Fanto egy energikus, kalandvágyó kölyök, aki tökéletes aktív családoknak.",
      gender: "Fiú",
      vaccinated: true,
      microchipped: true,
      weight: "3.1 kg",
      parents: "Cavalier King Charles spániel anya × Toy uszkár apa",
      temperament: "Energikus, barátságos, kalandvágyó",
      specialFeatures: ["Szabadtér szerető", "Nagyon barátságos", "Jó egészség", "Aktív életmódhoz ideális"],
      category: "cavapoo"
    },
    {
      id: 5,
      name: "Max és Buddy",
      breed: "Labrador és Maltipoo",
      age: "Felnőtt és 6 hetes",
      price: "280.000 Ft",
      image: dog5,
      description: "Arany Labrador és imádnivaló Maltipoo kölyök különleges páros. Max, a tapasztalt Labrador segít Buddy, a kis Maltipoo szocializációjában.",
      gender: "Vegyes",
      vaccinated: true,
      microchipped: true,
      weight: "25 kg + 1.8 kg",
      parents: "Labrador (Max) + Maltipoo kölyök (Buddy)",
      temperament: "Barátságos, védelmező, játékos",
      specialFeatures: ["Különleges páros", "Tapasztalt kutya + kölyök", "Kiváló szocializáció", "Családi környezethez"],
      category: "special"
    },
    {
      id: 6,
      name: "Coco",
      breed: "Maltipoo",
      age: "7 hetes",
      price: "360.000 Ft",
      image: dog6,
      description: "Vörös-barna göndör szőrzet, nagyon aktív és társaságkedvelő természet. Coco egy igazi kis energiabomba, aki mindig jó hangulatot teremt.",
      gender: "Szuka",
      vaccinated: true,
      microchipped: true,
      weight: "2.0 kg",
      parents: "Máltai selyemkutya anya × Toy uszkár apa",
      temperament: "Aktív, társaságkedvelő, vidám",
      specialFeatures: ["Nagyon aktív", "Társaságkedvelő", "Vidám természet", "Kiváló játszótárs"],
      category: "maltipoo"
    }
  ]

  // GitHub data hooks
  const {
    data: dogs,
    setData: setDogs,
    loading: dogsLoading,
    saving: dogsSaving,
    error: dogsError,
    saveData: saveDogs
  } = useGitHubData('dogs')

  const {
    data: galleryImages,
    setData: setGalleryImages,
    loading: galleryLoading,
    saving: gallerySaving,
    error: galleryError,
    saveData: saveGallery
  } = useGitHubData('gallery')

  const {
    data: bookings,
    setData: setBookings,
    loading: bookingsLoading,
    saving: bookingsSaving,
    error: bookingsError,
    saveData: saveBookings
  } = useGitHubData('bookings')

  const {
    data: contactInfo,
    setData: setContactInfo,
    loading: contactLoading,
    saving: contactSaving,
    error: contactError,
    saveData: saveContact
  } = useGitHubData('contact')

  const {
    data: menuItems,
    setData: setMenuItems,
    loading: menuLoading,
    saving: menuSaving,
    error: menuError,
    saveData: saveMenu
  } = useGitHubData('menu')

  // Initialize with default data if empty
  useEffect(() => {
    if (dogs.length === 0) {
      setDogs(availableDogs)
    }
    if (galleryImages.length === 0) {
      setGalleryImages([
        {
          id: 1,
          url: dog1,
          title: "Carlos",
          description: "Maltipoo kölyök",
          category: "maltipoo"
        },
        {
          id: 2,
          url: dog2,
          title: "Joker",
          description: "Maltipoo kölyök",
          category: "maltipoo"
        },
        {
          id: 3,
          url: dog3,
          title: "Charlie",
          description: "Maltipoo kölyök",
          category: "maltipoo"
        },
        {
          id: 4,
          url: dog4,
          title: "Fanto",
          description: "Cavapoo kölyök",
          category: "cavapoo"
        },
        {
          id: 5,
          url: dog5,
          title: "Max és Buddy",
          description: "Labrador és Maltipoo",
          category: "special"
        },
        {
          id: 6,
          url: dog6,
          title: "Coco",
          description: "Maltipoo kölyök",
          category: "maltipoo"
        }
      ])
    }
    if (Object.keys(contactInfo).length === 0) {
      setContactInfo({
        phone: "+36 70 217 885",
        phoneRaw: "3670217885",
        email: "shoppdogg583@gmail.com",
        instagram: "@hibridshopp",
        tiktok: "@maltipoo.kecskemt",
        workingHours: "Hétfő-Péntek: 8:00 - 22:00",
        address: "Kecskemét, Magyarország"
      })
    }
    if (menuItems.length === 0) {
      setMenuItems([
        { id: 'home', label: 'Főoldal', visible: true, order: 1 },
        { id: 'breeds', label: 'Fajták', visible: true, order: 2 },
        { id: 'available', label: 'Eladó Kutyák', visible: true, order: 3 },
        { id: 'gallery', label: 'Galéria', visible: true, order: 4 },
        { id: 'contact', label: 'Kapcsolat', visible: true, order: 5 }
      ])
    }
  }, [dogs, galleryImages, contactInfo, menuItems, setDogs, setGalleryImages, setContactInfo, setMenuItems])

  // Auto-save data to GitHub when data changes
  useEffect(() => {
    if (dogs.length > 0) {
      saveDogs(dogs)
    }
  }, [dogs, saveDogs])

  useEffect(() => {
    if (galleryImages.length > 0) {
      saveGallery(galleryImages)
    }
  }, [galleryImages, saveGallery])

  useEffect(() => {
    saveBookings(bookings)
  }, [bookings, saveBookings])

  useEffect(() => {
    if (Object.keys(contactInfo).length > 0) {
      saveContact(contactInfo)
    }
  }, [contactInfo, saveContact])

  useEffect(() => {
    if (menuItems.length > 0) {
      saveMenu(menuItems)
    }
  }, [menuItems, saveMenu])

  // Listen for gallery page open event from admin panel
  useEffect(() => {
    const handleOpenGalleryPage = () => {
      setShowAdmin(false)
      setShowGalleryPage(true)
    }

    window.addEventListener('openGalleryPage', handleOpenGalleryPage)
    return () => window.removeEventListener('openGalleryPage', handleOpenGalleryPage)
  }, [])

  // Scroll spy effect
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'breeds', 'available', 'gallery', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleBookingSubmit = async (formData) => {
    try {
      // Convert DD/MM/YYYY to YYYY-MM-DD for backend
      let processedFormData = { ...formData };
      if (formData.preferred_date && formData.preferred_date.includes('/')) {
        const [day, month, year] = formData.preferred_date.split('/');
        processedFormData.preferred_date = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      }
      
      // Add booking to local state and save to GitHub
      const newBooking = {
        id: Date.now(),
        ...processedFormData,
        status: 'pending',
        created_at: new Date().toISOString()
      }
      
      const updatedBookings = [...bookings, newBooking]
      setBookings(updatedBookings)
      
      alert('Időpont sikeresen lefoglalva! 24 órán belül felvesszük Önnel a kapcsolatot a megerősítéshez.');
      setShowBooking(false);
      setBookingForm({
        name: '',
        phone: '',
        email: '',
        preferred_date: '',
        preferred_time: '9:00',
        message: '',
        dog_id: null,
        dog_name: null
      });
    } catch (error) {
      alert('Hiba történt az időpont foglalás során: ' + error.message);
    }
  };

  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    email: '',
    preferred_date: '',
    preferred_time: '9:00',
    message: '',
    dog_id: null,
    dog_name: null
  });

  const breeds = [
    {
      name: "Maltipoo",
      description: "A máltai selyemkutya és az intelligens uszkár keresztezése. Ez a kis termetű, vidám keverék tökéletes választás lakásba vagy családba egyaránt.",
      traits: ["Okos és könnyen tanítható", "Ragaszkodó, bújós és gyerekbarát", "Alig vedlik - allergiásoknak is jó", "Játékos, aktív, mégis alkalmazkodó"],
      availableDogs: availableDogs.filter(dog => dog.category === "maltipoo"),
      icon: "🐕",
      gradient: "from-orange-400 to-red-400"
    },
    {
      name: "Uszkár",
      description: "Az uszkár az egyik legintelligensebb kutyafajta, amely nemcsak gyönyörű megjelenésével, hanem barátságos természetével is meghódítja a szíveket.",
      traits: ["Rendkívül okos és könnyen tanítható", "Családcentrikus és hűséges társ", "Göndör, alig vedlő szőrzet", "Aktív, játékos és nagyon alkalmazkodó"],
      availableDogs: [],
      icon: "🦮",
      gradient: "from-blue-400 to-purple-400"
    },
    {
      name: "Cavapoo/Cockapoo",
      description: "A Cocker spániel/Cavalier King Spániel és az Uszkár keresztezése. Vidám, intelligens, szeretetre méltó fajta.",
      traits: ["Okos, könnyen tanul", "Játékos és ragaszkodó", "Szőrzetük göndör vagy hullámos", "Tökéletes választás családoknak"],
      availableDogs: availableDogs.filter(dog => dog.category === "cavapoo"),
      icon: "🐶",
      gradient: "from-green-400 to-teal-400"
    },
    {
      name: "Goldendoodle",
      description: "A barátságos Golden Retriever és az intelligens Uszkár keresztezéséből született vidám, játékos és hűséges kutya.",
      traits: ["Nagyon okos, könnyen tanítható", "Barátságos, szeretetéhes", "Szőrzete göndör vagy hullámos", "Imád játszani, mozogni"],
      availableDogs: [],
      icon: "🦴",
      gradient: "from-yellow-400 to-orange-400"
    }
  ]

  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  const formatDateFromInput = (dateString) => {
    if (!dateString) return '';
    const [day, month, year] = dateString.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-amber-50 relative overflow-x-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-200/30 to-amber-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-pink-200/20 to-rose-200/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md shadow-2xl sticky top-0 z-50 border-b border-orange-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-400 via-amber-500 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-all duration-300">
                  <Heart className="w-7 h-7 text-white animate-pulse" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                  Hibrid Shopp
                </h1>
                <p className="text-sm text-gray-600 font-medium">Prémium Kutyatenyésztés</p>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-8">
              {[
                { id: 'home', label: 'Főoldal' },
                { id: 'breeds', label: 'Fajták' },
                { id: 'available', label: 'Eladó Kutyák' },
                { id: 'gallery', label: 'Galéria' },
                { id: 'contact', label: 'Kapcsolat' }
              ].map((item) => (
                <a 
                  key={item.id}
                  href={`#${item.id}`} 
                  className={`relative text-gray-700 hover:text-orange-500 transition-all duration-300 font-medium group ${
                    activeSection === item.id ? 'text-orange-500' : ''
                  }`}
                >
                  {item.label}
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-amber-500 transition-all duration-300 group-hover:w-full ${
                    activeSection === item.id ? 'w-full' : ''
                  }`}></span>
                </a>
              ))}
            </nav>

            {/* Mobile menu button */}
            <button 
              className="lg:hidden p-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Admin Button */}
            <Button 
              onClick={() => {
                console.log('Admin button clicked, setting showAdmin to true')
                setShowAdmin(true)
              }}
              variant="outline"
              className="hidden lg:flex border-2 border-orange-200 hover:bg-orange-50 text-orange-600 rounded-xl px-4 py-2 mr-2"
            >
              <Settings className="w-4 h-4 mr-2" />
              Admin
            </Button>

            {/* CTA Button */}
            <Button 
              onClick={() => setShowBooking(true)}
              className="hidden lg:flex bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 hover:from-orange-600 hover:via-amber-600 hover:to-yellow-600 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 rounded-xl px-6 py-3"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Időpont Foglalás
            </Button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-4 p-4 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-orange-100">
              <nav className="flex flex-col space-y-3">
                {[
                  { id: 'home', label: 'Főoldal' },
                  { id: 'breeds', label: 'Fajták' },
                  { id: 'available', label: 'Eladó Kutyák' },
                  { id: 'gallery', label: 'Galéria' },
                  { id: 'contact', label: 'Kapcsolat' }
                ].map((item) => (
                  <a 
                    key={item.id}
                    href={`#${item.id}`} 
                    className="text-gray-700 hover:text-orange-500 transition-colors font-medium py-2 px-4 rounded-lg hover:bg-orange-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
                <Button 
                  onClick={() => {
                    setShowBooking(true)
                    setMobileMenuOpen(false)
                  }}
                  className="mt-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Időpont Foglalás
                </Button>
                <Button 
                  onClick={() => {
                    console.log('Mobile admin button clicked, setting showAdmin to true')
                    setShowAdmin(true)
                    setMobileMenuOpen(false)
                  }}
                  variant="outline"
                  className="mt-2 border-2 border-orange-200 hover:bg-orange-50 text-orange-600 rounded-xl"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Admin Panel
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative py-20 px-4 overflow-hidden">
        <div className="container mx-auto text-center relative z-10">
          <div className="mb-8 animate-fade-in-up">
            <h2 className="text-6xl md:text-7xl font-bold text-gray-800 mb-6 leading-tight">
              Találd meg a tökéletes{' '}
              <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 bg-clip-text text-transparent animate-gradient">
                társadat
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              Professzionális kutyatenyésztés szeretettel és gondossággal. Maltipoo, Uszkár, Cavapoo és Goldendoodle fajtákra specializálódtunk.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 mb-16">
            {[
              { icon: Award, text: "Professzionális Tenyésztés", color: "from-blue-500 to-purple-500" },
              { icon: Shield, text: "Egészséggarancia", color: "from-green-500 to-teal-500" },
              { icon: Users, text: "24/7 Támogatás", color: "from-orange-500 to-red-500" }
            ].map((item, index) => (
              <div key={index} className="group">
                <Badge variant="secondary" className="text-lg py-3 px-6 bg-white/80 backdrop-blur-md shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-gray-200/50 rounded-2xl">
                  <div className={`w-6 h-6 mr-3 rounded-lg bg-gradient-to-r ${item.color} p-1 flex items-center justify-center`}>
                    <item.icon className="w-4 h-4 text-white" />
                  </div>
                  {item.text}
                </Badge>
              </div>
            ))}
          </div>
          
          {/* Featured Dogs Preview */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {availableDogs.slice(0, 3).map((dog, index) => (
              <div key={dog.id} className="group cursor-pointer" onClick={() => setSelectedDog(dog)}>
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 bg-white/90 backdrop-blur-md border border-gray-200/50 rounded-3xl">
                  <div className="relative overflow-hidden">
                    <img 
                      src={dog.image} 
                      alt={dog.name}
                      className="w-full h-72 object-contain bg-gradient-to-br from-orange-50 to-amber-50 transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <Badge className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg rounded-xl px-3 py-1">
                      {dog.price}
                    </Badge>
                  </div>
                  <CardHeader className="text-center p-6">
                    <CardTitle className="text-2xl font-bold text-gray-800 group-hover:text-orange-600 transition-colors duration-300">
                      {dog.name}
                    </CardTitle>
                    <CardDescription className="text-orange-600 font-semibold text-lg">
                      {dog.breed}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Breeds Section */}
      <section id="breeds" className="py-20 px-4 bg-white/50 backdrop-blur-md relative">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-5xl font-bold text-gray-800 mb-6">Fajtáink</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Minden fajtánk gondosan kiválasztott szülőktől származik, garantálva az egészséget és a kiváló temperamentumot.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {breeds.map((breed, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white/90 backdrop-blur-md border border-gray-200/50 rounded-3xl overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${breed.gradient}`}></div>
                <CardHeader className="text-center p-6">
                  <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {breed.icon}
                  </div>
                  <CardTitle className="text-orange-600 text-xl font-bold mb-3">{breed.name}</CardTitle>
                  <CardDescription className="text-gray-600 leading-relaxed">{breed.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <ul className="space-y-3 mb-6">
                    {breed.traits.map((trait, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-600">
                        <Star className="w-4 h-4 mr-3 text-amber-400 flex-shrink-0" />
                        {trait}
                      </li>
                    ))}
                  </ul>
                  {breed.availableDogs.length > 0 && (
                    <div className="mt-6">
                      <p className="text-sm font-semibold text-gray-700 mb-3">Elérhető kölykök:</p>
                      <div className="flex flex-wrap gap-2">
                        {breed.availableDogs.map((dog) => (
                          <Badge 
                            key={dog.id} 
                            variant="outline" 
                            className="text-xs cursor-pointer hover:bg-orange-100 hover:border-orange-300 transition-all duration-300 rounded-lg px-3 py-1"
                            onClick={() => setSelectedDog(dog)}
                          >
                            {dog.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Available Dogs Section */}
      <section id="available" className="py-20 px-4 relative">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-5xl font-bold text-gray-800 mb-6">Eladó Kutyáink</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Minden kiskutyánk szeretettel nevelkedik családi környezetben, biztosítva a legjobb szocializációt.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {availableDogs.map((dog, index) => (
              <Card key={dog.id} className="group overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 bg-white/90 backdrop-blur-md border border-gray-200/50 rounded-3xl">
                <div className="relative overflow-hidden">
                  <img 
                    src={dog.image} 
                    alt={dog.name}
                    className="w-full h-80 object-contain bg-gradient-to-br from-orange-50 to-amber-50 transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Badge className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg rounded-xl px-4 py-2 text-lg font-bold">
                    {dog.price}
                  </Badge>
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-white/90 text-gray-700 rounded-xl px-3 py-1">
                      {dog.age}
                    </Badge>
                  </div>
                </div>
                <CardHeader className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <CardTitle className="text-2xl font-bold text-gray-800 group-hover:text-orange-600 transition-colors duration-300">
                        {dog.name}
                      </CardTitle>
                      <CardDescription className="text-orange-600 font-semibold text-lg">
                        {dog.breed}
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="rounded-xl px-3 py-1 border-orange-200 text-orange-600">
                      {dog.gender}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <p className="text-gray-600 mb-6 leading-relaxed">{dog.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <Badge variant="secondary" className="rounded-lg px-3 py-1">Súly: {dog.weight}</Badge>
                    {dog.vaccinated && <Badge variant="secondary" className="rounded-lg px-3 py-1 bg-green-100 text-green-700">Oltott</Badge>}
                    {dog.microchipped && <Badge variant="secondary" className="rounded-lg px-3 py-1 bg-blue-100 text-blue-700">Chippelt</Badge>}
                  </div>
                  <div className="space-y-3 mb-6 text-sm">
                    <p><strong className="text-gray-700">Temperamentum:</strong> <span className="text-gray-600">{dog.temperament}</span></p>
                    <p><strong className="text-gray-700">Szülők:</strong> <span className="text-gray-600">{dog.parents}</span></p>
                  </div>
                  <Button 
                    className="w-full bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 hover:from-orange-600 hover:via-amber-600 hover:to-yellow-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 rounded-xl py-3"
                    onClick={() => setSelectedDog(dog)}
                  >
                    <Heart className="w-5 h-5 mr-2" />
                    Részletek
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <Gallery galleryImages={galleryImages} onOpenGalleryPage={() => setShowGalleryPage(true)} />

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 relative">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-5xl font-bold text-gray-800 mb-6">Kapcsolat</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Vegye fel velünk a kapcsolatot, és találja meg álmai kutyusát!
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <h4 className="text-3xl font-semibold text-gray-800 mb-8">Elérhetőségek</h4>
              <div className="space-y-6">
                {[
                  { 
                    icon: Phone, 
                    text: "+36 70 217 885 (WhatsApp és Viber)", 
                    color: "from-green-500 to-emerald-500",
                    link: "tel:+3670217885",
                    whatsapp: "https://wa.me/3670217885"
                  },
                  { 
                    icon: Mail, 
                    text: "shoppdogg583@gmail.com", 
                    color: "from-blue-500 to-cyan-500",
                    link: "mailto:shoppdogg583@gmail.com"
                  },
                  { 
                    icon: Clock, 
                    text: "Hétfő-Péntek: 8:00 - 22:00", 
                    color: "from-purple-500 to-pink-500"
                  },
                  { 
                    icon: Instagram, 
                    text: "@hibridshopp", 
                    color: "from-pink-500 to-rose-500", 
                    link: "https://www.instagram.com/hibridshopp" 
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-4 group">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${item.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300`}>
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    {item.link ? (
                      <div className="flex flex-col space-y-1">
                        <a href={item.link} className="text-gray-700 hover:text-orange-600 transition-colors duration-300 text-lg font-medium">
                          {item.text}
                        </a>
                        {item.whatsapp && (
                          <a 
                            href={item.whatsapp} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-green-600 hover:text-green-700 transition-colors duration-300 text-sm font-medium"
                          >
                            📱 WhatsApp üzenet küldése
                          </a>
                        )}
                      </div>
                    ) : (
                      <span className="text-gray-700 text-lg font-medium">{item.text}</span>
                    )}
                  </div>
                ))}
                <div className="flex items-center space-x-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-gray-700 to-gray-900 flex items-center justify-center shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300">
                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                    </svg>
                  </div>
                  <a 
                    href="https://www.tiktok.com/@maltipoo.kecskemt" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-orange-600 transition-colors duration-300 text-lg font-medium"
                  >
                    @maltipoo.kecskemt
                  </a>
                </div>
              </div>
            </div>
            
            <div>
              <Card className="bg-white/90 backdrop-blur-md border border-gray-200/50 rounded-3xl shadow-2xl overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-orange-500 to-amber-500"></div>
                <CardHeader className="p-8">
                  <CardTitle className="text-2xl font-bold text-gray-800">Időpont Foglalás</CardTitle>
                  <CardDescription className="text-gray-600 text-lg">
                    Foglaljon időpontot, hogy megismerje imádnivaló kiskutyáinkat
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <Button 
                    className="w-full bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 hover:from-orange-600 hover:via-amber-600 hover:to-yellow-600 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 rounded-xl py-4 text-lg"
                    onClick={() => setShowBooking(true)}
                  >
                    <Calendar className="w-5 h-5 mr-3" />
                    Látogatás Időpontja
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-amber-500/10"></div>
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                Hibrid Shopp
              </span>
            </div>
            <p className="text-gray-300 mb-8 text-lg max-w-2xl mx-auto">
              Professzionális kutyatenyésztés szeretettel és gondossággal. Minden kiskutyánk családi környezetben nevelkedik.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <h5 className="font-bold text-xl mb-4 text-orange-400">Elérhető Fajták</h5>
              <p className="text-gray-300">Maltipoo, Cavapoo, Goldendoodle</p>
            </div>
            <div className="text-center">
              <h5 className="font-bold text-xl mb-4 text-orange-400">Szolgáltatások</h5>
              <p className="text-gray-300">Tenyésztés, Tanácsadás, Utógondozás</p>
            </div>
            <div className="text-center">
              <h5 className="font-bold text-xl mb-4 text-orange-400">Garanciák</h5>
              <p className="text-gray-300">Egészséggarancia, Élethosszig tartó támogatás</p>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-400">© 2025 Hibrid Shopp. Minden jog fenntartva.</p>
          </div>
        </div>
      </footer>

      {/* Dog Detail Modal */}
      {selectedDog && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <Card className="max-w-5xl w-full max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-md border border-gray-200/50 rounded-3xl shadow-2xl">
            <CardHeader className="p-8">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-4xl font-bold text-gray-800 mb-2">{selectedDog.name}</CardTitle>
                  <CardDescription className="text-orange-600 font-semibold text-2xl">
                    {selectedDog.breed}
                  </CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedDog(null)}
                  className="rounded-xl p-3 hover:bg-gray-100 transition-colors duration-300"
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-8 pt-0">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <img 
                    src={selectedDog.image} 
                    alt={selectedDog.name}
                    className="w-full h-96 object-contain bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl mb-6 shadow-lg"
                  />
                </div>
                <div>
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <strong className="text-gray-700">Kor:</strong>
                      <p className="text-gray-600 text-lg">{selectedDog.age}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <strong className="text-gray-700">Nem:</strong>
                      <p className="text-gray-600 text-lg">{selectedDog.gender}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <strong className="text-gray-700">Ár:</strong>
                      <p className="text-orange-600 text-lg font-bold">{selectedDog.price}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <strong className="text-gray-700">Súly:</strong>
                      <p className="text-gray-600 text-lg">{selectedDog.weight}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div className="bg-blue-50 p-4 rounded-xl">
                      <strong className="text-gray-700">Szülők:</strong>
                      <p className="text-gray-600">{selectedDog.parents}</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-xl">
                      <strong className="text-gray-700">Temperamentum:</strong>
                      <p className="text-gray-600">{selectedDog.temperament}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed text-lg">{selectedDog.description}</p>
                  
                  <div className="mb-6">
                    <strong className="text-gray-700 text-lg">Különleges tulajdonságok:</strong>
                    <ul className="list-none mt-3 space-y-2">
                      {selectedDog.specialFeatures.map((feature, index) => (
                        <li key={index} className="flex items-center text-gray-600">
                          <Star className="w-4 h-4 mr-3 text-amber-400" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex flex-wrap gap-3 mb-8">
                    {selectedDog.vaccinated && (
                      <Badge variant="secondary" className="bg-green-100 text-green-700 px-4 py-2 rounded-xl">
                        Oltott
                      </Badge>
                    )}
                    {selectedDog.microchipped && (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl">
                        Chippelt
                      </Badge>
                    )}
                    <Badge variant="secondary" className="bg-orange-100 text-orange-700 px-4 py-2 rounded-xl">
                      Egészséggarancia
                    </Badge>
                    <Badge variant="secondary" className="bg-purple-100 text-purple-700 px-4 py-2 rounded-xl">
                      Utógondozás
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4 mt-8">
                <Button 
                  className="flex-1 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 hover:from-orange-600 hover:via-amber-600 hover:to-yellow-600 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 rounded-xl py-4 text-lg"
                  onClick={() => {
                    setSelectedDog(null)
                    setShowBooking(true)
                  }}
                >
                  <Calendar className="w-5 h-5 mr-3" />
                  Látogatás Foglalása
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 border-2 border-orange-200 hover:bg-orange-50 rounded-xl py-4 text-lg"
                  onClick={() => window.open('tel:+3670217885', '_self')}
                >
                  <Phone className="w-5 h-5 mr-3" />
                  Hívás Most
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Booking Modal */}
      {showBooking && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50">
          <Card className="w-full max-w-md sm:max-w-lg bg-white/95 backdrop-blur-md border border-gray-200/50 rounded-2xl sm:rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="p-4 sm:p-6">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl sm:text-2xl font-bold text-gray-800">Időpont Foglalás</CardTitle>
                  <CardDescription className="text-gray-600 text-sm sm:text-base">
                    Foglaljon időpontot kiskutyáink megtekintésére
                  </CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setShowBooking(false)}
                  className="rounded-xl p-2 hover:bg-gray-100 transition-colors duration-300"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="space-y-4 sm:space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold mb-2 text-gray-700">Kívánt Dátum</label>
                    <input 
                      type="text" 
                      className="w-full p-3 sm:p-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 text-sm"
                      placeholder="DD/MM/YYYY"
                      value={bookingForm.preferred_date}
                      onChange={(e) => {
                        const value = e.target.value;
                        // Allow only numbers and slashes
                        const cleanValue = value.replace(/[^0-9/]/g, '');
                        // Auto-format as DD/MM/YYYY
                        let formatted = cleanValue;
                        if (cleanValue.length >= 2 && !cleanValue.includes('/')) {
                          formatted = cleanValue.slice(0, 2) + '/' + cleanValue.slice(2);
                        }
                        if (cleanValue.length >= 5 && cleanValue.split('/').length === 2) {
                          formatted = cleanValue.slice(0, 5) + '/' + cleanValue.slice(5, 9);
                        }
                        setBookingForm({...bookingForm, preferred_date: formatted})
                      }}
                      maxLength="10"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold mb-2 text-gray-700">Kívánt Időpont</label>
                    <select 
                      className="w-full p-3 sm:p-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 text-sm"
                      value={bookingForm.preferred_time}
                      onChange={(e) => setBookingForm({...bookingForm, preferred_time: e.target.value})}
                    >
                      {Array.from({length: 14}, (_, i) => i + 9).map(hour => (
                        <option key={hour} value={`${hour}:00`}>{hour}:00</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold mb-2 text-gray-700">Az Ön Neve</label>
                    <input 
                      type="text" 
                      className="w-full p-3 sm:p-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 text-sm"
                      placeholder="Adja meg a nevét"
                      value={bookingForm.name}
                      onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold mb-2 text-gray-700">Telefonszám</label>
                    <input 
                      type="tel" 
                      className="w-full p-3 sm:p-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 text-sm"
                      placeholder="+36 70 123 4567"
                      value={bookingForm.phone}
                      onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-semibold mb-2 text-gray-700">Üzenet (Opcionális)</label>
                  <textarea 
                    className="w-full p-3 sm:p-3 border border-gray-300 rounded-lg sm:rounded-xl h-20 sm:h-24 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 resize-none text-sm"
                    placeholder="Bármilyen különleges kérés vagy kérdés?"
                    value={bookingForm.message}
                    onChange={(e) => setBookingForm({...bookingForm, message: e.target.value})}
                  />
                </div>
                <Button 
                  className="w-full bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 hover:from-orange-600 hover:via-amber-600 hover:to-yellow-600 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 rounded-lg sm:rounded-xl py-3 sm:py-4 text-sm sm:text-base font-semibold"
                  onClick={() => {
                    const formData = {
                      ...bookingForm,
                      dog_id: selectedDog?.id,
                      dog_name: selectedDog?.name
                    };
                    handleBookingSubmit(formData);
                  }}
                >
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Időpont Megerősítése
                </Button>
                <p className="text-xs sm:text-sm text-gray-500 text-center leading-relaxed">
                  24 órán belül felvesszük Önnel a kapcsolatot az időpont megerősítéséhez
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Admin Panel */}
      {showAdmin && (
        <AdminPanel 
          dogs={dogs}
          setDogs={setDogs}
          galleryImages={galleryImages}
          setGalleryImages={setGalleryImages}
          bookings={bookings}
          setBookings={setBookings}
          contactInfo={contactInfo}
          setContactInfo={setContactInfo}
          menuItems={menuItems}
          setMenuItems={setMenuItems}
          onClose={() => setShowAdmin(false)}
          // GitHub save functions
          saveDogs={saveDogs}
          saveGallery={saveGallery}
          saveBookings={saveBookings}
          saveContact={saveContact}
          saveMenu={saveMenu}
          // Loading states
          dogsLoading={dogsLoading}
          galleryLoading={galleryLoading}
          bookingsLoading={bookingsLoading}
          contactLoading={contactLoading}
          menuLoading={menuLoading}
          // Saving states
          dogsSaving={dogsSaving}
          gallerySaving={gallerySaving}
          bookingsSaving={bookingsSaving}
          contactSaving={contactSaving}
          menuSaving={menuSaving}
          // Error states
          dogsError={dogsError}
          galleryError={galleryError}
          bookingsError={bookingsError}
          contactError={contactError}
          menuError={menuError}
        />
      )}

      {/* Gallery Page */}
      {showGalleryPage && (
        <GalleryPage 
          galleryImages={galleryImages}
          onClose={() => setShowGalleryPage(false)}
          isAdmin={showAdmin}
          onAddImage={() => {
            setShowGalleryPage(false)
            setShowAdmin(true)
            // Itt beállítjuk, hogy az admin panel a galéria tabra ugorjon
            setTimeout(() => {
              const galleryTab = document.querySelector('[data-tab="gallery"]')
              if (galleryTab) {
                galleryTab.click()
              }
            }, 100)
          }}
          onDeleteImage={(imageId) => {
            const updatedImages = galleryImages.filter(img => img.id !== imageId)
            setGalleryImages(updatedImages)
          }}
          onEditImage={(image) => {
            setShowGalleryPage(false)
            setShowAdmin(true)
            // Itt beállítjuk, hogy az admin panel a galéria tabra ugorjon és szerkessze a képet
            setTimeout(() => {
              const galleryTab = document.querySelector('[data-tab="gallery"]')
              if (galleryTab) {
                galleryTab.click()
              }
            }, 100)
          }}
        />
      )}

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }
        
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  )
}

export default App

