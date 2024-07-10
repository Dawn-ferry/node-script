const axios = require('axios');

// 目标网站的 URL
const targetUrl = 'https://juejin.cn/';

// 并发用户数
const concurrencyLevel = 10;
console.log('开撕');
// 发起请求的次数
const numRequests = 10000;

async function makeRequests() {
  let successfulRequests = 0;
  let failedRequests = 0;

  const startTime = Date.now();

  // 使用 Promise.all 和 axios 发起并发请求
  await Promise.all(
    Array.from({ length: numRequests }).map(async () => {
      try {
        await axios.get(targetUrl);
        successfulRequests++;
      } catch (error) {
        failedRequests++;
      }
    })
  );

  const endTime = Date.now();
  const totalTime = endTime - startTime;

  console.log(`总共发起请求次数: ${numRequests}`);
  console.log(`成功的请求次数: ${successfulRequests}`);
  console.log(`失败的请求次数: ${failedRequests}`);
  console.log(`总耗时（毫秒）: ${totalTime}`);
  console.log(`每秒请求数 (RPS): ${numRequests / (totalTime / 1000)}`);
}

// 启动压测
makeRequests().catch(console.error);
