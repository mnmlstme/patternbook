import React from 'react'
import { StyleSheet, css } from 'aphrodite/no-important';

function Show (props) {
    let {children} = props
    let styledChildren = React.Children.map(
        children,
        (child) => React.cloneElement(child, {
            styles: classes.child
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
        padding: '1em',
        flexBasis: 'content',
        background: '#fffefe',
        boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
        borderRadius: '4px'
    }
})

module.exports = Show
