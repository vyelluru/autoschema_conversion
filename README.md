# Automated Schema Conversion Tool

## Description

The **Schema Conversion Tool** is a web application that simplifies schema conversion workflows. It allows users to upload input files, specify output formats, and generate converted files using a backend system integrated with AWS S3 and Lambda.

## Features

- Upload input files and schema format files.
- AWS S3 integration for file storage.
- Automates schema conversion using AWS Lambda.
- Real-time status updates during the conversion process.
- User-friendly interface built with React.js.

## Tech Stack

- **Frontend**: React.js, Bootstrap
- **Backend**: Node.js, Express.js, AWS SDK, Multer
- **Infrastructure**: AWS S3, Lambda

## Installation

### Prerequisites

- Node.js installed.
- AWS account with S3 and Lambda setup.
- `.env` file with:
  ```plaintext
  AWS_REGION=<your-region>
  AWS_ACCESS_KEY_ID=<your-access-key-id>
  AWS_SECRET_ACCESS_KEY=<your-secret-key>
  BUCKET_NAME=<your-s3-bucket>
  LAMBDA_ENDPOINT=<your-lambda-endpoint>
