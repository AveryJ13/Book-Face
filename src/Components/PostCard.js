import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 240,
    },
});

export default function PostCard(props) {
    const classes = useStyles();

    return (
        <Card className={classes.root} style={{ background: '#666666' }}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={props.el.post_img}
                    title={props.el.post_title}
                />
                <CardContent >
                    <Typography gutterBottom variant="h5" component="h2" style={{ color: 'white' }}>
                        {props.el.post_title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" style={{ color: 'white' }}>
                        {props.el.post_text}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
            </CardActions>
        </Card>
    );
}