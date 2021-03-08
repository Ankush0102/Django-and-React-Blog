import React, { useState, useEffect } from 'react'
import APIService from '../APIService'
import { useCookies } from 'react-cookie'

function Form(props) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [token] = useCookies(['mytoken'])

    useEffect(() => {
        setTitle(props.article.title)
        setDescription(props.article.description)
    }, [props.article])

    const updateArticle = () => {
        APIService.UpdateArticle(props.article.id, { title, description }, token['mytoken'])
            .then(res => props.updatedInformation(res))
    }

    const insertArticle = () => {
        APIService.InsertArticle({ title, description }, token['mytoken'])
            .then(res => props.insertedInformation(res))
    }

    return (
        <div>

            {props.article ? (
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" value={title} className="form-control" id="title" placeholder="Please enter the title"
                        onChange={e => setTitle(e.target.value)} />
                    <br />
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" value={description} id="description" rows="5" onChange={e => setDescription(e.target.value)}></textarea>
                    <br />
                    {props.article.id ? <button className="btn btn-success" onClick={updateArticle}>Update Article</button>
                        : <button className="btn btn-success" onClick={insertArticle}>Insert Article</button>
                    }

                </div>
            ) : null}
        </div>
    )
}



export default Form