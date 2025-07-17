const createPlaceholderImageCanvas = (width, height) => {
  const el = document.createElement('canvas');
  const ctx = el.getContext('2d');

  el.width = width;
  el.height = height;

  ctx.fillStyle = '#aaaaaa';
  ctx.fillRect(0, 0, el.width, el.height);

  if (width > 500) {
    ctx.font = '60px sans-serif';
  }
  else {
    ctx.font = '12px sans-serif';
  }

  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  ctx.fillText(`${width}x${height}`, el.width / 2, el.height / 2);

  return el;
};

export const initPlaceholderImage = (width, height, imageRef) => {
  const canvasElement = createPlaceholderImageCanvas(width, height);
  const ref = imageRef;
  ref.current.src = canvasElement.toDataURL();
  ref.current.style.display = 'block';

  ref.current.style.width = width;
  ref.current.style.height = height;
  ref.current.style.maxWidth = 'auto';
  ref.current.style.maxHeight = 'auto';

  return ref;
};
