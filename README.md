## 完整命令参考手册

### 一、项目初始化

```bash
# 1. 克隆/创建项目后，安装所有依赖
pnpm install

# 2. 批准 nx 构建脚本（首次安装时需要）
pnpm approve-builds

# 3. 重新安装（如果需要）
pnpm install
```

### 二、本地 Registry 管理

```bash
# 1. 全局安装 Verdaccio（首次使用）
npm install -g verdaccio

# 2. 启动本地 Registry（在新终端窗口运行）
verdaccio
# 默认运行在 http://localhost:4873/

# 3. 创建 Verdaccio 用户（首次使用）
npm adduser --registry http://localhost:4873/
# 输入用户名、密码、邮箱

# 4. 查看 Verdaccio 配置
cat ~/.config/verdaccio/config.yaml

# 5. 停止 Verdaccio
# 在运行 verdaccio 的终端按 Ctrl+C
```

### 三、构建项目

```bash
# ===== 在项目根目录 =====

# 1. 构建所有项目
pnpm nx run-many --target=build --all

# 2. 构建单个库（common-test-cucumber-playwright）
pnpm nx build common-test-cucumber-playwright

# 3. 构建时显示详细输出
pnpm nx build common-test-cucumber-playwright --verbose

# 4. 清除 nx 缓存后重新构建
pnpm nx reset
pnpm nx build common-test-cucumber-playwright

# 5. 查看构建依赖图
pnpm nx graph
```

### 四、运行测试

```bash
# ===== 在项目根目录 =====

# 1. 运行 E2E 测试（使用 npm scripts，推荐）
pnpm test:e2e

# 2. 并发运行 E2E 测试
pnpm test:e2e:parallel

# 3. 使用 nx 命令运行测试
pnpm nx run formal-e2e-tests:test

# 4. 运行所有项目的测试
pnpm nx run-many --target=test --all

# ===== 在 apps/formal-e2e-tests 目录 =====

cd apps/formal-e2e-tests

# 5. 直接运行测试
pnpm test

# 6. 并发运行（4个进程）
pnpm test:parallel

# 7. 运行单个 feature 文件
npx cucumber-js src/features/sample-api.feature

# 8. 运行特定标签的测试
npx cucumber-js --tags "@api"

# 9. 干运行（检查步骤定义）
npx cucumber-js --dry-run

# 10. 生成详细报告
npx cucumber-js --format json:reports/cucumber-report.json

# 11. 显示详细步骤
npx cucumber-js --format progress-bar

# 12. 串行运行（调试时使用）
npx cucumber-js --parallel 1
```

### 五、发布库到本地 Registry

```bash
# ===== 确保 Verdaccio 正在运行 =====

# 方式 1：在 libs/common-test-cucumber-playwright 目录
cd libs/common-test-cucumber-playwright
pnpm publish:local

# 方式 2：手动发布
cd libs/common-test-cucumber-playwright
pnpm publish --registry http://localhost:4873/ --no-git-checks

# 方式 3：发布特定版本
cd libs/common-test-cucumber-playwright
npm version patch  # 或 minor, major
pnpm publish --registry http://localhost:4873/ --no-git-checks

# 查看本地 Registry 中的包
npm view @org/common-test-cucumber-playwright --registry http://localhost:4873/

# 查看所有版本
npm view @org/common-test-cucumber-playwright versions --registry http://localhost:4873/
```

### 六、在 formal-e2e-tests 中开发和调试

```bash
# ===== 方式 1：使用源码依赖（推荐，实时生效）=====

# 在项目根目录，直接修改 libs 代码
# 修改 libs/common-test-cucumber-playwright/src/... 
# 然后在 apps/formal-e2e-tests 中运行测试
cd apps/formal-e2e-tests
pnpm test

# 不需要重新构建或发布，修改立即生效！
