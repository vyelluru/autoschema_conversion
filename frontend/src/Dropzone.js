import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './App.css';

const Dropzone = ({ setFile, label }) => {
    const [fileName, setFileName] = useState(''); // State to store the file name

    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles.length) {
            const file = acceptedFiles[0];
            setFile(file); // Update the parent state with the file
            setFileName(file.name); // Update the file name
        }
    }, [setFile]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div className="dropzone-container">
            <h3>{label}</h3>
            <div
                {...getRootProps()}
                className={`dropzone ${isDragActive ? 'active' : ''}`}
            >
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p>Drop the file here...</p>
                ) : (
                    <p>Drag File Here</p>
                )}
            </div>
            {fileName && <p className="file-name">Selected file: {fileName}</p>}
        </div>
    );
};

export default Dropzone;

