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
  Upload
} from 'lucide-react'

export default function DogsManagement({ 
  dogs, 
  setDogs, 
  editingDog, 
  setEditingDog, 
  showAddDog, 
  setShowAddDog 
}) {
  const [newDog, setNewDog] = useState({
    name: '',
    breed: '',
    age: '',
    price: '',
    image: '',
    description: '',
    gender: '',
    vaccinated: false,
    microchipped: false,
    weight: '',
    parents: '',
    temperament: '',
    specialFeatures: [],
    category: '',
    isAvailable: true
  })

  const [newFeature, setNewFeature] = useState('')

  const handleAddDog = () => {
    if (newDog.name && newDog.breed && newDog.price) {
      const dog = {
        ...newDog,
        id: Date.now(),
        specialFeatures: newDog.specialFeatures.filter(f => f.trim() !== '')
      }
      setDogs([...dogs, dog])
      setNewDog({
        name: '',
        breed: '',
        age: '',
        price: '',
        image: '',
        description: '',
        gender: '',
        vaccinated: false,
        microchipped: false,
        weight: '',
        parents: '',
        temperament: '',
        specialFeatures: [],
        category: '',
        isAvailable: true
      })
      setShowAddDog(false)
    } else {
      alert('Kérjük töltse ki az összes kötelező mezőt!')
    }
  }

  const handleEditDog = (dog) => {
    setEditingDog(dog)
  }

  const handleSaveEdit = () => {
    if (editingDog.name && editingDog.breed && editingDog.price) {
      setDogs(dogs.map(dog => dog.id === editingDog.id ? editingDog : dog))
      setEditingDog(null)
    } else {
      alert('Kérjük töltse ki az összes kötelező mezőt!')
    }
  }

  const handleDeleteDog = (id) => {
    if (confirm('Biztosan törölni szeretné ezt a kutyát?')) {
      setDogs(dogs.filter(dog => dog.id !== id))
    }
  }

  const addFeature = () => {
    if (newFeature.trim()) {
      if (editingDog) {
        setEditingDog({
          ...editingDog,
          specialFeatures: [...editingDog.specialFeatures, newFeature.trim()]
        })
      } else {
        setNewDog({
          ...newDog,
          specialFeatures: [...newDog.specialFeatures, newFeature.trim()]
        })
      }
      setNewFeature('')
    }
  }

  const removeFeature = (index) => {
    if (editingDog) {
      setEditingDog({
        ...editingDog,
        specialFeatures: editingDog.specialFeatures.filter((_, i) => i !== index)
      })
    } else {
      setNewDog({
        ...newDog,
        specialFeatures: newDog.specialFeatures.filter((_, i) => i !== index)
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800">Kutyák Kezelése</h2>
        <Button 
          onClick={() => setShowAddDog(true)}
          className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl"
        >
          <Plus className="w-4 h-4 mr-2" />
          Új Kutya Hozzáadása
        </Button>
      </div>

      {/* Dogs List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dogs.map((dog) => (
          <Card key={dog.id} className="bg-white/95 backdrop-blur-md border border-gray-200/50 rounded-3xl shadow-xl overflow-hidden">
            <div className="relative">
              <img 
                src={dog.image} 
                alt={dog.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2 flex space-x-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => handleEditDog(dog)}
                  className="bg-white/90 hover:bg-white rounded-lg"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDeleteDog(dog.id)}
                  className="bg-red-500 hover:bg-red-600 text-white rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <Badge className="absolute top-2 left-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white">
                {dog.price}
              </Badge>
            </div>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{dog.name}</h3>
              <p className="text-orange-600 font-semibold mb-2">{dog.breed}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge variant="outline" className="text-xs">{dog.age}</Badge>
                <Badge variant="outline" className="text-xs">{dog.gender}</Badge>
                {dog.vaccinated && <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">Oltott</Badge>}
                {dog.microchipped && <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">Chippelt</Badge>}
              </div>
              <p className="text-gray-600 text-sm line-clamp-3">{dog.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Dog Modal */}
      {showAddDog && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-md border border-gray-200/50 rounded-3xl shadow-2xl">
            <CardHeader className="p-6">
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl font-bold text-gray-800">Új Kutya Hozzáadása</CardTitle>
                <Button 
                  variant="outline" 
                  onClick={() => setShowAddDog(false)}
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
                    value={newDog.name}
                    onChange={(e) => setNewDog({...newDog, name: e.target.value})}
                    placeholder="Kutya neve"
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Fajta *</label>
                  <Select value={newDog.breed} onValueChange={(value) => setNewDog({...newDog, breed: value})}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Válasszon fajtát" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Maltipoo">Maltipoo</SelectItem>
                      <SelectItem value="Cavapoo">Cavapoo</SelectItem>
                      <SelectItem value="Goldendoodle">Goldendoodle</SelectItem>
                      <SelectItem value="Uszkár">Uszkár</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Kor</label>
                  <Input
                    value={newDog.age}
                    onChange={(e) => setNewDog({...newDog, age: e.target.value})}
                    placeholder="pl. 8 hetes"
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Ár *</label>
                  <Input
                    value={newDog.price}
                    onChange={(e) => setNewDog({...newDog, price: e.target.value})}
                    placeholder="pl. 350.000 Ft"
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Nem</label>
                  <Select value={newDog.gender} onValueChange={(value) => setNewDog({...newDog, gender: value})}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Válasszon nemet" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Fiú">Fiú</SelectItem>
                      <SelectItem value="Szuka">Szuka</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Súly</label>
                  <Input
                    value={newDog.weight}
                    onChange={(e) => setNewDog({...newDog, weight: e.target.value})}
                    placeholder="pl. 2.5 kg"
                    className="rounded-xl"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Kép URL</label>
                  <Input
                    value={newDog.image}
                    onChange={(e) => setNewDog({...newDog, image: e.target.value})}
                    placeholder="Kép URL címe"
                    className="rounded-xl"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Leírás</label>
                  <Textarea
                    value={newDog.description}
                    onChange={(e) => setNewDog({...newDog, description: e.target.value})}
                    placeholder="Kutya részletes leírása"
                    className="rounded-xl"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Szülők</label>
                  <Input
                    value={newDog.parents}
                    onChange={(e) => setNewDog({...newDog, parents: e.target.value})}
                    placeholder="Szülők leírása"
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Temperamentum</label>
                  <Input
                    value={newDog.temperament}
                    onChange={(e) => setNewDog({...newDog, temperament: e.target.value})}
                    placeholder="Temperamentum leírása"
                    className="rounded-xl"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Különleges tulajdonságok</label>
                  <div className="flex space-x-2 mb-3">
                    <Input
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      placeholder="Új tulajdonság"
                      className="rounded-xl"
                      onKeyPress={(e) => e.key === 'Enter' && addFeature()}
                    />
                    <Button onClick={addFeature} className="rounded-xl">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {newDog.specialFeatures.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="rounded-lg">
                        {feature}
                        <button
                          onClick={() => removeFeature(index)}
                          className="ml-2 text-red-500 hover:text-red-700"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="md:col-span-2 flex space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={newDog.vaccinated}
                      onChange={(e) => setNewDog({...newDog, vaccinated: e.target.checked})}
                      className="rounded"
                    />
                    <span className="text-sm font-medium text-gray-700">Oltott</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={newDog.microchipped}
                      onChange={(e) => setNewDog({...newDog, microchipped: e.target.checked})}
                      className="rounded"
                    />
                    <span className="text-sm font-medium text-gray-700">Chippelt</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={newDog.isAvailable}
                      onChange={(e) => setNewDog({...newDog, isAvailable: e.target.checked})}
                      className="rounded"
                    />
                    <span className="text-sm font-medium text-gray-700">Eladó</span>
                  </label>
                </div>
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <Button 
                  variant="outline" 
                  onClick={() => setShowAddDog(false)}
                  className="rounded-xl"
                >
                  Mégse
                </Button>
                <Button 
                  onClick={handleAddDog}
                  className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Hozzáadás
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Edit Dog Modal */}
      {editingDog && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-md border border-gray-200/50 rounded-3xl shadow-2xl">
            <CardHeader className="p-6">
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl font-bold text-gray-800">Kutya Szerkesztése</CardTitle>
                <Button 
                  variant="outline" 
                  onClick={() => setEditingDog(null)}
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
                    value={editingDog.name}
                    onChange={(e) => setEditingDog({...editingDog, name: e.target.value})}
                    placeholder="Kutya neve"
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Fajta *</label>
                  <Select value={editingDog.breed} onValueChange={(value) => setEditingDog({...editingDog, breed: value})}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Válasszon fajtát" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Maltipoo">Maltipoo</SelectItem>
                      <SelectItem value="Cavapoo">Cavapoo</SelectItem>
                      <SelectItem value="Goldendoodle">Goldendoodle</SelectItem>
                      <SelectItem value="Uszkár">Uszkár</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Kor</label>
                  <Input
                    value={editingDog.age}
                    onChange={(e) => setEditingDog({...editingDog, age: e.target.value})}
                    placeholder="pl. 8 hetes"
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Ár *</label>
                  <Input
                    value={editingDog.price}
                    onChange={(e) => setEditingDog({...editingDog, price: e.target.value})}
                    placeholder="pl. 350.000 Ft"
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Nem</label>
                  <Select value={editingDog.gender} onValueChange={(value) => setEditingDog({...editingDog, gender: value})}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Válasszon nemet" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Fiú">Fiú</SelectItem>
                      <SelectItem value="Szuka">Szuka</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Súly</label>
                  <Input
                    value={editingDog.weight}
                    onChange={(e) => setEditingDog({...editingDog, weight: e.target.value})}
                    placeholder="pl. 2.5 kg"
                    className="rounded-xl"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Kép URL</label>
                  <Input
                    value={editingDog.image}
                    onChange={(e) => setEditingDog({...editingDog, image: e.target.value})}
                    placeholder="Kép URL címe"
                    className="rounded-xl"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Leírás</label>
                  <Textarea
                    value={editingDog.description}
                    onChange={(e) => setEditingDog({...editingDog, description: e.target.value})}
                    placeholder="Kutya részletes leírása"
                    className="rounded-xl"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Szülők</label>
                  <Input
                    value={editingDog.parents}
                    onChange={(e) => setEditingDog({...editingDog, parents: e.target.value})}
                    placeholder="Szülők leírása"
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Temperamentum</label>
                  <Input
                    value={editingDog.temperament}
                    onChange={(e) => setEditingDog({...editingDog, temperament: e.target.value})}
                    placeholder="Temperamentum leírása"
                    className="rounded-xl"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Különleges tulajdonságok</label>
                  <div className="flex space-x-2 mb-3">
                    <Input
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      placeholder="Új tulajdonság"
                      className="rounded-xl"
                      onKeyPress={(e) => e.key === 'Enter' && addFeature()}
                    />
                    <Button onClick={addFeature} className="rounded-xl">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {editingDog.specialFeatures.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="rounded-lg">
                        {feature}
                        <button
                          onClick={() => removeFeature(index)}
                          className="ml-2 text-red-500 hover:text-red-700"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="md:col-span-2 flex space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={editingDog.vaccinated}
                      onChange={(e) => setEditingDog({...editingDog, vaccinated: e.target.checked})}
                      className="rounded"
                    />
                    <span className="text-sm font-medium text-gray-700">Oltott</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={editingDog.microchipped}
                      onChange={(e) => setEditingDog({...editingDog, microchipped: e.target.checked})}
                      className="rounded"
                    />
                    <span className="text-sm font-medium text-gray-700">Chippelt</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={editingDog.isAvailable}
                      onChange={(e) => setEditingDog({...editingDog, isAvailable: e.target.checked})}
                      className="rounded"
                    />
                    <span className="text-sm font-medium text-gray-700">Eladó</span>
                  </label>
                </div>
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <Button 
                  variant="outline" 
                  onClick={() => setEditingDog(null)}
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