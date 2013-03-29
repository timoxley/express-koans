var app = express()
app.enable('maintenance')
app.disable('caching')
app.set('admin user', 'admin')

global.__ = app
