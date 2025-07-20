import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { 
  Plus, 
  Trash2, 
  Edit, 
  Eye,
  EyeOff,
  X,
  Save,
  GripVertical,
  Menu
} from 'lucide-react'

export default function MenuManagement({ 
  menuItems, 
  setMenuItems 
}) {
  const [editingItem, setEditingItem] = useState(null)
  const [showAddItem, setShowAddItem] = useState(false)
  const [newItem, setNewItem] = useState({
    id: '',
    label: '',
    visible: true,
    order: menuItems.length + 1
  })

  const handleAddItem = () => {
    if (newItem.id && newItem.label) {
      const item = {
        ...newItem,
        id: newItem.id.toLowerCase().replace(/\s+/g, '-')
      }
      setMenuItems([...menuItems, item].sort((a, b) => a.order - b.order))
      setNewItem({
        id: '',
        label: '',
        visible: true,
        order: menuItems.length + 1
      })
      setShowAddItem(false)
    } else {
      alert('Kérjük töltse ki az összes kötelező mezőt!')
    }
  }

  const handleEditItem = (item) => {
    setEditingItem(item)
  }

  const handleSaveEdit = () => {
    if (editingItem.id && editingItem.label) {
      setMenuItems(menuItems.map(item => item.id === editingItem.id ? editingItem : item))
      setEditingItem(null)
    } else {
      alert('Kérjük töltse ki az összes kötelező mezőt!')
    }
  }

  const handleDeleteItem = (id) => {
    if (confirm('Biztosan törölni szeretné ezt a menüpontot?')) {
      setMenuItems(menuItems.filter(item => item.id !== id))
    }
  }

  const handleToggleVisibility = (id) => {
    setMenuItems(menuItems.map(item => 
      item.id === id ? { ...item, visible: !item.visible } : item
    ))
  }

  const handleReorder = (fromIndex, toIndex) => {
    const newItems = [...menuItems]
    const [movedItem] = newItems.splice(fromIndex, 1)
    newItems.splice(toIndex, 0, movedItem)
    
    // Update order numbers
    const updatedItems = newItems.map((item, index) => ({
      ...item,
      order: index + 1
    }))
    
    setMenuItems(updatedItems)
  }

  const sortedItems = [...menuItems].sort((a, b) => a.order - b.order)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800">Menü Beállítások</h2>
        <Button 
          onClick={() => setShowAddItem(true)}
          className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl"
        >
          <Plus className="w-4 h-4 mr-2" />
          Új Menüpont
        </Button>
      </div>

      {/* Menu Items List */}
      <Card className="bg-white/95 backdrop-blur-md border border-gray-200/50 rounded-3xl shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-800">Menüpontok</CardTitle>
          <CardDescription>Húzza át a menüpontokat a sorrend módosításához</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sortedItems.map((item, index) => (
              <div 
                key={item.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex flex-col space-y-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="p-1 h-auto"
                      onClick={() => {
                        if (index > 0) handleReorder(index, index - 1)
                      }}
                    >
                      <GripVertical className="w-4 h-4 text-gray-400" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Badge variant="outline" className="rounded-lg">
                      {item.order}
                    </Badge>
                    <div>
                      <h3 className="font-semibold text-gray-800">{item.label}</h3>
                      <p className="text-sm text-gray-600">/{item.id}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant={item.visible ? "default" : "secondary"}
                    onClick={() => handleToggleVisibility(item.id)}
                    className={item.visible ? "bg-green-500 hover:bg-green-600 text-white" : ""}
                  >
                    {item.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleEditItem(item)}
                    className="bg-white/90 hover:bg-white rounded-lg"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDeleteItem(item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Preview */}
      <Card className="bg-white/95 backdrop-blur-md border border-gray-200/50 rounded-3xl shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-800">Előnézet</CardTitle>
          <CardDescription>Hogyan jelenik meg a menü a weboldalon</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-900 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-amber-500 rounded-xl flex items-center justify-center">
                  <Menu className="w-5 h-5 text-white" />
                </div>
                <span className="text-white text-lg font-bold">Hibrid Shopp</span>
              </div>
              
              <nav className="hidden md:flex space-x-6">
                {sortedItems.filter(item => item.visible).map((item) => (
                  <a 
                    key={item.id}
                    href={`#${item.id}`}
                    className="text-gray-300 hover:text-orange-400 transition-colors duration-200 font-medium"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
              
              <Button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl px-4 py-2">
                Időpont Foglalás
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Menu Item Modal */}
      {showAddItem && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <Card className="max-w-md w-full bg-white/95 backdrop-blur-md border border-gray-200/50 rounded-3xl shadow-2xl">
            <CardHeader className="p-6">
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl font-bold text-gray-800">Új Menüpont</CardTitle>
                <Button 
                  variant="outline" 
                  onClick={() => setShowAddItem(false)}
                  className="rounded-xl"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Menüpont ID *</label>
                  <Input
                    value={newItem.id}
                    onChange={(e) => setNewItem({...newItem, id: e.target.value})}
                    placeholder="pl. about, services"
                    className="rounded-xl"
                  />
                  <p className="text-xs text-gray-500 mt-1">Csak kisbetűk és kötőjelek</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Megjelenített név *</label>
                  <Input
                    value={newItem.label}
                    onChange={(e) => setNewItem({...newItem, label: e.target.value})}
                    placeholder="pl. Rólunk, Szolgáltatások"
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Sorrend</label>
                  <Input
                    type="number"
                    value={newItem.order}
                    onChange={(e) => setNewItem({...newItem, order: parseInt(e.target.value)})}
                    min="1"
                    className="rounded-xl"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={newItem.visible}
                    onChange={(e) => setNewItem({...newItem, visible: e.target.checked})}
                    className="rounded"
                  />
                  <span className="text-sm font-medium text-gray-700">Látható</span>
                </div>
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <Button 
                  variant="outline" 
                  onClick={() => setShowAddItem(false)}
                  className="rounded-xl"
                >
                  Mégse
                </Button>
                <Button 
                  onClick={handleAddItem}
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

      {/* Edit Menu Item Modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <Card className="max-w-md w-full bg-white/95 backdrop-blur-md border border-gray-200/50 rounded-3xl shadow-2xl">
            <CardHeader className="p-6">
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl font-bold text-gray-800">Menüpont Szerkesztése</CardTitle>
                <Button 
                  variant="outline" 
                  onClick={() => setEditingItem(null)}
                  className="rounded-xl"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Menüpont ID *</label>
                  <Input
                    value={editingItem.id}
                    onChange={(e) => setEditingItem({...editingItem, id: e.target.value})}
                    placeholder="pl. about, services"
                    className="rounded-xl"
                  />
                  <p className="text-xs text-gray-500 mt-1">Csak kisbetűk és kötőjelek</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Megjelenített név *</label>
                  <Input
                    value={editingItem.label}
                    onChange={(e) => setEditingItem({...editingItem, label: e.target.value})}
                    placeholder="pl. Rólunk, Szolgáltatások"
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Sorrend</label>
                  <Input
                    type="number"
                    value={editingItem.order}
                    onChange={(e) => setEditingItem({...editingItem, order: parseInt(e.target.value)})}
                    min="1"
                    className="rounded-xl"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={editingItem.visible}
                    onChange={(e) => setEditingItem({...editingItem, visible: e.target.checked})}
                    className="rounded"
                  />
                  <span className="text-sm font-medium text-gray-700">Látható</span>
                </div>
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <Button 
                  variant="outline" 
                  onClick={() => setEditingItem(null)}
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