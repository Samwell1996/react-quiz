import React, {Component} from 'react'
import classes from './Quiz.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import axios from '../../axios/axios-quiz'
import Loading from '../../components/UI/Loader/Loader'

class Quiz extends Component {

    state = {
        results: {},
        isFinished: false,
        activeQuestion: 0,
        answerState: null,
        quiz: [],
        loading:true

    }
    onAnswerClickHandler = (answerId) => {
        const {activeQuestion, quiz} = this.state;
        const {id, rightAnswerId} = quiz[activeQuestion];
        const results = this.state.results;
        const question = this.state.quiz[this.state.activeQuestion]

        let status = 'fail';


            if (rightAnswerId === answerId) {
                status = 'success';
                if (!results[id]) {
                    results[id] = 'success';
                }

                this.setState({
                    answerState: {[answerId] : 'success'},
                    results: results
                });



            } else {
                results[question.id] = 'fail';
                this.setState({
                    answerState: {[answerId] : 'fail'},
                    results: results
                })
            }


            const isFinished = quiz.length - 1 === activeQuestion; //last question

        this.setState(prev => ({
            ...prev,
            results: {
                ...prev.results,
                [id]: status
            }
        }));

        setTimeout(() => {
            this.setState(prev => ({
                ...prev,
                activeQuestion: isFinished ? prev.activeQuestion : prev.activeQuestion + 1,
                isFinished,
                answerState: null
            }));
        }, 1000)

    }

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }
    retryHandler = () => {
        this.setState({
            activeQuestion:0,
            answerState:null,
            isFinished: false,
            results: {}
        })
    }

    async componentDidMount() {
        try {
            const response = await axios.get(`/quizes/${this.props.match.params.id}.json`)
            const quiz = response.data

            this.setState({
                quiz,
                loading:false
            })
        }catch (e) {
            console.log(e)
        }
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>
                        Дайте відповіді на запитання
                    </h1>

                    {
                        this.state.loading
                        ?<Loading/>
                        : this.state.isFinished
                            ? <FinishedQuiz
                                results={this.state.results}
                                quiz={this.state.quiz}
                                onRetry={this.retryHandler}
                            />
                            : <ActiveQuiz
                                answers={this.state.quiz[this.state.activeQuestion].answers}
                                question={this.state.quiz[this.state.activeQuestion].question}
                                onAnswerClick={this.onAnswerClickHandler}
                                quizLength={this.state.quiz.length}
                                answerNumber={this.state.activeQuestion + 1}
                                state={this.state.answerState}
                            />
                    }



                </div>
            </div>
        )
    }
}


export default Quiz
