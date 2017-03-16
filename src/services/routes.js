import Todos from '../components/Todos'
import Tokens from '../components/Tokens'
import Profile from '../components/Profile'
import NotFound from '../components/NotFound'
import DeviceInfo from '../components/DeviceInfo'
import Login from '../components/Login'
import Cordova from '../components/Cordova'
import Exit from '../components/Exit'

const routes = [
  { path: '/',
    component: Todos,
    meta: { auth: true }
  },
  { path: '/todos',
    component: Todos,
    meta: { auth: true }
  },
  { path: '/tokens',
    component: Tokens,
    meta: { auth: false }
  },
  { path: '/profile',
    component: Profile,
    meta: { auth: true }
  },
  { path: '/device',
    component: DeviceInfo,
    meta: { auth: true }
  },
  { path: '/login',
    component: Login,
    meta: { auth: false }
  },
  { path: '/cordova',
    component: Cordova,
    meta: { auth: false }
  },
  { path: '/exit',
    component: Exit,
    meta: { auth: false }
  },
  { path: '*',
    component: NotFound,
    meta: { auth: false }
  }
]

export default routes
