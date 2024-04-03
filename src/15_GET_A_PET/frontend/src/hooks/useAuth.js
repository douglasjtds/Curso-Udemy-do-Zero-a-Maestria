import api from '../utils/api'
import useFlashMessage from './useFlashMessage'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

export default function useAuth() {
    const [ authenticated, setAuthenticated ] = useState(false)
    const { setFlashMessage } = useFlashMessage()
    const history = useHistory()

    useEffect(() => {
        const token = localStorage.getItem('token')

        if(token) {
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
            setAuthenticated(true)
        }
    }, [])

    async function register(user) {

        let msgText = 'User successfully registered!'
        let msgType = 'success'

        try {
            const data = await api.post('/users/register', user).then((response) => {
                return response.data
            })

            await authUser(data)
        } catch (error) {
            msgText = error.response.data.message
            msgType = 'error'
        }

        setFlashMessage(msgText, msgType)
    }
    
    async function authUser (data){ 
        setAuthenticated(true)
        localStorage.setItem('token', JSON.stringify(data.token))
        history.push('/')
    }
    
    function logout () {
        const msgText = 'Logout completed successfully'
        const msgType = 'success'
        
        setAuthenticated(false)
        localStorage.removeItem('token')
        api.defaults.headers.Authorization = undefined
        history.push('/')
        
        setFlashMessage(msgText, msgType)
    }

    return { authenticated, register , logout}
}