
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
    default: { name: "Home", route: "", component: () => Home },
    navItems: [
        {name: "Diary", route: "diary", component: () => Diary},
        {name: "Travel", route: "travel", component: () => Travel},
        {name: "Portfolio", route: "portfolio", component: () => Portfolio},
        {name: "Opinion", route: "opinion", component: () => Home},
        {name: "Recreation", route: "recreation", component: () => Home},
    ],
    getRouteBasedComponent: function(route) {
        console.log(">>>>>slug: ", route);
        if(this.default.route == route) return this.default;
        let component = this.navItems.filter(item => item.route == route)[0];
        return component;
    }
};
    