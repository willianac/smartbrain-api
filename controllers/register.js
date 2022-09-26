const handleRegister = (req, res, db, bcrypt)=> {
    const { name, email, password } = req.body

    if(!name || !email || !password) return res.json('incorrect form submit')
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
            .then(user => res.json(user[0]))  
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('Unable to register (email already exists)'))
}
export default handleRegister;