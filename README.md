# RegServer

A [Sails](http://sailsjs.org) application

> 签到小程序服务端
>
> ATTENTION: 被该GIT系统保持的项目中含有敏感信息,不得公开.

* * *

### [接口管理页]() 空

* * *

### 安装[项目]()

-   克隆仓库,命令

    `git clone `

-   安装依赖

    进入项目根目录,命令

    `npm install`

-   测试运行,命令

    `sails lift`

-   结束运行,快捷键

    `Ctrl+C`

* * *

### 安装守护进程[pm2](http://pm2.keymetrics.io)和[pm2-logrotate](https://www.npmjs.com/package/pm2-logrotate)

-   安装pm2,命令

    `npm -g install pm2`

-   安装日志管理工具,命令

    `pm2 install pm2-logrotate@2.2.0`

-   测试运行

    进入项目根目录,运行命令

    `pm2 start app.js`

-   结束运行,命令

    `pm2 stop app.js`

* * *

### 安装守护进程[pm2](http://pm2.keymetrics.io)和[pm2-logrotate](https://www.npmjs.com/package/pm2-logrotate)

-   安装pm2,命令

    `npm -g install pm2`

-   安装日志管理工具,命令

    `pm2 install pm2-logrotate@2.2.0`

-   测试运行

    进入项目根目录,运行命令

    `pm2 start app.js`

-   结束运行,命令

    `pm2 stop app.js`

### 页面路径 [localhost:1337](http://localhost:1337)

* * *

### 服务器布署(持续更新)

-   版本

    -   Nodejs -
    -   npm -
    -   Sailsjs -
    -   pm2 -
    -   pm2-logrotate -

-   安装Redis服务并启动(略)

    -   地址(待议)
    -   端口(待议)

-   安装MySQL服务并启动(略)

    -   地址(待议)
    -   端口(待议)

-   安装Nodejs(略)

-   安装Sailsjs(略)

-   安装pm2(略)

-   安装pm2-logrotate v2.2.0 (略)

-   安装项目

    -   从Git Fetch代码(略)
    -   进入项目根目录
    -   运行命令`npm install`
    -   配置服务架构及端口(略)
    -   配置数据库及路径(略)
    -   配置日志及路径(pm-logrotate略)
    -   配置生产环境(略)
    -   配置PM2并启动(略)

-   项目全局配置文件

    -   存在于项目根目录CONFIG.JS文件中

-   获取服务器信息接口

    -   使用CONFIG.JS中的server_testing_psw访问`-`获取服务器部分信息

* * *

### 常见问题(持续更新)

-   日志文件路径

    `~/.pm2/logs`

-   日志文件分割

    `pm2 set pm2-logrotate:max_size 10M`

-   数据库配置

    当前为本地开发数据库,部署测试/正式服务器时请在项目根目录/CONFIG.JS中切换

* * *

### 项目存疑(持续更新)

-   动态评论点赞:数量,谁给谁点赞,是否记录,如何记录,数据库如何关联与操作

-   动态分享: 如何记录分享数,是否记录谁给谁分享,数据库如何关联与操作

-   动态踩: 参考动态评论点赞的问题

-   签到页面(7)登录逻辑

-   活动详情(8)

-   发布动态(9)

-   个人中心(10)

-   我的足迹(11)

-   举报

* * *

### Licence

NONE

* * *

### About

Author: leo

E-Mail: 724757036@qq.com

QQ:     724757036

WeChat: lixiaogang
