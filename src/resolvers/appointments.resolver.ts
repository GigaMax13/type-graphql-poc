import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql';
import { GraphQLError } from 'graphql';

import { CreateAppointmentInput } from '../dtos/inputs/createAppointment.input';
import { Appointment } from '../dtos/models/appointment.model';
import { User } from '../dtos/models/user.model';
import { prisma } from '../utils/prisma';

@Resolver(() => Appointment)
export class AppointmentsResolver {
  @Query(() => [Appointment])
  async appointments() {
    return (await prisma.appointment.findMany()) ?? [];
  }

  @Mutation(() => Appointment)
  async createAppointment(
    @Arg('data', () => CreateAppointmentInput)
    { userId, startDate, endDate }: CreateAppointmentInput
  ): Promise<Appointment> {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new GraphQLError('User not found!');
    }

    const appointment = await prisma.appointment.create({
      data: {
        userId,
        startDate,
        endDate,
      },
    });

    return appointment;
  }

  @FieldResolver(() => User)
  async user(@Root() { userId }: Appointment): Promise<User> {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
      },
    });
    if (!user) {
      throw new GraphQLError('User not found!');
    }

    return user;
  }
}
