import { Box, Button, styled } from '@mui/material'

const ViewButton = styled(Button)(({ theme }) => ({
    marginTop: 30,
    background: '#2874f0',
    color: 'white',
    fontSize: 13,
    fontFamily: 'Roboto, Arial, sans - serif',
    padding: '10px 20px',
    textAlign: 'center',
    fontWeight: 500,
    borderRadius: 2,
    [theme.breakpoints.down('xl')]: {
        marginTop: 0,
        padding: '5px 5px',
        fontSize: 11,
    },
}))

const ViewAll = () => {
    return (
        <Box>
            <ViewButton>View All</ViewButton>
        </Box>
    )
}

export default ViewAll
