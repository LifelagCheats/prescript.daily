# types/login

## Type Aliases

### Email

> **Email** = `` `${string}@${string}.${string}` ``

Defined in: [apps/frontend/src/types/login.d.ts:16](https://github.com/LifelagCheats/prescript.daily/blob/a468ae566075ac335ce0be9ad8f510ff421f830c/apps/frontend/src/types/login.d.ts#L16)

Represents a valid email address

#### Remarks

Uses typescript's template literals to simulate a real email
IS NOT A REAL EMAIL VALIDATION SOURCE, do not use to validate actual emails,
only to represent them

#### Example

```ts
const email_1: Email = '6767' // invalid
const email_2: Email = 'lebron@gmail.com' // valid
const email_3: Email = '@s.com' // also valid, hence don't use as verification
```
