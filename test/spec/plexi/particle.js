describe('particle', function () {
  var particle;

  beforeEach(function () {
    particle = new Particle();
  });

  it('should be true', function () {
    expect(!!Particle).toBe(true);
  });

  it('should instantiate with 0 position and velocity', function () {
    expect(particle.current.x).toBe(0);
    expect(particle.current.y).toBe(0);
    expect(particle.previous.x).toBe(0);
    expect(particle.previous.y).toBe(0);
  });
});
