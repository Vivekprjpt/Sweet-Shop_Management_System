import Sweet from "../models/Sweet.js"

class SweetShop {
  constructor() {
    this.sweets = []
  }

  addSweet(sweet) {
    const exists = this.sweets.find(s => s.id === sweet.id)
    if (exists) throw new Error("Sweet with this ID already exists")
    this.sweets.push(sweet)
  }

  deleteSweet(id) {
    this.sweets = this.sweets.filter(s => s.id !== id)
  }

  viewSweets() {
    return this.sweets
  }

  searchByName(name) {
    return this.sweets.filter(s => s.name.toLowerCase().includes(name.toLowerCase()))
  }

  searchByCategory(category) {
    return this.sweets.filter(s => s.category === category)
  }

  searchByPriceRange(min, max) {
    return this.sweets.filter(s => s.price >= min && s.price <= max)
  }

  sortBy(field) {
    return [...this.sweets].sort((a, b) => a[field] > b[field] ? 1 : -1)
  }

  purchaseSweet(id, quantity) {
    const sweet = this.sweets.find(s => s.id === id)
    if (!sweet) throw new Error("Sweet not found")
    if (sweet.quantity < quantity) throw new Error("Insufficient stock")
    sweet.quantity -= quantity
  }

  restockSweet(id, quantity) {
    const sweet = this.sweets.find(s => s.id === id)
    if (!sweet) throw new Error("Sweet not found")
    sweet.quantity += quantity
  }
}

export default SweetShop
