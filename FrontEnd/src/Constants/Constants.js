
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

import Home from '../Components/Home/Home';
import Diary from '../Components/Diary/Diary';
import Travel from '../Components/Travel/Travel';
import Portfolio from '../Components/Portfolio/Portfolio';

import ProfileEditor from '../Components/ProfileEditor/ProfileEditor';

import protein from "../../public/images/protein.png";
import coffee from "../../public/images/coffee.png";
import dress from "../../public/images/dress.png";

import SimpleWorkTemplate from "../Components/Portfolio/SimpleWorkTemplate";
import TiledWorkTemplate from "../Components/Portfolio/TiledWorkTemplate";

export const socials = [
    { name: 'github', icon: GitHubIcon, link: "https://github.com/jaggannadhan" },
    { name: 'youtube', icon: YouTubeIcon, link: "https://www.youtube.com/@jegsirox3674"  },
    { name: 'instagram', icon: InstagramIcon, link: "https://www.instagram.com/jagg4n/"  },
    { name: 'linkedin', icon: LinkedInIcon, link: "https://www.linkedin.com/in/jvenu94/"  },
]

export const navigation = {
    default: { name: "Home", route: "", component: () => Home },
    navItems: [
        {name: "Diary", route: "diary", component: () => Diary, isLocked: true},
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
    
export const buyMeItems = [
    {name: "Coffee", icon: coffee},
    {name: "Protein",icon: protein},
    {name: "Dress", icon: dress}
];

export const WORKTHEMES = [
    { 
        name: "Simple",
        theme: SimpleWorkTemplate

    }, 
    { 
        name: "Tiled",
        theme: TiledWorkTemplate
    }
];