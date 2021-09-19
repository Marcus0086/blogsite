import styled from "styled-components"
import {
    SearchRounded, NotificationsRounded,
    WbIncandescentRounded
} from '@mui/icons-material';
import { useTheme } from 'next-themes';
import { useSession } from 'next-auth/client';
import { IconButton, Badge } from "@mui/material";
import Image from 'next/image';
const TopNav = () => {
    const { theme, setTheme } = useTheme();
    const [session] = useSession();
    return (
        <NavSection className='px-8 flex items-center justify-between 
        dark:text-primary text-secondary-600 text-center'>
            {/* searchbar */}
            <div className='mx-10 p-4 flex items-center 
            justify-center rounded-3xl flex-grow max-w-sm
           bg-gray-100 dark:bg-grayish-800 focus-within:shadow-xl
           hover:text-red-400'>
                <SearchRounded />
                <input type='text' name="search"
                    placeholder="Search..."
                    className="outline-none flex-grow 
                    bg-transparent px-5 text-base"
                />
            </div>
            {/* nav icons */}
            <div className='flex items-center justify-center'>
                <div className='mx-3 p-2 bg-gray-100 dark:bg-grayish-800 rounded-xl'>
                    <NavButton onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label='theme'>
                        <WbIncandescentRounded />
                    </NavButton>
                </div>
                <div className='mx-3 p-2 bg-gray-100 dark:bg-grayish-800 rounded-xl'>
                    <NavButton aria-label='notifications'>
                        <Badge color='primary' badgeContent={2}>
                            <NotificationsRounded />
                        </Badge>
                    </NavButton>
                </div>
                <div className='mx-3 bg-gray-100 dark:bg-grayish-800 rounded-xl'>
                    <NavButton>
                        <Image width='40px' height='40px'
                            src={session?.user?.image ?? '/user.svg'} alt='profile' className='rounded-full' />
                    </NavButton>
                </div>
            </div>
        </NavSection>
    )
}

export default TopNav

const NavSection = styled.nav`
    grid-area: topnav;
`;

const NavButton = styled(IconButton)`
    color: inherit;
`;