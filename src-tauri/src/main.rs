#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod fs_extra;
mod menu;
use fs_extra::FsExtra;

fn main() {
    tauri::Builder::default()
        .menu(menu::init())
        .plugin(FsExtra::default())
        .run(tauri::generate_context!())
        .expect("error while running OhMyBox application");
}
