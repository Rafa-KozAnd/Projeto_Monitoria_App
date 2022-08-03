const express = require('express')
const router = express.Router()

router.get("/", (req, res) =>  {
    res.send("get login dashboard")
})

router.post("/login", (req, res) =>  {
    res.status(200).send({msg:"post login dashboard"})
})

module.exports = router