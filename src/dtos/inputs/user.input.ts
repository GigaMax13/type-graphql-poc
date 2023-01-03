import { Field, InputType, ID } from 'type-graphql';
import { IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  @IsString()
  name: string;
}

@InputType()
export class UserByIdInput {
  @Field(() => ID)
  @IsUUID()
  id: string;
}
