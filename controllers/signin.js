const handleSignIn = (req, res, db, bcrypt, jwt) => {
    const { email, password } = req.body

    if(!email || !password) return res.json('Incorrect form submit')
    db.select('*').from('login').where('email', '=', email)
    .then(data => {
        const isPasswordValid = bcrypt.compareSync(password, data[0].hash)
        if(isPasswordValid) {
           db.select('*').from('users')
           .where('email', '=', email)
           .then(user => {
                const token = jwt.sign({userId : user[0].id}, 'WILL2009', {expiresIn : 300})
                res.json({...user[0], auth : true, token})
           })
        } else {
            res.status(400).json('Wrong Credentials')
        }
    })
    .catch(err => res.status(400).json('Wrong Credentials'))
}
export default handleSignIn;