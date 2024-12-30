import express from 'express'; 
import dotenv from 'dotenv';
import cors from 'cors'; 
import multer from 'multer'; 
import multerS3 from 'multer-s3'; 
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

dotenv.config();

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors());


// Configure S3 client
const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });


// Configure multer with S3
const upload = multer({
    storage: multerS3({
      s3: s3Client,
      bucket: process.env.BUCKET_NAME,
      acl: 'public-read',
      key: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
      },
    }),
  });

  
async function upload_file_aws(file) {
    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: file.originalname,
      Body: file.buffer,
    };
  
    try {
      const command = new PutObjectCommand(params);
      await s3Client.send(command);
      return 'File uploaded successfully to S3';
    } catch (err) {
      console.error('Error uploading to S3:', err);
      throw new Error('Error uploading file to S3');
    }
  }

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
        const errorBody = await response.text(); 
        console.error("Lambda Response Error:", errorBody);
        throw new Error(`Error invoking Lambda: ${response.status} ${response.statusText}`);
      }
  
      const responseData = await response.json();
  
      res.status(200).json(responseData);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error invoking Lambda function');
    }
  });
  


app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
