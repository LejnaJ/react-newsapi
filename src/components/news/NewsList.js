import React, { useEffect, useRef } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setNews, searchNewsAction } from '../../redux/actions/newsActions'
import NewsComponent from './NewsComponent'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import CardGroup from 'react-bootstrap/CardGroup'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import InputGroup from 'react-bootstrap/InputGroup'

var pageSize = 20
const NewsList = () => {
	const [page, setPage] = useState(1)
	const [value, setValue] = useState('')
	const [sortByValue, setSortByValue] = useState('')
	const [showDropdown, setShowDropdown] = useState(false)
	const news = useSelector((state) => state.allNews.news)
	const loading = useSelector((state) => state.allNews.loading)
	let history = useHistory()
	// const dropdownRef = useRef()
	const dispatch = useDispatch()

	const dropdownSelectHandler = (sortValue) => {
		if (sortValue) {
			setSortByValue(sortValue)
		}
	}

	const apiCalls = async () => {
		const res = await axios
			.get(`https://newsapi.org/v2/everything?q=${value}&sortBy=${sortByValue}&apiKey=653b1c769da0469cbd2923100432eb11`)
			.catch((err) => {
				console.log('Error occured', err)
			})
		if (res.status === 200) {
			dispatch(searchNewsAction(res.data.articles))
			setShowDropdown(true)
		}
	}

	useEffect(() => {
		if (sortByValue) {
			history.push(`/search/${value}`)

			dispatch({ type: 'SET_LOADING', payload: true })

			apiCalls()
			dispatch({ type: 'SET_LOADING', payload: false })
		}
	}, [sortByValue, dispatch, history, value])

	const fetchNews = async () => {
		dispatch({ type: 'SET_LOADING', payload: true })
		const res = await axios
			.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=653b1c769da0469cbd2923100432eb11&page=${page}&pageSize=${pageSize}`)
			.catch((err) => {
				console.log('Error occured', err)
			})
		dispatch({ type: 'SET_LOADING', payload: false })
		dispatch(setNews(res.data.articles))
	}

	const searchNews = async (e) => {
		e.preventDefault()

		history.push(`/search/${value}`)

		dispatch({ type: 'SET_LOADING', payload: true })
		const res = await axios
			.get(`https://newsapi.org/v2/everything?q=${value}&sortBy=${sortByValue}&apiKey=653b1c769da0469cbd2923100432eb11`)
			.catch((err) => {
				console.log('Error occured', err)
			})
		if (res.status === 200) {
			dispatch(searchNewsAction(res.data.articles))
			setShowDropdown(true)
		}
		dispatch({ type: 'SET_LOADING', payload: false })
	}

	useEffect(() => {
		if (page === 1) {
			fetchNews()
		}
	}, [])

	// useEffect(() => searchNews(), [sortByValue]);

	const loadMore = () => {
		setPage(page + 1)
		fetchNews()
	}

	return (
		<div className="">
			{/* Search */}
			<div className="form-wrapper form-search mb-4">
				<form onSubmit={searchNews}>
					<InputGroup className="mb-3 search">
						<input
							type="text"
							onChange={(e) => {
								setValue(e.target.value)
							}}
							className="form-control"
							placeholder="Search for something"
							autoComplete="off"
						/>
						{/* <Link to={`/search/${value}`}> */}
						<Button
							variant="outline-secondary"
							id="button-addon2"
							// onClick={searchNews}
							type="submit"
							disabled={loading || !value}
						>
							<span>Search</span>
						</Button>
						{/* </Link> */}
					</InputGroup>
				</form>
			</div>

			{/*Sort by section */}

			{showDropdown ? (
				<div className="dropdown-wrapper">
					<select className="btn-outline" onChange={(e) => dropdownSelectHandler(e.target.value)}>
						<option value="" disabled selected hidden>
							Sort By
						</option>
						<option value="popularity">Popularity</option>
						<option value="relevancy">Relevancy</option>
						<option value="publishedAt">Published Date </option>
					</select>
				</div>
			) : (
				' '
			)}

			{/* List of news */}
			<CardGroup>
				<NewsComponent />
			</CardGroup>

			<div className="load-more-wrapper">
				{loading ? (
					<Spinner animation="grow" />
				) : (
					<Button variant="dark" onClick={loadMore}>
						Load more
					</Button>
				)}
			</div>
		</div>
	)
}
export default NewsList
