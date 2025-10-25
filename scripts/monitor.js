/**
 * System Monitoring Script
 * Version: 2.0-beta
 * Monitors application health and performance
 * Supports both production and development environments
 */

// Determine environment from NODE_ENV or default to development
const environment = process.env.NODE_ENV || 'development';
const isProduction = environment === 'production';

const monitorConfig = {
  interval: isProduction ? 60000 : 5000, // 1 minute (prod) or 5 seconds (dev)
  alertThreshold: isProduction ? 80 : 90,
  metricsEndpoint: isProduction ? 'http://localhost:8080/metrics' : 'http://localhost:3000/metrics',
  debugMode: !isProduction,
  verboseLogging: !isProduction
};

console.log('=================================');
console.log(`DevOps Simulator - Monitor v2.0-beta`);
if (!isProduction) {
  console.log('Development Mode: ENABLED');
}
console.log('=================================');

function checkSystemHealth() {
  const timestamp = new Date().toISOString();
  
  if (monitorConfig.debugMode) {
    console.log(`\n[${timestamp}] === DETAILED HEALTH CHECK ===`);
  } else {
    console.log(`[${timestamp}] Checking system health...`);
  }
  
  // Check CPU usage
  if (monitorConfig.debugMode) {
    const cpuUsage = Math.random() * 100;
    console.log(`✓ CPU usage: ${cpuUsage.toFixed(2)}%`);
  } else {
    console.log('✓ CPU usage: Normal');
  }
  
  // Check Memory
  if (monitorConfig.debugMode) {
    const memUsage = Math.random() * 100;
    console.log(`✓ Memory usage: ${memUsage.toFixed(2)}%`);
  } else {
    console.log('✓ Memory usage: Normal');
  }
  
  // Check Disk
  if (monitorConfig.debugMode) {
    const diskUsage = Math.random() * 100;
    console.log(`✓ Disk space: ${diskUsage.toFixed(2)}% used`);
  } else {
    console.log('✓ Disk space: Adequate');
  }
  
  // Development-specific checks
  if (monitorConfig.debugMode) {
    console.log('✓ Hot reload: Active');
    console.log('✓ Debug port: 9229');
    console.log('✓ Source maps: Enabled');
  }
  
  // Status determination
  if (monitorConfig.debugMode) {
    const cpuUsage = Math.random() * 100;
    const memUsage = Math.random() * 100;
    const diskUsage = Math.random() * 100;
    const maxUsage = Math.max(cpuUsage, memUsage, diskUsage);
    
    if (maxUsage > monitorConfig.alertThreshold) {
      console.log('⚠️  System Status: WARNING - High resource usage');
    } else {
      console.log('✅ System Status: HEALTHY');
    }
  } else {
    console.log('System Status: HEALTHY');
  }
  
  if (monitorConfig.verboseLogging) {
    console.log(`Next check in ${monitorConfig.interval}ms`);
  }
}

// Start monitoring
console.log(`Monitoring every ${monitorConfig.interval}ms`);
if (monitorConfig.debugMode) {
  console.log('Debug features enabled');
}
setInterval(checkSystemHealth, monitorConfig.interval);

// Run first check immediately
checkSystemHealth();

// Development-specific: Log memory usage
if (monitorConfig.debugMode) {
  setInterval(() => {
    const memUsage = process.memoryUsage();
    console.log('\n--- Memory Usage ---');
    console.log(`RSS: ${(memUsage.rss / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Heap Used: ${(memUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`);
  }, 30000);
}
