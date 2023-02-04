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
```

### Supabase configuration

- [Supabase Shadow Database Config](https://supabase.com/docs/guides/integrations/prisma#configuring-the-project-to-use-postgresql)
- [psql Installation](https://www.timescale.com/blog/how-to-install-psql-on-mac-ubuntu-debian-windows/)
- [Prisma Shadow Database Config](https://www.prisma.io/docs/concepts/components/prisma-migrate/shadow-database#cloud-hosted-shadow-databases-must-be-created-manually)
- [pgAdmin Connection](https://supabase.com/docs/guides/database/connecting-to-postgres)
- [Local Development](https://supabase.com/docs/guides/resources/supabase-cli/local-development)
- [Set different environments](https://github.com/prisma/prisma/issues/3865)
