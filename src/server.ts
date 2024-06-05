import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import validateEnv from '@utils/validateEnv';
import ScheduleRoute from './routes/schedule.route';
import CalendarRoute from './routes/calendar.route';
import TeamRoute from './routes/team.route';
import RoleRoute from './routes/role.route';
import NotificationRoute from './routes/notification.route';
import RequestInforRoute from './routes/requestInfor.route';


validateEnv();

const app = new App(
    [
        new IndexRoute(),
        new UsersRoute(),
        new AuthRoute(),
        new ScheduleRoute(),
        new CalendarRoute(),
        new TeamRoute(),
        new RoleRoute(),
        new NotificationRoute(),
        new RequestInforRoute(),
    ]
);

app.listen();
