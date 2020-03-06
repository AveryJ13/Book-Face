import React from 'react'
import { Switch, Route } from 'react-router-dom'
import AddPage from './Components/AddPage'
import Dashboard from './Components/Dashboard'
import ProfilePage from './Components/ProfilePage'
import Auth from './Components/Auth'
import Post from './Components/Post'
import Register from './Components/Register'
import Chat from './Components/Chat'

export default (
    <Switch>
        <Route exact path='/' component={Auth} />
        <Route exact path='/dashboard' component={Dashboard} />
        <Route exact path='/profile' component={ProfilePage} />
        <Route exact path='/add' component={AddPage} />
        <Route exact path='/register' component={Register} />
        <Route path='/post/:id' component={Post} />
        <Route path='/chat' component={Chat} />
    </Switch>
)