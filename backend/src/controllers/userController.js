const bcrypt = require("bcrypt")

let users = [
    {
        id: 1,
        name: "Admin",
        email: "admin@example.com",
        password_hash: bcrypt.hashSync("1234", 10),
        created_at: new Date().toISOString()
    }
]
let nextId = 2

async function createUser(req, res) {
    const { name, email, password } = req.body
    const existing = users.find(u => u.email === email)
    if (existing)
        return res.status(400).json({ message: "email already exists" })

    const password_hash = await bcrypt.hash(password, 10)
    const newUser = {
        id: nextId++,
        name,
        email,
        password_hash,
        created_at: new Date().toISOString()
    }
    users.push(newUser)
    
    const { password_hash: _, ...safeUser } = newUser
    res.json(safeUser)
}

function getUsers(req, res) {
    const safeUsers = users.map(({ password_hash, ...u }) => u)
    res.json(safeUsers)
}

function findUser(email) {
    return users.find(u => u.email === email)
}

module.exports = { createUser, getUsers, findUser }