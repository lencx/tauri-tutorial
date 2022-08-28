#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod omb;

fn main() {
    let context = tauri::generate_context!();
    tauri::Builder::default()
        .setup(omb::setup::init)
        .plugin(omb::fs::FsExtra::default())
        .menu(tauri::Menu::os_default(&context.package_info().name))
        .system_tray(omb::tray::menu())
        .on_system_tray_event(omb::tray::handler)
        .run(context)
        .expect("error while running OhMyBox application");
}
