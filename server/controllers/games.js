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
        //const scores= await Game.scores
        const scores= await Game.totalScores
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

router.post('/', async (req, res) => {
    try {
        const game = await Game.create(req.query)
        res.status(200).json(game.ops[0]._id)
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: err })
    }
});

router.post('/:id/players/:player/answers', async (req, res) => {
    try {
        const score = await Game.addAnswers(req.params.id, req.params.player, req.body)
        res.status(200).json({msg: 'success'})
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: err })
    }
});

module.exports = router