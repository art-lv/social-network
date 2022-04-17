import React from "react";

class Timer extends React.Component {


    state = {
        seconds: 0
    }


    tick() {
        this.setState(
            // Данная функция принимает state, и возвращает state + 1
            state => ({
                seconds: state.seconds + 1
            })
        )
    }


    componentDidMount() {
        // Когда компонента отрендерилась, каждую секунду вешаем функцию tick
        this.interval = setInterval(
            () => this.tick(), 1000
        )
    }


    componentWillUnmount() {
        clearInterval(this.interval);
    }


    render() {
        return (
            <div>
                {/* Отображаем из локального стейта секунды */}
                Секунды: {this.state.seconds}
            </div>
        );
    }


}

export default Timer

