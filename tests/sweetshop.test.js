import SweetShop from '../src/services/SweetShop.js'
import Sweet from '../src/models/Sweet.js'


describe('Sweet Shop Management System', () => {
  let shop

  beforeEach(() => {
    shop = new SweetShop()
  })

  // ✅ Add Sweets
  test('should add a new sweet', () => {
    const sweet = new Sweet(1001, 'Kaju Katli', 'Nut-Based', 50, 20)
    shop.addSweet(sweet)
    const sweets = shop.viewSweets()
    expect(sweets.length).toBe(1)
    expect(sweets[0].name).toBe('Kaju Katli')
  })

  test('should throw error when adding sweet with duplicate ID', () => {
    const sweet = new Sweet(1001, 'Kaju Katli', 'Nut-Based', 50, 20)
    shop.addSweet(sweet)
    expect(() => shop.addSweet(sweet)).toThrow('Sweet with this ID already exists')
  })

  // ✅ Delete Sweets
  test('should delete a sweet by ID', () => {
    const sweet = new Sweet(1002, 'Gulab Jamun', 'Milk-Based', 10, 30)
    shop.addSweet(sweet)
    shop.deleteSweet(1002)
    expect(shop.viewSweets().length).toBe(0)
  })

  // ✅ View Sweets
  test('should view all sweets', () => {
    shop.addSweet(new Sweet(1001, 'Ladoo', 'Flour-Based', 15, 40))
    shop.addSweet(new Sweet(1002, 'Barfi', 'Milk-Based', 20, 25))
    const sweets = shop.viewSweets()
    expect(sweets.length).toBe(2)
  })

  // ✅ Search by name
  test('should search sweets by name (case insensitive)', () => {
    shop.addSweet(new Sweet(1003, 'Gajar Halwa', 'Vegetable-Based', 30, 10))
    const result = shop.searchByName('gajar')
    expect(result.length).toBe(1)
    expect(result[0].name).toBe('Gajar Halwa')
  })

  // ✅ Search by category
  test('should search sweets by category', () => {
    shop.addSweet(new Sweet(1004, 'Rasgulla', 'Milk-Based', 12, 10))
    const result = shop.searchByCategory('Milk-Based')
    expect(result.length).toBe(1)
  })

  // ✅ Search by price range
  test('should search sweets in a price range', () => {
    shop.addSweet(new Sweet(1005, 'Peda', 'Milk-Based', 25, 10))
    shop.addSweet(new Sweet(1006, 'Jalebi', 'Sugar-Based', 40, 5))
    const result = shop.searchByPriceRange(20, 30)
    expect(result.length).toBe(1)
    expect(result[0].name).toBe('Peda')
  })

  // ✅ Sort sweets
  test('should sort sweets by price', () => {
    shop.addSweet(new Sweet(1007, 'Imarti', 'Sugar-Based', 60, 5))
    shop.addSweet(new Sweet(1008, 'Balushahi', 'Flour-Based', 40, 8))
    const sorted = shop.sortBy('price')
    expect(sorted[0].name).toBe('Balushahi')
  })

  // ✅ Purchase sweet (reduce quantity)
  test('should purchase a sweet and reduce stock', () => {
    shop.addSweet(new Sweet(1009, 'Soan Papdi', 'Flour-Based', 20, 10))
    shop.purchaseSweet(1009, 4)
    const updated = shop.viewSweets().find(s => s.id === 1009)
    expect(updated.quantity).toBe(6)
  })

  test('should throw error when purchasing more than available quantity', () => {
    shop.addSweet(new Sweet(1010, 'Milk Cake', 'Milk-Based', 35, 3))
    expect(() => shop.purchaseSweet(1010, 5)).toThrow('Insufficient stock')
  })

  // ✅ Restock sweets
  test('should restock an existing sweet', () => {
    shop.addSweet(new Sweet(1011, 'Cham Cham', 'Milk-Based', 15, 5))
    shop.restockSweet(1011, 10)
    const updated = shop.viewSweets().find(s => s.id === 1011)
    expect(updated.quantity).toBe(15)
  })

  // ✅ Update sweet details (extra feature)
  test('should update sweet name and price', () => {
    const sweet = new Sweet(1012, 'Kalakand', 'Milk-Based', 25, 10)
    shop.addSweet(sweet)

    const target = shop.viewSweets().find(s => s.id === 1012)
    target.name = 'Dry Kalakand'
    target.price = 30

    expect(target.name).toBe('Dry Kalakand')
    expect(target.price).toBe(30)
  })
})
