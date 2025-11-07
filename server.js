const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/api/joke', (req, res) => {
    try {
        const raw = fs.readFileSync(path.join(__dirname, 'data', 'jokes.json'), 'utf8');
        const jokes = JSON.parse(raw);
        if (!Array.isArray(jokes) || jokes.length === 0) {
            return res.status(500).json({ error: 'No jokes available' });
        }
        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
        // Ensure returned object has setup and punchline
        res.json({
            setup: randomJoke.setup || '',
            punchline: randomJoke.punchline || ''
        });
    } catch (error) {
        console.error('Error serving joke:', error);
        res.status(500).json({ error: 'Failed to get joke' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
});