import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    const [inputFile, setInputFile] = useState(null);
    const [outputFormatFile, setOutputFormatFile] = useState(null);
    const [outputFileName, setOutputFileName] = useState('');
    const [statusInput, setStatusInput] = useState('');
    const [statusOutputFormat, setStatusOutputFormat] = useState('');
    const [statusOutputFileName, setStatusOutputFileName] = useState('');
    const [statusSubmit, setStatusSubmit] = useState('');

    const handleUpload = async (file, setStatus) => {
        if (!file) {
            alert('Please select a file before uploading!');
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
            setStatus('Done');
        }
    };

    const handleOutputFileNameSubmit = () => {
        if (!outputFileName) {
            alert('Please enter an output file name!');
            return;
        }
        setStatusOutputFileName(`Output file name submitted: ${outputFileName}`);
    };

    const handleSubmit = async () => {
        const payload = {
            inputFileName: inputFile?.name || '',
            outputFormatFileName: outputFormatFile?.name || '',
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
            console.error('Error during lambda invocation', error);
            setStatusSubmit(`Error invoking Lambda: ${error.message}`);
        }
    };

    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
            <div className="container bg-white shadow rounded p-4" style={{ maxWidth: '600px' }}>
                <h1 className="text-center text-muted mb-4">Schema Conversion</h1>

                {/* Input File Section */}
                <div className="mb-4 p-3 border rounded bg-light-subtle">
                    <label
                        htmlFor="inputFile"
                        className="btn btn-outline-primary text-center"
                    >
                        Choose Input File
                    </label>
                    <input
                        id="inputFile"
                        type="file"
                        onChange={(e) => setInputFile(e.target.files[0])}
                        className="d-none"
                    />
                    <button
                        onClick={() => handleUpload(inputFile, setStatusInput)}
                        className="btn btn-outline-secondary mt-2 w-100"
                    >
                        Upload
                    </button>
                    {statusInput && <p className="mt-2 text-success">{statusInput}</p>}
                </div>

                {/* Output File Format Section */}
                <div className="mb-4 p-3 border rounded bg-light-subtle">
                    <label
                        htmlFor="outputFormatFile"
                        className="btn btn-outline-primary text-center"
                    >
                        Choose Output Format File
                    </label>
                    <input
                        id="outputFormatFile"
                        type="file"
                        onChange={(e) => setOutputFormatFile(e.target.files[0])}
                        className="d-none"
                    />
                    <button
                        onClick={() => handleUpload(outputFormatFile, setStatusOutputFormat)}
                        className="btn btn-outline-secondary mt-2 w-100"
                    >
                        Upload
                    </button>
                    {statusOutputFormat && <p className="mt-2 text-success">{statusOutputFormat}</p>}
                </div>

                {/* Output File Name Section */}
                <div className="mb-4 p-3 border rounded bg-light-subtle">
                    <label htmlFor="outputFileName" className="form-label text-muted fw-bold">
                        Enter Output File Name
                    </label>
                    <input
                        id="outputFileName"
                        type="text"
                        value={outputFileName}
                        onChange={(e) => setOutputFileName(e.target.value)}
                        className="form-control"
                        placeholder="Enter here (ex: outputFile.txt)"
                    />
                    <button
                        onClick={handleOutputFileNameSubmit}
                        className="btn btn-outline-primary mt-2 w-100"
                    >
                        Submit Output File Name
                    </button>
                    {statusOutputFileName && <p className="mt-2 text-success">{statusOutputFileName}</p>}
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        onClick={handleSubmit}
                        className="btn btn-success w-100"
                        style={{ backgroundColor: '#0d8f41', borderColor: '#0d8f41' }} // Softer green
                    >
                        Submit
                    </button>
                    {statusSubmit && (
                        <p className="mt-3 text-center text-success border p-2 rounded bg-light">
                            {statusSubmit}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default App;
