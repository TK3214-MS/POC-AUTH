param apimName string
param apimLocation string = resourceGroup().location
param publisherName string
param publisherEmail string
@description('The pricing tier of this API Management service')
@allowed([
  'Basic'
  'Consumption'
  'Developer'
  'Standard'
  'Premium'
])
param sku string = 'Basic'

resource apim 'Microsoft.ApiManagement/service@2020-12-01' = {
  name: apimName
  location: apimLocation
  sku: {
    name: sku
    capacity: ((sku == 'Consumption') ? 0 : 1)
  }
  properties: {
    publisherEmail: publisherEmail
    publisherName: publisherName
  }
  identity: {
    type: 'SystemAssigned'
  }
}

output apimId string = apim.id
output fqdn string = apim.properties.gatewayUrl
