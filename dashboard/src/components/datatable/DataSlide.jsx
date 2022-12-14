import React from 'react';
import "./datatable.scss";
import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Switch from '@mui/material/Switch';
import { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { URI, IMG } from '../../api';
import { Context } from '../../context/Context';


export default function DataSlide() {
    const [slides, setSlides] = useState([]);
    const { user } = useContext(Context);

    useEffect(() => {
        const fetchSlides = async () => {
            const res = await axios.get(`${URI}/slide`);
            setSlides(res.data);
        }
        fetchSlides();
        const timerId = setTimeout(fetchSlides, 200);
        return () => clearTimeout(timerId);
    }, [slides]);

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`${URI}/slide/${id}`, { headers: { "Authorization": `Bearer ${user.token}` } })
            setSlides(slides.filter((item) => item.id !== id));
        } catch (err) { }

    };
    const handleUpdate = async (id, status) => {
        try {
            await axios.put(`${URI}/slide/${id}`, {
                status: !status
            }, { headers: { "Authorization": `Bearer ${user.token}` } })
        } catch (err) { }
    }
    return (
        <div className="datatable">
            <div className="datatableTitle">
                Slides
                {
                    user.user.role_id === 2 && <Link to="/slides/new" className="link">
                        Add New
                    </Link>
                }

            </div>
            <div>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {
                        slides.map((item => (
                            <Grid item xs={3} key={item.id}>
                                <Card sx={{ maxWidth: 300 }}>
                                    <CardMedia
                                        component="img"
                                        alt="green iguana"
                                        height="150"
                                        image={`${IMG}/${item.thumbnail}`}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h7" component="div">
                                            {item.name}
                                        </Typography>
                                    </CardContent>
                                    {
                                        user.user.role_id === 2 && <CardActions>

                                            <Switch color="warning" checked={item.status === 1 ? true : false} onChange={() => handleUpdate(item.id, item.status)} />

                                            <div
                                                style={{ color: 'red' }}
                                                onClick={() => handleDelete(item.id)}
                                                className="button"
                                            >
                                                Delete
                                            </div>
                                        </CardActions>

                                    }

                                </Card>
                            </Grid>
                        )))
                    }

                </Grid>

            </div>


        </div>
    )
}
