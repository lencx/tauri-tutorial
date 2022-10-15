#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod omb;

fn main() {
    let context = tauri::generate_context!();
    let app = tauri::Builder::default()
        .setup(omb::setup::init)
        .plugin(omb::fs::FsExtra::default())
        .menu(tauri::Menu::os_default(&context.package_info().name))
        .system_tray(omb::tray::menu())
        .on_system_tray_event(omb::tray::handler)
        .build(context)
        .expect("error while running OhMyBox application");

    app.run(|_app_handle, event| match event {
        tauri::RunEvent::Updater(updater_event) => {
            dbg!(updater_event);
        }
        _ => {}
    })
}
