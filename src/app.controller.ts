import { Body, Controller, FileTypeValidator, Get, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { UploadFileDto } from './shared/dtos/upload-files.dtos';
import { saveImage } from './shared/utils/file-utils';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('upload-file')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file', {}))
  @ApiBody({
    schema: {
        type: 'object',
        properties: {
            file: { type: 'string', format: 'binary' },  // ✅ File input
            folder: { type: 'string' }  // ✅ Additional form field
          }
        }
    })
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators : [
          new MaxFileSizeValidator({
            maxSize: 20000000,
          }),
          new FileTypeValidator({
            fileType : /(image\/jpeg|image\/png|image\/jpg|image\/webp|image\/avi)/,
          }),
        ],
      })
    ) file: Express.Multer.File,
    @Body() body : UploadFileDto,
  ) {
    console.log(file);
    return saveImage(file, body);
  }
}
