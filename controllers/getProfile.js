const handleGetProfile = (req, res, db) => {
    const id = req.params.id
    db.select('*').from('users').where({
        id : id
    })
    .then(user => {
        if(user.length) {
            res.json((user[0]))
        } else {
            res.json('User not found!')
        }
    })
}
export default handleGetProfile;