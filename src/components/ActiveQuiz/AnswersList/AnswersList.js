import React from 'react'
import classes from './AnswersList.css'
import AnswerItem from './AnswerItem/AnswerItem'

const AnswersList = props => (
    <ul className={classes.AnswersList}>
        <li>
            { props.answers.map((answer, index) => {
                return (
                    <AnswerItem

                        key={index}
                        answer={answer}
                        onAnswerClick={props.onAnswerClick}
                        state={props.state ? props.state[answer.id]: null }
                    />
                )
            })}
        </li>
    </ul>
)
export default AnswersList
