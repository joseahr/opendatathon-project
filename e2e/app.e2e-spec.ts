import { OpendatathonPage } from './app.po';

describe('opendatathon App', () => {
  let page: OpendatathonPage;

  beforeEach(() => {
    page = new OpendatathonPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
