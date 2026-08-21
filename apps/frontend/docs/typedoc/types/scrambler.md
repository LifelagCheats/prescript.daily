# types/scrambler

## Interfaces

### ScramblerOptions

Defined in: [apps/frontend/src/types/scrambler.d.ts:14](https://github.com/LifelagCheats/prescript.daily/blob/b5544dfb961264afdd27a969ee64a2cd8f0409bb/apps/frontend/src/types/scrambler.d.ts#L14)

Represents the settings that can be submitted into the [lib/scrambler.revealTextScramble](../lib/scrambler.md#revealtextscramble) function.

#### See

[lib/scrambler.revealTextScramble](../lib/scrambler.md#revealtextscramble)

#### Properties

##### fps?

> `optional` **fps?**: `number`

Defined in: [apps/frontend/src/types/scrambler.d.ts:15](https://github.com/LifelagCheats/prescript.daily/blob/b5544dfb961264afdd27a969ee64a2cd8f0409bb/apps/frontend/src/types/scrambler.d.ts#L15)

frames per second, remember that the equation is 1000 / fps.

##### scrambleChars?

> `optional` **scrambleChars?**: `string`

Defined in: [apps/frontend/src/types/scrambler.d.ts:16](https://github.com/LifelagCheats/prescript.daily/blob/b5544dfb961264afdd27a969ee64a2cd8f0409bb/apps/frontend/src/types/scrambler.d.ts#L16)

a string with a list of all the characters available to be chosen each time a singular scramble is made before revealing the character. no spaces between characters.

##### blockChar?

> `optional` **blockChar?**: `string`

Defined in: [apps/frontend/src/types/scrambler.d.ts:17](https://github.com/LifelagCheats/prescript.daily/blob/b5544dfb961264afdd27a969ee64a2cd8f0409bb/apps/frontend/src/types/scrambler.d.ts#L17)

the character that's going to be used as the block character in the sequence.

##### revealSpeed?

> `optional` **revealSpeed?**: `number`

Defined in: [apps/frontend/src/types/scrambler.d.ts:18](https://github.com/LifelagCheats/prescript.daily/blob/b5544dfb961264afdd27a969ee64a2cd8f0409bb/apps/frontend/src/types/scrambler.d.ts#L18)

time before each individual character is revealed, in the time it has not reached that time, the scrambling animation for that character will happen.

##### blockChance?

> `optional` **blockChance?**: `number`

Defined in: [apps/frontend/src/types/scrambler.d.ts:19](https://github.com/LifelagCheats/prescript.daily/blob/b5544dfb961264afdd27a969ee64a2cd8f0409bb/apps/frontend/src/types/scrambler.d.ts#L19)

the chance of the block character appearing that frame.

##### beepChancePerFrame?

> `optional` **beepChancePerFrame?**: `number`

Defined in: [apps/frontend/src/types/scrambler.d.ts:20](https://github.com/LifelagCheats/prescript.daily/blob/b5544dfb961264afdd27a969ee64a2cd8f0409bb/apps/frontend/src/types/scrambler.d.ts#L20)

the chance of the respective beep sound being played that frame.

##### minBeepGapMs?

> `optional` **minBeepGapMs?**: `number`

Defined in: [apps/frontend/src/types/scrambler.d.ts:21](https://github.com/LifelagCheats/prescript.daily/blob/b5544dfb961264afdd27a969ee64a2cd8f0409bb/apps/frontend/src/types/scrambler.d.ts#L21)

minimum time that needs to have passed between beeps for them to be played.

***

### ScramblerGlobals

Defined in: [apps/frontend/src/types/scrambler.d.ts:34](https://github.com/LifelagCheats/prescript.daily/blob/b5544dfb961264afdd27a969ee64a2cd8f0409bb/apps/frontend/src/types/scrambler.d.ts#L34)

Represents the core settings and objects used in the [lib/scrambler.revealTextScramble](../lib/scrambler.md#revealtextscramble) function.

#### See

[lib/scrambler.revealTextScramble](../lib/scrambler.md#revealtextscramble)

#### Properties

##### audioUnlocked

> **audioUnlocked**: `boolean`

Defined in: [apps/frontend/src/types/scrambler.d.ts:35](https://github.com/LifelagCheats/prescript.daily/blob/b5544dfb961264afdd27a969ee64a2cd8f0409bb/apps/frontend/src/types/scrambler.d.ts#L35)

boolean property that dictates whether the next audio properties will be executed.

##### startBeep?

> `optional` **startBeep?**: `Howl`

Defined in: [apps/frontend/src/types/scrambler.d.ts:36](https://github.com/LifelagCheats/prescript.daily/blob/b5544dfb961264afdd27a969ee64a2cd8f0409bb/apps/frontend/src/types/scrambler.d.ts#L36)

Howl instance that will be played at the start of the sequence.

##### Beep?

> `optional` **Beep?**: `Howl`

Defined in: [apps/frontend/src/types/scrambler.d.ts:37](https://github.com/LifelagCheats/prescript.daily/blob/b5544dfb961264afdd27a969ee64a2cd8f0409bb/apps/frontend/src/types/scrambler.d.ts#L37)

Howl instance that will be played as the beep sound in the sequence.

##### endBeep?

> `optional` **endBeep?**: `Howl`

Defined in: [apps/frontend/src/types/scrambler.d.ts:38](https://github.com/LifelagCheats/prescript.daily/blob/b5544dfb961264afdd27a969ee64a2cd8f0409bb/apps/frontend/src/types/scrambler.d.ts#L38)

Howl instanc that will be played once the animation ends.

***

### RevealElement

Defined in: [apps/frontend/src/types/scrambler.d.ts:52](https://github.com/LifelagCheats/prescript.daily/blob/b5544dfb961264afdd27a969ee64a2cd8f0409bb/apps/frontend/src/types/scrambler.d.ts#L52)

An interface representing the type of element going to be revealed by the [lib/scrambler.revealTextScramble](../lib/scrambler.md#revealtextscramble) function.

#### Remarks

It is a normal HTMLElement, only differing because of its __revealTimer property.

#### See

[lib/scrambler.revealTextScramble](../lib/scrambler.md#revealtextscramble)

#### Extends

- `HTMLElement`

#### Properties

##### \_\_revealTimer?

> `optional` **\_\_revealTimer?**: `Timeout` \| `null`

Defined in: [apps/frontend/src/types/scrambler.d.ts:53](https://github.com/LifelagCheats/prescript.daily/blob/b5544dfb961264afdd27a969ee64a2cd8f0409bb/apps/frontend/src/types/scrambler.d.ts#L53)

time between each reveal sequence done by the function, attached directly to the element.

***

### Prescript

Defined in: [apps/frontend/src/types/scrambler.d.ts:67](https://github.com/LifelagCheats/prescript.daily/blob/b5544dfb961264afdd27a969ee64a2cd8f0409bb/apps/frontend/src/types/scrambler.d.ts#L67)

Interface represeting a prescript.

#### Remarks

The Prescript knows best.

#### See

[lib/scrambler.revealTextScramble](../lib/scrambler.md#revealtextscramble)

#### Properties

##### id

> **id**: `number`

Defined in: [apps/frontend/src/types/scrambler.d.ts:68](https://github.com/LifelagCheats/prescript.daily/blob/b5544dfb961264afdd27a969ee64a2cd8f0409bb/apps/frontend/src/types/scrambler.d.ts#L68)

the prescript's ID in the Supabase database.

##### instruction

> **instruction**: `string`

Defined in: [apps/frontend/src/types/scrambler.d.ts:69](https://github.com/LifelagCheats/prescript.daily/blob/b5544dfb961264afdd27a969ee64a2cd8f0409bb/apps/frontend/src/types/scrambler.d.ts#L69)

a string that contains the Prescript's instructions as per the database.
