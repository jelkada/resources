
export class CompareModal {
  public next: string;
  public prev: string;
  public viewNext: string;
  public viewPrev: string;
  public nextAriaLabel: string;
  public prevAriaLabel: string;
  public closeAlt: string;
  public content: object[];

  constructor(next = '', prev = '', viewNext = '', viewPrev = '',
               nextAriaLabel = '', prevAriaLabel = '', closeAlt = '', content = []) {

    this.next = next;
    this.prev = prev;
    this.viewNext = viewNext;
    this.viewPrev = viewPrev;
    this.nextAriaLabel = nextAriaLabel;
    this.prevAriaLabel = prevAriaLabel;
    this.closeAlt = closeAlt;
    this.content = content;

  }
}
