module.exports = ({ env }) => ({
  upload: {
    provider: 'aws-s3',
    providerOptions: {
      accessKeyId: env('AWS_ACCESS_KEY_ID') ,
      secretAccessKey: env('AWS_ACCESS_SECRET'),
      region: '',
      params: {
        Bucket: 'nuxtstrapiecommerce',
      },
    },
  },
});