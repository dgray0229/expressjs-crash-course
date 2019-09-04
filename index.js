const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger');
const members = require('./Members');
const app = express();

// Emit middleware
app.use(logger);
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// Handlebars Middleware
// We're setting the rendering engine to handlebars, with the default layout a template with the name of main
app.engine('handlebars', exphbs({defaultLayout: 'main'})); // main.handlebars
app.set('view engine', 'handlebars'); // Setting the view engine to handlebars

// Homepage Route
// Because this app.get is declared before we set the static folder, it uses bootstrap styles instead of our default styles.
// {members} is shorthand for {members: members}
app.get('/', (req, res) => res.render('index', {title: 'Member App', members}));

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Members API Routes
app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server on port ${PORT}`));