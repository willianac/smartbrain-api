const handleSignIn = (req, res, db, bcrypt) => {
    const { email, password } = req.body

    if(!email || !password) return res.json('incorrect form submit')
    db.select('*').from('login').where('email', '=', email)
    .then(data => {
        const isPasswordValid = bcrypt.compareSync(password, data[0].hash)
        if(isPasswordValid) {
           db.select('*').from('users')
           .where('email', '=', email)
           .then(user => res.json(user[0]))
        } else {
            res.status(400).json('Wrong Credentials')
        }
    })
    .catch(err => res.status(400).json('Wrong Credentials'))
}
export default handleSignIn;