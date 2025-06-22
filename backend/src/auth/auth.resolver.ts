import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import {
  LoginInput,
  RegisterInput,
  AuthResponse,
} from '../common/dto/auth.dto';
import { User } from '../common/dto/user.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CurrentUser } from '../common/decorators/user.decorator';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AuthResponse)
  async login(@Args('input') loginInput: LoginInput): Promise<AuthResponse> {
    return this.authService.login(loginInput);
  }

  @Mutation(() => AuthResponse)
  async register(
    @Args('input') registerInput: RegisterInput,
  ): Promise<AuthResponse> {
    return this.authService.register(registerInput);
  }

  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  async profile(@CurrentUser() user: { sub: string }) {
    return this.authService.getProfile(user.sub);
  }

  @Query(() => String)
  hello() {
    return 'Hello from eCommerce API!';
  }
}
