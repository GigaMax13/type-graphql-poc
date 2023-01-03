import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql';
import { v4 as uuid } from 'uuid';

import { CreateUserInput, UserByIdInput } from '../dtos/inputs/user.input';
import { Appointment } from '../dtos/models/appointment.model';
import { User } from '../dtos/models/user.model';

import { appointments, users } from '../fakeDB';

@Resolver(() => User)
export class UsersResolver {
  @Query(() => [User])
  users() {
    return users;
  }

  @Query(() => User)
  userById(@Arg('user', () => UserByIdInput) { id }: UserByIdInput) {
    const user = users.find((user) => user.id === id);
    if (!user) {
      throw new Error('User not found!');
    }

    return user;
  }

  @Mutation(() => User)
  async createUser(
    @Arg('data', () => CreateUserInput)
    { name }: CreateUserInput
  ): Promise<User> {
    const id = uuid();

    users.push({ id, name });

    return { id, name };
  }

  @FieldResolver(() => [Appointment])
  async appointments(@Root() { id }: User) {
    const userAppointment = appointments.filter(({ userId }) => userId === id);
    return userAppointment;
  }
}
