module.exports = {
  extends: ['@commitlint/config-conventional'],
  // 检测规则
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'test', 'chore', 'revert', 'build'],
    ],
  },
};

// feat: 新功能、新特性
// fix: 修改 bug
// perf: 更改代码，以提高性能（在不影响代码内部行为的前提下，对程序性能进行优化）
// refactor: 代码重构（重构，在不影响代码内部行为、功能下的代码修改）
// docs: 文档修改
// style: 代码格式修改, 注意不是 css 修改（例如分号修改）
// test: 测试用例新增、修改
// build: 影响项目构建或依赖项修改
// revert: 恢复上一次提交
// ci: 持续集成相关文件修改
// chore: 其他修改（不在上述类型中的修改），改进构建，增加依赖库，工具等

// echo 'feat: hello' | npx commitlint
