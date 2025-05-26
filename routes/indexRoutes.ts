// // Blitz spelpagina
// router.get('/blitz', (_req: Request, res: Response) => {
//   res.render('blitz');
// });

// // Sudden Death spelpagina
// router.get('/suddendeath', (_req: Request, res: Response) => {
//   res.render('suddendeath');
// });


import express from 'express';

const router = express.Router();

router.get("/", async(req, res) =>  {
  res.render("index");
});

export default router;