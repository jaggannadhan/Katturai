import React, { Fragment } from 'react';
import { styled } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import { 
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    CardActions,
    Collapse,
    Avatar,
    IconButton,
    Typography,
    Stack
} from '@mui/material';

import ReadMoreIcon from '@mui/icons-material/ReadMore';
import editPencil from "../../../public/images/diary/editPencil.png";

import "../../Styles/Diary/DiaryCard.scss";

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function DiaryCard(props) {
    const { cardImg, flipIndex } = props;
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Fragment> 
            <img src={editPencil} className="edit-pencil"/>
        
            <Card className='diary-card'>
                <CardHeader
                    className={`card-header`}
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            R
                        </Avatar>
                    }
                    // action={
                    //     <IconButton aria-label="settings">
                    //         <MoreVertIcon />
                    //     </IconButton>
                    // }
                    title="Shrimp and Chorizo Paella"
                    subheader="September 14, 2016"
                />
                <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" 
                    className={`card-stack ${flipIndex%2 == 0 ? "flip180" : ""}`}
                >
                    <CardMedia
                        component="img"
                        image={cardImg}
                        alt="Paella dish"
                        className='card-img'
                    />
                
                    <CardContent
                        className={`${flipIndex%2 == 0 ? "flip180" : ""}`}
                    >
                        <Typography variant="body2" color="text.secondary">
                            This impressive paella is a perfect party dish and a fun meal to cook
                            together with your guests. Add 1 cup of frozen peas along with the mussels,
                            if you like.
                        </Typography>

                        <CardActions disableSpacing>
                            <IconButton aria-label="Read More">
                                <ReadMoreIcon />
                            </IconButton>
                        </CardActions>

                    </CardContent>
                </Stack>

                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>Method:</Typography>
                        <Typography paragraph>
                            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
                            aside for 10 minutes.
                        </Typography>
                        <Typography paragraph>
                            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
                            medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
                            occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
                            large plate and set aside, leaving chicken and chorizo in the pan. Add
                            pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
                            stirring often until thickened and fragrant, about 10 minutes. Add
                            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                        </Typography>
                        <Typography paragraph>
                            Add rice and stir very gently to distribute. Top with artichokes and
                            peppers, and cook without stirring, until most of the liquid is absorbed,
                            15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
                            mussels, tucking them down into the rice, and cook again without
                            stirring, until mussels have opened and rice is just tender, 5 to 7
                            minutes more. (Discard any mussels that don&apos;t open.)
                        </Typography>
                        <Typography>
                            Set aside off of the heat to let rest for 10 minutes, and then serve.
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
        </Fragment>
    );
}
