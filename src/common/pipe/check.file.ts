import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
////////////////// image-multer-options.ts
const imageFilter = (req: Request, file: Express.Multer.File, callback: (error: Error, acceptFile: boolean) => void) => {
    if (!Boolean(file.mimetype.match(/(jpg|jpeg|png|gif)/))) callback(null, false);
    callback(null, true);
}

export const imageOptions: MulterOptions = {
    limits: {fileSize: 5242880},
    fileFilter: imageFilter
}


const updateImageFilter = (req: Request, file: Express.Multer.File, callback: (error: Error, acceptFile: boolean) => void) => {
    if(file.size==0){
    callback(null ,true)
    }else if (!Boolean(file.mimetype.match(/(jpg|jpeg|png|gif)/))) callback(null, false);
    callback(null, true);
}

export const updateImageOptions: MulterOptions = {
    limits: {fileSize: 5242880},
    fileFilter: updateImageFilter
}