import React from "react"
import style from './MyLocalState.module.css'


class MyLocalState extends React.Component {


    // Наш локальный стейт
    state = {
        localText: '',
        posts: []
    }

    // Чтобы перерисовать компоненту, используем метод setState
    onTextChange = (e) => {
        this.setState({
            localText: e.target.value
        })
    }


    // Повесим событие клика на кнопку
    onClickAddText = () => {

        // Если текст в локальном стейте не равен пустой строке
        if (this.state.localText !== '') {
            // Запишем данные в массив
            this.setState({
                // Перезапишем массив с постами, добавив в него последний пост
                posts: [...this.state.posts, this.state.localText]
            })
            // Обнулим значение в инпуте
            this.setState({
                localText: ''
            })
        }

        
    }

    render() {

        // Когда будем рендерить компоненту, распарсим массив, на li, чтобы вставить в виде списка
        let myPosts = this.state.posts.map(item => <li key={Math.random()}>{item}</li>)

        return (
            <div>
                <div>Изучаю локальный стейт</div>
                {/* value - берем из локального стейта, при нажатии на каждую клавишу, записываем в локальный стейт текущее значение */}
                <textarea type="text" value={this.state.localText} onChange={this.onTextChange} />
                {/* Просто выводим в тег h1 значение из локального стейта */}
                <h1 className={style.h1}>{this.state.localText}</h1>

                <button onClick={this.onClickAddText}>Добавить данное сообщение</button>
                <ul>{myPosts}</ul>
            </div>
        )
    }

}

export default MyLocalState