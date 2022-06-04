#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod omb;

fn main() {
    tauri::Builder::default()
        .setup(omb::setup::init)
        .plugin(omb::fs::FsExtra::default())
        .system_tray(omb::tray::menu())
        .menu(omb::menu::init())
        .on_system_tray_event(omb::tray::menu_event)
        .run(tauri::generate_context!())
        .expect("error while running OhMyBox application");
}
