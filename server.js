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
        const jokes = fs.readFileSync(path.join(__dirname, 'data', 'jokes.txt'), 'utf8')
            .split('\n')
            .filter(joke => joke.trim()) // Remove any empty lines
            .map(joke => {
                const [setup, punchline] = joke.split('|');
                return { setup, punchline };
            });
        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
        res.json(randomJoke);
    } catch (error) {
        console.error('Error serving joke:', error);
        res.status(500).json({ error: 'Failed to get joke' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
});