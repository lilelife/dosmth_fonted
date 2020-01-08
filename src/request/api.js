// 包装请求api . 使用： import { register } from '@/request/api';// 导入api接口
import {post,get,put,patch} from './http'

// users接口
export const register = params => put('/users',params) 
export const login = params =>post('/users',params)

//book接口
export const updateBook = params => post('/books',params)