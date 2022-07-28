import React, { Component } from 'react'
import { Button,Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default class Sukses extends Component {
    render() {
        return (
            <div className='mt-5 text-center'>
                <Image src='assets\images\undraw_order_confirmed_re_g0if.svg' width={500} className='mb-4'/>
                <h2>Sukses Pesan</h2>
                <p>Terimakasih Sudah Memesan!</p>
                <Button variant='primary' as={Link} to='/'>
                    Kembali
                </Button>
            </div>
        )
    }
}
