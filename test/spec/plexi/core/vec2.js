describe('Vec2 - 2D Vector', function () {
  it('should be true', function () {
    expect(!!Vec2).toBe(true);
  });

  it('should instantiate with x and y', function () {
    var x = 10,
        y = 20;
    var v = new Vec2(x, y);
    expect(v.x).toBe(x);
    expect(v.y).toBe(y);
  });
});
