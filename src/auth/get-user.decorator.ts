import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Auth = createParamDecorator((data: any, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  // console.log(`get-user.decotator data`, data);
  // console.log(`get-user.decotator ctx`, ctx);
  // console.log(`get-user.decotator request`, request);
  return request.user;
});
