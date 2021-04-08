module.exports = {
  transpileDependencies: [
    'vuetify'
  ],

  pluginOptions: {
    s3Deploy: {
      registry: undefined,
      awsProfile: 'default',
      overrideEndpoint: false,
      region: 'ap-northeast-2',
      bucket: '5000batt-livecommerce',
      createBucket: false,
      staticHosting: true,
      staticIndexPage: 'index.html',
      staticErrorPage: 'index.html',
      assetPath: 'dist',
      assetMatch: '**',
      deployPath: '/',
      acl: 'public-read',
      pwa: false,
      enableCloudfront: true,
      pluginVersion: '4.0.0-rc3',
      uploadConcurrency: 5,
      cloudfrontId: 'E3K2NZC8RH7DYM',
      cloudfrontMatchers: '/index.html'
    }
  }
}
