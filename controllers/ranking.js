const handleRanking = (req, res, db) => {
    db.select('entries', 'name').from('users')
    .then(user => {
        res.json(user)
    })
}

export default handleRanking