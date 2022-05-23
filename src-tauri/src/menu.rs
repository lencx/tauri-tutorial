use tauri::{Menu, MenuItem, Submenu};

pub fn init() -> Menu {
    let quit = Submenu::new("", Menu::new().add_native_item(MenuItem::Quit));
    let menu = Menu::new().add_submenu(quit);

    menu
}
