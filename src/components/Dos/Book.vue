<template>
  <div>
    <Row style="margin-top:20px">
      <Col span="12" class="book_col">
      <h1>在看书籍：</h1>
      <div>
        当前进度
        <i-circle :percent="book.percent" :stroke-color="color">
          <Icon v-if="book.percent == 100" type="ios-checkmark" size="60" style="color:#5cb85c"></Icon>
          <span v-else style="font-size:24px">{{ book.percent }}%</span>
        </i-circle>
        <ButtonGroup size="small">
          <Button icon="ios-add" @click="addPre"></Button>
          <Button icon="ios-remove" @click="minusPre"></Button>
        </ButtonGroup>
      </div>
      <div class="book_box">
        <img src="../../assets/book2.jpg" style="width:120px;height:100px;border-radius:5px 5px"></img>
        <div class="book2_box">
          <p class="p1">《{{book.name}}》</p>
          <p class="p2"> 简介：{{book.introduction}}</p>
        </div>
      </div>
      </Col>
      <Col span="10" offset="2" class="book_col">
      <h1>书单：</h1>
      <Scroll height=340>
        <List  item-layout="vertical">
          <ListItem v-for="item in books" :key="item.name">
            <ListItemMeta :avatar="bookListPtUrl" :title="item.name" /> 作者 {{item.author}} &#8194;&#8194; 简介： {{item.introduction}}
            <template slot="action">
              <li>
                <a @click='readBook(item)'>Read</a>
              </li>
              <li>
                <a @click="$Message.info('Waiting for coding~')">More</a>
              </li>
            </template>
          </ListItem>
          <!--<ListItem>
            <ListItemMeta :avatar="bookListPtUrl" 
            title="《富爸爸》" description="江南无所有，聊赠一枝春" />
        </ListItem>
        <ListItem>
            <ListItemMeta :avatar="bookListPtUrl" 
            title="《高爸爸》" description="且将新火试新茶，诗酒趁年华" />
        </ListItem>
        <ListItem>
            <ListItemMeta :avatar="bookListPtUrl" 
            title="《帅爸爸》" description="浮云一别后，流水十年间，欢笑情如旧，萧疏鬓已斑" />
        </ListItem>-->
        </List>
      </Scroll>
      <Affix :offset-bottom="20">
        <Button @click="$Message.info('Waiting for coding~')" type="text"> 新增书籍</Button>
        <Button @click="$Message.info('Waiting for coding~')" type="text"> 历史阅读</Button>
      </Affix>
      </Col>
    </Row>

  </div>
</template>

<script>
  import { updateBook } from '@/request/api';
  var userId = localStorage['userId'];
  export default {
    data() {
      return {
        userId: localStorage['userId'],
        book: {   //在读数 
          name: '影响力',
          percent: 10,
          author: '李乐',
          status: 0,
          introduction: '作者是 [美] 罗伯特·西奥迪尼。 该书从实践技巧的角度，深度剖析影响力的逻辑、交换、说明、树立榜样、回避、威胁等各要素，全方位地提高你影响他人的能力，从而获得更大的成功。'
        },
        bookListPtUrl: 'http://47.105.48.220/img/bookL.jpg', //书单书本图片
        // bookListPtUrl: '../../assets/bookL.jpg'
        books: [  // 书单列表
          {
            name: '刻意练习',
            percent: 10,
            author: '李乐',
            introduction: '拒绝盲目练习',
            status: 0
          }
        ]
      }
    },
    computed: {
      color() {
        let color = '#2db7f5';
        if (this.percent == 100) {
          color = '#5cb85c';
        }
        return color;
      }
      
    },
    created() {
     
    },
    mounted(){
       this.booksList();
      this.bookReading()
    },
    methods: {
      addPre() {  // 再看书籍 进度更新
        console.log('addPre')
        if (this.book.percent >= 100) {
          return false;
        }
        this.book.percent += 5;
        // todo 更新数据库
        var update = {
          id: this.book.id,
          percent: this.book.percent
        }
        updateBook(update);
      },
      minusPre() {
        if (this.book.percent <= 0) {
          return false;
        }
        this.book.percent -= 5;
        var update = {
          id: this.book.id,
          percent: this.book.percent
        }
        updateBook(update);
      },
      // 获取再看书籍
      booksList() {

        this.$get('/books/' + userId + '/0').then(res => {
          // console.log('books:' + JSON.stringify(res));
          this.books = res.result.list;
        }, err => { });
      },
      // 获取书单
      bookReading() {
        this.$get('books/' + userId + '/1').then(res => {
          // console.log('bookReading:' + JSON.stringify(res));
          if (this.book = res.result.list.length != 0) {
            this.book = res.result.list[0];
          }
        }, err => { })
      },
      // 阅读该书
      readBook(book) {
        //更新正在读的为待阅读
        var updateA = {
          id: this.book.id,
          status: 'PREPARE'
        }
        updateBook(updateA).then(res => {
          console.log('updateAbook: 不阅读')
          // 更新右边等待阅读的为正在阅读
          var updateB = {
            id: book.id,
            status: 'READ'  // status (string) = ['PREPARE', 'READ', 'DONE', 'DELETE']
          };

          updateBook(updateB).then(res => {
            console.log('updateBBook:' + JSON.stringify(updateB));

            this.booksList();
            this.book = book;
          }, err => { });

        }, err => { });


      }
    }

  }

</script>

<style>
  .book_box {
    display: flex;
    margin-top: 20px;
    flex-direction: row;
    justify-content: center;
    text-align: center
  }
  
  .book2_box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    width: 300px;
  }
  
  .book_col {
    display: flex;
    flex-direction: row;
    justify-content: center;
    text-align: center
  }
  
  p.p1 {
    font-family: "Times New Roman", Georgia, Serif;
    font-size: 26px;
    color: #464c5b
  }
  
  p.p1 {
    font-family: "微软雅黑", Serif;
    font-size: 16px;
    color: #464c5b
  }
</style>