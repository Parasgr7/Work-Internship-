import { MirrorsPage } from './app.po';

describe('mirrors App', () => {
  let page: MirrorsPage;

  beforeEach(() => {
    page = new MirrorsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
