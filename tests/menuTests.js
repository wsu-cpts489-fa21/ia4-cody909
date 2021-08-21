import { Selector } from 'testcafe';

fixture `menuTests`
    .page `http://127.0.0.1:5501/index.html`;

test('openMenu', async t => {
    await t
        .click('#menuBtn')
        .expect(Selector('#sideMenu').visible).eql(true)
});

test('closeMenu', async t => {
    await t
    //...
        .click('#menuBtn')
        .click("#menuBtn")
        .expect(Selector('#sideMenu').visible).eql(false);
});