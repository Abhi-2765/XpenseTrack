import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Budget route is working!');
});

export default router;