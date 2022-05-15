// https://rustwasm.github.io/docs/book/game-of-life/hello-world.html

extern crate js_sys;
use fixedbitset::FixedBitSet;
use wasm_bindgen::prelude::*;

// 定义宇宙Universe
#[wasm_bindgen]
pub struct Universe {
    width: u32,  // 宇宙宽度
    height: u32, // 宇宙高度
    // 存活 - ◼：1
    // 死亡 - ◻：0
    cells: FixedBitSet, // 宇宙内的细胞集合
}

impl Universe {
    // 获取给定行列处的细胞索引
    fn get_index(&self, row: u32, column: u32) -> usize {
        (row * self.width + column) as usize
    }

    // 为了计算细胞的下一个状态
    // 需要先获得一个还有多少邻居存活的计数
    fn live_neighbor_count(&self, row: u32, column: u32) -> u8 {
        let mut count = 0;
        for delta_row in [self.height - 1, 0, 1].iter().cloned() {
            for delta_col in [self.width - 1, 0, 1].iter().cloned() {
                if delta_row == 0 && delta_col == 0 {
                    continue;
                }

                let neighbor_row = (row + delta_row) % self.height;
                let neighbor_col = (column + delta_col) % self.width;
                let idx = self.get_index(neighbor_row, neighbor_col);
                count += self.cells[idx] as u8;
            }
        }

        count
    }
}

// 将方法作为公共方法，导出给JavaScript调用
#[wasm_bindgen]
impl Universe {
    pub fn tick(&mut self) {
        let mut next = self.cells.clone();

        for row in 0..self.height {
            for col in 0..self.width {
                let idx = self.get_index(row, col);
                let cell = self.cells[idx];
                let live_neighbor = self.live_neighbor_count(row, col);

                next.set(
                    idx,
                    match (cell, live_neighbor) {
                        // 规则1：模拟生命数量稀少
                        // 当前细胞为存活状态时，当周围的存活细胞低于2个时（不包含2个），该细胞变成死亡状态。
                        (true, x) if x < 2 => false,
                        // 规则2：
                        // 当前细胞为存活状态时，当周围有2个或3个存活细胞时，该细胞保持原样。
                        (true, 2) | (true, 3) => true,
                        // 规则3：模拟生命数量过多
                        // 当前细胞为存活状态时，当周围有超过3个存活细胞时，该细胞变成死亡状态。
                        (true, x) if x > 3 => false,
                        // 规则4：模拟繁殖
                        // 当前细胞为死亡状态时，当周围有3个存活细胞时，该细胞变成存活状态。
                        (false, 3) => true,
                        // 其他细胞保持原状态
                        (otherwise, _) => otherwise,
                    },
                );
            }
        }

        self.cells = next;
    }

    // 初始化存活及死亡细胞
    pub fn new() -> Universe {
        let width = 120;
        let height = 80;

        let size = (width * height) as usize;
        let mut cells = FixedBitSet::with_capacity(size);

        for i in 0..size {
            // cells.set(i, i % 2 == 0 || i % 7 == 0);
            // 每个细胞50%概率随机存活
            cells.set(i, js_sys::Math::random() < 0.5);
        }

        Universe {
            width,
            height,
            cells,
        }
    }

    pub fn width(&self) -> u32 {
        self.width
    }

    pub fn height(&self) -> u32 {
        self.height
    }

    pub fn cells(&self) -> *const u32 {
        self.cells.as_slice().as_ptr()
    }

    // 细胞突变: 存活 ⇋ 死亡
    pub fn toggle_cell(&mut self, row: u32, column: u32) {
        let idx = self.get_index(row, column);
        let mut next = self.cells.clone();
        next.toggle(idx);
        self.cells = next;
    }
}
