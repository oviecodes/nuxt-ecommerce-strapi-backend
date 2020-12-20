module.exports = ({ env }) => ({
  upload: {
    provider: 'aws-s3',
    providerOptions: {
      accessKeyId: env(AWS_ACCESS_KEY_ID),
      secretAccessKey: env(AWS_ACCESS_SECRET),
      region: 'US East (N. Virginia) us-east-1',
      params: {
        Bucket: 'nuxtstrapiecommerce',
      },
    },
  },
});