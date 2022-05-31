import { useEffect } from 'react';

import FullScreen from '@/layouts/FullSreen';
import init, { Universe } from '@omb/game-of-life';

import './index.scss';

const CELL_SIZE = 7; // px
const GRID_COLOR = '#D2D2D2';
const DEAD_COLOR = '#FFFFFF';
const ALIVE_COLOR = '#000000';

export default function GameOfLifePage() {
  useEffect(() => {
    initGame('game-of-life-canvas', 'play-pause-btn');
  }, []);

  return (
    <FullScreen className="game-of-life h-screen hv-center flex-col">
      <canvas id="game-of-life-canvas" />
      <div className="op mt-4">
        <button id="play-pause-btn" title="play-pause">
          ▶
        </button>
        {/* <button id="clear-btn" title="clear">🔄</button> */}
      </div>
    </FullScreen>
  );
}

// ##### utils #####
type drawGridArgs = {
  width: number;
  height: number;
  ctx: CanvasRenderingContext2D;
};
type getIndexArgs = {
  row: number;
  column: number;
  width: number;
};
type drawCellsArgs = {
  width: number;
  height: number;
  universe: Universe;
  ctx: CanvasRenderingContext2D;
  memory: WebAssembly.Memory;
};

// 画网格
function drawGrid({ ctx, width, height }: drawGridArgs) {
  ctx.beginPath();
  ctx.strokeStyle = GRID_COLOR;

  // 垂直线
  for (let i = 0; i <= width; i++) {
    ctx.moveTo(i * (CELL_SIZE + 1) + 1, 0);
    ctx.lineTo(i * (CELL_SIZE + 1) + 1, (CELL_SIZE + 1) * height + 1);
  }

  // 水平线
  for (let j = 0; j <= height; j++) {
    ctx.moveTo(0, j * (CELL_SIZE + 1) + 1);
    ctx.lineTo((CELL_SIZE + 1) * width + 1, j * (CELL_SIZE + 1) + 1);
  }

  ctx.stroke();
}

// 获取细胞索引
function getIndex({ row, width, column }: getIndexArgs) {
  return row * width + column;
}

// 给定一个索引和Uint8Array
// 可以使用以下函数确定是否设置了第n位
function bitIsSet(n: number, arr: Uint8Array) {
  const byte = Math.floor(n / 8);
  const mask = 1 << n % 8;
  return (arr[byte] & mask) === mask;
}

// 画所有存活及死亡细胞
function drawCells({ universe, ctx, memory, width, height }: drawCellsArgs) {
  const cellsPtr = universe.cells();
  const cells = new Uint8Array(memory.buffer, cellsPtr, (width * height) / 8);

  ctx.beginPath();

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const idx = getIndex({ row, column: col, width });

      ctx.fillStyle = bitIsSet(idx, cells) ? ALIVE_COLOR : DEAD_COLOR;

      ctx.fillRect(
        col * (CELL_SIZE + 1) + 1,
        row * (CELL_SIZE + 1) + 1,
        CELL_SIZE,
        CELL_SIZE
      );
    }
  }

  ctx.stroke();
}

async function initGame(canvasId: string, btnId: string) {
  const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
  const playPauseBtn = document.getElementById(btnId) as HTMLButtonElement;
  // const clearBtn = document.getElementById(clearId) as HTMLButtonElement;
  let animationId: number | null = null;

  const wasmInit = await init();

  // 构造宇宙，并且获取其宽度和高度
  const universe = Universe.new();
  const width = universe.width();
  const height = universe.height();

  canvas.width = (CELL_SIZE + 1) * width + 1;
  canvas.height = (CELL_SIZE + 1) * height + 1;

  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  // 初始化网格
  drawGrid({ ctx, width, height });

  // 初始化细胞
  drawCells({
    universe,
    ctx,
    width,
    height,
    memory: wasmInit.memory, // WebAssembly memory
  });

  // 细胞迭代
  const renderLoop = () => {
    universe.tick();
    // 更新细胞
    drawCells({
      universe,
      ctx,
      width,
      height,
      memory: wasmInit.memory, // WebAssembly memory
    });
    animationId = requestAnimationFrame(renderLoop);
  };

  const isPaused = () => {
    return animationId === null;
  };

  const play = () => {
    playPauseBtn.textContent = '⏸';
    renderLoop();
  };

  const pause = () => {
    playPauseBtn.textContent = '▶';
    cancelAnimationFrame(animationId as number);
    animationId = null;
  };

  playPauseBtn.addEventListener('click', () => {
    if (isPaused()) {
      play();
    } else {
      pause();
    }
  });

  // TODO:
  // clearBtn.addEventListener('click', () => {
  //   universe.clear_cell();
  // });

  canvas.addEventListener('click', (event) => {
    const boundingRect = canvas.getBoundingClientRect();

    const scaleX = canvas.width / boundingRect.width;
    const scaleY = canvas.height / boundingRect.height;

    const canvasLeft = (event.clientX - boundingRect.left) * scaleX;
    const canvasTop = (event.clientY - boundingRect.top) * scaleY;

    const row = Math.min(Math.floor(canvasTop / (CELL_SIZE + 1)), height - 1);
    const col = Math.min(Math.floor(canvasLeft / (CELL_SIZE + 1)), width - 1);

    universe.toggle_cell(row, col);

    drawCells({
      universe,
      ctx,
      width,
      height,
      memory: wasmInit.memory, // WebAssembly memory
    });
  });
}
