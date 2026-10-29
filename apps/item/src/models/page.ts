export interface Page {
  type?: string;
  url?: string;
  page_id?: string;
  attributes: {
    [key: string]: any;
  };
}
