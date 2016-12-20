
//random tasks

const TASKS = [
    {
        title: "Do homework",
        completed: false,
        id: 1,
    },
    {
        title: "Find a new girl",
        completed: false,
        id: 2,
    },
    {
        title: "Buy a new socks",
        completed: false,
        id: 3,
    },
    {
        title: "Get a new job",
        completed: true,
        id: 4,
    },
    {
        title: "Buy a gift for Mum",
        completed: true,
        id: 5,
    },
    
]

let nextId = 6;

//adding new task to list

const AddTask = React.createClass({
    propTypes: {
        onAdd: React.PropTypes.func.isRequired,
    },
    
    getInitialState: function(){
        return{
            title: "",
            };
    },
    
    onNameChange: function(e){
      this.setState({title: e.target.value});
    },
    onSubmit: function(e){
        e.preventDefault();
    
        this.props.onAdd(this.state.title);
        this.setState({title: ""});
    },
    render: function(){
        return(
            <form onSubmit={this.onSubmit}>
                <label htmlFor="new-task">Add Item</label>
                <input id="new-task" type="text"  value={this.state.title} onChange={this.onNameChange} />
                <button type="submit" className="add">Add</button>
            </form>
        );
    }
});


//iteration of incomplete tasks

function IncompleteTask(props){
    return (
          <li><input type="checkbox" onClick={props.onChange} /><label>{props.title}</label><input type="text" /><button className="delete" onClick={props.onRemove}>Delete</button></li>
    );
}

IncompleteTask.propTypes = {
    title: React.PropTypes.string.isRequired,
}

////iteration of complete tasks

function CompleteTask(props){
    return (
          <li><input type="checkbox" defaultChecked onClick={props.onChange}/><label>{props.title}</label><input type="text" /><button className="delete" onClick={props.onRemove}>Delete</button></li>
    );
}

CompleteTask.propTypes = {
    title: React.PropTypes.string.isRequired,
}


//main logic application

const Application = React.createClass({
    propTypes: {
    initialTasks: React.PropTypes.arrayOf(React.PropTypes.shape({
        title: React.PropTypes.string.isRequired,
        completed: React.PropTypes.bool.isRequired,
        id: React.PropTypes.number.isRequired,
    })).isRequired,
    },
    
    getInitialState: function() {
        return{
            tasks: this.props.initialTasks,
        }
    },
    
    onTaskAdd: function(title){
        this.state.tasks.push({
            title: title,
            completed: false,
            id: nextId,
        })
        this.setState(this.state);
        nextId += 1;
    },
    
    onChangeStatus: function(index){
        if(this.state.tasks[index].completed==false){
            this.state.tasks[index].completed=true;
            this.setState(this.state);
        } else {
            this.state.tasks[index].completed=false;
            this.setState(this.state);
        }
        
        
    },
    
    onRemoveTask: function(index){
      this.state.tasks.splice(index, 1);
      this.setState(this.state);
    },
    
    render: function(){
        return(
            <div>
            <AddTask onAdd={this.onTaskAdd}/>
                <div>
                    <h3>Todo</h3>
                    <ul id="incomplete-tasks">
                        {this.props.initialTasks.map(function(task, index){
                            if(task.completed == false){
                                return <IncompleteTask onRemove={function(){this.onRemoveTask(index)}.bind(this)} onChange={function(){this.onChangeStatus(index)}.bind(this)} title={task.title} key={task.id}/>
                            }    
                        }.bind(this) )}
        
                    </ul>
                </div>
                <div>
                    <h3>Completed</h3>
                    <ul id="completed-tasks">
                        {this.props.initialTasks.map(function(task, index){
                            if(task.completed == true){
                                return <CompleteTask onRemove={function(){this.onRemoveTask(index)}.bind(this)} onChange={function(){this.onChangeStatus(index)}.bind(this)} title={task.title} key={task.id}/>
                            }     
                        }.bind(this))}
                    </ul>
                </div>
            </div>
        );
    }
})



ReactDOM.render(<Application initialTasks={TASKS} />, document.getElementById('container'));