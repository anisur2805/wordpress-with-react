import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
export class BookItems extends Component {
	state = {
		imgUrl: "",
		author: "",
        publishedAt: '',
		isLoaded: false,
	};
	static propTypes = {
		book: PropTypes.object.isRequired,
	};
	componentDidMount() {
		const { featured_media, author } = this.props.book;
		const getImageUrl = axios.get(
			`http://wplocal.local/wp-json/wp/v2/media/${featured_media}`
		);
		const getAuthor = axios.get(
			`http://wplocal.local/wp-json/wp/v2/users/${author}`
		);

		Promise.all([getImageUrl, getAuthor]).then((res) => {
			console.log("res ", res);
			this.setState({
				imgUrl: res[0].data.media_details.sizes.full.source_url,
				author: res[1].data.name,
                publishedAt: res[0].data.date,
				isLoaded: true,
			});
		});
	}

	render() {
		const { title, excerpt } = this.props.book;
		const { author, imgUrl, isLoaded, publishedAt } = this.state;
		return (
			<div className="single_book_item">
				<h2><a href="" >{title.rendered}</a></h2>
				<img src={imgUrl} alt={title.rendered} />
				<p><strong>By {author}</strong> at {publishedAt} </p>
				<div
					dangerouslySetInnerHTML={{
						__html: excerpt.rendered,
					}}></div>
			</div>
		);
	}
}
export default BookItems;
