// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsNumber, IsString } from 'class-validator';

export default class RequestTicketSaveDto {
  @ApiProperty({ example: 2 })
  @IsNumber()
  epicId: number;

  @ApiProperty({ example: '게시판' })
  @IsString()
  name: string;
}