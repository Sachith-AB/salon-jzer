import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainLayout from '../components/MainLayout';
import Title from '../components/Title';
import Button from '../components/Button';
import { MdCheckCircle, MdError, MdUploadFile } from 'react-icons/md';

export default function Admin() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadStatus, setUploadStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ 
        type: null, 
        message: '' 
    });

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith('video/')) {
            setSelectedFile(file);
            setUploadStatus({ type: null, message: '' });
        } else {
            setUploadStatus({ type: 'error', message: 'Please select a valid video file' });
            setSelectedFile(null);
        }
    };

    const handleUpload = () => {
        if (!selectedFile) {
            setUploadStatus({ type: 'error', message: 'No file selected' });
            return;
        }
        setUploadStatus({ 
            type: 'success', 
            message: `Video "${selectedFile.name}" ready to upload!` 
        });
        toast.success(`Video "${selectedFile.name}" successfully uploaded!`, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
        setTimeout(() => {
            setSelectedFile(null);
            setUploadStatus({ type: null, message: '' });
        }, 3000);
    };

    const handleRemoveFile = () => {
        setSelectedFile(null);
        setUploadStatus({ type: null, message: '' });
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };

    return (
        <div id='admin' className="min-h-screen bg-gray-50 pt-24">
            <MainLayout>
                <div className="max-w-2xl mx-auto py-8">
                    {/* Header */}
                    <div className="mb-8">
                        <Title text="Admin Panel" size="fvxl" color="accent" />
                        <Title text="Manage videos" size="base" color="accent" weight={400} />
                    </div>

                    {/* Upload Section */}
                    <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                        <Title text="Upload Video" size="dxl" color="primary" />
                        
                        {/* File Input */}
                        <div className="mb-6 mt-4">
                            <Title text="Select Video File" size="sm" color="primary" weight={500} />
                            <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer mt-3">
                                <input
                                    type="file"
                                    accept="video/*"
                                    onChange={handleFileSelect}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                <MdUploadFile size={48} className="mx-auto text-gray-400 mb-3" />
                                {selectedFile ? (
                                    <div>
                                        <Title text={selectedFile.name} size="sm" color="primary" weight={600} />
                                        <Title text={`Size: ${formatFileSize(selectedFile.size)}`} size="xs" color="primary" weight={400} />
                                    </div>
                                ) : (
                                    <div>
                                        <Title text="Drag and drop or click to select" size="sm" color="primary" weight={600} />
                                        <Title text="Max 500MB (MP4, WebM, Ogg, etc.)" size="xs" color="primary" weight={400} />
                                    </div>
                                )}
                            </div>
                            {selectedFile && (
                                <div className="mt-4">
                                    <Button
                                        text="Remove File"
                                        onClick={handleRemoveFile}
                                        variant="danger"
                                        size="sm"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Status Messages */}
                        {uploadStatus.type && (
                            <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
                                uploadStatus.type === 'success' 
                                    ? 'bg-green-50 text-green-800' 
                                    : 'bg-red-50 text-red-800'
                            }`}>
                                {uploadStatus.type === 'success' ? (
                                    <MdCheckCircle size={24} />
                                ) : (
                                    <MdError size={24} />
                                )}
                                <span>{uploadStatus.message}</span>
                            </div>
                        )}

                        {/* Upload Button */}
                        <div className="mt-6">
                            <Button
                                text="Upload Video"
                                onClick={handleUpload}
                                disabled={!selectedFile}
                                variant="primary"
                                size="lg"
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>
            </MainLayout>

            {/* Success Toast */}
            <ToastContainer />
        </div>
    );
}
