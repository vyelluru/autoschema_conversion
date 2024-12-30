import { readFile } from "node:fs/promises";
import dotenv from 'dotenv';
import multer from 'multer'; // Replace require with import
import multerS3 from 'multer-s3'; // Replace require with import

dotenv.config();

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

// Configure S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Configure multer with S3
export const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: process.env.BUCKET_NAME,
    acl: 'public-read',
    key: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

export async function upload_file_aws(file) {
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