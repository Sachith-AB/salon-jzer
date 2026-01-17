import { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import MainLayout from '../components/MainLayout';
import Title from '../components/Title';
import Button from '../components/Button';
import { MdUploadFile } from 'react-icons/md';
import { supabase } from '../supabaseClient';
import useIsMobile from '../hooks/useIsMobile';

export default function Admin() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const isMobile = useIsMobile();

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith('video/')) {
            setSelectedFile(file);
        } else {
            setSelectedFile(null);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
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
            toast.success('video uploaded', {
                className: isMobile ? 'text-xs' : 'text-sm',
            });
            
            setTimeout(() => {
                setSelectedFile(null);
                setUploadProgress(0);
            }, 2000);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Upload failed';
            toast.error(errorMessage, {
                className: isMobile ? 'text-xs' : 'text-sm',
            });
            console.error('Upload error:', error);
        } finally {
            setIsUploading(false);
            setUploadProgress(0);
        }
    };

    const handleRemoveFile = () => {
        setSelectedFile(null);
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

    const truncateFileName = (name: string, maxLength: number = 20) => {
        if (name.length <= maxLength) return name;
        const extension = name.split('.').pop();
        const nameWithoutExt = name.replace(`.${extension}`, '');
        const truncatedName = nameWithoutExt.substring(0, maxLength - extension!.length - 4);
        return `${truncatedName}...${extension}`;
    };

    return (
        <div id='admin' className={`min-h-screen bg-gray-50 ${isMobile ? 'pt-16' : 'pt-24'}`}>
            <MainLayout>
                <div className={`max-w-2xl mx-auto ${isMobile ? 'py-4 px-4' : 'py-8'}`}>
                    {/* Header */}
                    <div className={isMobile ? 'mb-4' : 'mb-8'}>
                        <Title text="Admin Panel" size={isMobile ? 'dxl' : 'fvxl'} color="accent"  />
                        <Title text="Manage videos" size={isMobile ? 'sm' : 'base'} color="accent" weight={400}  />
                    </div>

                    {/* Upload Section */}
                    <div className={`bg-white rounded-lg shadow-lg ${isMobile ? 'p-4' : 'p-8'} mb-8`}>
                        <Title text="Upload Video" size={isMobile ? 'xl' : 'dxl'} color="primary"  />
                        
                        {/* File Input */}
                        <div className={isMobile ? 'mb-4 mt-2' : 'mb-6 mt-4'}>
                            <div className={`relative border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-primary transition-colors cursor-pointer mt-3 ${isMobile ? 'p-4' : 'p-8'}`}>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="video/*"
                                    onChange={handleFileSelect}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                <MdUploadFile size={isMobile ? 32 : 48} className="mx-auto text-gray-400 mb-2" />
                                {selectedFile ? (
                                    <div className=''>
                                        <Title text={truncateFileName(selectedFile.name, isMobile ? 20 : 30)} size={isMobile ? 'xs' : 'sm'} color="primary" weight={600} />
                                        <Title text={`Size: ${formatFileSize(selectedFile.size)}`} size={isMobile ? 'xs' : 'xs'} color="primary" weight={400} />
                                    </div>
                                ) : (
                                    <div>
                                        <Title text="Drag and drop or click to select" size={isMobile ? 'xs' : 'sm'} color="primary" weight={600} />
                                        <Title text="Max 500MB (MP4, WebM, Ogg, etc.)" size={isMobile ? 'xs' : 'xs'} color="primary" weight={400} />
                                    </div>
                                )}
                            </div>
                            <div className={isMobile ? 'h-8 mt-2' : 'h-12 mt-4'}>
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

                        <div className={isMobile ? 'h-20' : 'h-24'}>
                            {/* Upload Progress */}
                            {isUploading && (
                                <div className={`flex flex-col justify-center ${isMobile ? 'mb-2' : 'mb-3'}`}>
                                    <div className="flex justify-between items-center mb-1">
                                        <Title text="Upload Progress" size={isMobile ? 'xs' : 'sm'} color="primary" weight={500}  />
                                        <Title text={`${uploadProgress}%`} size={isMobile ? 'xs' : 'sm'} color="primary" weight={600}  />
                                    </div>
                                    <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${isMobile ? 'h-2' : 'h-3'}`}>
                                        <div 
                                            className="bg-primary h-full transition-all duration-300 ease-out"
                                            style={{ width: `${uploadProgress}%` }}
                                        ></div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Upload Button */}
                        <div className={isMobile ? 'mt-3' : 'mt-6'}>
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
