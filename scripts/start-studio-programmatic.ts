import { StudioServerInternals } from '@remotion/studio-server';
import path from 'path';

/**
 * 代码方式启动 Remotion Studio
 * 这种方式可以让你以编程方式控制 Studio 的启动参数
 */
export const startStudioProgrammatically = async (config: {
  port?: number | null; // 改为 null 让系统自动选择端口
  remotionRoot?: string;
  entryPoint?: string;
  logLevel?: 'info' | 'verbose' | 'warn' | 'error';
}) => {
  const {
    port = null, // 改为 null 让系统自动选择可用端口
    remotionRoot = process.cwd(),
    entryPoint = './src/index.ts',
    logLevel = 'info'
  } = config;

  console.log('🚀 开始以代码方式启动 Remotion Studio...');
  console.log(`📁 项目根目录: ${remotionRoot}`);
  console.log(`📄 入口文件: ${entryPoint}`);
  console.log(`🌐 端口: ${port}`);
  console.log(`📊 日志级别: ${logLevel}`);

  try {
    await StudioServerInternals.startStudio({
      // 使用本地的 ve-videocraft-studio 预览入口
      previewEntry: path.resolve(process.cwd(), 'F:/visionengine/ve-videocraft-studio/src/previewEntry.tsx'),
      
      // 你的 Remotion 项目入口
      fullEntryPath: path.resolve(remotionRoot, entryPoint),
      remotionRoot,
      
      // 服务器配置
      desiredPort: port,
      logLevel,
      
      // 输入参数和环境变量（可以先使用空对象）
      getCurrentInputProps: () => ({}),
      getEnvVariables: () => ({}),
      
      // 其他配置（使用默认值）
      configValueShouldOpenBrowser: true,
      keyboardShortcutsEnabled: true,
      maxTimelineTracks: null,
      relativePublicDir: null,
      webpackOverride: (config) => config,
      poll: null,
      
      // 渲染队列相关（使用默认空实现）
      getRenderDefaults: () => ({
        // 使用默认的渲染设置
        jpegQuality: 80,
        logLevel: 'info' as const,
        codec: 'h264' as const,
        concurrency: 1,
        muted: false,
        enforceAudioTrack: false,
        proResProfile: null,
        x264Preset: 'medium' as const,
        pixelFormat: 'yuv420p' as const,
        videoBitrate: null,
        audioBitrate: null,
        webhook: null,
        everyNthFrame: 1,
        numberOfGifLoops: null,
        delayRenderTimeout: 30000,
        disableWebSecurity: false,
        openGlRenderer: null,
        ignoreCertificateErrors: false,
        offthreadVideoCacheSizeInBytes: null,
        colorSpace: 'default',
        scale: 1,
        minConcurrency: 1,
        maxConcurrency: 1,
        stillImageFormat: 'png' as const,
        audioCodec: null,
        videoCodec: null,
        encodingMaxRate: null,
        encodingBufferSize: null,
        renderer: 'webgl' as const,
        preferLossless: false,
        forSeamlessAacConcatenation: false,
        compositionStartFrom: 0,
        compositionDurationInFrames: null,
        frameRange: null,
        height: null,
        width: null,
        browserExecutable: null,
        outputLocation: null,
        overwrite: true,
        inputProps: {},
        envVariables: {},
        chromiumOptions: {},
        serveUrl: '',
        port: null,
        publicDir: null,
        videoImageFormat: 'png' as const,
        userAgent: null,
        mediaCacheSizeInBytes: null,
        offthreadVideoThreads: null,
        chromiumDisableWebSecurity: false,
        headless: true,
        indent: false,
        multiProcessOnLinux: false,
        reproducibleBuild: false,
        beepOnFinish: false,
        repro: false,
        metadata: null,
        hardwareAcceleration: 'if-possible' as const,
        chromeMode: 'chrome-for-testing' as const,
      }),
      getRenderQueue: () => [],
      numberOfAudioTags: 1,
      queueMethods: {
        addJob: async () => ({ id: 'test-job' }),
        cancelJob: async () => {},
        removeJob: async () => {},
      },
      
      // CLI 参数（默认值）
      parsedCliOpen: true,
      gitSource: null,
      bufferStateDelayInMilliseconds: null,
      binariesDirectory: null,
      forceIPv4: false,
      audioLatencyHint: null,
      enableCrossSiteIsolation: false,
       // 🔥 关键跨域配置
      browserArgs: [
        '--disable-web-security',
        '--disable-features=IsolateOrigins',
        '--disable-site-isolation-trials'
      ].join(' '),
      browserFlag: 'chrome',
    });

    console.log(`✅ Studio 已在 http://localhost:${port} 启动成功！`);
    console.log('💡 提示：现在你可以通过浏览器访问 Studio 界面');
    
  } catch (error) {
    console.error('❌ 启动 Studio 失败:', error);
    throw error;
  }
};

// 如果直接运行此文件，则启动 Studio
if (require.main === module) {
  startStudioProgrammatically({
    port: null, // 让系统自动选择端口
    remotionRoot: process.cwd(),
    entryPoint: './src/index.ts',
    logLevel: 'info'
  }).catch((error) => {
    console.error('启动失败:', error);
    process.exit(1);
  });
}