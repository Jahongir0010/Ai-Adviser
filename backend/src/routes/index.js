const { Router } = require('express');
const regionsRoutes = require('./regions.routes');
const districtsRoutes = require('./districts.routes');
const mahallasRoutes = require('./mahallas.routes');
const anketaRoutes = require('./anketa.routes');
const xaritaRoutes = require('./xarita.routes');

const router = Router();

router.get('/health', (req, res) => {
  res.json({ success: true, message: 'OK', timestamp: new Date().toISOString() });
});

router.use('/', regionsRoutes);
router.use('/', districtsRoutes);
router.use('/', mahallasRoutes);
router.use('/', anketaRoutes);
router.use('/', xaritaRoutes);

module.exports = router;
