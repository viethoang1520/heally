import { AddFriend, Vocado, Chat, FriendsView, Profile, SignUp, Login, Notification } from "../Pages";
import AddInformation from "../Pages/AddInformation/AddInformation";
import GetStarted from "../Pages/GetStarted/GetStarted";
import PrivateRouteComponent from "./PrivateRouteComponent";

const publicRoutes = [
     { path: '/', component: GetStarted, layout: null },
     { path: '/signup', component: SignUp, layout: null },
     { path: '/login', component: Login, layout: null }
]

const privateRoutes = [
     { path: '/chat', component: Chat },
     { path: '/vocado', component: Vocado },
     { path: '/friend', component: FriendsView },
     { path: '/profile', component: Profile },
     { path: '/addfriend', component: AddFriend },
     { path: '/notification', component: Notification },
     { path: '/addinformation', component: AddInformation, layout: null }
]

export { publicRoutes, privateRoutes, PrivateRouteComponent }
