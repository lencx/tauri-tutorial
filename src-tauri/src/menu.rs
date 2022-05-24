use tauri::{Menu, MenuItem, Submenu};

pub fn init() -> Menu {
    let ctx = tauri::generate_context!();

    let quit = Submenu::new(
        &ctx.package_info().name,
        Menu::with_items([MenuItem::Hide.into(), MenuItem::Quit.into()]),
    );
    let menu = Menu::new().add_submenu(quit);

    menu
}
