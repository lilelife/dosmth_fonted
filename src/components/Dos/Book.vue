<template>
  <div>
    <Row style="margin-top:20px">
      <Col span="12" class="book_col">
      <h1>在看书籍：</h1>
      <div>
        当前进度
        <i-circle :percent="percent" :stroke-color="color">
          <Icon v-if="percent == 100" type="ios-checkmark" size="60" style="color:#5cb85c"></Icon>
          <span v-else style="font-size:24px">{{ percent }}%</span>
        </i-circle>
        <ButtonGroup size="small">
          <Button icon="ios-add"   @click="addPre"></Button>
          <Button icon="ios-remove" @click="minusPre"></Button>
        </ButtonGroup>
      </div>
      <div class="book_box">
        <img src="../../assets/yxl.jpg" style="width:81px;height:100px"></img>
        <div class="book2_box">
          <p class="p1">《{{book.name}}》</p>
          <p class="p2"> 简介：{{book.des}}</p>
        </div>
      </div>
      </Col>
      <Col span="10" offset="2" class="book_col">
      <h1>书单：</h1>
      <List>
        <ListItem>
            <ListItemMeta :avatar="bookUrl" title="《穷爸爸》" 
            description="雨中黄叶树，等下白头人" />
        </ListItem>
        <ListItem>
            <ListItemMeta :avatar="bookUrl" 
            title="《富爸爸》" description="江南无所有，聊赠一枝春" />
        </ListItem>
        <ListItem>
            <ListItemMeta :avatar="bookUrl" 
            title="《高爸爸》" description="且将新火试新茶，诗酒趁年华" />
        </ListItem>
        <ListItem>
            <ListItemMeta :avatar="bookUrl" 
            title="《帅爸爸》" description="浮云一别后，流水十年间，欢笑情如旧，萧疏鬓已斑" />
        </ListItem>
      </List>
      <Button  @click="$Message.info('请耐心等待开发~')" type="text"> 新增书籍</Button> 
      <Button @click="$Message.info('请耐心等待开发~')" type="text"> 历史阅读</Button> 
      </Col>
    </Row>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        percent: 10,
        book: {
          name: '影响力',
          des: '作者是 [美] 罗伯特·西奥迪尼。 该书从实践技巧的角度，深度剖析影响力的逻辑、交换、说明、树立榜样、回避、威胁等各要素，全方位地提高你影响他人的能力，从而获得更大的成功。'
        },
        bookUrl: 'http://chuantu.xyz/t6/707/1576835378x2073530529.jpg'
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
    methods: {
      addPre() {
        console.log('addPre')
        if (this.percent >= 100) {
          return false;
        }
        this.percent += 10;
      },
      minusPre() {
        if (this.percent <= 0) {
          return false;
        }
        this.percent -= 10;
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