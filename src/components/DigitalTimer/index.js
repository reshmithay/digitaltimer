// Write your code here
import {Component} from 'react'
import './index.css'

const initialState = {
  isStarted: false,
  timerElapsedInSeconds: 0,
  timerLimit: 25,
}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onClickPauseOrStart = () => {
    const {timerLimit, timerElapsedInSeconds, isStarted} = this.state
    const isTimerCompleted = timerElapsedInSeconds === timerLimit * 60

    if (isTimerCompleted) {
      this.setState({timerElapsedInSeconds: 0})
    }
    if (isStarted) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.increasedTimeElapsedInSeconds, 1000)
    }

    this.setState(prevState => ({isStarted: !prevState.isStarted}))
  }

  increasedTimeElapsedInSeconds = () => {
    const {timerLimit, timerElapsedInSeconds} = this.state
    const isTimerCompleted = timerElapsedInSeconds === timerLimit * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isStarted: false})
    } else {
      this.setState(prevState => ({
        timerElapsedInSeconds: prevState.timerElapsedInSeconds + 1,
      }))
    }
  }

  onClickReset = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  onIncreaseTimer = () =>
    this.setState(prevState => ({timerLimit: prevState.timerLimit + 1}))

  onDecreaseTimer = () => {
    const {timerLimit} = this.state
    if (timerLimit > 1) {
      this.setState(prevState => ({timerLimit: prevState.timerLimit - 1}))
    }
  }

  renderLimitController = () => {
    const {timerElapsedInSeconds, timerLimit} = this.state
    const isButtonDisabled = timerElapsedInSeconds > 0
    return (
      <div className="timer-setting-container">
        <p className="limit-label">Set Timer Limit</p>
        <div className="timer-setter">
          <button
            type="button"
            className={
              isButtonDisabled
                ? 'control-button disabled-button'
                : 'control-button'
            }
            onClick={this.onDecreaseTimer}
            disabled={isButtonDisabled}
          >
            -
          </button>
          <div className="timer-limit-label-container">
            <p className="timer-limit">{timerLimit}</p>
          </div>
          <button
            className={
              isButtonDisabled
                ? 'control-button disabled-button'
                : 'control-button'
            }
            type="button"
            onClick={this.onIncreaseTimer}
            disabled={isButtonDisabled}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  renderTimerController = () => {
    const {isStarted} = this.state
    return (
      <div className="pause-reset-container">
        <button
          type="button"
          className="controller-button"
          onClick={this.onClickPauseOrStart}
        >
          <img
            src={
              isStarted
                ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
                : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
            }
            alt={isStarted ? 'pause icon' : 'play icon'}
            className="icon"
          />
          <p className="start-pause-reset">{isStarted ? 'Pause' : 'Start'}</p>
        </button>
        <button
          type="button"
          className="controller-button"
          onClick={this.onClickReset}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            alt="reset icon"
            className="icon"
          />
          <p className="start-pause-reset">Reset</p>
        </button>
      </div>
    )
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timerElapsedInSeconds, timerLimit} = this.state
    const remainingSeconds = timerLimit * 60 - timerElapsedInSeconds
    const minutes = Math.floor(remainingSeconds / 60)
    const seconds = Math.floor(remainingSeconds % 60)
    const minutesInString = minutes > 9 ? minutes : `0${minutes}`
    const secondsInString = seconds > 9 ? seconds : `0${seconds}`

    return `${minutesInString}:${secondsInString}`
  }

  render() {
    const {isStarted} = this.state

    return (
      <div className="app-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="digital-timer-container">
          <div className="timer-container">
            <div className="timer">
              <h1 className="timer-count">
                {this.getElapsedSecondsInTimeFormat()}
              </h1>
              <p className="timer-status">{isStarted ? 'Running' : 'Paused'}</p>
            </div>
          </div>
          <div className="setting-container">
            {this.renderTimerController()}
            {this.renderLimitController()}
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
