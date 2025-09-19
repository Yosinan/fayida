require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const sessionRoutes = require('./routes/sessions');

const app = express();
app.use(helmet());
// app.use(cors({ origin: true }));
app.use(cors({
    origin: 'http://localhost:3000', // or '*' for all origins (not recommended for production)
    credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

// Health check
app.get('/', (req, res) => {
    res.send('Fayida API is running');
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/sessions', sessionRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
