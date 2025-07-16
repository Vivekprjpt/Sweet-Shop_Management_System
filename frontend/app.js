const API = "http://localhost:3000/sweets"

const list = document.getElementById("sweetTableBody")
const form = document.getElementById("addSweetForm")

// Load sweets from backend and render in table
async function load() {
  try {
    const res = await fetch(API)
    const sweets = await res.json()
    render(sweets)
  } catch (err) {
    alert("Failed to load sweets: " + err.message)
  }
}

// Render sweet list into table
function render(sweets) {
  list.innerHTML = ""
  sweets.forEach(s => {
    const row = document.createElement("tr")
    row.innerHTML = `
      <td>${s.id}</td>
      <td>${s.name}</td>
      <td>${s.category}</td>
      <td>₹${s.price}</td>
      <td>${s.quantity}</td>
      <td>
        <button onclick="deleteSweet(${s.id})">Delete</button>
        <button onclick="update(${s.id})">Update</button>
      </td>
    `
    list.appendChild(row)
  })
}

// Add sweet from form
form.onsubmit = async (e) => {
  e.preventDefault()

  const sweet = {
    id: +form.id.value,
    name: form.name.value,
    category: form.category.value,
    price: +form.price.value,
    quantity: +form.quantity.value
  }

  try {
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sweet)
    })

    if (!res.ok) {
      const msg = await res.json()
      alert(msg.message || "Failed to add sweet")
      return
    }

    form.reset()
    await load()
  } catch (err) {
    alert("Error adding sweet: " + err.message)
  }
}

// Delete sweet
window.deleteSweet = async (id) => {
  try {
    await fetch(`${API}/${id}`, { method: "DELETE" })
    await load()
  } catch (err) {
    alert("Failed to delete sweet: " + err.message)
  }
}

// Update sweet (prompt for name and price)
window.update = async (id) => {
  const name = prompt("Enter new name:")
  const price = +prompt("Enter new price:")

  try {
    const res = await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price })
    })

    if (!res.ok) {
      const msg = await res.json()
      alert(msg.message || "Update failed")
      return
    }

    await load()
  } catch (err) {
    alert("Failed to update sweet: " + err.message)
  }
}

// Initial load
load()
