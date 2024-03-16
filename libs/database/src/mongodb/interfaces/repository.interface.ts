export interface MongoOption {
  lean?: boolean;
  skip?: number;
  limit?: number;
  sort?: any;
  select?: string[];
  hidden?: string[];
  populate?: any[];
  new?: boolean;
}
