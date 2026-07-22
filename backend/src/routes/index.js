const { Router } = require('express');
const geoRoutes = require('./geo.routes');
const anketaRoutes = require('./anketa.routes');

const router = Router();

router.get('/health', (req, res) => {
  res.json({ success: true, message: 'OK', timestamp: new Date().toISOString() });
});

router.use('/', geoRoutes);
router.use('/', anketaRoutes);

module.exports = router;
