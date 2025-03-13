import * as sharp from 'sharp'
import * as mkdirp from 'mkdirp'
import { UploadFileDto } from '../dtos/upload-files.dtos';

export const saveImage = async (file: Express.Multer.File, body: UploadFileDto,) => {

    const destination = 'files/' + body.folder;
    const fileName = new Date().toISOString() + '-' + file.originalname.split(".")[0] + '.webp';

    mkdirp.sync(destination + '/main');
    mkdirp.sync(destination + '/resized');

    await sharp(file.buffer)
    .webp()
    .toFile(destination + '/main/' + fileName);
    
    await sharp(file.buffer)
    .webp()
    .resize({
        width: body.height || 200,
        height: body.width || 200,
        }
    )
    .toFile(destination + '/resized/' + fileName);

    return fileName;
};