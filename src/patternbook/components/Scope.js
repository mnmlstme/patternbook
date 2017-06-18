import React from 'react'

const messageTypes = {
    SET: 'patternbook.set',
    RESET: 'patternbook.reset'
}

class Scope extends React.Component {

    constructor (props) {
        super(props);
        this.state = {}
        this.componentWillReceiveProps(props)
    }

    componentWillReceiveProps (nextProps) {
        this.state = {
            current: Object.assign({},nextProps.initial)
        }
    }

    render () {
        return React.createElement(
            this.props.component,
            {
                scope: this.state.current,
                dispatch: this.dispatch.bind(this)
            },
            []
        )
    }

    dispatch (key, payload) {
        switch (key) {
            case messageTypes.SET:
                this.setState(
                    {current: Object.assign({}, this.state.current, payload)}
                )
                break;
            case messageTypes.RESET:
                this.setState(
                    {current: this.props.initial}
                )
                break;
            default:
                console.log('invalid message: ', key, payload)
        }
    }
}

Scope.messageTypes = messageTypes

module.exports = Scope
