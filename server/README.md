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

# User Login Endpoint

## POST /api/users/login

### Description

Authenticates a user and returns an authentication token with the user object. Also sets a `token` cookie.

### Request Body

Content-Type: application/json

```json
{
  "email": "john.doe@example.com",
  "password": "secret123"
}
```

#### Validation Rules

- `email`: required, must be a valid email
- `password`: required

### Responses

#### 200 OK

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

#### Notes

- Token expires in 24 hours.
- You can send the token via `Authorization: Bearer <token>` or the `token` cookie for protected routes.

#### 400 Bad Request

Returned when validation fails.

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

#### 401 Unauthorized

Returned when credentials are invalid.

```json
{
  "error": "Invalid credentials"
}
```

#### 500 Internal Server Error

```json
{
  "error": "<message>"
}
```

# User Profile Endpoint

## GET /api/users/profile

### Description

Returns the authenticated user's profile.

### Authentication

Required. Provide either:

- `Authorization: Bearer <token>`
- `token` cookie

### Responses

#### 200 OK

```json
{
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

#### 401 Unauthorized

Returned when the token is missing, invalid, or blacklisted.

```json
{
  "error": "Unauthorized"
}
```

# User Logout Endpoint

## GET /api/users/logout

### Description

Logs out the authenticated user by clearing the `token` cookie and blacklisting the current token for 24 hours.

### Authentication

Required. Provide either:

- `Authorization: Bearer <token>`
- `token` cookie

### Responses

#### 200 OK

```json
{
  "message": "Logged out successfully"
}
```

#### 401 Unauthorized

Returned when the token is missing, invalid, or blacklisted.

```json
{
  "error": "Unauthorized"
}
```

# Captain Registration Endpoint

## POST /api/captains/register

### Description

Registers a new captain and returns an authentication token with the created captain object.

### Request Body

Content-Type: application/json

```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "secret123",
  "vehicle": {
    "color": "Black",
    "plate": "ABC-1234",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

#### Validation Rules

- `fullName.firstName`: required, minimum 3 characters
- `fullName.lastName`: optional, minimum 3 characters if provided
- `email`: required, must be a valid email
- `password`: required, minimum 6 characters
- `vehicle.color`: required, minimum 3 characters
- `vehicle.plate`: required, minimum 3 characters
- `vehicle.capacity`: required, integer, minimum 1
- `vehicle.vehicleType`: required, one of `car`, `motorcycle`, `auto`

### Responses

#### 201 Created

```json
{
  "token": "<jwt>",
  "captain": {
    "_id": "<id>",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "status": "inactive",
    "vehicle": {
      "color": "Black",
      "plate": "ABC-1234",
      "capacity": 4,
      "vehicleType": "car"
    },
    "socketId": null
  }
}
```

#### 400 Bad Request

Returned when validation fails, required fields are missing, or the email already exists.

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

Or:

```json
{
  "error": "Captain with this email already exists"
}
```

# Captain Login Endpoint

## POST /api/captains/login

### Description

Authenticates a captain and returns an authentication token with the captain object. Also sets a `token` cookie.

### Request Body

Content-Type: application/json

```json
{
  "email": "john.doe@example.com",
  "password": "secret123"
}
```

#### Validation Rules

- `email`: required, must be a valid email
- `password`: required

### Responses

#### 200 OK

```json
{
  "token": "<jwt>",
  "captain": {
    "_id": "<id>",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "status": "inactive",
    "vehicle": {
      "color": "Black",
      "plate": "ABC-1234",
      "capacity": 4,
      "vehicleType": "car"
    },
    "socketId": null
  }
}
```

#### Notes

- Token expires in 24 hours.
- You can send the token via `Authorization: Bearer <token>` or the `token` cookie for protected routes.

#### 400 Bad Request

Returned when validation fails.

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

#### 401 Unauthorized

Returned when credentials are invalid.

```json
{
  "error": "Invalid credentials"
}
```

#### 500 Internal Server Error

```json
{
  "error": "<message>"
}
```

# Captain Profile Endpoint

## GET /api/captains/profile

### Description

Returns the authenticated captain's profile.

### Authentication

Required. Provide either:

- `Authorization: Bearer <token>`
- `token` cookie

### Responses

#### 200 OK

```json
{
  "captain": {
    "_id": "<id>",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "status": "inactive",
    "vehicle": {
      "color": "Black",
      "plate": "ABC-1234",
      "capacity": 4,
      "vehicleType": "car"
    },
    "socketId": null
  }
}
```

#### 401 Unauthorized

Returned when the token is missing, invalid, or blacklisted.

```json
{
  "error": "Unauthorized"
}
```

# Captain Logout Endpoint

## GET /api/captains/logout

### Description

Logs out the authenticated captain by clearing the `token` cookie and blacklisting the current token for 24 hours.

### Authentication

Required. Provide either:

- `Authorization: Bearer <token>`
- `token` cookie

### Responses

#### 200 OK

```json
{
  "message": "Logged out successfully"
}
```

#### 401 Unauthorized

Returned when the token is missing, invalid, or blacklisted.

```json
{
  "error": "Unauthorized"
}
```
