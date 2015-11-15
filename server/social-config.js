//facebook
ServiceConfiguration.configurations.remove({
  service: 'facebook'
});

ServiceConfiguration.configurations.insert({
  service: 'facebook',
  appId: '1533324816959441',
  secret: 'a77a2504555de2a3350876355944566c'
});

// vk
ServiceConfiguration.configurations.remove({
  service: 'vk'
});

ServiceConfiguration.configurations.insert({
  service: 'vk',
  appId: '5148447', // Your app id
  secret: 'oAccMdJgpaJW1iFhUqOw' // Your app secret
});

// instagram
ServiceConfiguration.configurations.remove({
  service: "instagram"
});
ServiceConfiguration.configurations.insert({
  service: "instagram",
  clientId: "4d8692022c8f489da1c211539dd57d19",
  scope:'basic',
  secret: "84f92b8610194e35b87b3e5239460e56"
});
