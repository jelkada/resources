
export class Features {

  public title: string;
  public listTitle: string;
  public features: string[];
  public videos: object[];
  public analytics: string[];

  constructor(title = '', listTitle = '', features = [], videos = [], analytics = []) {
    this.title = title;
    this.listTitle = listTitle;
    this.features = features;
    this.videos = videos;
    this.analytics = analytics;
  }

}
