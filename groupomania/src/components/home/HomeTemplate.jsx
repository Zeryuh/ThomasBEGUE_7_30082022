import React, { useEffect, useState } from 'react';
import Header from '../header/Header';
import axios from 'axios'
import Post from '../post/Post';
const HomeTemplate = () => {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const [author, setAuthor] = useState(userData[1]);
    const [msg, setMsg] = useState("");
    const [file, setFile] = useState(null);
    const [postData, setPostData] = useState([]);
    const [activeForm, setActiveForm] = useState("disable");
    const [updatePst, setUpdatePst] = useState('no');
    // On recupere tous les posts ici
    useEffect(() => {
        const fetch = async () => {
            const results = await axios('http://localhost:3000/api/posts/');
            setPostData(results.data.posts)
        }
        fetch();
    }, [activeForm])

    // La fonction qui est appelé au moment de l'envoi du formulaire
    function postSender(e) {
        e.preventDefault();

        const post = new FormData();
        post.append("image", file)
        post.append("post", JSON.stringify({
            author: author,
            postMsg: msg,
        }))
        axios({
            method: `${updatePst === 'no' ? 'post' : 'put'}`,
            headers: {
                'Content-Type' : 'application/json',
                'Accept' : 'application/json',
                'Authorization' : 'Bearer ' + userData[2]
            },
            url: `http://localhost:3000/api/posts/${updatePst === 'no' ? '' : updatePst}`,
            data: post
        })
            .then(res => {
                setActiveForm("disable");
                setMsg('')
                setFile(null)
                setUpdatePst('no');
            })
            .catch(error => {
                alert('un probleme est survenu!')
                console.log(error)
            })
    }


    return (
        <div className="">
            <Header currentPage='online' />
            <div className="posts-container">
                <button className="create-post-btn" onClick={
                    () => { setActiveForm("enable") }
                }>Appuyez ici pour créer un poste</button>
                <div className="">
                    {
                        postData.map((post, index) => (
                            <Post key={index}
                                post={post}
                                setAuthor={setAuthor}
                                setUpdatePst={setUpdatePst}
                                activeForm={setActiveForm}
                                setMsg={setMsg} />
                        ))

                    }
                </div>
            </div>
            <div className={activeForm === "enable" ? "form-content visible" :
                "form-content"}>
                <form onSubmit={postSender}>
                    <div className="form-template">
                        <div className="cancel-form" onClick={() => setActiveForm("disable")}>✖</div>
                        <div className="msg">
                            <label htmlFor="author">Auteur:</label>
                            <input className="author" name="" id="author"
                                placeholder="Votre nom" value={author} readOnly />
                        </div>
                        <div className="msg">
                            <label htmlFor="post-text">Votre message:</label>
                            <textarea className="textarea" name="post-text" id="post-text" value={msg} onChange={(e) => { setMsg(e.target.value) }}
                                placeholder="Votre message ...." cols="80" rows="15"></textarea>
                        </div>
                        <label htmlFor="img" className="img-downloder-label">Telecharger une image
                            <input className="img-downloder" type="file" files={file} onChange={(e) => { setFile(e.target.files[0]) }} accept="image/png,
                            image/jpg, image/jpeg" id="img" />
                        </label>
                        <button type='submit' className="send-btn">
                            Envoyer
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default HomeTemplate;