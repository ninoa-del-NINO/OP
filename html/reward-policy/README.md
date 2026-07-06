# 派奖策略配置（Reward Policy）

## 项目简介

本项目为后台运营系统「派奖策略配置」页面的高保真 HTML 原型。

采用工程化方式开发，页面可直接部署到 GitHub Pages 或本地运行，用于产品评审、需求确认及交互演示。

---

## 项目信息

| 项目 | 内容 |
|------|------|
| 页面名称 | 派奖策略配置 |
| 版本 | V25 |
| 原型类型 | HTML Prototype |
| 设计规范 | Axure 风格 |
| 页面宽度 | 860px |
| 字体 | 8px |
| 主题色 | #8CA1C1 |
| 删除按钮 | #0000FF |
| 作者 | ChatGPT × Nino |
| 更新时间 | 2026-07 |

---

# 项目目录


reward-policy
│
├── index.html
├── reward-policy.css
├── reward-policy.js
├── mock-data.js
├── README.md
└── assets/


---

# 页面模块

页面共包含四个模块。

## 1、策略管理

支持：

- 策略切换
- 新增策略
- 编辑策略
- 删除策略

所有操作均采用页面内 Modal，不使用浏览器原生弹窗。

---

## 2、数据源配置

支持：

体育场馆

- 添加体育场馆
- 删除体育场馆

联赛ID

- 添加联赛ID
- 删除联赛ID
- 最多10个
- 重复校验
- 数字校验

---

## 3、活动存款条件

支持：

- 是否开启
- 日累计存款

关闭时：

输入框自动禁用。

---

## 4、规则配置

支持：

- 新增规则
- 删除规则
- 多行配置
- 输入实时更新

字段：

- 日有效投注
- 日负盈利
- 彩金（元）
- 流水倍数

---

# 页面交互规范

统一采用企业后台规范。

禁止使用：

- alert()
- confirm()
- prompt()

统一采用：

- Modal
- Confirm Modal
- Toast

---

# 按钮规范

主按钮

颜色：


#8CA1C1


删除按钮

颜色：


#0000FF


---

# Table 规范

表头

背景：


#8CA1C1


字体：


FFFFFF


内容

白色背景。

---

# Modal

统一使用：

- 新增策略
- 编辑策略
- 删除确认
- 添加体育场馆
- 添加联赛ID

所有弹窗风格保持一致。

---

# Toast

统一采用右下角 Toast。

例如：


✓ 保存成功


自动消失。

---

# 数据结构

策略


id

name


体育场馆


name

tags[]


规则


bet

loss

reward

rollover


---

# Mock Data

所有模拟数据统一维护：


mock-data.js


页面初始化时自动加载。

---

# 后续版本规划

## V26

代码整合

统一事件

统一初始化

公共方法抽离

---

## V27

组件库

Button

Input

Select

Radio

Checkbox

Tag

Table

Modal

Toast

Confirm

---

## V28

支持：

导入

导出

JSON

接口模拟

---

# 浏览器

推荐：

- Chrome
- Edge

无需安装任何第三方依赖。

---

# GitHub Pages

部署目录：


html/
└── reward-policy/


访问方式：


https://<你的GitHub用户名>.github.io/OP/html/reward-policy/


---

# 更新记录

## V25

- 页面框架
- 策略管理
- 数据源配置
- 活动存款条件
- 规则配置
- Mock Data
- Modal
- Toast
- Confirm

---

# 开发规范

后续所有 HTML 原型统一遵循：

- HTML 负责结构
- CSS 负责样式
- JS 负责交互
- Mock Data 独立维护
- 不使用浏览器原生弹窗
- Axure 风格（860px、8px）
- 企业后台设计规范
