
export class VoiceRemote {
  public title: string;
  public subtitle: string;
  public videoTitle: string;
  public videoSubtitle: string;
  public commandList: any[];
  public videoLink: string;

  constructor(title = '', subtitle = '', videoTitle = '', videoSubtitle = '',
              commandList = [], videoLink = '') {
    this.title = title;
    this.subtitle = subtitle;
    this.videoTitle = videoTitle;
    this.videoSubtitle = videoSubtitle;
    this.commandList = commandList;
    this.videoLink = videoLink;
  }
}
