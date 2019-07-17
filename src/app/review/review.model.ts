
export class Review {

  public title: string;
  public note: string;
  public description: string;
  public content: object[];

  constructor(title = '', note = '', description = '', content = []) {
    this.title = title;
    this.note = note;
    this.description = description;
    this.content = content;
  }
}
