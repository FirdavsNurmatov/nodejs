import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageKitService } from 'imagekit-nestjs';
import { memoryStorage } from 'multer';
import { RoleGuard } from 'src/guards/role.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { Role } from 'src/decorators/role.decorator';
import { Roles } from 'src/common/enums/role';

@UseGuards(RoleGuard)
@UseGuards(AuthGuard)
// @UseFilters(new HttpExceptionFilter('user'))
@Controller('user')
export class UserController {
  constructor(
    private readonly imageKitService: ImageKitService,
    private readonly userService: UserService,
  ) {}

  @Role(Roles.manager, Roles.teacher)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);

    return this.userService.create(createUserDto);
  }

  @Role(Roles.manager, Roles.teacher)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Role(Roles.manager, Roles.teacher)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Role(Roles.manager, Roles.teacher)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Post('profile')
  // @UseInterceptors(
  //   FileInterceptor('avatar', {
  //     storage: diskStorage({
  //       destination: './uploads',
  //       filename: function (req, file, cb) {
  //         const uniqueSuffix =
  //           Date.now() + '-' + Math.round(Math.random() * 1e9);
  //         console.log(file);
  //         cb(
  //           null,
  //           file.fieldname +
  //             '-' +
  //             uniqueSuffix +
  //             '.' +
  //             file.originalname.split('.')[1],
  //         );
  //       },
  //     }),
  //   }),
  // )
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: memoryStorage(),
    }),
  )
  async uploadFile(@UploadedFile() file) {
    const fileBase64 = file.buffer.toString('base64');

    const result = await this.imageKitService.upload({
      file: fileBase64,
      fileName: file.originalname,
    });

    return result.url;
  }
}
