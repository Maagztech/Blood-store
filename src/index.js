const express = require('express')
require('./db/mongoose')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())


app.post('/login', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

app.post('/signup', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        if (!user) {
            return res.status(500).send()
        }
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
})


app.post('/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

app.post('/update', auth, async (req, res) => {
    try {
        if (!req.user._id) {
            return res.status(500).send()
        }
        const blood = await Blood.findOne({ "owner": req.user._id })
        blood.ap = req.body.an;
        blood.an = req.body.ap;
        blood.bp = req.body.bn;
        blood.bn = req.body.bp;
        blood.op = req.body.on;
        blood.on = req.body.op;
        await blood.save();
        res.send(blood);
    } catch (e) {
        res.status(500).send()
    }
})

app.get('/search', async (req, res) => {
    try {
        const location = req.query.location
        const bloodg = req.query.bloodg
        const users = await Users.find({ location }).populate(blood)
        users = users.filter((user) => {
            return `user.blood.${bloodg}` > 0
        })
        res.send(users)
    } catch (error) {
        res.status(500).send(error)
    }

})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
