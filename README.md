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

## 开发教程

> 关注 《浮之静》公众号，回复 `tauri` 进技术交流群

虽然 `Tauri` 已经发布 `v1.0` 版本，但是国内资料少的可怜，我想基于 `Tauri` 开发一款工具集（各种小功能）。并通过写文章的形式来记录开发过程中遇到的各种问题。如果这些文章对你有所帮助，可以 `star` 此项目或者将文章转发给更多有需要的人。大家的支持会给我更大的写作动力，感恩 🙏。

- [GitHub Discussions - Tauri 系列](https://github.com/lencx/OhMyBox/discussions?discussions_q=label%3A%22Tauri+%E7%B3%BB%E5%88%97%22)
- [知乎专栏 - Tauri 系列](https://www.zhihu.com/column/c_1519079232848785408)

## License

GPL-3.0 license © 2022 lencx
