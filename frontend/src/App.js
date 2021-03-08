import './App.css'
import ArticleList from './components/ArticleList'
import { useState, useEffect } from 'react'
import Form from './components/Form'
import { useCookies } from 'react-cookie'
import { useHistory } from 'react-router-dom'



function App() {
  const [articles, setArticles] = useState([])
  const [editArticle, setEditArticle] = useState(null)

  const [token, setToken, removeToken] = useCookies(['mytoken'])

  let history = useHistory()

  useEffect(() => {
    fetch('http://127.0.0.1:8000/articles/', {
      'method': 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token['mytoken']}`
      }
    })
      .then(res => res.json())
      .then(res => setArticles(res))
      .catch(error => console.log(error))
  }, [])


  const editBtn = (article) => {
    setEditArticle(article)
  }

  const updatedInformation = (article) => {
    const new_article = articles.map(myarticle => {
      if (myarticle.id == article.id) {
        return article
      }
      else {
        return myarticle
      }
    })
    setArticles(new_article)
  }


  const articleForm = () => {
    setEditArticle({ title: '', description: '' })
  }

  const insertedInformation = (article) => {
    const new_articles = [...articles, article]
    setArticles(new_articles)
  }

  const deleteBtn = (article) => {
    const new_articles = articles.filter(myarticle => {
      if (myarticle.id == article.id) {
        return false
      }
      return true
    })

    setArticles(new_articles)
  }

  const logoutBtn = () => {
    removeToken(['mytoken'])
  }
  useEffect(() => {
    if (!token['mytoken']) {
      history.push('/')
    }
  }, [token])

  return (
    <div className="App">
      <div className="row">
        <div className="col">
          <h1 style={{ 'marginBottom': '50px' }}>Django and ReactJS Blog App</h1>
        </div>
        <div className="col">
          <button className="btn btn-primary" onClick={articleForm}>Insert Article</button>
        </div>
        <div className="col">
          <button className="btn btn-primary" onClick={logoutBtn}>Logout</button>
        </div>
      </div>
      <ArticleList articles={articles} editBtn={editBtn} deleteBtn={deleteBtn} />
      {editArticle ? <Form article={editArticle} updatedInformation={updatedInformation} insertedInformation={insertedInformation} /> : null}

    </div>
  );
}

export default App;
