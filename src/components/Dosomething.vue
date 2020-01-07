<template>
  <div>
    <h1>{{ msg }}</h1>
    <div class="box">
      <div class="box_todo_left">
        <div style="display: flex; flex-direction: row">
          <h1>代办事项
          </h1>
          <Button type="text" icon="md-add" @click="addTodoMd=true">添加</Button>
        </div>
        <Card style="margin-top:20px" width=100px>
          <img src="../assets/tdo.jpg"></img>
          <Table :columns="todoColumns" :data="todoData" height=300px></Table>

        </Card>
        <Modal v-model="addTodoMd" @on-ok="addTodoFc" title="添加代办事项" @on-cancel="$Message.info('取消添加')">
          <div style="margin-top:20px">
            <Input v-model="addTodo.title" placeholder="输入标题"></Input>
            <Input v-model="addTodo.content" style="margin-top:10px" placeholder="输入具体内容"></Input>
          </div>
        </Modal>
      </div>
      <div class="box_todo_right">
        <Menu mode="horizontal" theme="light" @on-select="selectMenu" active-name="menuBic">
          <MenuItem name="book">
          <Icon type="ios-book-outline" /> 看书
          </MenuItem>
          <MenuItem name="sport">
          <Icon type="md-bicycle" /> 运动
          </MenuItem>
          <MenuItem name="plan">
          <Icon type="ios-clipboard-outline" /> 计划
          </MenuItem>
          <MenuItem name="tools">
          <Icon type="ios-briefcase-outline" /> 小工具
          </MenuItem>
        </Menu>
        <router-view/>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'Dosomething',
    data() {
      return {
        msg: 'Welcome to Your todo',
        todoColumns: [
          {
            title: '主题',
            key: 'title'
          },
          {
            title: '内容',
            key: 'content'
          },
          {
            title: '操作',
            key: 'todoOperation',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      var index = params.index;
                      this.doneTodo(index)
                     
                    }
                  }
                }, 'done')

              ]);
            }
          }
        ],
        todoData: [
          {
            title: 'call to leli',
            content: '晚上十点给尊敬的李乐大人打个电话问候最近的生活'
           
          },
          {
            title: '写博客',
            content: '关于k8s的A博客整理'
          }
        ],
        addTodoMd: false,//添加代办modal
        addTodo: {
          title: '',
          content: '',
          userId: 0,
        }
      }
    },
    mounted() {
      this.getTodos(localStorage['userId'])
      this.$Notice.warning({
        title: '今天待做',
        desc: '!!打电话给'
      })

    },
    methods: {
      selectMenu(name) {
        this.$Message.info('选择' + name);
        this.$router.push('/doSomething/' + name)
      },
      // 添加代办
      addTodoFc() {
        if (this.addTodo.todoTitle === "" || this.addTodo.todoTxt === "") {
          this.$Message.error("内容不能为空")
          return
        }

        this.addTodo.userId = window.localStorage['userId'];
        // put  api
        this.$put('/todos', this.addTodo).then(res => {
          if (res.code == 200) {
            // var addT = {'a':''};
            this.todoData.push(this.addTodo);
            console.log('--'+JSON.stringify(this.addTodo)+'---'+JSON.stringify(this.todoData))
            console.log('add todo :' + JSON.stringify(res))
            this.$Message.info('添加成功')
             this.addTodo = {};  // 清空addTodo 
          }else{
            this.$Message.error(res.msg)
          }

        }, err => {
          this.$Message.error('添加失败')
        });
       
      },
      // 完成代办
      doneTodo(index) {
        
        var todoId = this.todoData[index].id;
        this.$get('/todos/'+todoId ).then(res=>{
          console.log('done todo:'+JSON.stringify(res))
          this.$Message.info("已完成： " + this.todoData[index].title);
          this.todoData.splice(index, 1); // 数组删除 
        },err=>{});
      
      },
      // 获取代办事项列表
      getTodos(userId){
        this.$get('/todos/'+userId+'/0').then(res=>{
          this.todoData = res.result.list;
          console.log('getTodos'+JSON.stringify(res))
        },errr=>{});
      } 
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .box {
    /*display: flex;
    flex-direction: row;
    justify-content: space-around;*/
  }
  
  .box_todo_right {
    margin-top: 10px;
    position: fixed;
    left: 500px;
    top: 50px;
  }
  
  .box_todo_left {
    /*display: flex;
    flex-direction: column;
    justify-content: center;*/
    /*width: 30%;
    */
    position: fixed;
    left: 20px;
    top: 50px;
    width: 379px;
    margin-top: 20px;
    margin-left: 20px;
  }
  
  h1,
  h2 {
    font-weight: normal;
    text-align: center;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    display: inline-block;
    margin: 0 10px;
  }
  
  a {
    color: #42b983;
  }
</style>