# fortuna
Weighted gacha system.

## Usage

Create an item using `GachaMachine.createItem`

More weight = more common
```js
const items = [
    GachaMachine.createItem("SSR cool character", 1),
    GachaMachine.createItem("Kinda rare character", 3),
    GachaMachine.createItem("Mob character", 5),
    GachaMachine.createItem("Mob character", 5),
    GachaMachine.createItem("Mob character", 5),
  }
]

const machine = new GachaMachine(items)

machine.get(10) // Rolls 10x 

/*
    My result:
    [
      "Kinda rare character",
      "Mob character",
      "Mob character",
      "Mob character",
      "Mob character",
      "Kinda rare character",
      "Mob character",
      "Mob character",
      "Mob character",
      "Mob character"
    ]
*/
```

### Plain weighted random selection
You probably don't need all complicated stuff. Here's a quick way to just create a simple weight-based gacha system:
(Only works on v1.1.0 and above)

```ts
import { GachaMachine } from 'https://deno.land/x/fortuna@v2.0.0/mod.ts' // wherever you are importing from. 

const items = [
    GachaMachine.createRollChoice("SSR cool character", 1),
    GachaMachine.createRollChoice("Kinda rare character", 3),
    GachaMachine.createRollChoice("Mob character", 5),
    GachaMachine.createRollChoice("Mob character", 5),
    GachaMachine.createRollChoice("Mob character", 5),
]

GachaMachine._roll(items) // Rolls one item from the list of items
```

### Alternatively...
`GachaMachine.createRollChoice` just returns an object with `result` and `chance`. In otherwords, it's useless code. Just supply your own object ez.
```ts
import { GachaMachine } from 'https://deno.land/x/fortuna@v1.2.0/mod.ts' // wherever you are importing from. 

const items = [
    { result: "SSR cool character", chance: 1 },
    { result: "Kinda rare character", chance: 3 },
    { result: "Mob character", chance: 5 },
    { result: "Mob character", chance: 5 },
    { result: "Mob character", chance: 5 },
]

GachaMachine.roll(items) // Rolls one item from the list of items
```


## Documentation
Documentation for the latest version can be found in [https://doc.deno.land/https://deno.land/x/fortuna/mod.ts](https://doc.deno.land/https://deno.land/x/fortuna/mod.ts)

A guide for usage can be found in [docs.nekooftheabyss.moe](https://docs.nekooftheabyss.moe/fortuna) (not updated for v2 yet).


## What I don't like about fortuna atm
I initially made fortuna for a very specific purpose. When I later decided to make it an open-source, general-purpose gacha system, I had to make a lot of changes which ended up making a large part of the code look niche. More like, it is niche. The only thing a person would need from fortuna is the `_roll` method which I have no idea why I prefixed with an underscore.

~~Especially the `tier` and `pool` system. Have they ever been of use in any place? If any, those features only make the rest of the code worse.~~ As of v1.2.0, fortuna's earlier algorithm was replaced with a much simpler one (I realized that I was using a bunch of worthless stuff). Older algorithms can be accessed via the `failures` directory.

### How to test a failure?

```ts
import { roll } from "https://deno.land/x/fortuna@v1.2.0/failures/roll1.ts"
```

You can pass an array of items of the form `{ result: ItemType, chance: number}` where `result` is the value and `chance` is the weight of the value. `ItemType` is to be passed as a type parameter to `roll`.


~~So I'll be redoing a large part of the code, mainly reworking the two features I mentioned. Hence, v2 will be coming soon with breaking changes for world peace... Hopefully.~~
v1.2.0 is out with better typings and a better algorithm already. `_roll` is now `roll`.
