class SVGManipulator {
  constructor(svgSelector, resetSelector, viewportSelector) {
    this.svg = document.querySelector(svgSelector);
    this.resetButton = document.querySelector(resetSelector);
    this.viewport = document.querySelector(viewportSelector);
    this.proxy = document.createElement("div");

    this.reachedThreshold = false;
    this.point = this.svg.createSVGPoint();
    this.startClient = this.svg.createSVGPoint();
    this.startGlobal = this.svg.createSVGPoint();

    this.viewBox = this.svg.viewBox.baseVal;
    this.cachedViewBox = {
      x: this.viewBox.x,
      y: this.viewBox.y,
      width: this.viewBox.width,
      height: this.viewBox.height
    };

    this.zoom = {
      animation: gsap.timeline(),
      scaleFactor: 1.6,
      duration: 0.5,
      ease: "power2.out"
    };

    this.initAnimations();
    this.initDraggables();
    this.addEventListeners();
  }

  initAnimations() {
    this.resetAnimation = gsap.timeline();
  }

  initDraggables() {
    this.pannable = Draggable.create(this.proxy, {
      throwResistance: 3000,
      trigger: this.svg,
      throwProps: true,
      onPress: this.selectDraggable.bind(this),
      onDrag: this.updateViewBox.bind(this),
      onThrowUpdate: this.updateViewBox.bind(this),
    })[0];
  }

  addEventListeners() {
    window.addEventListener("wheel", this.onWheel.bind(this));
    window.addEventListener("contextmenu", this.onContextMenu.bind(this));
    // Ajout des événements tactiles
    this.svg.addEventListener("touchstart", this.onTouchStart.bind(this));
    this.svg.addEventListener("touchmove", this.onTouchMove.bind(this));
    this.svg.addEventListener("touchend", this.onTouchEnd.bind(this));
  }

  onWheel(event) {
    // Vérifier si l'événement de défilement de la souris a eu lieu sur l'élément SVG
    if (!this.isEventInsideSVG(event)) {
      return; // Ne pas effectuer le zoom si l'événement ne se produit pas sur l'élément SVG
    }
  
    event.preventDefault();
  
    let normalized;
    const delta = event.wheelDelta;
    if (delta) {
      normalized = (delta % 120) === 0 ? delta / 120 : delta / 12;
    } else {
      const deltaY = event.deltaY || event.detail || 0;
      normalized = -(deltaY % 3 ? deltaY * 10 : deltaY / 3);
    }
  
    const scaleDelta = normalized > 0 ? 1 / this.zoom.scaleFactor : this.zoom.scaleFactor;
    this.point.x = event.clientX;
    this.point.y = event.clientY;
    const startPoint = this.point.matrixTransform(this.svg.getScreenCTM().inverse());
  
    const fromVars = {
      ease: this.zoom.ease,
      x: this.viewBox.x,
      y: this.viewBox.y,
      width: this.viewBox.width,
      height: this.viewBox.height,
    };
  
    this.viewBox.x -= (startPoint.x - this.viewBox.x) * (scaleDelta - 1);
    this.viewBox.y -= (startPoint.y - this.viewBox.y) * (scaleDelta - 1);
    this.viewBox.width *= scaleDelta;
    this.viewBox.height *= scaleDelta;
  
    this.zoom.animation = gsap.from(this.viewBox, { ...fromVars, duration: this.zoom.duration });
  }
  
  isEventInsideSVG(event) {
    return event.target === this.svg || this.svg.contains(event.target);
  }

  selectDraggable(event) {
    if (this.resetAnimation.isActive()) {
      this.resetAnimation.kill();
    }

    this.startClient.x = this.pannable.pointerX;
    this.startClient.y = this.pannable.pointerY;
    this.startGlobal = this.startClient.matrixTransform(this.svg.getScreenCTM().inverse());

    gsap.set(this.proxy, { x: this.pannable.pointerX, y: this.pannable.pointerY });
    this.pannable.enable().update().startDrag(event);
  }

  updateViewBox() {
    if (this.zoom.animation.isActive()) {
      return;
    }

    this.point.x = this.pannable.x;
    this.point.y = this.pannable.y;
    const moveGlobal = this.point.matrixTransform(this.svg.getScreenCTM().inverse());

    this.viewBox.x -= (moveGlobal.x - this.startGlobal.x);
    this.viewBox.y -= (moveGlobal.y - this.startGlobal.y);
  }

  onContextMenu(event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
  }

  onTouchStart(event) {
    if (event.touches.length === 2) {
      this.startTouchDistance = this.calculateTouchDistance(event.touches);
      this.startViewBoxWidth = this.viewBox.width;
      this.startViewBoxHeight = this.viewBox.height;
    }
  }

  onTouchMove(event) {
    if (event.touches.length === 2) {
      const currentTouchDistance = this.calculateTouchDistance(event.touches);
      const scaleDelta = this.startTouchDistance / currentTouchDistance;

      this.viewBox.width = this.startViewBoxWidth * scaleDelta;
      this.viewBox.height = this.startViewBoxHeight * scaleDelta;
    }
  }

  onTouchEnd(event) {
    // Reset touch-related variables
    this.startTouchDistance = null;
    this.startViewBoxWidth = null;
    this.startViewBoxHeight = null;
  }

  calculateTouchDistance(touches) {
    const [touch1, touch2] = touches;
    return Math.hypot(touch1.clientX - touch2.clientX, touch1.clientY - touch2.clientY);
  }
}

const manipulator = new SVGManipulator("#svg", "#reset", "#viewport");
