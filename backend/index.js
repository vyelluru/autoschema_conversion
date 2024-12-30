import express from 'express'; 
import dotenv from 'dotenv';
import axios from 'axios'; 
import cors from 'cors'; 
import { upload } from './upload.js';
import { upload_file_aws } from './upload.js';

dotenv.config();

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors());

/*
1. Pass a file through multer, then click upload to "AWS S3".
2. Click "submit" button to call the Lambda function directly.
*/

// Upload File Route
app.post('/upload_file', upload.single('file'), async (req, res) => {
    try {
        const message = await upload_file_aws(req.file);
        console.log(message);
        res.status(200).send(message);
      } catch (err) {
        res.status(500).send(err.message);
      }
});

// Call Lambda Function Route
app.post('/invoke_lambda', async (req, res) => {
    try {
      console.log(req.body);

      const payload = {
        input_file: req.body.inputFileName,
        output_format_file: req.body.outputFormatFileName,
        output_file: req.body.outputFileName,
      };
  
      const response = await fetch(process.env.LAMBDA_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        const errorBody = await response.text(); // Capture Lambda's error message
        console.error("Lambda Response Error:", errorBody);
        throw new Error(`Error invoking Lambda: ${response.status} ${response.statusText}`);
      }
  
      const responseData = await response.json();
  
      //console.log(responseData);
      res.status(200).json(responseData);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error invoking Lambda function');
    }
  });
  

// Start server
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
