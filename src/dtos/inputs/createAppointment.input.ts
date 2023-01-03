import { Field, InputType, ID } from 'type-graphql';
import { IsDate, IsUUID } from 'class-validator';

@InputType()
export class CreateAppointmentInput {
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
