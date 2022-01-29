<template>
  <div
    class="x-resize"
    :class="{'x-resize-h': direction === 'h', 'x-resize-v': direction == 'v'}"
    @mousedown="onMouseDown"
  >
  </div>
</template>

<script lang="ts">
import { App } from 'vue';
import { Options, Vue } from 'vue-class-component';

@Options({
  name: 'x-resize',
  props: {
    direction: {
      type: String,
      default: 'v'
    }
  },
})
export default class XResize extends Vue {

  static install(app: App) {
    app.component(XResize.name, XResize)
  }

  prevPanelElement!: HTMLElement;
  nextPanelElement!: HTMLElement;
  dragging = false;
  startPos!: number;
  nextPanelSize!: number;
  prevPanelSize!: number;
  totalFlexGrow!: number;
  totalSize!: number;
  panels!: HTMLElement[];
  gutterSize = 4;

  mouseMoveListener: any;
  mouseUpListener: any;
  direction!: string;

  onMouseDown(event: MouseEvent) {
    this.onResizeStart(event);
    this.bindMouseListeners();
  }

  onResizeStart(event: MouseEvent) {
    this.panels = [...this.$el.parentElement.children].filter(v => !v.classList.contains('x-resize')) as HTMLElement[];
    this.totalSize = 0;
    this.totalFlexGrow = 0;
    let panelSizes: number[] = [];
    this.panels.forEach(panel => {
      this.totalSize += this.getPanelOuterSize(panel);
      this.totalFlexGrow += Number(getComputedStyle(panel).flexGrow);
      panelSizes.push(this.getPanelOuterSize(panel));
    });
    this.panels.forEach((panel, i) => {
      panel.style.flex = `0 0 ${panelSizes[i]}px`;
    });
    console.log(this.totalFlexGrow);
    console.log(this.totalSize);
    this.dragging = true;
    this.startPos = this.isHorizontal() ? event.pageY : event.pageX;
    this.prevPanelElement = this.$el.previousElementSibling as HTMLElement;
    this.nextPanelElement = this.$el.nextElementSibling as HTMLElement;
    this.prevPanelSize = this.getPanelOuterSize(this.prevPanelElement);
    this.nextPanelSize = this.getPanelOuterSize(this.nextPanelElement);
    // this.prevPanelElement.style.flex = `0 0 ${this.prevPanelSize}px`;
    // this.nextPanelElement.style.flex = `0 0 ${this.nextPanelSize}px`;
    event.preventDefault();
  }

  onResize(event: MouseEvent) {
    if (!this.dragging) return;
    let newPos = (this.isHorizontal() ? event.pageY : event.pageX) - this.startPos;
    let newPrevPanelSize = this.prevPanelSize + newPos;
    let newNextPanelSize = this.nextPanelSize - newPos;
    if (this.validateResize(newPrevPanelSize, newNextPanelSize)) {
      this.prevPanelElement.style.flexBasis = newPrevPanelSize + 'px';
      this.nextPanelElement.style.flexBasis = newNextPanelSize + 'px';
    }
    event.preventDefault();
  }

  onResizeEnd(event: MouseEvent) {
    if (!this.dragging) return;
    this.dragging = false;
    let panelSizes: number[] = [];
    this.panels.forEach(panel => {
      panelSizes.push(this.getPanelOuterSize(panel));
    });
    this.panels.forEach((panel, i) => {
      panel.style.flex = `${panelSizes[i] / this.totalSize * this.totalFlexGrow} 1 0`;
    });
    this.clear();
    event.preventDefault();
  }

  bindMouseListeners() {
    if (!this.mouseMoveListener) {
      this.mouseMoveListener = (event: any) => this.onResize(event)
      document.addEventListener('mousemove', this.mouseMoveListener);
    }

    if (!this.mouseUpListener) {
      this.mouseUpListener = (event: any) => {
        this.onResizeEnd(event);
        this.unbindMouseListeners();
      }
      document.addEventListener('mouseup', this.mouseUpListener);
    }
  }

  unbindMouseListeners() {
    if (this.mouseMoveListener) {
      document.removeEventListener('mousemove', this.mouseMoveListener);
      this.mouseMoveListener = null!;
    }

    if (this.mouseUpListener) {
      document.removeEventListener('mouseup', this.mouseUpListener);
      this.mouseUpListener = null!;
    }
  }


  validateResize(newPrevPanelSize: number, newNextPanelSize: number) {
    if (200 > newPrevPanelSize) {
      return false;
    }

    if (200 > newNextPanelSize) {
      return false;
    }

    return true;
  }

  isHorizontal() {
    return this.direction === 'h';
  }

  getPanelOuterSize(panel: HTMLElement) {
    let size = this.isHorizontal() ? panel.offsetHeight : panel.offsetWidth;
    let style = getComputedStyle(panel);
    if (this.isHorizontal()) {
      size += parseFloat(style.marginTop) + parseFloat(style.marginBottom);
    } {
      size += parseFloat(style.marginLeft) + parseFloat(style.marginRight);
    }
    return size;
  }

  clear() {
    this.dragging = false;
    // this.startPos = null;
    // this.prevPanelElement = null;
    // this.nextPanelElement = null;
    // this.prevPanelSize = null;
    // this.nextPanelSize = null;
    // this.gutterElement = null;
    // this.prevPanelIndex = null;
  }
}
</script>

<style>
.x-resize {
  background-color: #d7d7d8;
  /* flex-basis: 4px; */
}
.x-resize-h {
  height: 4px;
  width: 100%;
  cursor: row-resize;
}
.x-resize-v {
  width: 4px;
  height: 100%;
  cursor: col-resize;
}
</style>
