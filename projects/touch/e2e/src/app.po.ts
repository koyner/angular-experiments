import {browser, by, element} from 'protractor';

export class AppPage {
  navigateTo(): Promise<any> {
    return browser.get('/') as Promise<any>;
  }

  getParagraphText(): Promise<string> {
    return element(by.css('app-root h1')).getText() as Promise<string>;
  }
}
