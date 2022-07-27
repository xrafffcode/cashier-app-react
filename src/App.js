import React, { Component } from 'react'
import { Hasil, ListCategory, Menus, NavbarComopenent } from './components';
import { Row, Col, Container } from 'react-bootstrap';
import { API_URL } from './utils/constants'
import axios from 'axios';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)
export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      menus: [],
      categoryYangDipilih: 'Makanan',
      keranjangs: []
    }
  }

  componentDidMount() {
    axios.get(API_URL + 'products?category.nama=' + this.state.categoryYangDipilih)
      .then(res => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch(err => {
        console.log(err);
      })

    axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        const keranjangs = res.data;
        this.setState({ keranjangs });
      })
      .catch((error) => {
        console.log("Error yaa ", error);
      });
  }

  changeCategory = (value) => {
    this.setState({
      categoryYangDipilih: value,
      menus: []
    })

    axios.get(API_URL + 'products?category.nama=' + value)
      .then(res => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch(err => {
        console.log(err);
      })
  }
  masukKeranjang = (value) => {
    axios
      .get(API_URL + "keranjangs?product.id=" + value.id)
      .then((res) => {
        if (res.data.length === 0) {
          const keranjang = {
            jumlah: 1,
            total_harga: value.harga,
            product: value,
          };

          axios
            .post(API_URL + "keranjangs", keranjang)
            .then((res) => {
              MySwal.fire({
                title: 'Berhasil',
                text: 'Produk  ' + keranjang.product.nama + ' berhasil ditambahkan ke keranjang',
                icon: 'success',
              })
            })
            .catch((error) => {
              console.log("Error yaa ", error);
            });
        } else {
          const keranjang = {
            jumlah: res.data[0].jumlah + 1,
            total_harga: res.data[0].total_harga + value.harga,
            product: value,
          };

          axios
            .put(API_URL + "keranjangs/" + res.data[0].id, keranjang)
            .then((res) => {
              MySwal.fire({
                title: 'Berhasil',
                text: 'Produk  ' + keranjang.product.nama + ' berhasil ditambahkan ke keranjang',
                icon: 'success'
              })
            })
            .catch((error) => {
              console.log("Error yaa ", error);
            });
        }
      })
      .catch((error) => {
        console.log("Error yaa ", error);
      });
  };

  render() {
    const { menus, categoryYangDipilih, keranjangs } = this.state;
    return (
      <div className="App">
        <NavbarComopenent />
        <div className="mt-2">
          <Container fluid>
            <Row>
              <ListCategory changeCategory={this.changeCategory} categoryYangDipilih={categoryYangDipilih} />
              <Col>
                <h4><strong>Daftar Produk</strong></h4>
                <hr />
                <Row>
                  {menus && menus.map(menu => (
                    <Menus
                      key={menu.id}
                      menu={menu}
                      masukKeranjang={this.masukKeranjang}
                    />
                  ))}
                </Row>
              </Col>
              <Hasil keranjangs={keranjangs} />
            </Row>
          </Container>
        </div>
      </div>
    )
  }
}


