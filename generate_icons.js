const fs = require('fs');
const portfolio = require('./src/data/portfolio.json');

const icons = {};
portfolio.skills.categories.forEach(cat => {
  cat.items.forEach(item => {
    icons[item.name] = item.icon;
  });
});

console.log(JSON.stringify(icons, null, 2));
