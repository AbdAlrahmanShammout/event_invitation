import { PickType } from '@nestjs/swagger';
import { LoginDto } from '@/authentication/dto/request/login.dto';

export class RequestForgetPasswordDto extends PickType(LoginDto, ['email']) {}
