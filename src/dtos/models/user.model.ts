import { Field, ID, ObjectType } from 'type-graphql';
import { IsString, IsUUID } from 'class-validator';

@ObjectType()
export class User {
  @Field(() => ID)
  @IsUUID()
  id: string;

  @Field(() => String)
  @IsString()
  name: string;
}
