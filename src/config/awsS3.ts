import AWS from 'aws-sdk';
import fs from 'fs';
import path from 'path';

AWS.config.update({});

const s3 = new AWS.S3({
  region: 'sa-east-1',
});

declare type TUploadParams = {
  Bucket: string;
  Key: string;
  Body?: fs.ReadStream;
};

const saveS3 = async ({ filename }: { filename: string }) => {
  const originalPath = path.join('./tmp/uploads', filename);
  const uploadParams: TUploadParams = { Bucket: 'motivate-social', Key: '' };

  // Configure the file stream and obtain the upload parameters
  const fileStream = fs.createReadStream(originalPath);
  fileStream.on('error', function (err) {
    console.log('File Error', err);
  });
  uploadParams.Body = fileStream;
  uploadParams.Key = filename;
  // call S3 to retrieve upload file to specified bucket
  await s3
    .upload(uploadParams, function (err: Error, data: any) {
      if (err) {
        console.log('Error', err);
      }
      if (data) {
        console.log('Upload Success', data.Location);
      }
    })
    .promise();
};

const deleteS3 = async (filename: string) => {
  const params = { Bucket: 'motivate-social', Key: filename };

  await s3
    .deleteObject(params, function (err, data) {
      if (err) console.log(err, err.stack);
      // error
      else console.log(); // deleted
    })
    .promise();
};

export { saveS3, deleteS3, s3 };
