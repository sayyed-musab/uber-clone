# User Registration Endpoint

## POST /api/users/register

### Description

Registers a new user and returns an authentication token with the created user object.

### Request Body

Content-Type: application/json

```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "secret123"
}
```

#### Validation Rules

- `fullName.firstName`: required, minimum 3 characters
- `fullName.lastName`: optional, minimum 3 characters if provided
- `email`: required, must be a valid email
- `password`: required, minimum 6 characters

### Responses

#### 201 Created

```json
{
  "token": "<jwt>",
  "user": {
    "_id": "<id>",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null
  }
}
```

#### 400 Bad Request

Returned when validation fails or required fields are missing.

```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

Or:

```json
{
  "error": "Missing required fields"
}
```
