export interface ProductModelEntity {
  id?: string;
  name: string;
  data_fields: ModelField[];
  created_at: string;
}

export interface Fields {
  key: string;
  label: string;
  type: 'string' | 'integer' | 'float' | 'boolean' | 'image' | 'video' | 'html' | '3D' | 'object';
  is_array: boolean;
}

export interface ModelField extends Fields {
  sub_fields?: Fields[];
}
