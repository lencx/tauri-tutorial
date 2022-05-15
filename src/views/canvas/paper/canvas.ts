type PaintOptions = {
  color: string;
  lineWidth: number;
}

export class Paint {
  ctx: CanvasRenderingContext2D | null = null;
  painting = false;

  init(el: HTMLCanvasElement, options: Partial<PaintOptions> = {}) {
    this.ctx = el.getContext('2d');
    if (!this.ctx) return;
    const { color = '#000', lineWidth = 1 } = options;

    this.setColor(color);
    this.setLineWidth(lineWidth);

    el.addEventListener('mousedown', this.startPosition);
    el.addEventListener('mouseup', this.finishedPosition);
    el.addEventListener('mousemove', this.draw);
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

    this.ctx.lineCap = 'round';

    this.ctx.lineTo(e.clientX, e.clientY);
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.moveTo(e.clientX, e.clientY);
  }
}
