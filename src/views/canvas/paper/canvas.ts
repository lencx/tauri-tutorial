type PaintOptions = {
  color: string;
  size: number;
}

export class Brush {
  ctx: CanvasRenderingContext2D | null = null;
  canvas: HTMLCanvasElement | null = null;
  currentPoint: any;
  lastPoint: any;
  painting = false;
  size = 1;

  init(el: HTMLCanvasElement, options: Partial<PaintOptions> = {}) {
    this.ctx = el.getContext('2d');
    if (!this.ctx) return;

    const { color = '#000000', size = 1 } = options;

    this.canvas = el;
    this.setColor(color);
    this.setLineWidth(size);
    this.ctx.lineCap = 'round';
    // this.ctx.globalCompositeOperation = 'source-over';

    el.addEventListener('mousedown', this.start);
    el.addEventListener('mouseup', this.end);
    el.addEventListener('mousemove', this.drawing);
  }

  start = (e: MouseEvent) => {
    this.painting = true;
    this.lastPoint = { x: e.clientX, y: e.clientY };
  }

  end = () => {
    this.painting = false;
  }

  save = () => {
    // this.canvas?.toBlob();
    return this.canvas?.toDataURL();
  }

  drawImage = (input: string) => {
    const img = new Image();
    const _ctx = this.ctx;
    img.onload = () => {
      _ctx?.drawImage(img, 0, 0);
    }
    img.src = input;
  }

  clear = () => {
    this.ctx?.clearRect(0, 0, this.canvas?.width || 0, this.canvas?.height || 0);
  }

  eraser = () => {
    if (!this.ctx) return;
    this.ctx.globalCompositeOperation = 'destination-out';
  }

  run = (method: string, value: any) => {
    const fnMap = {
      color: 'setColor',
      size: 'setLineWidth',
      opacity: 'setOpacity',
    };
    // @ts-ignore
    this[fnMap[method]](value);
  }

  setColor = (color: string = '#000000') => {
    if (!this.ctx) return;
    this.ctx.fillStyle = color;
    this.ctx.strokeStyle = color;
  };

  setOpacity = (opacity: number = 1) => {
    if (!this.ctx) return;
    this.ctx.globalAlpha = opacity;
  };

  setLineWidth = (size: number = 1) => {
    this.size = size;
  };

  drawing = (e: MouseEvent) => {
    if (!this.ctx) return;
    if (!this.painting) return;

    this.currentPoint = { x: e.clientX, y: e.clientY };
    const dist = distanceBetween(this.lastPoint, this.currentPoint);
    const angle = angleBetween(this.lastPoint, this.currentPoint);

    for (var i = 0; i < dist; i += 1) {
      const x = this.lastPoint?.x + (Math.sin(angle) * i);
      const y = this.lastPoint?.y + (Math.cos(angle) * i);
      this.ctx.beginPath();
      this.ctx.arc(x + this.size, y + this.size, this.size, 0, Math.PI * 2, false);
      this.ctx.closePath();
      this.ctx.fill();
      this.ctx.stroke();
    }

    this.lastPoint = this.currentPoint;
  }
}

function distanceBetween(point1: any, point2: any) {
  return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
}

function angleBetween(point1: any, point2: any) {
  return Math.atan2(point2.x - point1.x, point2.y - point1.y);
}