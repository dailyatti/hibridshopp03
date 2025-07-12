const express = require('express');
const path = require('path');
const app = express();

// Statikus fájlok kiszolgálása
app.use(express.static(__dirname));
app.use('/src', express.static(path.join(__dirname, 'src')));

app.use(express.json());

// Főoldal - advanced_sports_analyzer(2).html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'advanced_sports_analyzer(2).html'));
});

// Közvetlen hozzáférés a HTML fájlhoz
app.get('/analyzer', (req, res) => {
  res.sendFile(path.join(__dirname, 'advanced_sports_analyzer(2).html'));
});

app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Sports Analyzer server is running!',
    timestamp: new Date().toISOString(),
    files: {
      analyzer: '/analyzer',
      main: '/'
    }
  });
});

// Port autodetection - try multiple ports
const ports = [3000, 3001, 3002, 3003, 3004, 8080, 8081, 8082];
let currentPortIndex = 0;

function tryNextPort() {
  if (currentPortIndex >= ports.length) {
    console.error('❌ Could not find any available port. Please free up one of these ports: ' + ports.join(', '));
    process.exit(1);
  }

  const port = ports[currentPortIndex];
  
  const server = app.listen(port)
    .on('listening', () => {
      console.log(`🚀 Sports Analyzer server running on port ${port}`);
      console.log(`🏆 Sports Analyzer: http://localhost:${port}/`);
      console.log(`📊 Direct link: http://localhost:${port}/analyzer`);
      console.log(`🔍 Health check: http://localhost:${port}/health`);
    })
    .on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.log(`⚠️  Port ${port} is busy, trying next port...`);
        currentPortIndex++;
        tryNextPort();
      } else {
        console.error('❌ Server error:', err);
        process.exit(1);
      }
    });
}

tryNextPort(); 