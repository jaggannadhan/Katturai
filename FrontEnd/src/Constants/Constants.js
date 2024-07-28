
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

import Home from '../Components/Home/Home';
import Diary from '../Components/Diary/Diary';
import Travel from '../Components/Travel/Travel';
import Portfolio from '../Components/Portfolio/Portfolio';

import ProfileEditor from '../Components/ProfileEditor/ProfileEditor';

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
    profileEditor: {name: "Profile", route: "profile", component: () => ProfileEditor },
    getRouteBasedComponent: function(route) {
        // console.log(">>>>>slug: ", route);
        if(this.default.route == route) return this.default;
        if(this.profileEditor.route == route) return this.profileEditor;
        let component = this.navItems.filter(item => item.route == route)[0];
        return component;
    }
};

export const DOMAIN = {
    github: "https://gihub.com/",
    youtube: "https://www.youtube.com/",
    instagram: "https://www.instagram.com/",
    linkedin: "https://www.linkedin.com/",
    self: "https://hopeful-flame-420906.uc.r.appspot.com/"
}
    