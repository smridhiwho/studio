
'use client';

import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {useToast} from '@/hooks/use-toast';
import {Upload} from 'lucide-react';
import React, {useState} from 'react';

const DataUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const {toast} = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      toast({
        title: 'File Selected',
        description: `Selected file: ${selectedFile.name}`,
      });
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: 'Error',
        description: 'Please select a file to upload.',
        variant: 'destructive',
      });
      return;
    }

    try {
      // Implement upload logic here, e.g., using FormData and fetch
      const formData = new FormData();
      formData.append('file', file);

      // const response = await fetch('/api/upload', {
      //   method: 'POST',
      //   body: formData,
      // });

      // if (response.ok) {
      toast({
        title: 'Upload Successful',
        description: `${file.name} has been successfully uploaded.`,
      });
      // } else {
      //   toast({
      //     title: 'Upload Failed',
      //     description: 'There was an error uploading the file.',
      //     variant: 'destructive',
      //   });
      // }
    } catch (error: any) {
      toast({
        title: 'Upload Error',
        description: error.message || 'Failed to upload the file.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Upload</CardTitle>
        <CardDescription>Upload bills, receipts, or transaction logs.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col space-y-4">
        <input
          type="file"
          id="file-upload"
          className="hidden"
          onChange={handleFileChange}
        />
        <label htmlFor="file-upload">
          <Button variant="secondary" asChild>
            <div className="flex items-center">
              <Upload className="mr-2 h-4 w-4" />
              <span>Select File</span>
            </div>
          </Button>
        </label>
        {file && <p>Selected File: {file.name}</p>}
        <Button onClick={handleUpload} disabled={!file}>
          Upload Data
        </Button>
      </CardContent>
    </Card>
  );
};

export default DataUpload;
