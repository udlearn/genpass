#!/usr/bin/env node

import argParser from 'yargs-parser';
import { DEFAULT_CONFIG as config, generatePassword as genpass } from './index';

const command: Record<string, any> = argParser(process.argv.slice(2), {
  alias: {
    L: 'length',
    l: 'lowercase',
    u: 'uppercase',
    d: 'digit',
    s: 'symbols',
    h: 'help',
    v: 'version',
  },
});
const usage = `Usage: genpass [options]

Options:
-L, --length <digit>        Password length (default to ${config.length})
-l, --lowercase [<digit>]   Enable or use this number of characters in lowercase
-u, --uppercase [<digit>]   Enable or use this number of characters in uppercase
-d, --digit [<digit>]       Enable or use this number of digits
-s, --special [<chars>]     Enable or use these special characters only
    --similar [<chars>]     Enable or use these lookalike characters only
    --ambiguous [<chars>]   Enable or use these ambiguous characters only

-v, --version               Show version number
-h, --help                  Show this help message

Examples:
1. generate passwords of 12 characters:
$ genpass -L 12

2. generate passwords with no digits and no uppercase characters:
$ genpass -d 0 -u 0

Visit https://www.npmjs.com/package/my-cool-genpass for more info.`;

if (command.help) {
  console.log(usage);
} else if (command.version) {
  /* eslint-disable-next-line */
  const pkg = require('../package.json'); // url: lib/cli.js
  console.log(pkg.version);
} else {
  /* eslint-disable-next-line */
  const { _, ...options } = command;
  try {
    console.log(genpass(options));
  } catch (e) {
    console.error(e instanceof Error ? e.message : 'unable to generate passwords');
  }
}
