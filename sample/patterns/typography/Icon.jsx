var React = require('react')
import { StyleSheet, css } from 'aphrodite/no-important'

var Icon = function(props) {
    let { symbol } = props
    symbol = symbol || 'default'

    return (
        <svg className={css(styles.icon)}>
            <use xlinkHref={'#' + symbol} />
        </svg>
    )
}

const styles = StyleSheet.create({
    icon: {
        width: '1em',
        height: '1em',
        // we set the baseline at 15% from the bottom of the em-box
        verticalAlign: '-.15em',
        stroke: 'none',
        fill: 'currentColor'
    }
})

module.exports = Icon
