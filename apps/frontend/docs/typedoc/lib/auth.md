# lib/auth

## Variables

### Authenticator

> `const` **Authenticator**: `object`

Defined in: [apps/frontend/src/lib/auth.ts:67](https://github.com/LifelagCheats/prescript.daily/blob/d39308c072353e430f7a5a216443ce86b40d1508/apps/frontend/src/lib/auth.ts#L67)

Authenticator is the API with which one interacts to authenticate the user.

#### Type Declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`login()`

</td>
<td>

(`email`, `password`) => `Promise`\<\{ `user`: `User` \| `null`; `session`: `Session` \| `null`; \}\>

</td>
<td>

Logs into an existing user's account

**Example**

```ts
const session = Authenticator.login('email@example.com', 'password')
```

</td>
<td>

[apps/frontend/src/lib/auth.ts:80](https://github.com/LifelagCheats/prescript.daily/blob/d39308c072353e430f7a5a216443ce86b40d1508/apps/frontend/src/lib/auth.ts#L80)

</td>
</tr>
<tr>
<td>

`signUp()`

</td>
<td>

(`username`, `email`, `password`) => `Promise`\<\{ `user`: `User` \| `null`; `session`: `Session` \| `null`; \}\>

</td>
<td>

Registers a new user.

**Example**

```ts
const newUser = await Authenticator.signUp('67onamerrychristmas', 'johnkaisen@email.com', 'password');
```

</td>
<td>

[apps/frontend/src/lib/auth.ts:97](https://github.com/LifelagCheats/prescript.daily/blob/d39308c072353e430f7a5a216443ce86b40d1508/apps/frontend/src/lib/auth.ts#L97)

</td>
</tr>
</tbody>
</table>

#### Remarks

Each method passes its respective type as the first argument.
This API was designed for aesthetic and ergonomic reasons.

#### Example

```ts
import Authenticator from '@lib/auth'

const user = await Authenticator.login('email@example.com', 'passsword');
const new = await Authenticator.signUp('username', 'email@example.com', 'password');
```
