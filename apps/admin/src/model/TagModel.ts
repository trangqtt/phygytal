export interface TagItem {
  id?: string;
  tag_id: string,
  hardware_id?: string,
  tag_type?: string,
  encrypt_mode?: string,
  raw_data?: string,
  scan_counter?: number,
  org_id: string,
  qrcode_url?: string,
}

export interface TagItemFile {
  file: any,
  org_id: string,
  product_id: string,
}