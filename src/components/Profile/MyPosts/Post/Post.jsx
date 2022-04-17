import style from './Post.module.css'

function Post(props) {
    return (
        <div className={style.post}>
            <img src={props.src} alt="" />
            <p>{props.value}</p>
            <div className={style.like}>like: {props.like}</div>
        </div>
    )
}

export default Post;