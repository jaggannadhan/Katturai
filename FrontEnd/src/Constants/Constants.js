
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

import Home from '../Components/Home/Home';
import Diary from '../Components/Diary/Diary';
import Travel from '../Components/Travel/Travel';
import Portfolio from '../Components/Portfolio/Portfolio';

export const socials = [
    { name: 'GitHub', icon: GitHubIcon, link: "https://github.com/jaggannadhan" },
    { name: 'YouTube', icon: YouTubeIcon, link: "https://www.youtube.com/@jegsirox3674"  },
    { name: 'IG', icon: InstagramIcon, link: "https://www.instagram.com/jagg4n/"  },
    { name: 'Linkedin', icon: LinkedInIcon, link: "https://www.linkedin.com/in/jvenu94/"  },
]

export const navigation = {
    default: { name: "Home", component: () => Home },
    navItems: [
        {name: "Diary", component: () => Diary},
        {name: "Travel", component: () => Travel},
        {name: "Portfolio", component: () => Portfolio},
        {name: "Opinion", component: () => Home},
        {name: "Recreation", component: () => Home},
    ]
};
    