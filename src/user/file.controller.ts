import {
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  StreamableFile,
  Response,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { createReadStream } from 'fs';
import { join } from 'path';
import { JwtGuard } from 'src/guard/jwt.guard';

@Controller('file')
// Example implement global middleware auth & get auth
@UseGuards(JwtGuard)
export class FileController {
  @Post('photo')
  // @UseInterceptors(FileInterceptor('photo'))
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './storage/public',
        filename: function (req, file, cb) {
          // console.log('cb req', req);
          // console.log('cb file', file);
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + '.' + file.originalname.split('.')[1]);
        },
      }),
    }),
  )
  upload(@UploadedFile() file: Express.Multer.File) {
    console.log('file', file);
    // return { file: file.buffer.toString() };
  }

  @Get('stream-file')
  stream(@Response({ passthrough: true }) res): StreamableFile {
    const file = createReadStream(
      join(process.cwd(), './storage/public/1644862584646-151773834.jpg'),
    );

    res.set({
      'Content-Type': 'image/jpeg',
      'Content-Disposition': 'attachment; filename="example.jpg"',
    });

    return new StreamableFile(file);
  }
}
