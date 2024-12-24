const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors());

const AWS_API_GATEWAY_URL = 'https://6uplelqcul.execute-api.us-east-1.amazonaws.com'

app.post('/api', async (req, res) => {
    try {
        // Get file names from the req body
        const { input_file, output_format_file, output_file } = req.body;

        // Create payload to send to api gateway
        const payload = {
            input_file,
            output_format_file,
            output_file,
        };

        // Post request to url with payload
        const response = await axios.post(AWS_API_GATEWAY_URL, payload);
        console.log("Lambda Response:", response.data);

        res.status(200).json(response.data);

    } catch (error) {
        console.error("Error triggering Lambda:", error.message);
    }
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