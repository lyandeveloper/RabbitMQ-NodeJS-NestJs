import { Router, Request, Response } from 'express';

const router = Router();

router.post('/express', async (req: Request, res: Response) => {
  res.send('respond with a resource');
});

export default router;
