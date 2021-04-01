[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

<!-- PROJECT LOGO -->
<br />
<p align="center">

  <h2 align="center">TsAlgo</h3>

  <p align="center">
	Typed data structures, algorithms, and utility functions library for JavaScript/TypeScript
    <br />
    <a href="https://amaan18.github.io/tsalgo"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/Amaan18/tsalgo/issues">Report Bug</a>
    ·
    <a href="https://github.com/Amaan18/tsalgo/issues">Request Feature</a>
  </p>
</p>

### Installation

-   Install with npm
    ```sh
    npm install tsalgo
    ```
-   or yarn
    ```sh
    yarn add tsalgo
    ```

<!-- USAGE EXAMPLES -->

## Usage

```typescript
import { LinkedList } from 'tsalgo';
```

or import all

```typescript
import * as Collections from 'tsalgo';
```

All implementations use TypeScript generics.

Use with TypeScript instead of JavaScript to get complete Intellisense + type-safety.

```typescript
import { LinkedList } from 'tsalgo';

const ll = new LinkedList<number>();

ll.push(100); // push adds to the end of the list
ll.push(200);
ll.push(300);

// Current state = 100 -> 200 -> 300

console.log(ll.shift()); // prints 100
console.log(ll.pop()); // prints 300
console.log(ll.size); // prints 1
console.log(ll.pop()); // prints 200
console.log(ll.size); // prints 0
```

<!-- ROADMAP -->

## Roadmap

This is a fairly new library, but I'm adding stuff everyday. See the [open issues](https://github.com/amaan18/amaan18/issues) for a list of proposed features (and known issues).

<!-- CONTRIBUTING -->

## Contributing

1. Fork the Project
2. Create your Feature Branch ( `git checkout -b feature/something`)
3. Commit your changes with commitizen (to follow semantic versioning) (`yarn commit` or `npm run commit`)
4. Push to the Branch (`git push origin feature/something`)
5. Open a Pull Request

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

[contributors-shield]: https://img.shields.io/github/contributors/amaan18/tsalgo.svg?style=for-the-badge
[forks-shield]: https://img.shields.io/github/forks/othneildrew/tsalgo.svg?style=for-the-badge
[forks-url]: https://github.com/amaan18/tsalgo/network/members
[stars-shield]: https://img.shields.io/github/stars/amaan18/tsalgo.svg?style=for-the-badge
[stars-url]: https://github.com/amaan18/tsalgo/stargazers
[issues-shield]: https://img.shields.io/github/issues/amaan18/tsalgo.svg?style=for-the-badge
[issues-url]: https://github.com/amaan18/tsalgo/issues
[license-shield]: https://img.shields.io/github/license/amaan18/tsalgo.svg?style=for-the-badge
[license-url]: https://github.com/amaan18/tsalgo/blob/release/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
