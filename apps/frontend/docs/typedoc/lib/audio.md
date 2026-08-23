# lib/audio

## Classes

### AudioManager

Defined in: [apps/frontend/src/lib/audio.ts:29](https://github.com/LifelagCheats/prescript.daily/blob/a468ae566075ac335ce0be9ad8f510ff421f830c/apps/frontend/src/lib/audio.ts#L29)

AudioManager is a singleton class responsible for managing shared audio instances across the application.

#### Remarks

This class is implemented as a singleton to ensure that all audio instances (beep, start, completed)
are shared and reused throughout the app. Each audio instance is lazy-loaded on first access to
improve performance and reduce initial load time.

#### Example

```ts
import { audio } from '@lib/audio';

// Play the beep sound
audio.beep.play();

// Play the start sound
audio.start.play();

// Play the completed sound
audio.completed.play();
```

#### Accessors

##### beep

###### Get Signature

> **get** **beep**(): `Howl`

Defined in: [apps/frontend/src/lib/audio.ts:68](https://github.com/LifelagCheats/prescript.daily/blob/a468ae566075ac335ce0be9ad8f510ff421f830c/apps/frontend/src/lib/audio.ts#L68)

Gets the `beep` audio instance (Howl) — lazy-loaded on first access.

###### Remarks

not looped and is preloaded but not autoplayed.
Error handling is delegated to the `handleError` function.

###### Example

```ts
audio.beep.play();
```

###### Returns

`Howl`

The Howl instance for the beep sound.

##### start

###### Get Signature

> **get** **start**(): `Howl`

Defined in: [apps/frontend/src/lib/audio.ts:97](https://github.com/LifelagCheats/prescript.daily/blob/a468ae566075ac335ce0be9ad8f510ff421f830c/apps/frontend/src/lib/audio.ts#L97)

Gets the `start` audio instance (Howl) — lazy-loaded on first access.

###### Remarks

not looped and is preloaded but not autoplayed.
Error handling is delegated to the `handleError` function.

###### Example

```ts
audio.start.play();
```

###### Returns

`Howl`

The Howl instance for the start sound.

##### completed

###### Get Signature

> **get** **completed**(): `Howl`

Defined in: [apps/frontend/src/lib/audio.ts:126](https://github.com/LifelagCheats/prescript.daily/blob/a468ae566075ac335ce0be9ad8f510ff421f830c/apps/frontend/src/lib/audio.ts#L126)

Gets the `completed` audio instance (Howl) — lazy-loaded on first access.

###### Remarks

not looped and is preloaded but not autoplayed.
Error handling is delegated to the `handleError` function.

###### Example

```ts
audio.completed.play();
```

###### Returns

`Howl`

The Howl instance for the completed sound.

#### Methods

##### getInstance()

> `static` **getInstance**(): [`AudioManager`](#audiomanager)

Defined in: [apps/frontend/src/lib/audio.ts:47](https://github.com/LifelagCheats/prescript.daily/blob/a468ae566075ac335ce0be9ad8f510ff421f830c/apps/frontend/src/lib/audio.ts#L47)

Returns the singleton instance of AudioManager.

###### Returns

[`AudioManager`](#audiomanager)

The shared AudioManager instance.

###### Example

```ts
const audioManager = AudioManager.getInstance();
```

## Variables

### audio

> `const` **audio**: [`AudioManager`](#audiomanager)

Defined in: [apps/frontend/src/lib/audio.ts:154](https://github.com/LifelagCheats/prescript.daily/blob/a468ae566075ac335ce0be9ad8f510ff421f830c/apps/frontend/src/lib/audio.ts#L154)

The shared audio instance that can be used anywhere in the application.

#### See

[AudioManager](#audiomanager) for the class definition.

#### Example

```ts
import { audio } from '@lib/audio';
audio.beep.play();
```
