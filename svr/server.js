const express = require('express')
const ldm = require('./middleware/ld')

const app = express()
const port = 3001

const UserController = require('./routes/users/index')

app.use(express.json())
app.use(ldm)


app.get('/', (req, res) => res.send('Hello World!'))
app.use(UserController)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
