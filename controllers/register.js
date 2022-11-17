const handleRegister = (req, res, db, bcrypt, jwt)=> {
    const { name, email, password } = req.body
    const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
        trx.insert({
            email : email,
            hash : hash
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            trx.insert({
                name : name,
                email : loginEmail[0].email,
                joined : new Date()
            })
            .into('users')
            .returning('*')
            .then(user => {
                const token = jwt.sign({userId : user[0].id}, 'WILL2009', {expiresIn : 300})
                res.json({...user[0], auth : true, token})
            })  
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('Unable to register (email already exists)'))
}
export default handleRegister;