# lib/auth

## Variables

### Authenticator

> `const` **Authenticator**: `object`

Defined in: [apps/frontend/src/lib/auth.ts:67](https://github.com/LifelagCheats/prescript.daily/blob/b5544dfb961264afdd27a969ee64a2cd8f0409bb/apps/frontend/src/lib/auth.ts#L67)

Authenticator is the API with which one interacts to authenticate the user.

#### Type Declaration

##### login()

> **login**(`email`, `password`): `Promise`\<\{ `user`: `User` \| `null`; `session`: `Session` \| `null`; \}\>

Logs into an existing user's account

###### Parameters

###### email

`` `${string}@${string}.${string}` ``

the user's email address

###### password

`string`

the user's password

###### Returns

`Promise`\<\{ `user`: `User` \| `null`; `session`: `Session` \| `null`; \}\>

the authenticated user's session data, if successful

###### Example

```ts
const session = Authenticator.login('email@example.com', 'password')
```

##### signUp()

> **signUp**(`username`, `email`, `password`): `Promise`\<\{ `user`: `User` \| `null`; `session`: `Session` \| `null`; \}\>

Registers a new user.

###### Parameters

###### username

`string`

The user's chosen username.

###### email

`` `${string}@${string}.${string}` ``

The user's email address.

###### password

`string`

The user's chosen password.

###### Returns

`Promise`\<\{ `user`: `User` \| `null`; `session`: `Session` \| `null`; \}\>

The newly created user session data.

###### Example

```ts
const newUser = await Authenticator.signUp('67onamerrychristmas', 'johnkaisen@email.com', 'password');
```

#### Remarks

Each method passes its respective type as the first argument.
This API was designed for aesthetic and ergonomic reasons.

#### Example

```ts
import Authenticator from '@lib/auth'

const user = await Authenticator.login('email@example.com', 'passsword');
const new = await Authenticator.signUp('username', 'email@example.com', 'password');
```
