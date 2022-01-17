const router = require('express').Router();

const { Game, Questions } = require('../models/game');

router.get('/', async (req, res) => {
    try {
        const id = req.params.id
        const games = await Game.all
        res.status(200).json({games})
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: err })
    }
});


router.get('/scores', async(req,res)=>{
    try {
        const scores= await Game.scores
        res.status(200).json({scores})
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err })
    }

})
router.get('/:id', async(req,res)=>{
    try {
        const id = req.params.id
        const game = await Game.findByID(id)
        res.status(200).json(new Game(game))

    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err })
    }

})

router.post('',async(req,res)=>{

})

module.exports = router