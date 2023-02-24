import Box from '@mui/material/Box';

export default function MainContentSection ({ children }: any) {
    return (
        <>
            <Box className='main'>
                {children}
            </Box>
        </>
    );
}
