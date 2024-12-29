import { readFile } from "node:fs/promises";
require('dotenv').config();
const multer = require("multer");


import {
  PutObjectCommand,
  S3Client,
  S3ServiceException,
  ListBucketsCommand
} from "@aws-sdk/client-s3";


const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
  });
  
bucketName = "myschemadiscovery1"

//Configure multer
export const upload = multer({
    storage: multerS3({
        s3: s3Client,
        bucket: process.env.BUCKET_NAME,
        acl: 'public-read',
        key: function (req, file, cb) {
        cb(null, Date.now().toString() + '-' + file.originalname);
        }
    })
});