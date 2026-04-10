import { HealthController } from './health.controller';

describe('HealthController', () => {
  let controller: HealthController;

  beforeEach(() => {
    controller = new HealthController();
  });

  it('should return health status with ISO timestamp', () => {
    const result = controller.check();

    expect(result.status).toBe('ok');
    expect(() => new Date(result.timestamp)).not.toThrow();
    expect(Number.isNaN(Date.parse(result.timestamp))).toBe(false);
  });
});
