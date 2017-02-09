import { PriceVizPage } from './app.po';

describe('price-viz App', function() {
  let page: PriceVizPage;

  beforeEach(() => {
    page = new PriceVizPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
