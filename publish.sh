#!/bin/bash

# 发布脚本
# 使用方法: ./publish.sh [patch|minor|major]

set -e

VERSION_TYPE=${1:-patch}

echo "🚀 准备发布 antd-form-render"

# 检查是否有未提交的更改
if [[ -n $(git status -s) ]]; then
  echo "⚠️  有未提交的更改，请先提交或暂存。"
  git status -s
  exit 1
fi

# 检查是否登录 npm
if !npm whoami &> /dev/null; then
  echo "❌ 请先登录 npm: npm login"
  exit 1
fi

# 运行测试
echo "✅ 验证代码..."
npm run prepublishOnly

# 更新版本
echo "📦 更新版本: $VERSION_TYPE"
npm version $VERSION_TYPE

# 获取新版本号
NEW_VERSION=$(node -p "require('./package.json').version")
echo "📌 新版本: $NEW_VERSION"

# 推送到 git
echo "🔄 推送到 Git..."
git push origin master --tags

# 发布到 npm
echo "📤 发布到 npm..."
npm publish

echo "✨ 发布成功! 版本: $NEW_VERSION"
echo "🔗 https://www.npmjs.com/package/antd-form-render"
