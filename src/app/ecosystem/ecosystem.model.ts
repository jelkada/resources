
export class Ecosystem {
  public title: string;
  public desc: string;
  public image: string;
  public imageAlt: string;
  public cta: string;
  public ctaLink: string;
  public ctaAriaLabel: string;

  constructor(title = '', desc = '', image = '', imageAlt = '', cta = '', ctaLink = '', ctaAriaLabel = '') {
    this.title = title;
    this.desc = desc;
    this.image = image;
    this.imageAlt = imageAlt;
    this.cta = cta;
    this.ctaLink = ctaLink;
    this.ctaAriaLabel = ctaAriaLabel;
  }
}
