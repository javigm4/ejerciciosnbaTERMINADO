export class Nba {
  team;
  source;
  url;

  constructor(title, source, url) {
    this.title = title;
    this.source = source;
    this.url = url;
  }

  //---getters
  getTitle() {
    return this.title;
  }

  getSource() {
    return this.source;
  }

  getUrl() {
    return this.url;
  }

  //---setters

  setTitle(newTitle) {
    this.title = newTitle;
  }
  setUrl(newUrl) {
    this.url = newUrl;
  }
  setSource(newSource) {
    this.source = newSource;
  }
}
