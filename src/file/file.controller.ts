import { Controller, Get, HttpStatus, Param, Post, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Helper } from '../utils/Helper';
import { ApiBody, ApiConsumes, ApiProperty, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';


@Controller('file')
@ApiTags('file')
export class FileController {

  SERVER_URL = 'http://localhost:3001/';

  constructor() {
  }

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        photo: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('photo', {
    storage: diskStorage({
      destination: Helper.destinationPath,
      filename: Helper.customFileName,
    }),
  }))
  uploadFile(@UploadedFile() file: Express.Multer.File, @Res() res: Response, @Req() req: Request) {
    // console.log(req.hostname);
    res.status(HttpStatus.CREATED).send(this.SERVER_URL+"file/"+file.filename);
  }

  @Get(':imagename')
  getImage(@Param('imagename') image:string, @Res() res) {
    const response = res.sendFile(image, { root: './uploads' });
    return {
      status: HttpStatus.OK,
      data: response,
    };
  }
}

