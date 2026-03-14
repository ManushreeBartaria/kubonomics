const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5173;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);

// Routes
app.get('/', (req, res) => {
  res.render('index', {
    apiUrl: process.env.VITE_BACKEND_URL || 'http://192.168.59.100:30011'
  });
});

// Serve components
app.get('/components/:component', (req, res) => {
  const component = req.params.component;
  const filePath = path.join(__dirname, 'views', 'components', `${component}.html`);
  res.sendFile(filePath);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Frontend server running on http://0.0.0.0:${PORT}`);
});
