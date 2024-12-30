import React, { useState } from 'react';
import Dropzone from './Dropzone'; 
import './App.css'; 

const App = () => {
    const [inputFile, setInputFile] = useState(null);
    const [outputFormatFile, setOutputFormatFile] = useState(null);
    const [outputFileName, setOutputFileName] = useState('');
    const [statusInput, setStatusInput] = useState('');
    const [statusOutputFormat, setStatusOutputFormat] = useState('');
    const [statusOutputFileName, setStatusOutputFileName] = useState('');
    const [statusSubmit, setStatusSubmit] = useState('');

    // Handle upload file -> send to s3
    const handleUpload = async (file, setStatus) => {
        if (!file) {
            alert('Please select or drag a file before uploading!');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://localhost:4000/upload_file', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setStatus(`File uploaded successfully! File path: ${data.filePath}`);
        } catch (error) {
            console.error(error);
            setStatus(`Error: ${error.message}`);
        }
    };

    const handleOutputFileNameSubmit = () => {
        if (!outputFileName) {
            alert('Please enter an output file name!');
            return;
        }
        setStatusOutputFileName(`Output file name submitted: ${outputFileName}`);
    };

    // Handle submit button -> invoking Lambda
    const handleSubmit = async () => {
        const payload = {
            inputFileName: inputFile.name,
            outputFormatFileName: outputFormatFile.name,
            outputFileName,
        };
    
    
        try {
            const response = await fetch('http://localhost:4000/invoke_lambda', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            const successMessage = `Lambda function invoked successfully! Response: ${JSON.stringify(data)}`;
            console.log(successMessage);
            setStatusSubmit(successMessage);

        } catch (error) {
            console.error("Error during lambda invocation", error);
            setStatusSubmit(`Error invoking Lambda: ${error.message}`);
        }
    };
    

    return (
        <div className="container">
            <h1 className="title">Schema Conversion</h1>

            {/* Input File Section */}
            <div className="uploadSection">
                <Dropzone setFile={setInputFile} label="Upload Input File" />
                <button onClick={() => handleUpload(inputFile, setStatusInput)} className="button">
                    Upload Input File
                </button>
                {statusInput && <p className="status">{statusInput}</p>}
            </div>

            {/* Output File Format Section */}
            <div className="uploadSection">
                <Dropzone setFile={setOutputFormatFile} label="Upload Output File Format" />
                <button onClick={() => handleUpload(outputFormatFile, setStatusOutputFormat)} className="button">
                    Upload Output File Format
                </button>
                {statusOutputFormat && <p className="status">{statusOutputFormat}</p>}
            </div>

            {/* Output File Name Section */}
            <div className="uploadSection">
                <label className="label" htmlFor="outputFileName">
                    Enter Output File Name:
                </label>
                <input
                    id="outputFileName"
                    type="text"
                    value={outputFileName}
                    onChange={(e) => setOutputFileName(e.target.value)}
                    className="textInput"
                />
                <button onClick={handleOutputFileNameSubmit} className="button">
                    Submit Output File Name
                </button>
                {statusOutputFileName && <p className="status">{statusOutputFileName}</p>}
            </div>

            {/* Submit Button */}
            <div className="submitSection">
                <button onClick={handleSubmit} className="button">
                    Submit
                </button>
                {statusSubmit && <p className="status">{statusSubmit}</p>}
            </div>
        </div>
    );
};

export default App;
