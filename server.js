const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { Storage } = require('@google-cloud/storage');
const app = express();

app.use(cors());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/api/joke', async (req, res) => {
    try {
        // If BUCKET_NAME is provided, try to read jokes.json from GCS
        const bucketName = process.env.BUCKET_NAME;
        let jokes = null;

        if (bucketName) {
            try {
                const storage = new Storage();
                const file = storage.bucket(bucketName).file('jokes.json');
                const [exists] = await file.exists();
                if (exists) {
                    const [contents] = await file.download();
                    jokes = JSON.parse(contents.toString('utf8'));
                } else {
                    console.warn(`jokes.json not found in bucket ${bucketName}, falling back to local file`);
                }
            } catch (gcsErr) {
                console.error('Error reading from GCS, falling back to local file:', gcsErr.message || gcsErr);
            }
        }

        // Fallback to local file
        if (!jokes) {
            const raw = fs.readFileSync(path.join(__dirname, 'data', 'jokes.json'), 'utf8');
            jokes = JSON.parse(raw);
        }

        if (!Array.isArray(jokes) || jokes.length === 0) {
            return res.status(500).json({ error: 'No jokes available' });
        }

        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
        res.json({ setup: randomJoke.setup || '', punchline: randomJoke.punchline || '' });
    } catch (error) {
        console.error('Error serving joke:', error);
        res.status(500).json({ error: 'Failed to get joke' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
});