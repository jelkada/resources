
export class Compare {
  public title: string;
  public subtitle: string;
  public columns: string[];
  public rows: string[];
  public checkmarks: string[];
  public redRow: string;
  public footnote: string;
  public footnoteTitle: string;
  public yes: string;
  public no: string;
  public analytics: string[];

  constructor(title = '', subtitle = '', columns = [], rows = [], checkmarks = [], redRow = '',
              footnoteTitle = '', footnote = '', yes = '', no = '', analytics = []) {

    this.title = title;
    this.subtitle = subtitle;
    this.columns = columns;
    this.rows = rows;
    this.checkmarks = checkmarks;
    this.redRow = redRow;
    this.footnote = footnote;
    this.footnoteTitle = footnoteTitle;
    this.yes = yes;
    this.no = no;
    this.analytics = analytics;
  }
}
