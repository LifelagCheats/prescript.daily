# lib/toast

## Classes

### Toast

Defined in: apps/frontend/src/lib/toast.ts:29

the Toast class is a singleton class made to manage through a variety of functions toast elements.

#### Remarks

This class is implemented to make sure that all toast instances are shared throughout the app.

#### See

[ToastItem](#toastitem) [Listener](#listener)

#### Constructors

##### Constructor

> **new Toast**(): [`Toast`](#toast)

###### Returns

[`Toast`](#toast)

#### Methods

##### subscribe()

> **subscribe**(`listener`): () => `void`

Defined in: apps/frontend/src/lib/toast.ts:44

the function that enables for the subscription and listening of the state of all toast elements.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`listener`

</td>
<td>

[`Listener`](#listener)

</td>
<td>

the function that's going to be stored as an active listener

</td>
</tr>
</tbody>
</table>

###### Returns

nothing, and deletes the given function from the list of active listeners

() => `void`

###### Remarks

Execute the given function again to unsubscribe from the listening.
due to listeners being a set, does not allow for duplicates.

##### add()

> **add**(`message`, `timeout?`): `` `${string}-${string}-${string}-${string}-${string}` ``

Defined in: apps/frontend/src/lib/toast.ts:79

Adds a new toast to the list of active toasts

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`message`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
<td>

the message to be displayed by the toast while it's alive

</td>
</tr>
<tr>
<td>

`timeout`

</td>
<td>

`number`

</td>
<td>

`3000`

</td>
<td>

the amount of time (in miliseconds) until the toast is removed after its creation. Defaults to `3000`. set to `0` if you want none

</td>
</tr>
</tbody>
</table>

###### Returns

`` `${string}-${string}-${string}-${string}-${string}` ``

the ID of the newly created toast

###### Remarks

Adds a new toast object to the `items` list with a cryptographically-made id
and the message property as the message parameter given to the function,
after a certain amount of time, if a timeout was given, the toast will vanish. if not, it'll persevere.
either way, after doing this, it'll update all listeners.

##### close()

> **close**(`id`): `void`

Defined in: apps/frontend/src/lib/toast.ts:100

Deletes a toast and then updates all listeners.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`id`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Remarks

uses the given ID to delete the toast with the matching ID inside the current items list,
after that, updates all listeners.

##### clear()

> **clear**(): `void`

Defined in: apps/frontend/src/lib/toast.ts:108

Deletes all toast elements and updates all listeners, completely clearing the list of active toasts.

###### Returns

`void`

## Type Aliases

### ToastItem

> **ToastItem** = `object`

Defined in: apps/frontend/src/lib/toast.ts:7

Represents a toast object inside the ToastItem list.

#### Properties

##### id

> **id**: `string`

Defined in: apps/frontend/src/lib/toast.ts:8

the unique identifier of the toast object

##### message

> **message**: `string`

Defined in: apps/frontend/src/lib/toast.ts:9

the message it carries

***

### Listener

> **Listener** = (`items`) => `void`

Defined in: apps/frontend/src/lib/toast.ts:18

Defines the type of a function that wants to listen for toast updates

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`items`

</td>
<td>

[`ToastItem`](#toastitem)[]

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

#### Remarks

Listeners will be stored in a list which will enumerate them all

## Variables

### toast

> `const` **toast**: [`Toast`](#toast)

Defined in: apps/frontend/src/lib/toast.ts:157

The shared toast manager instance that can be used throughout the application

#### Example

```ts
import { toast, ToastItem } from '@lib/toast'

toast.add('hi!') // creates the toast element and displays the given message with a lifespan of 3 seconds by default
toast.add('hi!', 250) // creates a toast element that will only last 250 miliseconds

let ToastList: ToastItem[] = []

function setToastList(items: ToastItem[]) {
 ToastList = items;
}

const subscription = toast.subscribe(setToastList) // now we subscribe to the current global list of toasts,
                                                   // giving setToastList as our function to enable updates to the current list of toasts
                                                   // if we ever want to unsubscribe, we can use the function given to use, which is subscription
subscription(); // unsubscribing.
// of course imagine we never unsubscribed

const toast1 = toast.add('hi', 3000);
console.log(ToastList); // [
                             {
                               id: 'abcdefg...'
                               message: 'hi'
                             }
                           ]
console.log(toast1) // abcdefg...
toast.close('abcdefg')
console.log(ToastList) // [], empty.
toast.add('hi')
toast.add('hi1')
toast.add('hi2')
// to clear it all at once, use...
toast.clear();
console.log(ToastList) // [], empty.

```

#### See

[Toast](#toast) [ToastItem](#toastitem) [Listener](#listener)
