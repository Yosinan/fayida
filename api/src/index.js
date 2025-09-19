require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const sessionRoutes = require('./routes/sessions');

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const app = express();
app.use(helmet());
const corsOptions = {
    origin: 'https://fayida.yosinan.tech',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-device-id', 'x-device-info', 'X-Requested-With'],
};

app.use(cors(corsOptions));

// Handle preflight requests for all routes
app.options(/.*/, (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://fayida.yosinan.tech');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.status(200).send();
});

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

// Swagger setup
const swaggerDocument = YAML.load('./swagger.yaml');
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// Health check
app.get('/', (req, res) => {
    // show the api docs
    res.redirect('/api/docs');
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/sessions', sessionRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api/docs`);
});
