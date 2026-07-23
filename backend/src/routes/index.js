const { Router } = require('express');
const regionsRoutes = require('./regions.routes');
const districtsRoutes = require('./districts.routes');
const mahallasRoutes = require('./mahallas.routes');
const anketaRoutes = require('./anketa.routes');
const xaritaRoutes = require('./xarita.routes');
const aiRoutes = require('./ai.routes');
const { getPool } = require('../config/database');

const router = Router();

router.get('/health', async (req, res) => {
  let database = 'not_configured';

  if (process.env.DATABASE_URL) {
    try {
      await getPool().query('SELECT 1');
      database = 'connected';
    } catch (err) {
      database = 'error';
    }
  }

  const ai = process.env.GEMINI_API_KEY ? 'configured' : 'not_configured';

  res.json({ success: true, message: 'OK', timestamp: new Date().toISOString(), database, ai });
});

router.use('/', regionsRoutes);
router.use('/', districtsRoutes);
router.use('/', mahallasRoutes);
router.use('/', anketaRoutes);
router.use('/', xaritaRoutes);
router.use('/', aiRoutes);

module.exports = router;
