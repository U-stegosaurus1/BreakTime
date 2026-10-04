const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('c:/Users/LENOVO/Desktop/L400/PROJECT WORK/BreakTime/BreakTime/frontend/src');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;
  
  // Remove import statement
  content = content.replace(/import Icon from 'react-native-vector-icons\/MaterialCommunityIcons';\r?\n?/g, '');
  
  // Remove <Icon ... /> and <Icon ...></Icon> tags
  content = content.replace(/<Icon[^>]*\/>/g, '');
  content = content.replace(/<Icon[^>]*>[^<]*<\/Icon>/g, '');
  
  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Modified: ' + file);
  }
});
