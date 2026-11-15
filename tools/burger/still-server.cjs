// Helper for still.html: serves this folder on http://localhost:3098 and saves POST /save?name=x.webp into ./saved/
const http = require('http'), fs = require('fs'), path = require('path');
const dir = __dirname;
const types = { '.html': 'text/html', '.glb': 'model/gltf-binary', '.js': 'text/javascript', '.webp': 'image/webp', '.png': 'image/png' };
http.createServer((req, res) => {
  const url = new URL(req.url, 'http://x');
  if (req.method === 'POST' && url.pathname === '/save') {
    const name = path.basename(url.searchParams.get('name') || 'out.bin');
    fs.mkdirSync(path.join(dir, 'saved'), { recursive: true });
    const chunks = []; req.on('data', (c) => chunks.push(c));
    req.on('end', () => { fs.writeFileSync(path.join(dir, 'saved', name), Buffer.concat(chunks)); res.end('saved ' + name + ' ' + Buffer.concat(chunks).length); });
    return;
  }
  const file = path.join(dir, path.normalize(url.pathname).replace(/^([\\/])+/, '') || 'index.html');
  if (!file.startsWith(dir) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.statusCode = 404; return res.end('not found'); }
  res.setHeader('Content-Type', types[path.extname(file)] || 'application/octet-stream');
  fs.createReadStream(file).pipe(res);
}).listen(3098, () => console.log('ready on 3098'));
