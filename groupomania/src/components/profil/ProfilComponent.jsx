import React, { useEffect, useState } from 'react';
import Header from '../header/Header';
import { FaUserAlt } from 'react-icons/fa';
import axios from 'axios'

const ProfilComponent = () => {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const [postsData, setPostsData] = useState([]);
    const [refetch, setRefetch] = useState('')
    
    useEffect(() => {
        const fetchData = async () => {
            const results = await axios(`http://localhost:3000/api/posts/${userData[1]}/`);
            setPostsData(results.data);
            if (results.data.length > 1) {
                console.log("plus de 2 posts");
            }
            else {
                console.log("0 ou 1 post");
            }
        }
        fetchData();
    }, [refetch]);

    
    return (
        <div className="profil-container">
            <Header currentPage='profil' />
            <div>
                <div className="user-info">
                    <div className="user-img"><FaUserAlt /></div>
                    <h2>{userData[1]}</h2>
                </div>
                <div className="user-posts-info">
                    <div className="user-msgs">
                        <h2 className="title-profil">Mes posts</h2>
                        {postsData.map((post, index) => (
                            <div key={index} className="user-msg">
                                {
                                    post.imgUrl !== "" ?
                                    <img className="img-profile" crossOrigin="anonymous" src={post.imgUrl} alt="Problème de lien" />
                                    : ""
                                }
                                <p>{post.postMsg}</p>
                                <button className="button-profil" onClick={() => {
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
                                            setRefetch(Date.now())
                                        })
                                        .catch(error => console.log(error))
                                }}>Supprimer</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div >
    );
};

export default ProfilComponent;