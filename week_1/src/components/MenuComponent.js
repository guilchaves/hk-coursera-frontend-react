import React, { Component } from 'react';
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardTitle,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';
import DishDetail from './DishdetailComponent';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDish: null,
    };
  }

  onDishSelect(dish) {
    this.setState({ selectedDish: dish });
  }

  renderDish(dish) {
    if (dish != null) {
      return (
        <div>
          <DishDetail dish={dish} />
        </div>
      );
    } else {
      return <div></div>;
    }
  }

  renderComment(dish) {
    if (dish != null) {
      return dish.comments.map(comment => {
        return (
          <div key={comment.id}>
            <ListGroup>
              <ListGroupItem className="border-0">
                {comment.comment}
              </ListGroupItem>
              <ListGroupItem className="border-0">
                {` ${comment.author} , ${new Intl.DateTimeFormat('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: '2-digit',
                }).format(new Date(Date.parse(comment.date)))}`}
              </ListGroupItem>
            </ListGroup>
          </div>
        );
      });
    } else {
      return <div></div>;
    }
  }

  render() {
    const menu = this.props.dishes.map(dish => {
      return (
        <div key={dish.id} className="col-12 col-md-5 m-1">
          <Card key={dish.id} onClick={() => this.onDishSelect(dish)}>
            <CardImg width="100%" src={dish.image} alt={dish.name} />
            <CardImgOverlay>
              <CardTitle>{dish.name}</CardTitle>
            </CardImgOverlay>
          </Card>
        </div>
      );
    });

    const renderDish = this.renderDish(this.state.selectedDish);
    const renderComments = this.renderComment(this.state.selectedDish);

    return (
      <div className="container">
        <div className="row">{menu}</div>
        <div className="row">
          <div className="col-12 col-md-5 m-1">{renderDish}</div>
          <div className="col-12 col-md-5 m-1">{renderComments}</div>
        </div>
      </div>
    );
  }
}

export default Menu;
