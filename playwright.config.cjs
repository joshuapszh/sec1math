const {defineConfig}=require('@playwright/test');
module.exports=defineConfig({
 testDir:'./heritage-maths-revision/tests',
 testMatch:'*.spec.cjs',
 timeout:30000,
 use:{baseURL:'http://127.0.0.1:8000',browserName:'chromium',headless:true},
 webServer:{command:'python3 -m http.server 8000',url:'http://127.0.0.1:8000/heritage-maths-revision/index.html',reuseExistingServer:!process.env.CI,timeout:20000},
 reporter:[['list']]
});
