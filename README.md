### Run

```bash
npm run dev
```

### Sample Query/Mutation

```graphql
mutation ($newUser: CreateUserInput!) {
  createUser(data: $newUser) {
    id
    name
  }
}

query {
  users {
    id
    name
    appointments {
      startDate
      endDate
    }
  }
}

query ($user: UserByIdInput!) {
  userById(user: $user) {
    id
    name
    appointments {
      startDate
      endDate
    }
  }
}

query {
  appointments {
    startDate
    endDate
    user {
      id
      name
    }
  }
}

mutation ($data: CreateAppointmentInput!) {
  createAppointment(data: $data) {
    startDate
    endDate
    user {
      id
      name
    }
  }
}
```
