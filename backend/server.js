require('dotenv').config();

const app = require('./src/app');

// Falls back to 4000 (not the more common 5000) because on macOS, port 5000 is
// usually already held by ControlCenter/AirPlay Receiver - defaulting to it
// would make the server fail to start with a confusing EADDRINUSE the moment
// .env isn't found, instead of just working.
const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} [${process.env.NODE_ENV || 'development'}]`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} band - boshqa dastur (yoki eski server nusxasi) shu portda ishlamoqda.`);
    console.error(`Tekshirish: lsof -i :${PORT}`);
  } else {
    console.error('Server ishga tushmadi:', err.message);
  }
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  server.close(() => process.exit(1));
});
