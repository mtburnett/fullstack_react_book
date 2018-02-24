class ProductList extends React.Component {
	state = {
		products: [],
	};
	handleProductUpvote = (productId) => {
		const modifiedProducts = [...this.state.products];
		modifiedProducts.forEach((product, index) => {
			if (product.id === productId) {
				modifiedProducts[index].votes += 1;
			}
		})
		this.setState({ products: modifiedProducts });
	}
	componentDidMount() {
		this.setState({ products: Seed.products });
	}
	render() {
		const productComponents = this.state.products.sort((a, b) => b.votes - a.votes).map((product) => (
			<Product
				key={'product-' + product.id}
				id={product.id}
				title={product.title}
				description={product.description}
				url={product.url}
				votes={product.votes}
				submitterAvatarUrl={product.submitterAvatarUrl}
				productImageUrl={product.productImageUrl}
				onVote={this.handleProductUpvote}
			/>
		));
		return (
			<div className='ui unstackable items'>
				{productComponents}
			</div>
		);
	}
}

class Product extends React.Component {
	handleUpvote = () => {
		this.props.onVote(this.props.id);
	}
	render() {
		return (
			<div className='item'>
        <div className='image'>
          <img src={this.props.productImageUrl} />
        </div>
        <div className='middle aligned content'>
					<div className='header'>
						<a onClick={this.handleUpvote}>
							<i className='large caret up icon' />
						</a>
						{this.props.votes}
					</div>
          <div className='description'>
            <a href={this.props.url}>{this.props.title}</a>
            <p>{this.props.description}</p>
          </div>
          <div className='extra'>
            <span>Submitted by:</span>
            <img
              className='ui avatar image'
              src={this.props.submitterAvatarUrl}
            />
          </div>
        </div>
      </div>
		);
	}
}

ReactDOM.render(
	<ProductList />,
	document.getElementById('content')
);
