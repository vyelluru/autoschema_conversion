'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [inputFile, setInputFile] = useState(null);
  const [outputFormatFile, setOutputFormatFile] = useState(null);
  const [outputFileName, setOutputFileName] = useState('');

  const handleFileChange = (event, setFileCallback) => {
    const file = event.target.files[0];

    setFileCallback(file);
  };

  const handleSubmit = async () => {
    if (!inputFile || !outputFormatFile || !outputFileName) {
      alert('Please provide all required inputs before submitting!');
      return;
    }

    const payload = {
      input_file: inputFile.name,
      output_format_file: outputFormatFile.name,
      output_file: outputFileName,
    };

    try {
      const response = await fetch('/api/trigger-lambda', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      alert('File processed successfully: ' + JSON.stringify(data));
    } catch (error) {
      alert('An error occurred: ' + error.message);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-2xl font-bold">Schema Conversion</h1>

        <div className="flex flex-col gap-4">
          <div>
            <label className="block mb-2">Input File:</label>
            <input
              type="file"
              accept=".txt"
              onChange={(e) => handleFileChange(e, setInputFile)}
              className="border p-2"
            />
            {inputFile && <p>Selected Input File: {inputFile.name}</p>}
          </div>

          <div>
            <label className="block mb-2">Output Format File:</label>
            <input
              type="file"
              accept=".txt"
              onChange={(e) => handleFileChange(e, setOutputFormatFile)}
              className="border p-2"
            />
            {outputFormatFile && <p>Selected Output Format File: {outputFormatFile.name}</p>}
          </div>

          <div>
            <label className="block mb-2">Output File Name:</label>
            <input
              type="text"
              placeholder="Enter output file name"
              value={outputFileName}
              onChange={(e) => setOutputFileName(e.target.value)}
              className="border p-2"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/docs"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js"
          target="_blank"
          rel="noopener noreferrer"
        >
          Examples
        </a>
      </footer>
    </div>
  );
}
