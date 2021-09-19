import styled from "styled-components"
import { IconButton, Tooltip } from '@mui/material';
import {
    HomeRounded, PeopleRounded, StarRounded,
    InfoRounded, MovieCreationRounded, InsertDriveFileRounded
} from '@mui/icons-material';
const SideNav = () => {
    return (
        <NavSection className="flex items-center justify-center border-r-2">
            <ul className="p-1 w-full text-center dark:text-primary text-secondary-600">
                <li>
                    <Tooltip arrow title='Home'
                        disableInteractive enterDelay={200} placement={'left'}>
                        <NavButton aria-label="home">
                            <HomeRounded />
                        </NavButton>
                    </Tooltip>
                </li>
                <li>
                    <Tooltip arrow title='Reading List'
                        disableInteractive enterDelay={200} placement={'left'}>
                        <NavButton aria-label="Readings">
                            <InsertDriveFileRounded />
                        </NavButton>
                    </Tooltip>
                </li>
                <li>
                    <Tooltip arrow title='Favourites'
                        disableInteractive enterDelay={200} placement={'left'}>
                        <NavButton aria-label="Favourites">
                            <StarRounded />
                        </NavButton>
                    </Tooltip>
                </li>
                <li>
                    <Tooltip arrow title='Shorts'
                        disableInteractive enterDelay={200} placement={'left'}>
                        <NavButton aria-label="Shorts">
                            <MovieCreationRounded />
                        </NavButton>
                    </Tooltip>
                </li>
                <li>
                    <Tooltip arrow title='Friends'
                        disableInteractive enterDelay={200} placement={'left'}>
                        <NavButton aria-label="Friends">
                            <PeopleRounded />
                        </NavButton>
                    </Tooltip>
                </li>
                <li>
                    <Tooltip arrow title='About'
                        disableInteractive enterDelay={200} placement={'left'}>
                        <NavButton aria-label="About">
                            <InfoRounded />
                        </NavButton>
                    </Tooltip>
                </li>
            </ul>
        </NavSection>
    )
}

export default SideNav

const NavSection = styled.nav`
    grid-area: sidenav;
    border-color: gray;
    li {
        margin: 2rem 0 2rem 0;
        :hover {
            border-left: 3px solid tomato;
        }
    }
`;

const NavButton = styled(IconButton)`
    color: inherit;
    padding: 1rem;
    :hover {
        color: tomato;
    }
`;
