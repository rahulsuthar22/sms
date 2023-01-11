# School Management System Database

Creating sms database

```sql
  CREATE DATABASE sms;
```

Creating admin table

```sql
  CREATE TABLE admin(
        id BIGSERIAL NOT NULL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        username VARCHAR(50) NOT NULL UNIQUE,
        password VARCHAR NOT NULL,
        email VARCHAR(50) NOT NULL UNIQUE
  );
```
