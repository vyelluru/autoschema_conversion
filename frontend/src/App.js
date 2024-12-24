import React, { useState } from 'react';
import './App.css';

const App = () => {
    const [inputFile, setInputFile] = useState('');
    const [outputFormatFile, setOutputFormatFile] = useState('');
    const [outputFileName, setOutputFileName] = useState('');

    const handleSubmit = async () => {
        if (!inputFile || !outputFormatFile || !outputFileName) {
            alert('Please provide all required inputs before submitting!');
            return;
        }

        const payload = {
            input_file: inputFile,
            output_format_file: outputFormatFile,
            output_file: outputFileName,
        };

        try {
            const response = await fetch('http://localhost:4000/api', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Response from backend:', data);
            alert('File processed successfully: ' + JSON.stringify(data));
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred: ' + error.message);
        }
    };

    return (
        <div className="container">
            <h1 className="title">Schema Conversion</h1>

            <div className="inputGroup">
                <label className="label">Input File: </label>
                <input
                    type="text"
                    placeholder="Enter input file name"
                    value={inputFile}
                    onChange={(e) => setInputFile(e.target.value)}
                />
            </div>

            <div className="inputGroup">
                <label className="label">Output Format File: </label>
                <input
                    type="text"
                    placeholder="Enter output format file name"
                    value={outputFormatFile}
                    onChange={(e) => setOutputFormatFile(e.target.value)}
                />
            </div>

            <div className="inputGroup">
                <label className="label">Output File Name: </label>
                <input
                    type="text"
                    placeholder="Enter output file name (e.g., output_file_converted.txt)"
                    value={outputFileName}
                    onChange={(e) => setOutputFileName(e.target.value)}
                />
            </div>

            <button
                onClick={handleSubmit}
                className="button"
            >
                Submit
            </button>
        </div>
    );
};

export default App;
