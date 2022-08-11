# nestjs-fastify-demo

### 安装依赖
```
yarn install
```

### 运行项目 dev
```
yarn start:dev
```

### 编译部署
```
yarn build
yarn start:prod
```

### 伪代码生成（controller service dto）
```
yarn auto -class xxxx
```
由根目录下 auto-class.js 生成

### 注意
1. app.module.ts 里面的service,controller等由loader.ts自动加载，如要修改目录结构也要修改app.module.ts里面的相关路径
2. 项目启动没有console信息时，请在mian.ts开启logger

   ```
    { rawBody: true, logger: false }  // logger 默认true 删除即可 
   ```
3. socket 连接不上，请尝试不要使用 helmet （main.ts 注释掉代码即可）
4. json数据转dto，sequelize model 生成器联系我