import { Selector } from 'testcafe';

fixture `switchModeTests`
    .page `http://127.0.0.1:5501/index.html`;

test('switchToRounds', async t => {
    await t
        .click('#roundsMode')
        .expect(Selector('#roundsMode').classNames).contains('modetab-selected')
        .expect(Selector('#roundsModeTab').visible).eql(true)
        .expect(Selector('#feedMode').classNames).notContains('modetab-selected')
        .expect(Selector('#feedModeTab').visible).eql(false)
        .expect(Selector('#coursesMode').classNames).notContains('modetab-selected')
        .expect(Selector('#coursesModeTab').visible).eql(false)
        .expect(Selector('#buddiesMode').classNames).notContains('modetab-selected')
        .expect(Selector('#buddiesModeTab').visible).eql(false)
});

test('switchToCourses', async t => {
    await t
        .click('#coursesMode')
        .expect(Selector('#coursesMode').classNames).contains('modetab-selected')
        .expect(Selector('#coursesModeTab').visible).eql(true)
        .expect(Selector('#feedMode').classNames).notContains('modetab-selected')
        .expect(Selector('#feedModeTab').visible).eql(false)
        .expect(Selector('#roundsMode').classNames).notContains('modetab-selected')
        .expect(Selector('#roundsModeTab').visible).eql(false)
        .expect(Selector('#buddiesMode').classNames).notContains('modetab-selected')
        .expect(Selector('#buddiesModeTab').visible).eql(false)
});

test('switchToBuddies', async t => {
    await t
    .click('#buddiesMode')
    .expect(Selector('#buddiesMode').classNames).contains('modetab-selected')
    .expect(Selector('#buddiesModeTab').visible).eql(true)
    .expect(Selector('#feedMode').classNames).notContains('modetab-selected')
    .expect(Selector('#feedModeTab').visible).eql(false)
    .expect(Selector('#roundsMode').classNames).notContains('modetab-selected')
    .expect(Selector('#roundsModeTab').visible).eql(false)
    .expect(Selector('#coursesMode').classNames).notContains('modetab-selected')
    .expect(Selector('#coursesModeTab').visible).eql(false)
});

test('switchToFeed', async t => {
    await t
    .click('#feedMode')
    .expect(Selector('#feedMode').classNames).contains('modetab-selected')
    .expect(Selector('#feedModeTab').visible).eql(true)
    .expect(Selector('#roundsMode').classNames).notContains('modetab-selected')
    .expect(Selector('#roundsModeTab').visible).eql(false)
    .expect(Selector('#coursesMode').classNames).notContains('modetab-selected')
    .expect(Selector('#coursesModeTab').visible).eql(false)
    .expect(Selector('#buddiesMode').classNames).notContains('modetab-selected')
    .expect(Selector('#buddiesModeTab').visible).eql(false)
});

