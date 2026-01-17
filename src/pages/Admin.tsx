import { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import MainLayout from '../components/MainLayout';
import Title from '../components/Title';
import Button from '../components/Button';
import { MdUploadFile } from 'react-icons/md';
import { supabase } from '../supabaseClient';

export default function Admin() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadStatus, setUploadStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ 
        type: null, 
        message: '' 
    });
    const fileInputRef = useRef<HTMLInputElement>(null);

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

    const handleUpload = async () => {
        if (!selectedFile) {
            setUploadStatus({ type: 'error', message: 'No file selected' });
            return;
        }

        setIsUploading(true);
        setUploadProgress(0);
        
        try {
            // Simulate progress
            const progressInterval = setInterval(() => {
                setUploadProgress((prev) => Math.min(prev + 10, 90));
            }, 200);

            // Create a safe filename by removing special characters
            const fileExtension = selectedFile.name.split('.').pop() || 'mp4';
            const safeFileName = `${Date.now()}.${fileExtension}`;
            
            const { error } = await supabase.storage
                .from('videos')
                .upload(safeFileName, selectedFile);

            clearInterval(progressInterval);
            setUploadProgress(100);

            if (error) {
                throw error;
            }

            setUploadStatus({ 
                type: 'success', 
                message: `Video "${selectedFile.name}" successfully uploaded!` 
            });
            toast.success('video uploaded');
            
            setTimeout(() => {
                setSelectedFile(null);
                setUploadStatus({ type: null, message: '' });
                setUploadProgress(0);
            }, 2000);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Upload failed';
            setUploadStatus({ type: 'error', message: errorMessage });
            toast.error(errorMessage);
            console.error('Upload error:', error);
        } finally {
            setIsUploading(false);
            setUploadProgress(0);
        }
    };

    const handleRemoveFile = () => {
        setSelectedFile(null);
        setUploadStatus({ type: null, message: '' });
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
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
                            <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer mt-3">
                                <input
                                    ref={fileInputRef}
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
                            <div className='h-12 mt-4'>
                                {selectedFile && !isUploading && (
                                    <div className="">
                                        <Button
                                            text="Remove File"
                                            onClick={handleRemoveFile}
                                            variant="danger"
                                            size="sm"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className='h-24'>
                            {/* Upload Progress */}
                            {isUploading && (
                                <div className="mb-3 flex flex-col justify-center">
                                    <div className="flex justify-between items-center mb-2">
                                        <Title text="Upload Progress" size="sm" color="primary" weight={500} />
                                        <Title text={`${uploadProgress}%`} size="sm" color="primary" weight={600} />
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                        <div 
                                            className="bg-primary h-full transition-all duration-300 ease-out"
                                            style={{ width: `${uploadProgress}%` }}
                                        ></div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Upload Button */}
                        <div className="mt-6">
                            <Button
                                text={isUploading ? "Uploading..." : "Upload Video"}
                                onClick={handleUpload}
                                disabled={!selectedFile || isUploading}
                                variant="primary"
                                size="lg"
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>
            </MainLayout>
        </div>
    );
}
