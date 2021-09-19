import styled from 'styled-components';
import TopNav from './topNav';
import SideNav from './sideNav';
import MainContent from './mainContent';
const Body = () => {
    return (
        <Container className='min-h-screen'>
            <TopNav />
            <SideNav />
            <MainContent />
        </Container>
    )
}

export default Body;

const Container = styled.main`
    display: grid;
    grid-template-rows: .1fr .9fr;
    grid-template-columns: .07fr .93fr;
    grid-template-areas:
        "sidenav topnav"
        "sidenav main"
    ;
`
