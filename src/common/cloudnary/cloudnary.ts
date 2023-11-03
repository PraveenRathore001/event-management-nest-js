import { BadRequestException, Injectable } from '@nestjs/common';
import {  v2 as cloudinary, v2 } from 'cloudinary';
import { resolve } from 'path';

@Injectable()
export class CloudinaryService {

  constructor(
  ) {cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  })}



  async upload(file: Express.Multer.File[]): Promise<string[]> {
    if (!file || !Array.isArray(file) || file.length === 0) {
      throw new Error('No files to upload.');
    }

    const uploadPromises = file.map((file) => {
      return new Promise<string>((resolve, reject) => {
        v2.uploader.upload_stream(
          {
            folder: 'EMS', // Add the folder
            resource_type: 'auto',
          },
          (error, result) => {
            if (error) {
              console.log('Error uploading file:', error);
              reject(error);
            } else {
              console.log('Uploaded photo URL:', result.secure_url);
              resolve(result.secure_url);
            }
          }
        ).end(file.buffer);
      });
    });

    try {
      const uploadResults = await Promise.all(uploadPromises);
      return uploadResults;
    } catch (error) {
      throw new Error('Failed to upload one or more files.');
    }
  }

}

  
  
