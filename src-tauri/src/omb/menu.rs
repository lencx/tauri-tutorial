use tauri::utils::assets::EmbeddedAssets;
use tauri::{Context, Menu, WindowMenuEvent};

#[allow(dead_code)]
pub fn init(context: &Context<EmbeddedAssets>) -> Menu {
    let name = &context.package_info().name;
    tauri::Menu::os_default(name)
}

#[allow(dead_code)]
pub fn handler(_event: WindowMenuEvent) {}
