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
  Calendar,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

export default function BookingsManagement({ 
  bookings, 
  setBookings, 
  editingBooking, 
  setEditingBooking 
}) {
  const [filterStatus, setFilterStatus] = useState('all')

  const handleEditBooking = (booking) => {
    setEditingBooking(booking)
  }

  const handleSaveEdit = () => {
    if (editingBooking.name && editingBooking.phone && editingBooking.preferred_date) {
      setBookings(bookings.map(booking => booking.id === editingBooking.id ? editingBooking : booking))
      setEditingBooking(null)
    } else {
      alert('Kérjük töltse ki az összes kötelező mezőt!')
    }
  }

  const handleDeleteBooking = (id) => {
    if (confirm('Biztosan törölni szeretné ezt a foglalást?')) {
      setBookings(bookings.filter(booking => booking.id !== id))
    }
  }

  const handleStatusChange = (id, status) => {
    setBookings(bookings.map(booking => 
      booking.id === id ? { ...booking, status } : booking
    ))
  }

  const filteredBookings = filterStatus === 'all' 
    ? bookings 
    : bookings.filter(booking => booking.status === filterStatus)

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('hu-HU')
  }

  const formatTime = (timeString) => {
    return timeString
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800">Foglalások Kezelése</h2>
        <div className="flex space-x-2">
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-48 rounded-xl">
              <SelectValue placeholder="Szűrés" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Összes foglalás</SelectItem>
              <SelectItem value="pending">Függő</SelectItem>
              <SelectItem value="confirmed">Megerősített</SelectItem>
              <SelectItem value="cancelled">Törölt</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="bg-white/95 backdrop-blur-md border border-gray-200/50 rounded-3xl shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Összes foglalás</p>
                <p className="text-2xl font-bold text-gray-800">{bookings.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/95 backdrop-blur-md border border-gray-200/50 rounded-3xl shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Függő</p>
                <p className="text-2xl font-bold text-gray-800">
                  {bookings.filter(b => b.status === 'pending').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/95 backdrop-blur-md border border-gray-200/50 rounded-3xl shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Megerősített</p>
                <p className="text-2xl font-bold text-gray-800">
                  {bookings.filter(b => b.status === 'confirmed').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/95 backdrop-blur-md border border-gray-200/50 rounded-3xl shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-gray-500 to-gray-700 rounded-2xl flex items-center justify-center">
                <X className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Törölt</p>
                <p className="text-2xl font-bold text-gray-800">
                  {bookings.filter(b => b.status === 'cancelled').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.map((booking) => (
          <Card key={booking.id} className="bg-white/95 backdrop-blur-md border border-gray-200/50 rounded-3xl shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{booking.name}</h3>
                      <p className="text-gray-600">{booking.dog_name || 'Nincs kiválasztott kutya'}</p>
                    </div>
                    <Badge 
                      variant={
                        booking.status === 'confirmed' ? 'default' :
                        booking.status === 'pending' ? 'secondary' :
                        'destructive'
                      }
                      className={
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                        booking.status === 'pending' ? 'bg-orange-100 text-orange-700' :
                        'bg-red-100 text-red-700'
                      }
                    >
                      {booking.status === 'confirmed' ? 'Megerősített' :
                       booking.status === 'pending' ? 'Függő' : 'Törölt'}
                    </Badge>
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700">{booking.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700">{booking.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700">{formatDate(booking.preferred_date)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700">{formatTime(booking.preferred_time)}</span>
                    </div>
                  </div>
                  
                  {booking.message && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-xl">
                      <p className="text-gray-700 text-sm">{booking.message}</p>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col space-y-2 ml-4">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleEditBooking(booking)}
                    className="bg-white/90 hover:bg-white rounded-lg"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDeleteBooking(booking.id)}
                    className="bg-red-500 hover:bg-red-600 text-white rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex space-x-2 mt-4">
                <Button
                  size="sm"
                  variant={booking.status === 'pending' ? 'default' : 'outline'}
                  onClick={() => handleStatusChange(booking.id, 'pending')}
                  className={booking.status === 'pending' ? 'bg-orange-500 hover:bg-orange-600 text-white' : ''}
                >
                  Függő
                </Button>
                <Button
                  size="sm"
                  variant={booking.status === 'confirmed' ? 'default' : 'outline'}
                  onClick={() => handleStatusChange(booking.id, 'confirmed')}
                  className={booking.status === 'confirmed' ? 'bg-green-500 hover:bg-green-600 text-white' : ''}
                >
                  Megerősített
                </Button>
                <Button
                  size="sm"
                  variant={booking.status === 'cancelled' ? 'default' : 'outline'}
                  onClick={() => handleStatusChange(booking.id, 'cancelled')}
                  className={booking.status === 'cancelled' ? 'bg-red-500 hover:bg-red-600 text-white' : ''}
                >
                  Törölt
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Booking Modal */}
      {editingBooking && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <Card className="max-w-2xl w-full bg-white/95 backdrop-blur-md border border-gray-200/50 rounded-3xl shadow-2xl">
            <CardHeader className="p-6">
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl font-bold text-gray-800">Foglalás Szerkesztése</CardTitle>
                <Button 
                  variant="outline" 
                  onClick={() => setEditingBooking(null)}
                  className="rounded-xl"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Név *</label>
                  <Input
                    value={editingBooking.name}
                    onChange={(e) => setEditingBooking({...editingBooking, name: e.target.value})}
                    placeholder="Ügyfél neve"
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Telefonszám *</label>
                  <Input
                    value={editingBooking.phone}
                    onChange={(e) => setEditingBooking({...editingBooking, phone: e.target.value})}
                    placeholder="Telefonszám"
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Email</label>
                  <Input
                    value={editingBooking.email}
                    onChange={(e) => setEditingBooking({...editingBooking, email: e.target.value})}
                    placeholder="Email cím"
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Kívánt Dátum *</label>
                  <Input
                    type="date"
                    value={editingBooking.preferred_date}
                    onChange={(e) => setEditingBooking({...editingBooking, preferred_date: e.target.value})}
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Kívánt Időpont</label>
                  <Select value={editingBooking.preferred_time} onValueChange={(value) => setEditingBooking({...editingBooking, preferred_time: value})}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Válasszon időpontot" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({length: 14}, (_, i) => i + 9).map(hour => (
                        <SelectItem key={hour} value={`${hour}:00`}>{hour}:00</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Státusz</label>
                  <Select value={editingBooking.status} onValueChange={(value) => setEditingBooking({...editingBooking, status: value})}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Válasszon státuszt" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Függő</SelectItem>
                      <SelectItem value="confirmed">Megerősített</SelectItem>
                      <SelectItem value="cancelled">Törölt</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Üzenet</label>
                  <Textarea
                    value={editingBooking.message}
                    onChange={(e) => setEditingBooking({...editingBooking, message: e.target.value})}
                    placeholder="Ügyfél üzenete"
                    className="rounded-xl"
                    rows={3}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <Button 
                  variant="outline" 
                  onClick={() => setEditingBooking(null)}
                  className="rounded-xl"
                >
                  Mégse
                </Button>
                <Button 
                  onClick={handleSaveEdit}
                  className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl"
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