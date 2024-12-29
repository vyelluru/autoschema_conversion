const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors());


/*
1. I want to pass a file through multer, then click upload to "aws s3"
2. I want to click "submit" button to call the lambda function directly.
*/

// Upload Input File
app.post('/input_file', upload.single('file'), async (req, res) => {
    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: req.file.originalname,
      Body: req.file.buffer,
    };
  
    s3.upload(params, (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error uploading file');
      }
  
      res.send('File uploaded successfully');
    });
  });


app.listen(PORT, () => {
    console.log(`Backend server is running on http://localhost:${PORT}`);
});


/*
curl -X POST http://localhost:3000/api \
-H "Content-Type: application/json" \
-d '{
    "input_file": "input_file.txt",
    "output_format_file": "output_file_format1.txt",
    "output_file": "output_file_converted.txt"
    }'
*/