param appName string
// param repositoryUrl string
// param repositoryBranch string
param location string
param skuName string = 'Free'
param skuTier string = 'Free'


resource staticWebApp 'Microsoft.Web/staticSites@2022-03-01' = {
  name: appName
  location: location
  sku: {
    name: skuName
    tier: skuTier
  }
  properties: {
    // The provider, repositoryUrl and branch fields are required for successive deployments to succeed
    // for more details see: https://github.com/Azure/static-web-apps/issues/516
    // provider: 'DevOps'
    // repositoryUrl: repositoryUrl
    // branch: repositoryBranch
    // buildProperties: {
    //   skipGithubActionWorkflowGeneration: true
    // }
  }
}

// output deployment_token string = listSecrets(staticWebApp.id, staticWebApp.apiVersion).properties.apiKey
