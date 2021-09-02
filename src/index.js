import React from 'react'
import ReactDOM from 'react-dom'
class ProductCategoryRow extends React.Component {

  render() {
    const category = this.props.category;
    return (<tr>
      <th className="2">{category}</th>
    </tr>)
  }

}


class ProductRow extends React.Component {

  render() {
    const product = this.props.product;
    const name = product.stocked ? product.name :
      <span style={{ color: 'red' }}>
        {product.name}
      </span>;
    return (
      <tr>
        <td>
          {name}
        </td>
        <td>
          {product.price}
        </td>
      </tr>
    );
  }
}

class ProductTable extends React.Component {

  render() {
    const filterText = this.props.filterText;
    const inStockOnly = this.props.inStockOnly;
    const rows = [];
    let lastcategory;

    this.props.products.forEach(product => {
      if (product.name.indexOf(filterText) === -1) {
        return;
      }
      //if checkebox is checked and product is not in stock
      if (inStockOnly && !product.stocked) {
        return;
      }
      if (product.category !== lastcategory) {
        //if the product does not exist 
       

        rows.push(<ProductCategoryRow
          category={product.category}
          key={product.category}
        />)
      }
      rows.push(<ProductRow
        product={product}
        key={product.name}
      />)
lastcategory=product.category;
    });

    return (<table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>)
  }
}

class SearchBar extends React.Component {

  constructor(props) {
    super(props);
    this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);
  }
  handleInStockChange(e) {
    this.props.onInStockChange(e.target.checked);
  }

  handleSearchTextChange(e) {
    this.props.onFilterTextCahnge(e.target.value);
  }

  render() {
    // const filterText = this.props.filterText;
    // const inStockOnly = this.props.inStockOnly;
    return (
      <form>
        <input onChange={this.handleSearchTextChange} value={this.props.filterText} type="text" placeholder="Enter product.." />
        <p>
          <input onChange={this.handleInStockChange} checked={this.props.inStockOnlytockOnly} type="checkbox" />
          {' '}
         Only show products in stock
       </p>
      </form>)
  }
}

class FiltableProductsTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = { filterText: "", inStockOnly: false };
    this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);
  }

  handleSearchTextChange(filterText) {
    this.setState({ filterText: filterText })

  }

  handleInStockChange(inStockOnly) {
    this.setState({ inStockOnly: inStockOnly })
  }

  render() {

    return (<div>
      <SearchBar onFilterTextCahnge={this.handleSearchTextChange}
        onInStockChange={this.handleInStockChange}
        inStockOnly={this.state.inStockOnly}
        filterText={this.state.filterText}
      />

      <ProductTable
        inStockOnly={this.state.inStockOnly}
        filterText={this.state.filterText}
        products={this.props.products}
      />
    </div>)
  }
}

const PRODUCTS = [
  { category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football' },
  { category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball' },
  { category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball' },
  { category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch' },
  { category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5' },
  { category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7' }
];


ReactDOM.render(<FiltableProductsTable products={PRODUCTS} />, document.getElementById('root'))


