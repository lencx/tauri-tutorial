type PaintOptions = {
  color: string;
  lineWidth: number;
}

export class Paint {
  ctx: CanvasRenderingContext2D | null = null;
  canvas: HTMLCanvasElement | null = null;
  painting = false;

  init(el: HTMLCanvasElement, options: Partial<PaintOptions> = {}) {
    this.ctx = el.getContext('2d');
    if (!this.ctx) return;
    const { color = '#000', lineWidth = 1 } = options;

    this.canvas = el;
    this.setColor(color);
    this.setLineWidth(lineWidth);
    this.ctx.lineCap = 'round';

    this.ctx.imageSmoothingEnabled = true;
    this.ctx.globalCompositeOperation = 'exclusion';

    el.addEventListener('mousedown', this.startPosition);
    el.addEventListener('mouseup', this.finishedPosition);
    el.addEventListener('mousemove', this.draw);
  }

  save = () => {
    return this.canvas?.toDataURL();
  }

  run = (method: string, value: any) => {
    const fnMap = {
      color: 'setColor',
      lineWidth: 'setLineWidth',
    };
    // @ts-ignore
    this[fnMap[method]](value);
  }

  startPosition = (e: MouseEvent) => {
    this.painting = true;
    this.draw(e);
  }

  finishedPosition = () => {
    if (!this.ctx) return;
    this.painting = false;
    this.ctx.beginPath();
  }

  setColor = (color: string = '#000') => {
    if (!this.ctx) return;
    this.ctx.strokeStyle = color;
  };

  setLineWidth = (width: number = 1) => {
    if (!this.ctx) return;
    this.ctx.lineWidth = width;
  };

  draw = (e: MouseEvent) => {
    if (!this.ctx) return;
    if (!this.painting) return;
    this.ctx.lineTo(e.offsetX, e.offsetY);
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.moveTo(e.offsetX, e.offsetY);
  }
}
