import { test, expect } from '../../../../../tests/utils/_astro-fixtures'

test.describe('Segmented-button', () => {
    test('has no visual regression @vrt', async ({ page }) => {
        await page.goto(
            `/src/components/rux-segmented-button/test/basic/index.html`
        )
        await expect(page).toHaveScreenshot()
    })
})