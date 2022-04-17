import Post from './Post/Post'
import style from './MyPosts.module.css'
import React from 'react';



const MyPosts = (props) => {

    let postElements = props.postData.map(
        post => <Post key={post.id} value={post.value} src={post.src} like={post.like} />
    )

    let newPostElement = React.createRef()

    // Это локальная функция
    let onAddPost = () => {
        // А это функция, из бизнес мира, которая пришла к нам через пропсы (По старому)
        //props.dispatch( AddPostActionCreator() )
        // Вызываем функцию, из контейнерной компоненты.
        props.addPost()
    }

    let onPostChange = () => {
        // Наша переменная, равняется текущему значению в текстареа
        let text = newPostElement.current.value
        // Вызываем функцию бизнес уровня и передаем ей данные (По старому)
        //props.dispatch( AddPostChangeActionCreator(text) )
        // Вызываем функцию, из контейнерной компоненты.
        props.updateNewPostText(text)
    }

    return (
        <div className={style.myPosts}>
            <h3>My posts</h3>
            <div>
                <textarea ref={newPostElement} onChange={onPostChange} className={style.textarea} value={props.newPostText}></textarea>
                <div style={{ height: '50px' }}>
                    <button onClick={onAddPost} className={style.button}>Оставить комментарий (Пост)</button>
                </div>
            </div>
            <div className={style.posts}>
                {postElements}
            </div>
        </div>
    )
}

export default MyPosts

