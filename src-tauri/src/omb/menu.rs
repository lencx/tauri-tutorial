use tauri::{Menu, MenuItem, AboutMetadata, Submenu};

/// omb menu
pub fn init() -> Menu {
    let ctx = tauri::generate_context!();
    let name = &ctx.package_info().name;

    Menu::new()
        .add_submenu(Submenu::new(
            name,
            Menu::new()
                .add_native_item(MenuItem::About(
                    name.to_string(),
                    AboutMetadata::new()
                ))
                .add_native_item(MenuItem::Separator)
                .add_native_item(MenuItem::Hide)
                .add_native_item(MenuItem::HideOthers)
                .add_native_item(MenuItem::ShowAll)
                .add_native_item(MenuItem::Separator)
                .add_native_item(MenuItem::Quit),
        ))
}
