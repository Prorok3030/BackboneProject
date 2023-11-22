var app = {};
    
// Model
    app.Todo = Backbone.Model.extend({
      defaults: {
        title: '',
        completed: false
      },
      toggle: function(){
        this.save({ completed: !this.get('completed')});
      }
    });

//Collection
    app.TodoList = Backbone.Collection.extend({
      model: app.Todo,
      localStorage: new Store("backbone-todo")
    });

    app.todoList = new app.TodoList();

//Views
     app.AppView = Backbone.View.extend({
      el: $('#total'), 
      template: _.template("<span>Всего задач: <%= total %></span>"),
      initialize: function(){
         this.render();
      },
      render: function(){
         app.todoList.fetch();
         var todos = app.todoList.models;
         var done = app.todoList.where({completed: true})
         console.log(done.length)
         this.$el.html(this.template({total: todos.length}));
       },
   });

      app.DoneView = Backbone.View.extend({
        el:$('#done'),
        template1: _.template("<span>Выполнено задач: <%= done %></span>"),
        initialize: function(){
          this.render();
       },
       render: function(){
        app.todoList.fetch();
        var done = app.todoList.where({completed: true})
        this.$el.html(this.template1({done: done.length}));
      },
      });
   
    
  app.appView = new app.AppView(); 
  app.doneView = new app.DoneView(); 