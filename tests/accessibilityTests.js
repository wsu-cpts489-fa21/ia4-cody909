import { axeCheck, createReport } from 'axe-testcafe';
 
fixture `axeAccessibilityTests`
.page `http://127.0.0.1:5501/index.html`;
 
test('Automated accessibility tests', async t => {
    const { error, violations } = await axeCheck(t);
    await t.expect(violations.length === 0).ok(createReport(violations));
});