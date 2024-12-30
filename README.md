# Automated Schema Conversion Tool

## Description

The Schema Conversion Tool is a powerful, user-friendly application designed to automate and streamline the process of schema transformation. It simplifies the task of converting complex data schemas by allowing users to upload an input schema file and specify the desired output format. The tool processes these inputs to generate a fully transformed output file with accurate field mappings, ensuring consistency and correctness.

Traditionally, manual schema conversion is time-intensive, error-prone, and challenging, especially when dealing with large datasets. This tool overcomes these challenges by automating the entire process, significantly reducing human effort and saving time. With its automated workflows, the Schema Conversion Tool eliminates the need for manual field matching and structure adjustments, minimizes errors, and validates conversions to meet the desired output format. 

## Features

- Upload input files and schema format files.
- AWS S3 integration for file storage.
- Automates schema conversion using AWS Lambda.

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
