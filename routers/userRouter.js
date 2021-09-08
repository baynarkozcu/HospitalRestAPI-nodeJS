const router = require('express').Router();

router.get('/', (req, res)=>{
    res.json({
        'message': 'All Users'
    });
});

router.get('/:id', (req, res)=>{
    res.json({
        'message': `${req.params.id} User`
    });
});

router.post('/', (req, res)=>{
    res.json(req.body);
});

router.patch('/:id', (req, res)=>{
    res.json({
        'message': `${req.params.id} User`
    });
});

router.delete('/:id', (req, res)=>{
    res.json({
        'message': `${req.params.id} User`
    });
});





module.exports = router;