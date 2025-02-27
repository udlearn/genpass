# genpass

Password generation made easy.

## Installation

```bash
npm i @udlearn/genpass
```

## Usage

- Using **Node.js**:

```ts
import genpass from '@udlearn/genpass';

console.log(genpass());
console.log(genpass({ length: 12, symbols: false }));
```

- Using **CLI**:

```bash
$ npm i -g @udlearn/genpass
> ...
$ genpass
> some-password
```

## Options

- `length` (default: `16`) sets the password length.
- `lowercase` (default: `8`) disables or applies this number of characters in lowercase.
- `uppercase` (default: `8`) disables or applies this number of characters in uppercase.
- `digit` (default: `4`) disables or applies this number of digits.
- `symbols` (default: `true`) disables or applies these special characters only.
- `similar` (default: `false`) disables or applies these lookalike characters only.
- `ambiguous` (default: `false`) disables or applies these ambiguous characters only.

## Contributing

Please follow the [Contributing](CONTRIBUTING.md) guidelines if you wish to collaborate
or share some feedback on how to make this better.

## License

[MIT](LICENSE).
