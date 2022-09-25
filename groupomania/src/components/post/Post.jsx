import React from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { AiFillLike } from 'react-icons/ai';
import { BiDislike } from 'react-icons/bi';
import { AiOutlineLike } from 'react-icons/ai';
import axios from 'axios'

const Post = ({ post, activeForm, setMsg, setAuthor, setUpdatePst }) => {
    const userData = JSON.parse(sessionStorage.getItem('userData'))
    function setLikes(postId, like) {
        return axios({
            method: 'put',
            headers: {
                'Content-Type' : 'application/json',
                'Accept' : 'application/json',
                'Authorization' : 'Bearer ' + userData[2]
            },
            
            url: "http://localhost:3000/api/posts/",
            data: {
                postId,
                like
            }

        })
    }
    return (
        <div className="container-post">
            <div className="user">
                <div className="user-image"><FaUserAlt /></div>
                <h3 className="user-name">{post.author} à publié récemment :</h3>
            </div>
            <article className="post-content">
                {
                    post.imgUrl !== "" ?
                        <div>
                            <img className="published-img" crossOrigin="anonymous" src={post.imgUrl} alt="Problème de lien" />
                        </div>
                        : ""
                }
                {post.postMsg}
            </article>
            {
                // Permet de différencier la partie User et Admin pour afficher les boutons dans les deux cas
                post.userId === userData[0] || userData[0] === "632f9f021355a94e2484ea3a" ?
                    <div className="edit-post">
                        <button className='post-btn edit-btn' onClick={() => {
                            if (userData[0] === '632f9f021355a94e2484ea3a') {
                                setAuthor(post.author)
                            }
                            setUpdatePst(post._id)
                            setMsg(post.postMsg)
                            activeForm('enable')
                        }} >Modifier</button>
                        <button className='post-btn del-btn' onClick={
                            () => {
                                axios({
                                    method: 'delete',
                                    headers: {
                                        'Content-Type' : 'application/json',
                                        'Accept' : 'application/json',
                                        'Authorization' : 'Bearer ' + userData[2]
                                    },
                                    url: `http://localhost:3000/api/posts/${post._id}`
                                })
                                    .then((res) => {
                                        activeForm(`touch${post._id}`)
                                    })
                                    .catch(error => console.log(error))
                            }
                        }>Supprimer</button>
                    </div>
                    : ""
            }
            <div className="likes-dislikes">
                <div className="likes">
                    <span className="nbr">{post.likes}</span>
                    <span onClick={() => {
                        if (post.userLiked.find((userId) => (userId === userData[0]))) {
                            setLikes(post._id, 0)
                                .then(() => { activeForm(Date.now()) })
                                .catch((error) => { console.log(error); })
                        } else {
                            setLikes(post._id, 1)
                                .then(() => { activeForm(Date.now()) })
                                .catch((error) => { console.log(error); })
                        }
                    }} className="like-icon">{
                            post.userLiked.find((userId) => userId === userData[0]) ? <AiFillLike />
                                :
                                <AiOutlineLike />
                        }</span>
                </div>
                <div className="dislikes">
                    <span onClick={() => {
                        if (post.userDisliked.find((userId) => (userId === userData[0]))) {
                            setLikes(post._id, 0)
                                .then(() => { activeForm(Date.now()) })
                                .catch((error) => { console.log(error); })
                        } else {
                            setLikes(post._id, -1)
                                .then(() => { activeForm(Date.now()) })
                                .catch((error) => { console.log(error); })
                        }
                    }} >{
                            post.userDisliked.find(userId => userId === userData[0]) ? <AiFillLike className='dislike-icon fill' />
                                :
                                <BiDislike className='dislike-icon' />} </span>
                    <span className="nbr">{post.dislikes}</span>
                </div>
            </div>
        </div >
    );
};

export default Post;