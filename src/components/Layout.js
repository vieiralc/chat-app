import React, { Component } from 'react'
import io from 'socket.io-client'

const socketUrl = ' http://172.24.176.1:3231/'
export default class Layout extends Component {

    constructor(props) {
        super(props)

        this.state = {
            socket: null
        }
    }

    componentDidMount() {
        this.initSocket()
    }

    initSocket = () => {
        const socket = io(socketUrl)
        socket.on('connect', () => {
            console.log('connected')
        })
        this.setState({socket})
    }

    render() {
        const { title } = this.props
        
        return (
            <div className='container'>
                {title}
            </div>
        )
    }
}
