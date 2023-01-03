import { Field, ID, ObjectType } from 'type-graphql';
import { IsDate, IsUUID } from 'class-validator';

@ObjectType()
export class Appointment {
  @Field(() => ID)
  @IsUUID()
  userId: string;

  @Field(() => Date)
  @IsDate()
  startDate: Date;

  @Field(() => Date)
  @IsDate()
  endDate: Date;
}
