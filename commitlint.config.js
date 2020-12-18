/*
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
 */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  'type-enum': [2, 'always', [
    'feat', // 功能实现
    'fix', // 问题修复
    'docs', // 文档相关
    'style', // 代码风格相关
    'refactor', // 重构
    'test', // 编写测试
    'revert', // 回滚代码
    'chore' // 构建相关
  ]],
  'scope-enum': [2, 'always', [
    'app', // 全局
    'layout', // 布局
    'router' // 路由
  ]],
};
