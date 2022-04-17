import React from 'react';
// Импортим наши утилиты, которые будут формировать объект action
import {AddPostActionCreator,AddPostChangeActionCreator } from '../../../redux/profile-reducer'
import { connect } from 'react-redux';
import MyPosts from './MyPosts';






let mapStateToProps = (state) => {
    return {
        postData: state.profilePage.postData,
        newPostText: state.profilePage.newPostText,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        updateNewPostText: (text) => {
            let action = AddPostChangeActionCreator(text)
            dispatch( action )
        },
        addPost: () => {
            dispatch( AddPostActionCreator() )
        },
    }
}


const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps) (MyPosts)


export default MyPostsContainer

