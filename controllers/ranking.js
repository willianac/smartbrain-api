const handleRanking = (req, res, db) => {
    db.select('entries', 'name').from('users')
    .then(user => {
        res.json(user)
    })
    .catch(err => res.json('Cannot get the rank list.'))
}

export default handleRanking