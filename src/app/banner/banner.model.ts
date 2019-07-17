
export class Banner {
  public title: string;
  public subtitle: string;
  public description: string;
  public features: string[];
  public videoLink: string;

  constructor(title = '', subtitle = '',
              description = '', features = [], videoLink = '') {
    this.title = title;
    this.subtitle = subtitle;
    this.description = description;
    this.features = features;
    this.videoLink = videoLink;
  }
}
