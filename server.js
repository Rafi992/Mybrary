if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()

}
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')

const routes = require('./routes/index')
const authorsRoutes = require('./routes/authors')


app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

app.use('/', routes);
app.use('/authors', authorsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serwe run on http://localhost:${PORT}`));