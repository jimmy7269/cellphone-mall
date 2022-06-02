module.exports = {
    // 表示需要修改webpack的config类
    configureWebpack:{
        resolve: {
            // 配置别名
          alias: {
            // 有一个默认的别名 @: src
            assets: '@/assets',
            common: '@/common',
            components: '@/components',
            network: '@/network',
            views: '@/views'
            // router一般不需要设置别名，因为一般只有App.vue才会引用router，同理store
          }

        }
    }
};
