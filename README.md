<p align="center"><img src="./src/oh-my-box.svg" /></p>

## Pre-installed

- [rust](https://www.rust-lang.org/learn/get-started)
- [nodejs](https://nodejs.org)
- [wasm-pack](https://github.com/rustwasm/wasm-pack)
- [rsw](https://github.com/rwasm/rsw-rs)

### Install wasm-pack

```bash
cargo install wasm-pack

# With Windows
cargo install wasm-pack --version 0.9.1
```

### Install rsw

```bash
cargo install rsw
```

**Note: If your operating system is `Windows`, it is recommended to install `wasm-pack v0.9.1`**

## Quick start

Note: Open two terminal windows, execute `yarn rsw watch` in the first and `yarn tauri dev` in the second. The order of execution is important, do not close the first window!

```bash
# 1. Do not exit the process after the command has started.
yarn rsw watch

# 2. Front-end: start dev server
yarn tauri dev
```

## License

GPL-3.0 license © 2022 lencx
