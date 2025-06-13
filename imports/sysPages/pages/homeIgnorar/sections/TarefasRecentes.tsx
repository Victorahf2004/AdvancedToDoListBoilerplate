import React from "react";
import { useTracker, useSubscribe } from "meteor/react-meteor-data";
import { exampleApi } from "../../../../modules/example/api/exampleApi";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

export const TarefasRecentes = () => {

    const { loading, tasks } = useTracker(() => {
            const subHandle = exampleApi.subscribe('exampleList', {}, {sort: {createdat: -1}});
    
            const tasks = subHandle?.ready() ? exampleApi.find({}).fetch() : [];
            return {
                tasks,
                loading: !!subHandle && !subHandle.ready(),
                total: subHandle ? subHandle.total : tasks.length
            };
    });
    
    let contador: number = 0;
    return (
        <>
        <List>
            {tasks.map((task) => (
                <React.Fragment key={contador++}>
                    {task.title}
                    {task.type}
                    {task?.owner}
                </React.Fragment>
            ))}
        </List>
        </>
    )

}