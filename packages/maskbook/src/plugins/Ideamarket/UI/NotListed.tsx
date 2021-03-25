import { makeStyles, Typography, Button, Link, Divider, Box } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'block',
        width: '150px',
        borderRadius: '10px',
        boxShadow: '0px 0px 3px 1px #ADADAD',
        marginRight: '10%',
        overflow: 'hidden',
    },
    topBox: {
        backgroundColor: theme.palette.mode === 'light' ? 'white' : null,
        overflow: 'hidden',
    },
    listButton: {
        backgroundColor: '#2946ba',
        borderRadius: '10px',
        margin: theme.spacing(1),
        width: '53%',
    },
    topText: {
        margin: theme.spacing(1),
        color: theme.palette.text.primary,
    },
    buttonText: {
        textTransform: 'none',
        color: 'white',
    },
    bottomText: {
        fontSize: [12, '!important'],
        color: 'black',
    },
}))

export default function NotListed() {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Box className={classes.topBox} display="flex" justifyContent="center">
                <Typography className={classes.topText}>
                    <b>Unlisted</b>
                </Typography>
            </Box>
            <Divider />
            <Box display="flex" bgcolor="#f7f7f7" justifyContent="center">
                <Link href="https://ideamarket.io/" target="_blank" rel="noopener" style={{ textDecoration: 'none' }}>
                    <Button onClick="window.open('https://ideamarket.io/')" className={classes.listButton}>
                        <Typography className={classes.buttonText}>List</Typography>
                    </Button>
                </Link>
            </Box>

            <Box display="flex" bgcolor="#f7f7f7" justifyContent="center">
                <Typography className={classes.bottomText}>
                    powered by <b>Ideamarket</b>
                </Typography>
            </Box>
        </div>
    )
}