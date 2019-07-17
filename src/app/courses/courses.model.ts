
export class Courses {

  public title: string;
  public videos: object[];

  constructor(title = '', videos = []) {
    this.title = title;
    this.videos = videos;
  }

}
