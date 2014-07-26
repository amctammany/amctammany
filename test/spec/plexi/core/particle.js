describe('particle', function () {
  var particle;

  beforeEach(function () {
    particle = new Particle();
  });

  it('should be true', function () {
    expect(!!Particle).toBe(true);
  });

  it('should instantiate with 0 position and velocity', function () {
    expect(particle.x).toBe(0);
    expect(particle.y).toBe(0);
    expect(particle.velocity.x).toBe(0);
    expect(particle.velocity.y).toBe(0);
  });
});
