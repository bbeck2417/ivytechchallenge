const { Storage } = require('@google-cloud/storage');
const fs = require('fs');
const path = require('path');

// Usage: node scripts/uploadToBucket.js <BUCKET_NAME>
async function upload(bucketName) {
  if (!bucketName) {
    console.error('Usage: node scripts/uploadToBucket.js <BUCKET_NAME>');
    process.exit(1);
  }

  const storage = new Storage();
  const bucket = storage.bucket(bucketName);
  const localFile = path.join(__dirname, '..', 'data', 'jokes.json');
  const destFile = 'jokes.json';

  if (!fs.existsSync(localFile)) {
    console.error('Local jokes.json not found at', localFile);
    process.exit(1);
  }

  await bucket.upload(localFile, {
    destination: destFile,
    gzip: true,
    metadata: {
      cacheControl: 'public, max-age=3600',
    },
  });

  console.log(`Uploaded ${localFile} to gs://${bucketName}/${destFile}`);
}

const bucketName = process.argv[2] || process.env.BUCKET_NAME;
upload(bucketName).catch(err => {
  console.error('Upload failed:', err);
  process.exit(1);
});
