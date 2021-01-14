import React,{useState, useEffect} from 'react';
import {Container, Button, Row} from 'react-bootstrap'; 
import "./App.css";
const format = time => {
    let hours = Math.floor(time / (60 * 60));

    let divisor_for_minutes = time % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    hours = (hours < 10) ? ('0' + hours) : hours;
    minutes = (minutes < 10) ? ('0' + minutes) : minutes;
    seconds = (seconds < 10) ? ('0' + seconds) : seconds;
    return `${hours} : ${minutes} : ${seconds}`;
}
  export default function App() {
    const [counter, setCounter] = useState(120);
    const [isPlaying, setPlaying] = useState(false);
    useEffect(() => {
        let timer;
        if (counter > 0 && isPlaying) {
            timer = setTimeout(() => setCounter(c => c - 1), 1000);
        }
    
        return () => {
            if (timer) {
            clearTimeout(timer);
            }
        };
    }, [counter,isPlaying]);
  
    const onStartTimer = () => {
        if(!isPlaying){
            setPlaying(true);
        } else {
            setPlaying(false);
        }
    }
    const onWaitTimer = () => {
        if(isPlaying){
            setPlaying(false);
        } else {
            return false;
        }
    }
    const onResetTimer = () => {
        setCounter(120);
        setPlaying(false);
    }

    return (
      <Container className="d-flex flex-column align-items-center  h-100">
        {counter === 0 ? <span>"Time over"</span> : <span>Countdown: {format(counter)}</span>}        
        <Row>
            <Button className="timer-button" onClick={onStartTimer}>{!isPlaying ? "Start" : "Stop"}</Button>
            <Button className="timer-button" onDoubleClick={onWaitTimer}>Wait</Button>
            <Button className="timer-button" onClick={onResetTimer}>Reset</Button> 
        </Row>             
      </Container>
    );
  }