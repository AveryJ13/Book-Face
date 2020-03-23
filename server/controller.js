const bcrypt = require('bcryptjs')

module.exports = {
    register: async (req, res) => {
        const { user_email, user_password, first_name, last_name } = req.body
        const { session } = req
        const db = req.app.get('db')
        let user = await db.check_user([user_email])
        user = user[0]
        if (user) {
            return res.status(400).send('User already exists')
        }


        const salt = bcrypt.genSaltSync(5)
        const hash = bcrypt.hashSync(user_password, salt)

        let newUser = await db.register_user([user_email, hash, first_name, last_name])
        newUser = newUser[0]
        session.user = newUser
        return res.status(200).send(session.user)
    },
    login: async (req, res) => {
        const { user_email, user_password } = req.body
        const { session } = req
        const db = req.app.get('db')
        let user = await db.check_user([user_email])
        user = user[0]
        if (!user) {
            return res.status(400).send('Username not found')
        }
        const authenticated = bcrypt.compareSync(user_password, user.user_password)
        if (authenticated) {
            delete user.user_password
            session.user = user
            res.status(200).send(session.user)
        } else {
            res.status(500).send('password not found')
        }
    },
    getPosts: async (req, res) => {
        const db = req.app.get('db')
        let posts = await db.get_posts()
        return res.status(200).send(posts)
    },
    addPost: async (req, res) => {
        const db = req.app.get('db')
        const { post_title, post_img, post_text } = req.body
        const { session } = req
        let post = await db.add_post([post_title, post_img, post_text, session.user.user_id])
        return res.status(200).send(post)
    },
    checkUser: async (req, res) => {
        console.log(req.session.user)
        if (req.session.user) {

            return res.status(200).send(req.session.user)
        }
        else {
            return res.sendStatus(500)
        }
    },
    logout: async (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    },
    getIndividual: async (req, res) => {
        const db = req.app.get('db')
        const { id } = req.params
        let post = await db.get_individual([+id])
        post = post[0]

        return res.status(200).send(post)
    },
    getUserInfo: async (req, res) => {
        const { session } = req
        console.log(session)
        return res.status(200).send(session.user)
    },
    getAuthor: async (req, res) => {
        const db = req.app.get('db')
        const id = req.params
        let author = await db.get_author([+id.id])
        author = author[0]
        delete author.user_password
        res.status(200).send(author)
    },
    getUserPosts: async (req, res) => {
        const db = req.app.get('db')
        const { session } = req
        let posts = await db.get_profile_posts([session.user.user_id])
        console.log(session.user.user_id)
        res.status(200).send(posts)
        console.log(posts)
    },
    deletePost: async (req, res) => {
        const db = req.app.get('db')
        const id = req.params
        console.log(id)
        db.delete_post([+id.id])
        res.sendStatus(200)
    },
    editPost: async (req, res) => {
        const db = req.app.get('db')
        const id = req.params
        const { post_title, post_img, post_text } = req.body
        db.edit_post([post_title, post_img, post_text, +id.id])
        res.sendStatus(200)
    },
    getComments: async (req, res) => {
        const db = req.app.get('db')
        const { id } = req.params
        console.log(id)
        let comments = await db.get_comments([+id])
        res.status(200).send(comments)

    },
    addComment: async (req, res) => {
        const db = req.app.get('db')
        const { session } = req
        const { comment_id, comment_text } = req.body
        let newComment = await db.add_comment([comment_id, comment_text, session.user.first_name, session.user.last_name])
        res.status(200).send(newComment)
    }
}