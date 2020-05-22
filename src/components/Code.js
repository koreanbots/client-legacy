import React from 'react'
import { Segment, Label } from 'semantic-ui-react'

class CodeBlock extends React.PureComponent {
    render(){
        return(
            <Segment padded style={{ minHeight: '200px' }}>
                <Label attached="top">{Langs[this.props.language]}</Label>
                <pre>
                    <code>
                    {this.props.value}>
                    </code>
                </pre>
            </Segment>
        )
    }
}

export default CodeBlock


const Langs = {
    js: 'Javascript',
    py: 'Python',
    cs: 'C#'
}