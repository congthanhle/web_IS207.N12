import React from 'react';
import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useState, useEffect } from "react";
import { useLocation } from 'react-router';
import axios from 'axios';
import { URI, IMG } from '../../api';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export default function SingleCategory() {
    const [products, setProducts] = useState([]);
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    useEffect(() => {
        const fetchProducts = async () => {
            const res = await axios.get(`${URI}/product/getCat/${path}`);
            setProducts(res.data);
        }
        fetchProducts();
        const timerId = setTimeout(fetchProducts, 200);
        return () => clearTimeout(timerId);
    }, [products]);

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`${URI}/product/${id}`)
            setProducts(products.filter((item) => item.id !== id));
        } catch (err) { }

    };
    return (
        <div className="datatable">
            <div className="datatableTitle">
                Products
                <Link to="/products/new" className="link">
                    Add New
                </Link>
            </div>
            <div>
                <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {
                        products && products.map((item => (
                            <Grid item xs={3} key={item.id}>
                                <Card sx={{ maxWidth: 300 }}>
                                    {
                                        item.thumbnail &&  <CardMedia
                                        component="img"
                                        alt="green iguana"
                                        height="250"
                                        image={`${IMG}/${item.thumbnail}`}
                                    />
                                    }
                                   
                                    <CardContent>
                                        <Typography gutterBottom variant="h7" component="div">
                                            {item.name}
                                        </Typography>
                                        <Typography gutterBottom variant="h7" component="div">
                                            Số lượng: {item.quantity}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Link to={`/products/${item.id}`} style={{ textDecoration: "none" }}>
                                            <VisibilityIcon style={{ color: '#ff781f', marginRight: '20px' }} />
                                        </Link>
                                        <Link to={`/products/update/${item.id}`} style={{ textDecoration: "none" }}>
                                            <EditIcon style={{ color: '#ff781f', marginRight: '20px' }} />
                                        </Link>
                                        <div
                                            style={{ color: '#ff781f' }}
                                            onClick={() => handleDelete(item.id)}
                                            className="button"

                                        >
                                            <DeleteOutlineIcon />
                                        </div>
                                    </CardActions>
                                </Card>
                            </Grid>
                        )))
                    }

                </Grid>

            </div>


        </div>
    )
}
