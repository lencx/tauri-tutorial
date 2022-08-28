use tauri::{
    AppHandle, CustomMenuItem, Manager, SystemTray, SystemTrayEvent, SystemTrayMenu,
    SystemTrayMenuItem,
};

/// omb system tray
pub fn menu() -> SystemTray {
    let quit = CustomMenuItem::new("quit".to_string(), "Quit");
    let show = CustomMenuItem::new("show".to_string(), "Show");
    let hide = CustomMenuItem::new("hide".to_string(), "Hide");
    let tray_menu = SystemTrayMenu::new()
        .add_item(quit)
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(show)
        .add_item(hide);

    SystemTray::new().with_menu(tray_menu)
}

/// omb system tray event
pub fn handler(app: &AppHandle, event: SystemTrayEvent) {
    match event {
        SystemTrayEvent::LeftClick {
            position, size: _, ..
        } => {
            println!("system tray received a left click");
            let win = app.get_window("main").unwrap();
            win.show().unwrap();
            let logical_size = tauri::LogicalSize::<f64> {
                width: 300.00,
                height: 500.00,
            };
            let size = tauri::Size::Logical(logical_size);
            win.set_size(size).unwrap();
            let logical_position = tauri::LogicalPosition::<f64> {
                x: position.x / 2.0,
                y: position.y - logical_size.height - 50.,
            };
            let pos = tauri::Position::Logical(logical_position);
            win.set_position(pos).unwrap();
            win.set_focus().unwrap();
        }
        SystemTrayEvent::RightClick {
            position: _,
            size: _,
            ..
        } => {
            println!("system tray received a right click");
        }
        SystemTrayEvent::DoubleClick {
            position: _,
            size: _,
            ..
        } => {
            println!("system tray received a double click");
        }
        SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
            "quit" => {
                std::process::exit(0);
            }
            "hide" => {
                let window = app.get_window("main").unwrap();
                window.hide().unwrap();
            }
            "show" => {
                let window = app.get_window("main").unwrap();
                window.show().unwrap();
            }
            _ => {}
        },
        _ => {}
    }
}
