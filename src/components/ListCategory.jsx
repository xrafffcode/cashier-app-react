import React, { Component } from 'react'
import { Col, ListGroup } from 'react-bootstrap'
import { API_URL } from '../utils/constants'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUtensils, faCoffee, faCheese } from '@fortawesome/free-solid-svg-icons'

const Icon = ({ nama }) => {
    if (nama === 'Makanan') return <FontAwesomeIcon icon={faUtensils} className='me-3' />
    if (nama === 'Minuman') return <FontAwesomeIcon icon={faCoffee} className='me-2' />
    if (nama === 'Cemilan') return <FontAwesomeIcon icon={faCheese} className='me-3' />
}

export default class ListCategory extends Component {
    constructor(props) {
        super(props)

        this.state = {
            categories: [],
        }
    }

    componentDidMount() {
        axios.get(API_URL + 'categories')
            .then(res => {
                const categories = res.data;
                this.setState({ categories });
            })
            .catch(err => {
                console.log(err);
            })
    }


    render() {
        const { categories } = this.state;
        const { changeCategory, categoryYangDipilih } = this.props;
        return (
            <Col md={2} ml='2'>
                <h4><strong>Daftar Kategori</strong></h4>
                <hr />
                <ListGroup>
                    {categories && categories.map((category) => (
                        <ListGroup.Item
                            key={category.id}
                            onClick={() => changeCategory(category.nama)}
                            className={category.nama === categoryYangDipilih ? 'category-aktif' : ''}
                            style={{ cursor: 'pointer' }}
                        >
                            <h5>
                                <Icon nama={category.nama} />{category.nama}
                            </h5>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Col>
        )
    }
}
