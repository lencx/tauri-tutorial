#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod fs_extra;
use fs_extra::FsExtra;

fn main() {
    tauri::Builder::default()
        .plugin(FsExtra::default())
        .run(tauri::generate_context!())
        .expect("error while running OhMyBox application");
}
