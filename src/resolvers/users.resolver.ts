import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql';
import { GraphQLError } from 'graphql';

import { CreateUserInput, UserByIdInput } from '../dtos/inputs/user.input';
import { Appointment } from '../dtos/models/appointment.model';
import { User } from '../dtos/models/user.model';
import { prisma } from '../utils/prisma';

@Resolver(() => User)
export class UsersResolver {
  @Query(() => [User])
  async users() {
    return await prisma.user.findMany({
      select: {
        id: true,
        name: true,
      },
    });
  }

  @Query(() => User)
  async userById(@Arg('user', () => UserByIdInput) { id }: UserByIdInput) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new GraphQLError('User not found!');
    }

    return user;
  }

  @Mutation(() => User)
  async createUser(
    @Arg('data', () => CreateUserInput)
    { name }: CreateUserInput
  ): Promise<User> {
    const user = await prisma.user.create({
      data: {
        name,
      },
    });

    return user;
  }

  @FieldResolver(() => [Appointment])
  async appointments(@Root() { id }: User) {
    const userAppointments = await prisma.appointment.findMany({
      where: {
        userId: id,
      },
    });

    return userAppointments ?? [];
  }
}
