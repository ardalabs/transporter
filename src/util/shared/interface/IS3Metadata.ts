// propose to upload to S3
export interface IS3Metadata {
  fieldname?: string;
  originalname?: string;
  encoding?: string;
  mimetype?: string;
  size?: number;
  bucket?: string;
  key?: string;
  acl?: string;
  contentType?: string;
  contentDisposition?: null;
  storageClass?: string;
  serverSideEncryption?: null;
  metadata?: IMetadata;
  location?: string;
  etag?: string;
}

export interface IMetadata {
  fieldName?: string;
}
