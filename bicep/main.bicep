param prefix string = toLower(replace(resourceGroup().name, '-', ''))
param location string = resourceGroup().location
param administratorLogin string = 'DevManager'
@description('The administrator password of the SQL logical server.')
@secure()
param administratorLoginPassword string

module static 'static.bicep' = {
  name: '${prefix}-static'
  params: {
    appName: '${prefix}-static'
    // repositoryUrl: https://dev.azure.com/WAF-PoC/_git/B2C-Sample-Scenario?path=/SPA
    // repositoryBranch: 'main'
    location: 'eastasia'
  }
}

module apim 'api_management.bicep' = {
  name: '${prefix}-apim'
  params: {
    apimName: '${prefix}-apim'
    publisherName: 'Dev Manager'
    publisherEmail: 'dev-manager@6157010mspoc.com'
    apimLocation: location
  }
}

module function 'function.bicep' = {
  name: '${prefix}-function'
  params: {
    appName: '${prefix}-function'
    location: location
    appInsightsLocation: location
  }
}
// module apimStoreApi 'api_management_api.bicep' = {
//   name: '${prefix}-apim-api'
//   dependsOn: [
//     apim
//     ingestionService
//   ]
//   params: {
//     apimName: '${prefix}-apim'
//     ingestionServiceName: ingestionServiceAppName
//     ingestionServiceUrl: 'https://${ingestionService.outputs.fqdn}'
//     ingestionServiceResourceManager: ingestionService.outputs.environment.resourceManager
//     ingestionServiceResourceId: ingestionService.outputs.resourseId
//   }
// }

module sql 'sql.bicep' = {
  name: '${prefix}-sql'
  params: {
    serverName: '${prefix}-sql'
    sqlDBName: '${prefix}-sql'
    location: location
    administratorLogin: administratorLogin
    administratorLoginPassword: administratorLoginPassword
    tenantId: subscription().tenantId
  }
}
