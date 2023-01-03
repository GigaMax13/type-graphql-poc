import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql';

import { CreateAppointmentInput } from '../dtos/inputs/createAppointment.input';
import { Appointment } from '../dtos/models/appointment.model';
import { User } from '../dtos/models/user.model';
import { appointments, users } from '../fakeDB';

@Resolver(() => Appointment)
export class AppointmentsResolver {
  @Query(() => [Appointment])
  appointments() {
    return appointments;
  }

  @Mutation(() => Appointment)
  createAppointment(
    @Arg('data', () => CreateAppointmentInput)
    { userId, startDate, endDate }: CreateAppointmentInput
  ): Appointment {
    const user = users.find((user) => user.id === userId);
    if (!user) {
      throw new Error('User not found!');
    }

    const appointment: Appointment = {
      userId,
      startDate,
      endDate,
    };

    appointments.push(appointment);

    return appointment;
  }

  @FieldResolver(() => User)
  async user(@Root() { userId }: Appointment) {
    const user = users.find((user) => user.id === userId);
    if (!user) {
      throw new Error('User not found!');
    }

    return user;
  }
}
