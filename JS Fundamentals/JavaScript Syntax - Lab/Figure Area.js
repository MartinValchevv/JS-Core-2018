function figureArea(w, h, W, H) {
    let first = w*h;
    let second = W * H;
    let area = first + second;
    let min = (Math.min(w,W)*Math.min(h,H));
    area = area - min;
    console.log(area);
}
