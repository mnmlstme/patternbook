import React from 'react'
import { StyleSheet, css } from 'aphrodite/no-important';

function Show (props) {
    let {children} = props
    let styledChildren = children.map(
        (child, key) =>
            React.cloneElement(child, {
                key, styles: classes.child
            })
    );

    return (
        <figure className={css(classes.show)}>
            {styledChildren}
        </figure>
    )
}

const classes = StyleSheet.create({
    show: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        margin: '1em 4em',
    },
    child: {
        margin: 0,
        padding: '0.5em',
        flexBasis: 'content'
    }
})

module.exports = Show
