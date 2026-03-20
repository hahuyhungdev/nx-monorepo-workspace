import { defineConfig, devices } from '@playwright/test';
import { nxE2EPreset } from '@nx/playwright/preset';
import { workspaceRoot } from '@nx/devkit';

const baseURL = process.env['BASE_URL'] || 'http://localhost:4300';

export default defineConfig({
  ...nxE2EPreset(__filename, { testDir: './src' }),
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npx nx serve backoffice',
    url: 'http://localhost:4300',
    reuseExistingServer: !process.env['CI'],
    cwd: workspaceRoot,
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
