<template>
  <div>
    <h1 style=" text-align: center">小工具</h1>
    <Divider>计算器：</Divider>
    <div style="display: flex;
    flex-direction: row;">
      <InputNumber  v-model="num1" placeholder="数字" clearable style="width: 200px"></InputNumber >
      <Select v-model="operator" style="width:50px">
      <Option v-for="item in coms"  :value="item.value" :key="item.value">{{ item.label }}</Option>
       </Select>
      <InputNumber  placeholder="数字" v-model="num2" clearable style="width: 200px">
      </InputNumber >
      <Button @click="computer">计算</Button>
      
    </div>
    <Divider> 文本复制粘贴去格式</Divider>
    <TextArea style="width:260px ;height:100px" placeholder="ctrl +v需要复制的内容"></TextArea>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        operator: '+',
        coms: [
          {
            value: '+',
            label: '+'
          },
          {
            value: '-',
            label: '-'
          }
          ,
          {
            value: '*',
            label: '*'
          },
          {
            value: '/',
            label: '/'
          }
        ],
        num1: '',
        num2: ''

      }
    },
    methods: {
      computer() {  // 计算器
        var result = 0;
        var num1 = parseFloat(this.num1);
        var num2 = parseFloat(this.num2);
        if (this.operator === '+') {  // 根据操作类型进行计算
          result = num1 + num2;
        } else if (this.operator === '-') {
          result = num1 - num2;
        } else if (this.operator === '*'){
          result = num1*num2;
        }else{
          result = num1/num2;
        }
        alert('计算结果是：' + result)
        
      }

    }
  }

</script>

<style>

</style>