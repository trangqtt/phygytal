export interface DigitalAsset {
  id: string;
  chain: number;
  chain_id: string;
  collection_id: string;
  collection_name: string;
  contract_address : string;
  metadata: {
    image: string;
    name: string;
  };
  standard: string;
  status: string;
  token_id: number;
}
