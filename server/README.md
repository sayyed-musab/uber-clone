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

# Maps Endpoints

All maps endpoints require authentication. Provide either:

- `Authorization: Bearer <token>`
- `token` cookie

## GET /api/maps/get-coordinates

### Description

Returns latitude/longitude for a given address.

### Query Params

- `address` (string, min 3 chars)

### Responses

#### 200 OK

```json
{
  "ltd": 12.9716,
  "lng": 77.5946
}
```

#### 400 Bad Request

```json
{
  "errors": [
    {
      "msg": "Address must be at least 3 characters long",
      "param": "address",
      "location": "query"
    }
  ]
}
```

## GET /api/maps/get-distance-and-time

### Description

Returns distance and duration between origin and destination.

### Query Params

- `origin` (string, min 3 chars)
- `destination` (string, min 3 chars)

### Responses

#### 200 OK

```json
{
  "distance": {
    "text": "8.2 km",
    "value": 8200
  },
  "duration": {
    "text": "18 mins",
    "value": 1080
  },
  "status": "OK"
}
```

#### 400 Bad Request

```json
{
  "errors": [
    {
      "msg": "Origin must be at least 3 characters long",
      "param": "origin",
      "location": "query"
    }
  ]
}
```

#### 500 Internal Server Error

```json
{
  "message": "Internal server error"
}
```

## GET /api/maps/get-suggestions

### Description

Returns place autocomplete suggestions for a query string.

### Query Params

- `input` (string, min 3 chars)

### Responses

#### 200 OK

```json
[
  "MG Road, Bengaluru, Karnataka, India",
  "MG Road Metro Station, Bengaluru, Karnataka, India"
]
```

#### 400 Bad Request

```json
{
  "errors": [
    {
      "msg": "Invalid value",
      "param": "input",
      "location": "query"
    }
  ]
}
```

# Ride Endpoints

All ride endpoints require authentication. Provide either:

- `Authorization: Bearer <token>`
- `token` cookie

## GET /api/rides/get-fare

### Description

Returns fare estimates for auto, car, and motorcycle between pickup and destination.

### Query Params

- `pickup` (string, min 3 chars)
- `destination` (string, min 3 chars)

### Responses

#### 200 OK

```json
{
  "auto": 92,
  "car": 140,
  "motorcycle": 78
}
```

#### 400 Bad Request

```json
{
  "errors": [
    {
      "msg": "Invalid value",
      "param": "pickup",
      "location": "query"
    }
  ]
}
```

#### 500 Internal Server Error

```json
{
  "message": "<error message>"
}
```

## POST /api/rides/create

### Description

Creates a ride request and returns the ride details with fare and OTP.

### Request Body

Content-Type: application/json

```json
{
  "pickup": "MG Road, Bengaluru",
  "destination": "Indiranagar, Bengaluru",
  "vehicleType": "car"
}
```

#### Validation Rules

- `pickup`: required, minimum 3 characters
- `destination`: required, minimum 3 characters
- `vehicleType`: required, one of `auto`, `car`, `motorcycle`

### Responses

#### 201 Created

```json
{
  "_id": "<id>",
  "user": "<userId>",
  "pickup": "MG Road, Bengaluru",
  "destination": "Indiranagar, Bengaluru",
  "fare": 155,
  "status": "pending",
  "duration": null,
  "distance": null,
  "paymentID": null,
  "orderId": null,
  "signature": null
}
```

#### 400 Bad Request

```json
{
  "errors": [
    {
      "msg": "Invalid vehicle type",
      "param": "vehicleType",
      "location": "body"
    }
  ]
}
```

#### 500 Internal Server Error

```json
{
  "message": "<error message>"
}
```

```json
{
  "error": "Unauthorized"
}
```
