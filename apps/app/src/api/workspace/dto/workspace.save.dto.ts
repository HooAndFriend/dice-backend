// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsNumber, IsString } from 'class-validator';

export default class RequestWorkspaceSaveDto {
  @ApiProperty({ example: 'HooAndFriend' })
  @IsString()
  name: string;

  @ApiProperty({ example: '이 워크스페이스는..' })
  @IsString()
  comment: string;

  @ApiProperty({ example: '이 워크스페이스는..' })
  @IsString()
  profile: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  teamId: number;
}
