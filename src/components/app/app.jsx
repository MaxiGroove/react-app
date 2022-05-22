import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AppRoute } from "../../const";
import Login from "../../pages/login/login";
import TaskEdit from "../../pages/task-edit/task-edit";
import TaskList from "../../pages/task-list/task-list";
import Task from "../../pages/task/task";
import UserList from "../../pages/user-list/user-list";
import User from "../../pages/user/user";

import './normalize.scss'

const App = () => {

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact>
                    <Login />
                </Route>

                <Route path={AppRoute.TASKLIST} exact>
                    <TaskList />
                </Route>

                <Route path={AppRoute.TASK}>
                    <Task />
                </Route>

                <Route path={AppRoute.TASKEDIT}>
                    <TaskEdit />
                </Route>

                <Route path={AppRoute.USERLIST}>
                    <UserList />
                </Route>

                <Route path={AppRoute.USER}>
                    <User />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default App;