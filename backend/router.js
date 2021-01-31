const {Router: createRouter} = require('express');

const router = createRouter();

router.get('/', (_, res) => {
  res.json({
    ok: true,
    date: new Date().toLocaleString(),
  });
})

module.exports = router;
