import style from './ProfileInfo.module.css'
import React from 'react'

class ProfileStatus extends React.Component {



    // Создаем наш стейт
    // По сути сейчас он нужен, только для того, чтобы понять, мы в режиме редактирования, или нет
    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        // Метод, перерисовывающий компоненту, не желательно использовать
        // this.forceUpdate()
        // А вот так, грамотно перерисовывается компонента, setState - это асинхронный метод
        this.setState({
            editMode: true
        })
    }
    deActivateEditMode = () => {
        this.setState({
            editMode: false
        })

        // Нужно записать на сервак новый статус, и передаем ему наш статус, из локального стейта
        this.props.updateStatus(this.state.status)
    }

    // Метод, который будет изменять наш локальный state.
    onStatusChange = (e) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    // Этот метод срабатывает, когда компонента перерисовалась, это нам нужно, чтобы перерисать локальный стейт с пустого значения, как мы указали сначало, на те данные которые пришли к нам через пропсы - актуальные
    componentDidUpdate(prevProps, prevState) {
        // Если предыдущий стутус не равен текущему, это условие обязательно, так как без него, у нас componentDidUpdate зациклиться бесконечным циклом, так как этот метод будет вызываться каждый раз при обновлении данных и перерисовки компоненты, при этом он сам перерисовывает компоненту, и вызываем по сути сам себя
        if(prevProps.status !== this.props.status) {
            // Изменим в глобаном стейте данные о статусе.
            this.setState({
                status: this.props.status
            })
        }
    } 


    render() {
        return (
            <div className={style.status}>

                {/* если ложь, то отобразим текст */}
                {!this.state.editMode &&
                    <div>
                        <span className={style.statusText} 
                        onDoubleClick={this.activateEditMode}>
                            {this.props.status}
                        </span>
                    </div>
                    
                }

                

                {/* Если истина, то отобразим инпут */}
                {/* onBlur срабатывает когда уходит фокус с инпута */}
                {/* autoFocus={true} - делает сразу активным инпут */}
                {/* value - берем из локального стейта, при событие onChange, при нажатии на каждую клавишу, записываем значение в локальный стейт, но когда мы отжимаем, то срабатывает функция, deActivateEditMode которая записывает введенные данные в глобальный стейт редакса */}
                {this.state.editMode &&
                    <div>
                        <input className={style.statusEdit} 
                        onChange={this.onStatusChange} 
                        autoFocus={true} 
                        onBlur={this.deActivateEditMode} 
                        value={this.state.status} />
                    </div>
                }



            </div>
        )
    }

}

export default ProfileStatus